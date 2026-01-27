// hooks/useProducts.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { ApiError } from '@/lib/errors';
import { Product as ProductType } from '@/types/product';
import { PaginationResult as PaginationResultType } from '@/types/query';

/* ============================
   Zod schemas (runtime validation)
   ============================ */

const ProductSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    desc: z.string(),
    images: z.array(z.string()).optional().default([]),
    // Accept number or null from API; we'll coerce to number for ProductType
    price: z.number().nullable().optional(),
    isFree: z.boolean().optional().default(false),
    categories: z.array(z.string()).optional().default([]),
    checkoutUrl: z.string().optional(),
});

const PaginationSchema = z
    .object({
        page: z.number().optional(),
        limit: z.number().optional(),
        totalItems: z.number().nullable().optional(),
        totalPages: z.number().nullable().optional(),
        hasNext: z.boolean().optional(),
        lastId: z.number().nullable().optional(),
    })
    .optional();

const ApiResponseSchema = z.object({
    products: z.array(ProductSchema).optional().default([]),
    pagination: PaginationSchema,
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;

/* ============================
   Helpers
   ============================ */

function extractMessageFromUnknown(u: unknown): string | undefined {
    if (u && typeof u === 'object') {
        const record = u as Record<string, unknown>;
        const m = record['message'] ?? record['error'] ?? record['detail'];
        if (typeof m === 'string') return m;
    }
    return undefined;
}

async function fetchAndValidate(url: string, signal?: AbortSignal): Promise<ApiResponse> {
    const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
    const text = await res.text();

    let json: unknown = null;
    try {
        json = text ? JSON.parse(text) : {};
    } catch {
        json = null;
    }

    if (!res.ok) {
        const body = json ?? text;
        const maybeMsg = extractMessageFromUnknown(json);
        const msg = maybeMsg ?? String(body) ?? `HTTP ${res.status}`;
        throw new ApiError(`API error: ${msg}`, res.status, body);
    }

    const parsed = ApiResponseSchema.safeParse(json ?? {});
    if (!parsed.success) {
        throw new ApiError('API response validation failed: ' + parsed.error.message, undefined, json ?? text);
    }

    return parsed.data;
}

/* ============================
   Hook: useProducts
   ============================ */

export function useProducts(options?: { baseUrl?: string; defaultLimit?: number; enrichMissingPrice?: boolean }) {
    const baseUrl = options?.baseUrl ?? '/api/products';
    const defaultLimit = options?.defaultLimit ?? 12;
    const enrichMissingPrice = options?.enrichMissingPrice ?? false;

    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [pagination, setPagination] = useState<PaginationResultType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const controllerRef = useRef<AbortController | null>(null);
    const debounceRef = useRef<number | null>(null);

    const mapApiProductToUi = (p: z.infer<typeof ProductSchema>): ProductType => {
        // ProductType expects number for price; coerce null/undefined -> 0
        const priceNumber = typeof p.price === 'number' && Number.isFinite(p.price) ? p.price : 0;

        // copy arrays to avoid readonly/mutation mismatch
        const images: string[] = Array.isArray(p.images) ? [...p.images] : [];
        const categoriesArr: string[] = Array.isArray(p.categories) ? [...p.categories] : [];

        return {
            id: p.id,
            title: p.title,
            slug: p.slug,
            desc: p.desc,
            images,
            price: priceNumber,
            isFree: p.isFree ?? priceNumber === 0,
            categories: categoriesArr,
            checkoutUrl: p.checkoutUrl,
        };
    };

    const loadProducts = useCallback(
        async (opts?: { search?: string; category?: string; page?: number; limit?: number }) => {
            // Build query parameters helper function (moved inside useCallback to avoid dependency issues)
            const buildQuery = (params: { search?: string; category?: string; page?: number; limit?: number }) => {
                const q = new URLSearchParams();
                if (params.search && params.search.trim() !== '') q.set('search', params.search.trim());
                if (params.category && params.category.trim() !== '') q.set('category', params.category.trim());
                if (params.page && params.page > 0) q.set('page', String(params.page));
                if (params.limit) q.set('limit', String(params.limit));
                if (enrichMissingPrice) q.set('enrich', '1');
                const qs = q.toString();
                return qs ? `?${qs}` : '';
            };

            controllerRef.current?.abort();
            const controller = new AbortController();
            controllerRef.current = controller;

            setLoading(true);
            setError(null);

            try {
                const qs = buildQuery({
                    search: opts?.search,
                    category: opts?.category,
                    page: opts?.page ?? 1,
                    limit: opts?.limit ?? defaultLimit,
                });
                const url = `${baseUrl}${qs}`;

                const data = await fetchAndValidate(url, controller.signal);

                const mapped: ProductType[] = (data.products ?? []).map((p) => mapApiProductToUi(p));

                setProducts(mapped);

                const raw = data.pagination ?? null;
                const normalizedPagination: PaginationResultType | null = raw
                    ? {
                        page: raw.page ?? 1,
                        limit: raw.limit ?? defaultLimit,
                        totalItems: raw.totalItems ?? null,
                        totalPages: raw.totalPages ?? null,
                        hasNext: raw.hasNext ?? false,
                        lastId: raw.lastId ?? null,
                    }
                    : null;

                setPagination(normalizedPagination);

                const derivedCats = Array.from(new Set(mapped.flatMap((m) => m.categories))).sort();
                setCategories(derivedCats);
            } catch (err: unknown) {
                if (err instanceof ApiError) {
                    setError(err.message);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
                setProducts([]);
                setPagination(null);
            } finally {
                setLoading(false);
            }
        },
        [baseUrl, defaultLimit, enrichMissingPrice]
    );

    // initial load
    useEffect(() => {
        loadProducts({ page: 1, limit: defaultLimit });
        return () => controllerRef.current?.abort();
    }, [loadProducts, defaultLimit]);

    // debounce search/category changes
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = window.setTimeout(() => {
            setCurrentPage(1);
            loadProducts({ search, category: selectedCategory, page: 1, limit: defaultLimit });
        }, 500);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            controllerRef.current?.abort();
        };
    }, [search, selectedCategory, loadProducts, defaultLimit]);

    // pagination change
    useEffect(() => {
        if (currentPage > 1) {
            loadProducts({ search, category: selectedCategory, page: currentPage, limit: defaultLimit });
        }
    }, [currentPage, search, selectedCategory, loadProducts, defaultLimit]);

    return {
        products,
        categories,
        pagination,
        loading,
        error,

        // controls
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
    } as const;
}