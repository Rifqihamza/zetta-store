/**
 * Simplified Product Service - Handles communication with the Scalev Simplified API
 *
 * This module provides functions to fetch product data from the Scalev Simplified API,
 * which offers a cleaner and more straightforward data structure.
 *
 * Documentation: https://api.scalev.id/v2/products/simplified
 */

import { ApiError } from "@/lib/errors";
import {
    ScalevSimplifiedListResponseSchema,
    ScalevSimplifiedSingleResponseSchema,
} from "@/types/scalev-simplified";
import { mapSimplifiedProductToProduct } from "@/lib/productMapperSimplified";
import { Product } from "@/types/product";

/**
 * Configuration interface for the Scalev Simplified API
 */
interface ScalevSimplifiedApiConfig {
    baseUrl: string;
    apiKey: string;
}

/**
 * Gets the Scalev Simplified API configuration from environment variables
 * @returns Scalev Simplified API configuration
 * @throws ApiError if environment variables are not configured
 */
function getScalevSimplifiedConfig(): ScalevSimplifiedApiConfig {
    const base = process.env.SCALEV_API_BASE_URL;
    const key = process.env.SCALEV_API_KEY;

    if (!base || !key) {
        throw new ApiError("Scalev Simplified API environment variables not configured", 500);
    }

    return {
        baseUrl: base,
        apiKey: key,
    };
}

/**
 * Safe fetch that returns parsed JSON or throws ApiError
 * @param url - The URL to fetch
 * @param init - Optional fetch init options
 * @returns Parsed JSON response
 * @throws ApiError if the request fails or response is not OK
 */
async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
    const response = await fetch(url, {
        ...init,
        headers: {
            Accept: "application/json",
            ...(init?.headers ?? {}),
        },
        cache: "no-store", // Always fetch fresh data
    });

    const text = await response.text();

    // Try to parse JSON, fall back to empty object if parsing fails
    let json: unknown;
    try {
        json = text ? JSON.parse(text) : {};
    } catch {
        json = null;
    }

    // Log the raw response for debugging
    console.debug("Scalev Simplified API raw response", { url, body: json ?? text });

    // Handle non-OK responses
    if (!response.ok) {
        const body = json ?? text;
        let message: string | undefined;

        // Try to extract error message from JSON response
        if (json && typeof json === "object") {
            const responseObject = json as Record<string, unknown>;
            const errorMessage = responseObject["message"] ?? responseObject["error"] ?? responseObject["detail"];
            if (typeof errorMessage === "string") {
                message = errorMessage;
            }
        }

        // Create final error message
        const finalMessage = message ?? String(body) ?? `HTTP ${response.status}`;
        throw new ApiError(`Failed to fetch ${url}: ${finalMessage}`, response.status, body);
    }

    return json;
}

/**
 * Parameters for fetching products from Simplified API
 */
interface GetProductsParams {
    /** Page number (starting from 1) */
    page?: number;

    /** Number of items per page */
    limit?: number;

    /** Search query string */
    search?: string;

    /** Category filter */
    category?: string;
}

/**
 * Pagination information
 */
interface PaginationInfo {
    /** Whether there are more items available */
    hasNext: boolean;

    /** The last ID seen (for cursor-based pagination) */
    lastId?: number | null;
}

/**
 * Response format for getProducts function
 */
interface ProductsResponse {
    /** Array of products */
    products: Product[];

    /** Pagination information */
    pagination: PaginationInfo;
}

/**
 * Get products list from Scalev Simplified API and map to Zetta Store Product format
 *
 * @param params - Optional parameters for filtering and pagination
 * @returns Promise resolving to products and pagination info
 * @throws ApiError if the request fails or data cannot be parsed
 */
