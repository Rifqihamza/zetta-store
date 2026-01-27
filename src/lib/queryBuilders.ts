import { QueryFilters, Pagination } from "@/types/query";

export function buildProductQueryParams(
    filters: QueryFilters = {},
    pagination?: Pagination,
    opts?: { enrichMissingPrice?: boolean }
): URLSearchParams {
    const params = new URLSearchParams();

    const search = filters.search?.trim();
    const category = filters.category?.trim();

    if (search) params.set("search", search);
    if (category) params.set("category", category);

    if (pagination) {
        const page = Math.max(1, Math.floor(Number(pagination.page || 1)));
        const limit = Math.max(1, Math.floor(Number(pagination.limit || 12)));

        params.set("page", String(page));
        params.set("limit", String(limit));
    }

    if (opts?.enrichMissingPrice) params.set("enrich", "1");

    return params;
}

export function buildProductQueryString(
    filters?: QueryFilters,
    pagination?: Pagination,
    opts?: { enrichMissingPrice?: boolean }
): string {
    const qs = buildProductQueryParams(filters, pagination, opts).toString();
    return qs ? `?${qs}` : "";
}