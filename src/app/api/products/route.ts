import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/productService";
import { ApiError, getErrorMessage } from "@/lib/errors";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const params = {
            search: searchParams.get("search") || undefined,
            category: searchParams.get("category") || undefined, // Menangkap 'category' dari hook
            page: parseInt(searchParams.get("page") || "1", 10),
            limit: parseInt(searchParams.get("limit") || "100", 10),
        };

        const data = await getProducts(params);
        return NextResponse.json(data);

    } catch (err: unknown) {
        console.error("[PRODUCT_API_ERROR]", err);
        const status = err instanceof ApiError ? (err.status ?? 500) : 500;
        return NextResponse.json(
            { products: [], error: getErrorMessage(err) },
            { status }
        );
    }
}