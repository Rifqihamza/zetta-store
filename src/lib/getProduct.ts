import { sanityClient } from "./client"
import { PRODUCTS_QUERY } from "./query"
import { Product } from "@/types/product"

export async function getProducts(): Promise<Product[]> {
    return sanityClient.fetch<Product[]>(
        PRODUCTS_QUERY,
        {
        },
        {
            next: { revalidate: 60 },
        }
    )
}
