import { NextResponse } from "next/server";
import { getProducts } from "@/lib/productService";

export async function GET() {
    try {
        // Ambil produk (page 1 saja cukup untuk sampling kategori)
        const { products } = await getProducts({ page: 1 });

        // Karena di productService sudah di-map, product.labels adalah string[]
        // Kita kumpulkan semua, buang duplikat dengan Set
        const allLabels = products.flatMap((p) => p.labels || []);
        const uniqueLabels = Array.from(new Set(allLabels))
            .filter(Boolean)
            .sort();

        return NextResponse.json({
            success: true,
            categories: uniqueLabels // Hasil: ["Assets", "Templates", "E-Book"]
        });
    } catch (error) {
        return NextResponse.json(error || { success: false, categories: [] }, { status: 500 });
    }
}