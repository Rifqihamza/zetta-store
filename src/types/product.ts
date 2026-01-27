import { Pagination } from "./query";

/**
 * Represents a product in the Zetta Store
 */
export interface Product {
    /** Unique identifier for the product */
    readonly id: string;

    /** Product title/name */
    readonly title: string;

    /** URL-friendly slug for the product (optional) */
    readonly slug?: string;

    /** Product description */
    readonly desc: string;

    /** Array of image URLs for the product */
    readonly images: readonly string[];

    /** Product price in the smallest currency unit (e.g., cents) */
    readonly price: number;

    /** Whether the product is free (price === 0) */
    readonly isFree: boolean;

    /** Categories/tags associated with the product */
    readonly categories: readonly string[];

    /** URL to checkout or download the product (optional) */
    readonly checkoutUrl?: string;
}

/**
 * Response format for product API calls
 */
export interface ProductResponse {
    /** Array of products */
    products: Product[];

    /** Pagination information, or null if not available */
    pagination: Pagination | null;
}
