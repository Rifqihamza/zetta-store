import { Pagination } from "@/types/query"; // Gunakan interface yang baru kamu buat

export function createPaginationResult(
    total: number,
    page: number,
    limit: number,
    hasNext: boolean = false,
    lastId: number | null = null
): Pagination {
    const safeTotal = Math.max(0, total);
    const safeLimit = Math.max(1, limit);

    return {
        page: Math.max(1, page),
        limit: safeLimit,
        totalItems: safeTotal,
        totalPages: Math.ceil(safeTotal / safeLimit),
        hasNext: hasNext, // Diambil langsung dari data Scalev
        lastId: lastId    // Sangat penting untuk fetch "Load More" berikutnya
    };
}