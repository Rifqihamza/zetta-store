// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProductsSimplified } from "@/lib/productServiceSimplified";
import { ApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const pageRaw = searchParams.get("page");
        const limitRaw = searchParams.get("limit");
        const search = searchParams.get("search") ?? "";
        const category = searchParams.get("category") ?? "";

        // Parse and sanitize parameters
        const page = Number(pageRaw ?? 1);
        const limit = Number(limitRaw ?? 12);

        // Sanitize inputs
        const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
        const safeLimit = Number.isFinite(limit) ? Math.min(100, Math.max(1, Math.floor(limit))) : 12;

        // Use the simplified API service
        const data = await getProductsSimplified({
            page: safePage,
            limit: safeLimit,
            search: search.trim() || undefined,
            category: category.trim() || undefined,
        });

        return NextResponse.json(data, { status: 200 });
    } catch (err: unknown) {
        // Log full error server-side for debugging
        console.error("[PRODUCT_API_ERROR]", err);

        // If it's an ApiError, surface a helpful message but keep originalError private
        if (err instanceof ApiError) {
            return NextResponse.json(
                {
                    products: [],
                    pagination: null,
                    error: err.message ?? "Failed to fetch products",
                },
                { status: err.status ?? 500 }
            );
        }

        // Generic fallback
        return NextResponse.json(
            {
                products: [],
                pagination: null,
                error: "Failed to fetch products",
            },
            { status: 500 }
        );
    }
}
