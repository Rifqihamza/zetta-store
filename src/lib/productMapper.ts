// src/lib/productMapper.ts
import { rupiahFormat } from "./currencyFormat";
import { Product } from "@/types/product";
import { ScalevSimplifiedProduct } from "@/types/scalev";

export function mapScalevToProduct(p: ScalevSimplifiedProduct): Product {
    const primaryVariant = p.variants && p.variants.length > 0 ? p.variants[0] : null;

    const productImages = Array.isArray(p.images) ? p.images : [];
    const variantImages = primaryVariant && Array.isArray(primaryVariant.images)
        ? primaryVariant.images
        : [];

    const combinedImages = Array.from(new Set([...productImages, ...variantImages]));

    const finalImages = combinedImages.length > 0 ? combinedImages : ["/placeholder.png"];

    return {
        id: String(p.id),
        variantId: primaryVariant ? String(primaryVariant.id) : String(p.id),
        title: p.name,
        slug: p.slug || String(p.id),
        description: p.rich_description || primaryVariant?.rich_description || "",
        rich_description: p.rich_description || primaryVariant?.rich_description || "",
        imageUrl: finalImages[0],
        allImages: finalImages,
        price: primaryVariant ? primaryVariant.price : 0,
        displayPrice: rupiahFormat(primaryVariant ? primaryVariant.price : 0),
        categories: []
    };
}