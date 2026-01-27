import { PaginationOptions, PaginationResult } from "@/types/query";

/**
 * Validasi input pagination agar selalu aman.
 * - page minimal 1
 * - limit minimal 1 dan maksimal 100
 */
export function validatePagination(
    page?: number,
    limit?: number
): PaginationOptions {
    const validPage = Number.isFinite(page) ? Math.max(1, Math.floor(page!)) : 1;
    const validLimit = Number.isFinite(limit)
        ? Math.min(100, Math.max(1, Math.floor(limit!)))
        : 12;

    return {
        page: validPage,
        limit: validLimit,
    };
}

/**
 * Buat hasil pagination lengkap dengan total halaman.
 */
export function createPaginationResult(
    total: number,
    page: number,
    limit: number
): PaginationResult {
    const safeLimit = limit > 0 ? limit : 1; // hindari pembagian dengan 0
    return {
        page,
        limit: safeLimit,
        totalItems: Math.ceil(total),
        totalPages: Math.ceil(total / safeLimit),
    };
}