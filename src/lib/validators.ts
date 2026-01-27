import { z } from "zod";
import {
    ScalevSimplifiedProductSchema,
    ScalevSimplifiedListResponseSchema,
    ScalevSimplifiedSingleResponseSchema
} from "@/types/scalev";

export const ScalevResponseUnion = z.union([
    ScalevSimplifiedListResponseSchema,
    ScalevSimplifiedSingleResponseSchema,
]);

export function extractProductsFromResponse(json: unknown): z.infer<typeof ScalevSimplifiedProductSchema>[] {
    const listResult = ScalevSimplifiedListResponseSchema.safeParse(json);
    if (listResult.success) {
        return listResult.data.data.results;
    }

    const singleResult = ScalevSimplifiedSingleResponseSchema.safeParse(json);
    if (singleResult.success) {
        return [singleResult.data.data];
    }

    console.error("Scalev API validation failed:", json);
    return [];
}