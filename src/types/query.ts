
export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface QueryFilters {
    search?: string;
    category?: string;
}

export interface PaginationOptions {
    page: number;
    limit: number;
}

// types/query.ts (page wajib)
export interface PaginationResult {
    page: number;
    limit: number;
    totalItems?: number | null;
    totalPages?: number | null;
    hasNext?: boolean;
    lastId?: number | null;
}