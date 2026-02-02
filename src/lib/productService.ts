import { ScalevSimplifiedListResponseSchema, ScalevSimplifiedSingleResponseSchema } from "@/types/scalev";
import { mapScalevToProduct } from "./productMapper";
import { Product, ProductResponse } from "@/types/product";
import { ApiError } from "./errors";

const API_KEY = process.env.SCALEV_API_KEY;
const BASE_URL = process.env.SCALEV_API_BASE_URL?.replace(/\/$/, "");

async function scalevFetch(endpoint: string) {
    if (!API_KEY || !BASE_URL) {
        throw new ApiError("API Configuration missing", 500);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json",
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(errorData.message || "Scalev fetch failed", response.status);
    }

    return response.json();
}

// Tambahkan 'limit' ke dalam tipe parameter
export async function getProducts(params: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number; // Tambahkan ini agar tidak error
} = {}): Promise<ProductResponse> {

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;

    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);

    // Kita ambil semua data dulu karena Scalev Simplified mengembalikan semua list
    const json = await scalevFetch(`/products/simplified?${query.toString()}`);
    const validated = ScalevSimplifiedListResponseSchema.parse(json);

    let products = validated.data.results.map(mapScalevToProduct);

    // 1. Filter Kategori (Lakukan sebelum hitung pagination)
    if (params.category && params.category !== "All Categories") {
        const targetLabel = params.category.toLowerCase();
        products = products.filter((p) =>
            p.labels.some(label => label.toLowerCase() === targetLabel)
        );
    }

    // 2. LOGIKA PAGINATION MANUAL
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / limit);

    // Tentukan indeks awal dan akhir untuk dipotong
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Potong array produk sesuai halaman aktif
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
        products: paginatedProducts, // Kirim produk yang sudah dipotong
        pagination: {
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages, // Sekarang sudah ada nilainya
            hasNext: page < totalPages, // Cek apakah masih ada halaman depan
            lastId: validated.data.last_id
        }
    };
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const json = await scalevFetch(`/products/${id}`);
        const validated = ScalevSimplifiedSingleResponseSchema.parse(json);
        return mapScalevToProduct(validated.data);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            const { products } = await getProducts();
            return products.find(p => p.id === id || p.slug === id) || null;
        }
        return null;
    }
}