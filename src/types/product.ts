import { Pagination } from "./query";

/**
 * Represents a product in the Zetta Store
 */
export interface Product {
    /** Unique identifier for the product */
    id: string;

    /** Product title/name */
    title: string;

    /** URL-friendly slug for the product (optional) */
    slug?: string;

    /** Product description */
    desc: string;

    /** Array of image URLs for the product */
    images: string[];

    /** Product price in the smallest currency unit (e.g., cents) */
    price: number;

    /** Whether the product is free (price === 0) */
    isFree: boolean;

    /** Categories/tags associated with the product */
    categories: string[];

    /** URL to checkout or download the product (optional) */
    checkoutUrl?: string;
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
