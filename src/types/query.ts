export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    lastId?: number | null;
}

export interface QueryFilters {
    search?: string;
    category?: string;
    page?: number;
}