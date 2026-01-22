import { sanityClient } from '../client'
import { PRODUCT_PROJECTION, PRODUCT_BY_SLUG_QUERY } from '../queries'
import { buildProductQuery, addPagination, buildCountQuery, createPaginationResult, validatePagination, QueryFilters, PaginationOptions, PaginationResult } from '../utils'
import { Product, ProductDetail } from '@/types/product'

export class ProductService {
    /**
     * Get all products with optional filters and pagination
     */
    static async getProducts(
        filters: QueryFilters = {},
        pagination?: PaginationOptions
    ): Promise<{ products: Product[]; pagination?: PaginationResult }> {
        try {
            const { query: baseQuery, params } = buildProductQuery(filters)

            if (pagination) {
                const validPagination = validatePagination(pagination.page, pagination.limit)

                // Get total count
                const countQuery = buildCountQuery(baseQuery)
                const total = await sanityClient.fetch<number>(countQuery, params)

                // Get paginated results
                const paginatedQuery = addPagination(baseQuery, validPagination)
                const fullQuery = `${paginatedQuery}{${PRODUCT_PROJECTION}}`

                const products = await sanityClient.fetch<Product[]>(fullQuery, params, {
                    next: { revalidate: 60 }
                })

                const paginationResult = createPaginationResult(total, validPagination.page, validPagination.limit)

                return { products, pagination: paginationResult }
            } else {
                // Get all results without pagination
                const fullQuery = `${baseQuery}{${PRODUCT_PROJECTION}}`
                const products = await sanityClient.fetch<Product[]>(fullQuery, params, {
                    next: { revalidate: 60 }
                })

                return { products }
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            throw new Error('Failed to fetch products')
        }
    }

    /**
     * Get a single product by slug
     */
    static async getProductBySlug(slug: string): Promise<ProductDetail | null> {
        try {
            // Validate slug parameter
            if (!slug || typeof slug !== 'string') {
                throw new Error('Invalid slug provided')
            }

            const product = await sanityClient.fetch<ProductDetail | null>(
                PRODUCT_BY_SLUG_QUERY,
                { slug },
                { next: { revalidate: 60 } }
            )

            return product
        } catch (error) {
            console.error('Error fetching product by slug:', {
                slug,
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            })

            // Re-throw with more context
            if (error instanceof Error) {
                throw new Error(`Failed to fetch product with slug "${slug}": ${error.message}`)
            }

            throw new Error(`Failed to fetch product with slug "${slug}"`)
        }
    }

    /**
     * Get unique categories from all products
     */
    static async getCategories(): Promise<string[]> {
        try {
            const query = `*[_type == "product"]{categories}`
            const products = await sanityClient.fetch<{ categories?: string[] }[]>(query, {}, {
                next: { revalidate: 300 } // Cache for 5 minutes
            })

            const categories = products
                .flatMap(product => product.categories || [])
                .filter((category, index, array) => array.indexOf(category) === index)
                .sort()

            return categories
        } catch (error) {
            console.error('Error fetching categories:', error)
            throw new Error('Failed to fetch categories')
        }
    }

    /**
     * Search products with filters
     */
    static async searchProducts(
        searchTerm: string,
        filters: Omit<QueryFilters, 'search'> = {},
        pagination: PaginationOptions = { page: 1, limit: 12 }
    ): Promise<{ products: Product[]; pagination: PaginationResult }> {
        return this.getProducts(
            { ...filters, search: searchTerm },
            pagination
        ) as Promise<{ products: Product[]; pagination: PaginationResult }>
    }

    /**
     * Get products by category
     */
    static async getProductsByCategory(
        category: string,
        pagination: PaginationOptions = { page: 1, limit: 12 }
    ): Promise<{ products: Product[]; pagination: PaginationResult }> {
        return this.getProducts(
            { category },
            pagination
        ) as Promise<{ products: Product[]; pagination: PaginationResult }>
    }
}
