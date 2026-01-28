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

export async function getProducts(params: { search?: string; item_type?: string; page?: number } = {}): Promise<ProductResponse> {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.page) query.append("page", String(params.page));

    const json = await scalevFetch(`/products/simplified?${query.toString()}`);
    const validated = ScalevSimplifiedListResponseSchema.parse(json);

    let products = validated.data.results.map(mapScalevToProduct);

    if (params.item_type) {
        products = products.filter(p =>
            p.item_types.includes(params.item_type!)
        );
    }

    return {
        products,
        pagination: {
            page: params.page ?? 1,
            limit: 20,
            totalItems: 0,
            totalPages: 0,
            hasNext: validated.data.has_next,
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