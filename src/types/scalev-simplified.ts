/**
 * Scalev Simplified API Types
 *
 * This module defines TypeScript interfaces for the Scalev Simplified API
 * which provides a cleaner, more straightforward data structure.
 *
 * Documentation: https://api.scalev.id/v2/products/simplified
 */

import { z } from "zod";

/**
 * Simplified Product schema from Scalev API
 */
export const ScalevSimplifiedProductSchema = z.object({
    /**
     * Unique identifier for the product
     */
    id: z.number(),

    /**
     * Product name/title
     */
    name: z.string(),

    /**
     * URL-friendly slug for the product
     */
    slug: z.string().optional(),

    /**
     * Product description
     */
    description: z.string().optional(),

    /**
     * Array of image URLs for the product
     */
    images: z.array(z.string()).optional(),

    /**
     * Product price in Indonesian Rupiah (number format)
     * This is the main price field in the simplified API
     */
    price: z.number().optional(),

    /**
     * Whether the product is free (price === 0)
     */
    is_free: z.boolean().optional(),

    /**
     * Categories/tags associated with the product
     */
    categories: z.array(z.string()).optional(),

    /**
     * URL to checkout or download the product
     */
    checkout_url: z.string().optional(),

    /**
     * Additional metadata about the product
     */
    metadata: z.record(z.string(), z.unknown()).optional(),

    /**
     * When the product was created (ISO timestamp)
     */
    created_at: z.string().optional(),

    /**
     * When the product was last updated (ISO timestamp)
     */
    updated_at: z.string().optional(),
});

/**
 * Simplified API response schema
 */
export const ScalevSimplifiedListResponseSchema = z.object({
    /**
     * HTTP status code
     */
    code: z.number().optional(),

    /**
     * Response status
     */
    status: z.string().optional(),

    /**
     * Response data containing products and pagination
     */
    data: z.object({
        /**
         * Array of simplified products
         */
        results: z.array(ScalevSimplifiedProductSchema).optional().default([]),

        /**
         * Last ID seen (for cursor-based pagination)
         */
        last_id: z.number().nullable().optional(),

        /**
         * Whether there are more items available
         */
        has_next: z.boolean().optional(),
    }),
});

/**
 * Single product response schema
 */
export const ScalevSimplifiedSingleResponseSchema = z.object({
    /**
     * HTTP status code
     */
    code: z.number().optional(),

    /**
     * Response status
     */
    status: z.string().optional(),

    /**
     * Response data containing a single product
     */
    data: ScalevSimplifiedProductSchema,
});

/**
 * TypeScript types derived from Zod schemas
 */
export type ScalevSimplifiedProduct = z.infer<typeof ScalevSimplifiedProductSchema>;
export type ScalevSimplifiedListResponse = z.infer<typeof ScalevSimplifiedListResponseSchema>;
export type ScalevSimplifiedSingleResponse = z.infer<typeof ScalevSimplifiedSingleResponseSchema>;