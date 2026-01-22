'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/types/product'

interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

interface ApiResponse {
    products: Product[]
    pagination: Pagination
}

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const fetchProducts = useCallback(
        async (searchTerm: string, category: string, page: number) => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    search: searchTerm,
                    category,
                    page: page.toString(),
                    limit: '12',
                })

                const res = await fetch(`/api/products?${params}`)
                const data: ApiResponse = await res.json()

                setProducts(data.products)
                setPagination(data.pagination)
            } catch (err) {
                console.error('Error fetching products:', err)
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch('/api/products?limit=1000')
            const data: ApiResponse = await res.json()

            const uniqueCategories = Array.from(
                new Set(data.products.flatMap(p => p.categories || []))
            ).sort()

            setCategories(uniqueCategories)
        } catch (err) {
            console.error('Error fetching categories:', err)
        }
    }, [])

    // initial load
    useEffect(() => {
        fetchCategories()
        fetchProducts('', '', 1)
    }, [fetchCategories, fetchProducts])

    // debounce search & category
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchProducts(search, selectedCategory, 1)
            setCurrentPage(1)
        }, 500)

        return () => clearTimeout(timeout)
    }, [search, selectedCategory, fetchProducts])

    // pagination
    useEffect(() => {
        if (currentPage > 1) {
            fetchProducts(search, selectedCategory, currentPage)
        }
    }, [currentPage, search, selectedCategory, fetchProducts])

    return {
        products,
        categories,
        pagination,
        loading,

        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
    }
}
