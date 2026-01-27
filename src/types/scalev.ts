import { z } from "zod";

export const ScalevVariantSchema = z.object({
    id: z.number(),
    price: z.preprocess((val) => {
        const parsed = Number(val);
        return isNaN(parsed) ? 0 : parsed;
    }, z.number().default(0)),
    rich_description: z.string().nullish().transform(val => val ?? ""),
    images: z.array(z.string()).default([]),
    self_file_urls: z.array(z.string()).default([]),
});

export const ScalevSimplifiedProductSchema = z.object({
    id: z.number(),
    name: z.string().default("Untitled Product"),
    slug: z.string().nullish().transform(val => val ?? ""),
    rich_description: z.string().nullish().transform(val => val ?? ""),
    images: z.array(z.string()).default([]),
    labels: z.array(z.any()).default([]),
    variants: z.array(ScalevVariantSchema).default([]),
});

export const ScalevSimplifiedListResponseSchema = z.object({
    data: z.object({
        results: z.array(ScalevSimplifiedProductSchema).default([]),
        last_id: z.number().nullable().optional(),
        has_next: z.boolean().default(false),
    }),
});

export const ScalevSimplifiedSingleResponseSchema = z.object({
    data: ScalevSimplifiedProductSchema,
});

export type ScalevSimplifiedProduct = z.infer<typeof ScalevSimplifiedProductSchema>;