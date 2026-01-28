import { rupiahFormat } from "./currencyFormat";
import { Product } from "@/types/product"; // Pastikan import Category
import { ScalevSimplifiedProduct } from "@/types/scalev";

export function mapScalevToProduct(p: ScalevSimplifiedProduct): Product {
    const primaryVariant = p.variants[0] || null;
    const combinedImages = Array.from(
        new Set([...p.images, ...(primaryVariant?.images ?? [])])
    );
    const finalImages = combinedImages.length > 0 ? combinedImages : ["/placeholder.png"];
    const price = primaryVariant?.price ?? 0;

    return {
        id: String(p.id),
        variantId: primaryVariant ? String(primaryVariant.id) : String(p.id),
        title: p.name,
        slug: p.slug || String(p.id),
        description: p.description || "",
        rich_description: p.rich_description || primaryVariant?.rich_description || "",
        imageUrl: finalImages[0],
        allImages: finalImages,
        price: price,
        displayPrice: rupiahFormat(price),
        item_types: p.item_type,

        labels: Array.isArray(p.labels) ? p.labels : [],
    };
}