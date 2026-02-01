'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError } from '@/lib/errors';
import { Product } from '@/types/product';
import { Pagination } from '@/types/query';

// Interface untuk parameter fetch agar type-safe
interface FetchParams {
    search: string;
    category: string;
    page: number;
}

export function useProducts(options?: { baseUrl?: string; defaultLimit?: number }) {
    const baseUrl = options?.baseUrl ?? '/api/products';
    const defaultLimit = options?.defaultLimit ?? 12;

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]); // Ganti nama dari labels ke categories
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // Ganti state name
    const [currentPage, setCurrentPage] = useState<number>(1);

    const controllerRef = useRef<AbortController | null>(null);

    const loadCategories = useCallback(async () => {
        setCategoriesLoading(true);
        try {
            const res = await fetch('/api/categories');
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data = await res.json();
            setCategories(data.categories || []);
        } catch (err) {
            console.error('Error loading categories:', err);
        } finally {
            setCategoriesLoading(false);
        }
    }, []);

    const loadProducts = useCallback(
        async (params: FetchParams) => {
            controllerRef.current?.abort();
            const controller = new AbortController();
            controllerRef.current = controller;

            setLoading(true);
            setError(null);

            try {
                const query = new URLSearchParams();
                if (params.search.trim()) query.set('search', params.search.trim());
                if (params.category.trim()) query.set('category', params.category.trim()); // Konsisten 'category'
                query.set('page', String(params.page));
                query.set('limit', String(defaultLimit));

                const res = await fetch(`${baseUrl}?${query.toString()}`, {
                    signal: controller.signal
                });

                if (!res.ok) throw new ApiError('Failed to fetch products', res.status);

                const data = await res.json();
                setProducts(data.products || []);
                setPagination(data.pagination || null);

            } catch (err: unknown) {
                if (err instanceof Error && err.name === 'AbortError') return;
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        },
        [baseUrl, defaultLimit]
    );

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        const fetchTrigger = () => {
            loadProducts({ search, category: selectedCategory, page: currentPage });
        };

        const timer = setTimeout(fetchTrigger, search ? 500 : 0);
        return () => {
            clearTimeout(timer);
            controllerRef.current?.abort();
        };
    }, [search, selectedCategory, currentPage, loadProducts]);

    // Reset ke page 1 jika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory]);

    return {
        products,
        categories,
        pagination,
        loading,
        categoriesLoading,
        error,
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
    } as const;
}