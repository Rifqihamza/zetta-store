export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    lastId?: string | number | null;
}

export interface QueryFilters {
    search?: string;
    item_type?: string;
    page?: number;
}