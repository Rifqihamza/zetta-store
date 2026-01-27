/**
 * Simplified Product Mapper - Converts Scalev Simplified API product data to Zetta Store format
 *
 * This module handles the transformation of raw product data from the Scalev Simplified API
 * into the standardized Product format used throughout the Zetta Store application.
 *
 * The Simplified API provides a cleaner data structure that's easier to work with.
 */

import { ScalevSimplifiedProduct } from "@/types/scalev-simplified";
import { Product } from "@/types/product";

/**
 * Maps a Scalev Simplified product to the Zetta Store product format
 *
 * @param p - The Scalev Simplified product to map
 * @returns The mapped Product in Zetta Store format
 */
export function mapSimplifiedProductToProduct(p: ScalevSimplifiedProduct): Product {
    // Extract price - use the direct price field from simplified API
    const price = p.price ?? 0;

    // Extract images - use the direct images array from simplified API
    const images = Array.isArray(p.images) ? [...p.images] : [];

    // Extract categories - use the direct categories array from simplified API
    const categories = Array.isArray(p.categories) ? [...p.categories] : [];

    // Determine the best description available
    let description = "No description available";
    if (typeof p.description === "string" && p.description.trim()) {
        description = p.description.trim();
    }

    // Return the mapped product
    return {
        id: String(p.id),
        title: p.name,
        slug: p.slug ?? undefined,
        desc: description,
        images,
        price,
        isFree: p.is_free ?? price === 0,
        categories,
        checkoutUrl: p.checkout_url,
    };
}

/**
 * Simple mapper for cases where we need to handle potential undefined/null values
 *
 * @param p - The Scalev Simplified product to map (may be undefined)
 * @returns The mapped Product or null if input is invalid
 */
export function safeMapSimplifiedProduct(p?: ScalevSimplifiedProduct | null): Product | null {
    if (!p) {
        return null;
    }

    try {
        return mapSimplifiedProductToProduct(p);
    } catch (error) {
        console.error("Failed to map simplified product:", error);
        return null;
    }
}