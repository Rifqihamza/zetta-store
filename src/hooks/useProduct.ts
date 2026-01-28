'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError } from '@/lib/errors';
import { Product } from '@/types/product';
import { Pagination } from '@/types/query';

interface FetchParams {
    search: string;
    item_type: string;
    page: number;
}

export function useProducts(options?: { baseUrl?: string; defaultLimit?: number }) {
    const baseUrl = options?.baseUrl ?? '/api/products';
    const defaultLimit = options?.defaultLimit ?? 12;

    // Data States
    const [products, setProducts] = useState<Product[]>([]);
    const [itemType, setItemType] = useState<string[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    // Status States
    const [loading, setLoading] = useState<boolean>(true);
    const [itemTypeLoading, setItemTypeLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Filter States
    const [search, setSearch] = useState<string>('');
    const [selectedItemType, setSelectedItemType] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const controllerRef = useRef<AbortController | null>(null);

    // 1. Fungsi Fetch Categories (Hanya sekali saat mount)
    const loadItemType = useCallback(async () => {
        setItemTypeLoading(true);
        try {
            const res = await fetch('/api/categories');
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data = await res.json();
            setItemType(data.categories || []);
        } catch (err) {
            console.error('Error loading categories:', err);
        } finally {
            setItemTypeLoading(false);
        }
    }, []);

    // 2. Fungsi Fetch Products (Setiap filter/page berubah)
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
                if (params.item_type.trim()) query.set('item_type', params.item_type.trim());
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
                const message = err instanceof Error ? err.message : 'An unexpected error occurred';
                setError(message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        },
        [baseUrl, defaultLimit]
    );

    // Initial Load: Categories
    useEffect(() => {
        loadItemType();
    }, [loadItemType]);

    // Main Load Trigger: Products
    useEffect(() => {
        const fetchTrigger = () => {
            loadProducts({ search, item_type: selectedItemType, page: currentPage });
        };

        if (search) {
            const timer = setTimeout(fetchTrigger, 500); // Debounce search
            return () => clearTimeout(timer);
        }

        fetchTrigger();
        return () => controllerRef.current?.abort();
    }, [search, selectedItemType, currentPage, loadProducts]);

    // Reset page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedItemType]);

    return {
        // Data
        products,
        itemType,
        pagination,
        // Status
        loading,
        itemTypeLoading,
        error,
        // Actions/States
        search,
        setSearch,
        selectedItemType,
        setSelectedItemType,
        currentPage,
        setCurrentPage,
    } as const;
}