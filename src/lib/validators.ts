// lib/validators.ts
import { z } from "zod";
import { ScalevProductSchema } from "@/types/scalev";

/**
 * List response schema
 * - results: optional, default []
 * - last_id: nullable optional
 */
export const ScalevListResponseSchema = z.object({
    code: z.number(),
    status: z.string(),
    data: z.object({
        last_id: z.number().nullable().optional(),
        has_next: z.boolean().optional(),
        results: z.array(ScalevProductSchema).optional().default([]),
    }),
});

/**
 * Single response schema (common shape: { code, status, data: product })
 */
export const ScalevSingleResponseSchema = z.object({
    code: z.number(),
    status: z.string(),
    data: ScalevProductSchema,
});

/**
 * Some endpoints sometimes return a single product wrapped in data.results array.
 * This union accepts either the single-product shape or the list shape with results.
 */
export const ScalevSingleOrListUnion = z.union([
    ScalevSingleResponseSchema,
    ScalevListResponseSchema,
]);

/**
 * Helper: try to extract an array of ScalevProduct from a parsed response.
 * - If input matches list schema -> return results array
 * - If input matches single schema -> return [product]
 * - Else -> return null
 */
export function extractProductsFromResponse(json: unknown): z.infer<typeof ScalevProductSchema>[] | null {
    const list = ScalevListResponseSchema.safeParse(json);
    if (list.success) {
        return list.data.data.results ?? [];
    }
    const single = ScalevSingleResponseSchema.safeParse(json);
    if (single.success) {
        return [single.data.data];
    }
    // Try union as last resort (covers both)
    const union = ScalevSingleOrListUnion.safeParse(json);
    if (union.success) {

        const dataAsList = union.data as unknown as z.infer<typeof ScalevListResponseSchema>["data"];
        const results = dataAsList.results ?? [];

        return results;
    }
    return null;
}