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
    limit?: number;
} = {}): Promise<ProductResponse> {

    // Kita bungkus dalam try-catch untuk menangani error API
    try {
        const page = params.page ?? 1;
        const limit = params.limit ?? 100;

        let allProducts: Product[] = [];
        let hasMore = true;
        let lastId: string | number | null = null;

        while (hasMore) {
            const query = new URLSearchParams();
            if (params.search) query.append("search", params.search);
            if (lastId !== null && lastId !== undefined) {
                query.append("last_id", String(lastId));
            }

            const json = await scalevFetch(`/products/simplified?${query.toString()}`);
            const validated = ScalevSimplifiedListResponseSchema.parse(json);

            const products = validated.data.results.map(mapScalevToProduct);
            allProducts = [...allProducts, ...products];

            hasMore = validated.data.has_next;
            lastId = (validated.data.last_id as string | number | null) ?? null;

            if (allProducts.length >= 2000) break;
        }

        let filteredProducts = allProducts;
        if (params.category && params.category !== "All Categories") {
            const targetLabel = params.category.toLowerCase();
            filteredProducts = allProducts.filter((p) =>
                p.labels.some((label) => label.toLowerCase() === targetLabel)
            );
        }

        const totalItems = filteredProducts.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        // RETURN UTAMA
        return {
            products: paginatedProducts,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNext: page < totalPages,
                lastId: lastId ? String(lastId) : null
            }
        };

    } catch (error) {
        console.error("Error in getProducts:", error);

        // HARUS ADA RETURN DI SINI JUGA (atau throw error)
        // Agar jika API gagal, aplikasi tidak crash dan tetap mengembalikan struktur data yang benar
        return {
            products: [],
            pagination: {
                page: params.page ?? 1,
                limit: params.limit ?? 20,
                totalItems: 0,
                totalPages: 0,
                hasNext: false,
                lastId: null
            }
        };
    }
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