export async function getProductsSimplified(params?: GetProductsParams): Promise<ProductsResponse> {
    // Get API configuration
    const { baseUrl, apiKey } = getScalevSimplifiedConfig();

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", String(params.page));
    if (params?.limit) queryParams.set("limit", String(params.limit));
    if (params?.search && params.search.trim() !== "") {
        queryParams.set("search", params.search.trim());
    }
    if (params?.category && params.category.trim() !== "") {
        queryParams.set("category", params.category.trim());
    }

    // Build the final URL - use the simplified endpoint
    const queryString = queryParams.toString();
    const url = `${baseUrl.replace(/\/$/, "")}/products/simplified${queryString ? `?${queryString}` : ""}`;

    // Fetch data from API
    const json = await fetchJson(url, {
        headers: { Authorization: `Bearer ${apiKey}` }
    });

    // Try to parse the response using the simplified list schema
    const parsed = ScalevSimplifiedListResponseSchema.safeParse(json);

    if (!parsed.success) {
        throw new ApiError(
            "Scalev Simplified API response validation failed: " + parsed.error.message,
            undefined,
            json
        );
    }

    // Convert raw products to Zetta Store format
    const products: Product[] = parsed.data.data.results.map((rawProduct) => {
        try {
            return mapSimplifiedProductToProduct(rawProduct);
        } catch (error) {
            console.warn(`Failed to map simplified product`, rawProduct, error);
            // Return a minimal product object to avoid breaking the entire list
            return {
                id: String(rawProduct.id),
                title: rawProduct.name,
                slug: rawProduct.slug,
                desc: "No description available",
                images: [],
                price: 0,
                isFree: true,
                categories: [],
                checkoutUrl: undefined,
            };
        }
    });

    // Extract pagination information
    const pagination: PaginationInfo = {
        hasNext: parsed.data.data.has_next ?? false,
        lastId: parsed.data.data.last_id ?? null,
    };

    return {
        products,
        pagination,
    };
}

/**
 * Get a single product by its ID from Scalev Simplified API
 * @param id - The product ID
 * @returns Promise resolving to the product, or null if not found
 * @throws ApiError if the product ID is invalid or API request fails
 */
export async function getProductByIdSimplified(id: string): Promise<Product | null> {
    // Validate product ID
    if (!id || typeof id !== "string") {
        throw new ApiError("Product id is required", 400);
    }

    // Get API configuration
    const { baseUrl, apiKey } = getScalevSimplifiedConfig();

    try {
        // First, try the simplified single product endpoint
        const simplifiedUrl = `${baseUrl.replace(/\/$/, "")}/products/simplified/${encodeURIComponent(id)}`;

        try {
            const json = await fetchJson(simplifiedUrl, {
                headers: { Authorization: `Bearer ${apiKey}` }
            });

            // Try to parse the response using the simplified single schema
            const parsed = ScalevSimplifiedSingleResponseSchema.safeParse(json);

            if (parsed.success) {
                // Map the simplified product to Zetta Store format
                return mapSimplifiedProductToProduct(parsed.data.data);
            }
        } catch (simplifiedError) {
            // If the simplified endpoint fails with 404, it might not exist
            // This is expected behavior for the simplified API
            if (simplifiedError instanceof ApiError && simplifiedError.status === 404) {
                console.warn(`Simplified single product endpoint not found for ID ${id}, trying list endpoint`);
            } else {
                // For other errors, rethrow them
                throw simplifiedError;
            }
        }

        // If simplified single endpoint doesn't exist, fetch from the list endpoint
        // and find the product with matching ID
        console.log(`Fetching product ${id} from list endpoint as fallback`);

        const listUrl = `${baseUrl.replace(/\/$/, "")}/products/simplified?limit=100`;
        const listJson = await fetchJson(listUrl, {
            headers: { Authorization: `Bearer ${apiKey}` }
        });

        const listParsed = ScalevSimplifiedListResponseSchema.safeParse(listJson);

        if (!listParsed.success) {
            throw new ApiError(
                "Scalev Simplified API list response validation failed: " + listParsed.error.message,
                undefined,
                listJson
            );
        }

        // Find the product with matching ID
        const matchingProduct = listParsed.data.data.results.find(
            (product) => String(product.id) === id
        );

        if (!matchingProduct) {
            console.warn(`Product with ID ${id} not found in list`);
            return null;
        }

        // Map the found product to Zetta Store format
        return mapSimplifiedProductToProduct(matchingProduct);

    } catch (err: unknown) {
        // Handle other types of errors
        if (err instanceof ApiError) {
            throw err;
        }

        // Convert unknown errors to ApiError
        const errorMessage = err instanceof Error ? err.message : "Unknown error fetching product";
        throw new ApiError(`Failed to fetch product ${id}: ${errorMessage}`, undefined, err);
    }
}
