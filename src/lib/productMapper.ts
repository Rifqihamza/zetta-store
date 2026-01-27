import { rupiahFormat } from "./currencyFormat";
import { Product, Category } from "@/types/product"; // Pastikan import Category
import { ScalevSimplifiedProduct } from "@/types/scalev";

export function mapScalevToProduct(p: ScalevSimplifiedProduct): Product {
    const primaryVariant = p.variants[0] || null;
    const combinedImages = Array.from(
        new Set([...p.images, ...(primaryVariant?.images ?? [])])
    );
    const finalImages = combinedImages.length > 0 ? combinedImages : ["/placeholder.png"];
    const price = primaryVariant?.price ?? 0;
    const rawCategories: Category[] = p.labels.map((l, index) => {
        if (typeof l === 'object' && l !== null) {
            return {
                id: String(l.id || index), // Fallback ke index jika ID tidak ada
                name: l.name || "Uncategorized"
            };
        }
        return {
            id: String(index),
            name: String(l)
        };
    });

    const categories = rawCategories.length > 0
        ? rawCategories.map(c => c.name)
        : ["Digital Asset"];

    return {
        id: String(p.id),
        variantId: primaryVariant ? String(primaryVariant.id) : String(p.id),
        title: p.name,
        slug: p.slug || String(p.id),
        description: p.rich_description || primaryVariant?.rich_description || "",
        rich_description: p.rich_description || primaryVariant?.rich_description || "",
        imageUrl: finalImages[0],
        allImages: finalImages,
        price: price,
        displayPrice: rupiahFormat(price),
        categories: categories,
        rawCategories: rawCategories,
    };
}