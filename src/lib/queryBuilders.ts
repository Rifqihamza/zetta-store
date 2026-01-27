// lib/query.ts
import { QueryFilters, PaginationOptions } from "@/types/query";

/**
 * Build query params for product list
 */
export function buildProductQueryParams(
    filters: QueryFilters = {},
    pagination?: PaginationOptions,
    opts?: { enrichMissingPrice?: boolean }
): URLSearchParams {
    const params = new URLSearchParams();

    const search = filters.search?.trim();
    const category = filters.category?.trim();

    if (search && search.length > 0) params.set("search", search);
    if (category && category.length > 0) params.set("category", category);

    if (pagination) {
        const page = Number.isFinite(Number(pagination.page)) ? Math.max(1, Math.floor(Number(pagination.page))) : undefined;
        const limit = Number.isFinite(Number(pagination.limit)) ? Math.max(1, Math.floor(Number(pagination.limit))) : undefined;

        if (page !== undefined) params.set("page", String(page));
        if (limit !== undefined) params.set("limit", String(limit));
    }

    if (opts?.enrichMissingPrice) params.set("enrich", "1");

    return params;
}

/** Convenience: return query string starting with ? or empty string */
export function buildProductQueryString(
    filters?: QueryFilters,
    pagination?: PaginationOptions,
    opts?: { enrichMissingPrice?: boolean }
): string {
    const qs = buildProductQueryParams(filters, pagination, opts).toString();
    return qs ? `?${qs}` : "";
}