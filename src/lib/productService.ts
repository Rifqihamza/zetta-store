/**
 * Product Service - Handles communication with the Scalev API
 *
 * This module provides functions to fetch product data from the Scalev API,
 * validate the responses, and convert them to the Zetta Store product format.
 */

import { ApiError } from "@/lib/errors";
import {
    ScalevListResponseSchema,
    ScalevSingleResponseSchema,
} from "@/lib/validators";
import { mapScalevToProduct } from "@/lib/productMapper";
import { Product } from "@/types/product";
import { ScalevProductSchema } from "@/types/scalev";

/**
 * Configuration interface for the Scalev API
 */
interface ScalevApiConfig {
    baseUrl: string;
    apiKey: string;
}

/**
 * Gets the Scalev API configuration from environment variables
 * @returns Scalev API configuration
 * @throws ApiError if environment variables are not configured
 */
function getScalevConfig(): ScalevApiConfig {
    const base = process.env.SCALEV_API_BASE_URL;
    const key = process.env.SCALEV_API_KEY;

    if (!base || !key) {
        throw new ApiError("Scalev environment variables not configured", 500);
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
    console.debug("Scalev raw response", { url, body: json ?? text });

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
 * Parameters for fetching products
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

    /** Whether to enrich products with missing prices */
    enrichMissingPrice?: boolean;
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
 * Get products list from Scalev and map to Zetta Store Product format
 *
 * @param params - Optional parameters for filtering and pagination
 * @returns Promise resolving to products and pagination info
 * @throws ApiError if the request fails or data cannot be parsed
 */
export async function getProducts(params?: GetProductsParams): Promise<ProductsResponse> {
    // Get API configuration
    const { baseUrl, apiKey } = getScalevConfig();

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
    if (params?.enrichMissingPrice) {
        queryParams.set("enrich", "1");
    }

    // Build the final URL
    const queryString = queryParams.toString();
    const url = `${baseUrl.replace(/\/$/, "")}/products${queryString ? `?${queryString}` : ""}`;

    // Fetch data from API
    const json = await fetchJson(url, {
        headers: { Authorization: `Bearer ${apiKey}` }
    });

    // Try to parse the response using the list schema
    const parsed = ScalevListResponseSchema.safeParse(json);
    let rawProducts: unknown[] = [];

    if (parsed.success) {
        // Successfully parsed using schema
        rawProducts = parsed.data.data.results ?? [];
    } else {
        // Fallback: try to extract results manually from raw JSON
        const maybeResults = getResultsFromRawJson(json);
        if (!Array.isArray(maybeResults)) {
            throw new ApiError(
                "Scalev list response validation failed: " + parsed.error.message,
                undefined,
                json
            );
        }
        rawProducts = maybeResults;
    }

    // Convert raw products to Zetta Store format
    const products: Product[] = [];
    for (const [index, rawProduct] of rawProducts.entries()) {
        const productParseResult = ScalevProductSchema.safeParse(rawProduct);

        if (!productParseResult.success) {
            console.warn(`Skipping invalid Scalev product at index ${index}`, productParseResult.error.format());
            continue;
        }

        try {
            const mappedProduct = mapScalevToProduct(productParseResult.data);
            products.push(mappedProduct);
        } catch (error) {
            console.warn(`Failed to map product at index ${index}`, error);
        }
    }

    // Optional: enrich products with missing prices
    if (params?.enrichMissingPrice && products.length > 0) {
        await enrichProductsWithMissingPrices(products, baseUrl, apiKey);
    }

    // Extract pagination information
    const pagination = getPaginationInfo(json, parsed);

    return {
        products,
        pagination,
    };
}

/**
 * Helper function to extract results array from raw JSON when schema parsing fails
 * @param json - The raw JSON response
 * @returns Array of products, or empty array if not found
 */
function getResultsFromRawJson(json: unknown): unknown[] {
    if (!json || typeof json !== "object") {
        return [];
    }

    const jsonObject = json as Record<string, unknown>;
    const data = jsonObject["data"];

    if (!data || typeof data !== "object") {
        return [];
    }

    const results = (data as Record<string, unknown>)["results"];
    return Array.isArray(results) ? results : [];
}

/**
 * Enrich products that have missing prices (price === 0)
 * @param products - Array of products to enrich
 * @param baseUrl - Scalev API base URL
 * @param apiKey - Scalev API key
 */
async function enrichProductsWithMissingPrices(
    products: Product[],
    baseUrl: string,
    apiKey: string
): Promise<void> {
    // Find products with missing prices
    const productsWithMissingPrices = products.filter((product) => product.price === 0);

    if (productsWithMissingPrices.length === 0) {
        return;
    }

    // Process in batches to avoid overwhelming the API
    const batchSize = 4;
    const totalBatches = Math.ceil(productsWithMissingPrices.length / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const start = batchIndex * batchSize;
        const end = start + batchSize;
        const batch = productsWithMissingPrices.slice(start, end);

        await Promise.all(
            batch.map(async (product) => {
                try {
                    const productId = product.id;
                    const singleProductUrl = `${baseUrl.replace(/\/$/, "")}/products/${encodeURIComponent(productId)}`;
                    const singleProductJson = await fetchJson(singleProductUrl, {
                        headers: { Authorization: `Bearer ${apiKey}` }
                    });

                    // Try different parsing strategies
                    const enrichedProduct = await tryParseSingleProductResponse(singleProductJson, productId);

                    if (enrichedProduct) {
                        // Update the product in the original array
                        const productIndex = products.findIndex((p) => p.id === productId);
                        if (productIndex >= 0) {
                            products[productIndex] = enrichedProduct;
                        }
                    }
                } catch (error) {
                    console.warn(`Failed to enrich product`, product.id, error);
                }
            })
        );
    }
}

/**
 * Try different strategies to parse a single product response
 * @param json - The JSON response from the single product endpoint
 * @param productId - The product ID being fetched
 * @returns Parsed product, or null if parsing fails
 */
async function tryParseSingleProductResponse(
    json: unknown,
    productId: string
): Promise<Product | null> {
    // Strategy 1: Try single response schema
    const singleParseResult = ScalevSingleResponseSchema.safeParse(json);
    if (singleParseResult.success) {
        return mapScalevToProduct(singleParseResult.data.data);
    }

    // Strategy 2: Try list response schema (some endpoints return list format)
    const listParseResult = ScalevListResponseSchema.safeParse(json);
    if (listParseResult.success && Array.isArray(listParseResult.data.data.results)) {
        const firstResult = listParseResult.data.data.results[0];
        if (firstResult) {
            return mapScalevToProduct(firstResult);
        }
    }

    // Strategy 3: Try direct product schema
    const directParseResult = ScalevProductSchema.safeParse(json);
    if (directParseResult.success) {
        return mapScalevToProduct(directParseResult.data);
    }

    console.warn(`Could not parse single product response for id ${productId}`);
    return null;
}

/**
 * Extract pagination information from the API response
 * @param json - The raw JSON response
 * @param parsed - The parsed schema result (if successful)
 * @returns Pagination information
 */
function getPaginationInfo(
    json: unknown,
    parsed: { success: boolean; data?: { data?: { has_next?: boolean; last_id?: number | null } } }
): PaginationInfo {
    // Use parsed data if available
    if (parsed.success && parsed.data?.data) {
        return {
            hasNext: Boolean(parsed.data.data.has_next),
            lastId: parsed.data.data.last_id ?? null,
        };
    }

    // Fallback: try to extract from raw JSON
    if (json && typeof json === "object") {
        const jsonObject = json as Record<string, unknown>;
        const data = jsonObject["data"];

        if (data && typeof data === "object") {
            const dataObject = data as Record<string, unknown>;
            const maybeHasNext = dataObject["has_next"];
            const maybeLastId = dataObject["last_id"];

            return {
                hasNext: typeof maybeHasNext === "boolean" ? maybeHasNext : Boolean(maybeHasNext),
                lastId: typeof maybeLastId === "number" ? maybeLastId : null,
            };
        }
    }

    // Default fallback
    return {
        hasNext: false,
        lastId: null,
    };
}

/**
 * Get a single product by its ID
 * @param id - The product ID
 * @returns Promise resolving to the product, or null if not found
 * @throws ApiError if the product ID is invalid or API request fails
 */
export async function getProductById(id: string): Promise<Product | null> {
    // Validate product ID
    if (!id || typeof id !== "string") {
        throw new ApiError("Product id is required", 400);
    }

    // Get API configuration
    const { baseUrl, apiKey } = getScalevConfig();

    // Build the URL
    const url = `${baseUrl.replace(/\/$/, "")}/products/${encodeURIComponent(id)}`;

    // Fetch the product data
    const json = await fetchJson(url, {
        headers: { Authorization: `Bearer ${apiKey}` }
    });

    // Try different parsing strategies
    return tryParseSingleProductResponse(json, id);
}
