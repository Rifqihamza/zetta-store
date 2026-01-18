import { sanityClient } from "./client"
import { PRODUCT_BY_SLUG_QUERY } from "./query"
import { ProductDetail } from "@/types/product"

export async function getProductBySlug(
    slug: string
): Promise<ProductDetail | null> {
    return sanityClient.fetch<ProductDetail | null>(
        PRODUCT_BY_SLUG_QUERY,
        { slug }
    )
}
