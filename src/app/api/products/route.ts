import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/productService";
import { ApiError, getErrorMessage } from "@/lib/errors";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const search = searchParams.get("search")?.trim() || undefined;
        const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

        const data = await getProducts({ search, page });

        return NextResponse.json(data);

    } catch (err: unknown) {
        console.error("[PRODUCT_API_ERROR]", err);

        const status = err instanceof ApiError ? (err.status ?? 500) : 500;
        const message = getErrorMessage(err);

        return NextResponse.json(
            {
                products: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    totalItems: 0,
                    totalPages: 0,
                    hasNext: false,
                    lastId: null,
                },
                error: message,
            },
            { status }
        );
    }
}