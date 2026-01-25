export interface QueryFilters {
    search?: string
    category?: string
    licenseType?: string
    productType?: string
    isFree?: boolean
}

export interface PaginationOptions {
    page: number
    limit: number
}

export interface PaginationResult {
    page: number
    limit: number
    total: number
    totalPages: number
}

/**
 * Builds a GROQ query with filters
 */
export function buildProductQuery(filters: QueryFilters = {}): {
    query: string
    params: Record<string, string | boolean>
} {
    let query = `*[_type == "product"`
    const params: Record<string, string | boolean> = {}

    const conditions: string[] = []

    // Search filter
    if (filters.search) {
        conditions.push(`(title match $search || categories[] match $search || productType match $search)`)
        params.search = `*${filters.search}*`
    }

    // Category filter
    if (filters.category) {
        conditions.push(`$category in categories`)
        params.category = filters.category
    }

    // License type filter
    if (filters.licenseType) {
        conditions.push(`licenseType == $licenseType`)
        params.licenseType = filters.licenseType
    }

    // Product type filter
    if (filters.productType) {
        conditions.push(`productType == $productType`)
        params.productType = filters.productType
    }

    // Free filter
    if (filters.isFree !== undefined) {
        conditions.push(`isFree == $isFree`)
        params.isFree = filters.isFree
    }

    if (conditions.length > 0) {
        query += ` && ${conditions.join(' && ')}`
    }

    query += `] | order(_createdAt desc)`

    return { query, params }
}

/**
 * Adds pagination to a GROQ query
 */
export function addPagination(query: string, pagination: PaginationOptions): string {
    const { page, limit } = pagination
    const start = (page - 1) * limit
    return `${query} [${start}...${start + limit}]`
}

/**
 * Builds a count query for pagination
 */
export function buildCountQuery(baseQuery: string): string {
    return `count(${baseQuery})`
}

/**
 * Creates pagination metadata
 */
export function createPaginationResult(
    total: number,
    page: number,
    limit: number
): PaginationResult {
    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
}

/**
 * Validates pagination parameters
 */
export function validatePagination(page: number, limit: number): PaginationOptions {
    const validPage = Math.max(1, Math.floor(page))
    const validLimit = Math.min(100, Math.max(1, Math.floor(limit))) // Max 100 items per page

    return { page: validPage, limit: validLimit }
}
