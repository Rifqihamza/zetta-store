import { z } from "zod";

// 1. Schema untuk Variant (karena harga ada di sini)
export const ScalevVariantSchema = z.object({
    id: z.number(),
    price: z.preprocess((val) => {
        const parsed = Number(val);
        return isNaN(parsed) ? 0 : parsed;
    }, z.number().default(0)),
    self_file_urls: z.array(z.string()).default([]), // Link download produk digital
});

// 2. Schema Utama Produk
export const ScalevSimplifiedProductSchema = z.object({
    id: z.number(),
    name: z.string().default("Untitled Product"),
    slug: z.string().nullish().transform(val => val ?? ""),
    // Tambahkan rich_description di sini karena API Single Product mengirimkannya
    rich_description: z.string().nullish().transform(val => val ?? ""),
    images: z.array(z.string()).default([]),
    variants: z.array(z.object({
        id: z.number(),
        price: z.preprocess((val) => Number(val), z.number().default(0)),
        rich_description: z.string().nullish().transform(val => val ?? ""),
        images: z.array(z.string()).default([]),
    })).default([]),
});

export const ScalevSimplifiedListResponseSchema = z.object({
    data: z.object({
        results: z.array(ScalevSimplifiedProductSchema).default([]),
        last_id: z.number().nullable().optional(),
        has_next: z.boolean().default(false),
    }),
});

// TAMBAHKAN INI: Schema untuk single product response
export const ScalevSimplifiedSingleResponseSchema = z.object({
    data: ScalevSimplifiedProductSchema,
});

export type ScalevSimplifiedProduct = z.infer<typeof ScalevSimplifiedProductSchema>;