// types/scalev.ts
import { z } from "zod";

/** Variant schema */
export const ScalevVariantSchema = z.object({
    id: z.number(),
    business_id: z.number().optional(),
    product_id: z.number().optional(),
    description: z.string().nullable().optional(),
    rich_description: z.string().nullable().optional(),
    unique_id: z.string().optional(),
    uuid: z.string().optional(),
    name: z.string(),
    product_name: z.string().optional(),
    item_type: z.string().optional(),
    fullname: z.string().optional(),
    is_checked: z.boolean().optional(),
    is_editable: z.boolean().optional(),
    sku: z.string().nullable().optional(),
    option1_value: z.string().nullable().optional(),
    option2_value: z.string().nullable().optional(),
    option3_value: z.string().nullable().optional(),
    images: z.array(z.string()).optional(),
    image_configs: z
        .record(
            z.string(),
            z.object({ height: z.string(), width: z.string() })
        )
        .optional(),
    price: z.string().optional(),
    price_bt: z.string().optional(),
    weight: z.number().optional(),
    reseller_price: z.string().nullable().optional(),
    digital_product_files: z.array(z.unknown()).optional(),
    self_file_urls: z.array(z.string()).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    created_at: z.string().optional(),
    last_updated_at: z.string().optional(),
    form_displays: z.array(z.unknown()).optional(),
    upsell_form_displays: z.array(z.unknown()).optional(),
    cogs: z.unknown().optional(),
    cogs_bt: z.unknown().optional(),
});

const LabelObjectSchema = z
    .object({
        id: z.number().optional(),
        name: z.string().optional(),
    })
    .passthrough();

/** Product schema */
export const ScalevProductSchema = z.object({
    id: z.number(),
    uuid: z.string().optional(),
    secret: z.string().optional(),
    slug: z.string().optional(),
    name: z.string(),
    public_name: z.string().optional(),
    labels: z.array(z.union([z.string(), LabelObjectSchema])).optional(),
    business: z
        .object({
            id: z.number(),
            unique_id: z.string().optional(),
            account_holder: z.string().optional(),
            email: z.string().optional(),
            logo: z.string().nullable().optional(),
            username: z.string().optional(),
            is_banned: z.boolean().optional(),
            is_manual_reseller_transfer_allowed: z.boolean().optional(),
        })
        .optional(),
    images: z.array(z.string()).optional(),
    item_type: z.string().optional(),
    item_type_name: z.string().optional(),
    description: z.string().nullable().optional(),
    rich_description: z.string().nullable().optional(),
    meta_thumbnail: z.string().nullable().optional(),
    taxonomy: z.unknown().optional(),
    option1_name: z.string().nullable().optional(),
    option2_name: z.string().nullable().optional(),
    option3_name: z.string().nullable().optional(),
    config: z.record(z.string(), z.unknown()).optional(),
    created_by: z
        .object({
            id: z.number(),
            email: z.string().optional(),
            fullname: z.string().optional(),
            avatar: z.string().nullable().optional(),
        })
        .optional(),
    created_at: z.string().optional(),
    last_updated_by: z
        .object({
            id: z.number(),
            email: z.string().optional(),
            fullname: z.string().optional(),
            avatar: z.string().nullable().optional(),
        })
        .optional(),
    last_updated_at: z.string().optional(),
    display: z.string().optional(),
    is_partner_product: z.boolean().optional(),
    variants: z.array(ScalevVariantSchema).optional().default([]),
    variants_count: z.number().optional(),
    stores: z.array(z.unknown()).optional(),
    warehouses: z.array(z.unknown()).optional(),
    is_listed_at_marketplace: z.boolean().optional(),
    product_partners: z.unknown().nullable().optional(),
});

export const ScalevListResponseSchema = z.object({
    code: z.number().optional(),
    status: z.string().optional(),
    data: z.object({
        last_id: z.number().nullable().optional(),
        has_next: z.boolean().optional(),
        results: z.array(ScalevProductSchema).optional().default([]),
    }),
});

export const ScalevSingleResponseSchema = z.object({
    code: z.number().optional(),
    status: z.string().optional(),
    data: ScalevProductSchema,
});

export type ScalevVariant = z.infer<typeof ScalevVariantSchema>;
export type ScalevProduct = z.infer<typeof ScalevProductSchema>;