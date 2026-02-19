import { NextResponse } from "next/server";
import { getProducts } from "@/lib/productService";

export async function GET() {
    try {
        const { products } = await getProducts({ page: 1 });

        const allLabels = products.flatMap((p) => p.labels || []);
        const uniqueLabels = Array.from(new Set(allLabels))
            .filter(Boolean)
            .sort();

        return NextResponse.json({
            success: true,
            categories: uniqueLabels
        });
    } catch (error) {
        return NextResponse.json(error || { success: false, categories: [] }, { status: 500 });
    }
}