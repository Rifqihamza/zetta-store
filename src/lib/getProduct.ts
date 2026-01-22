import { ProductService } from './sanity'

/**
 * @deprecated Use ProductService.getProducts() instead
 * This function is kept for backward compatibility
 */
export async function getProducts(): Promise<import('@/types/product').Product[]> {
    const result = await ProductService.getProducts()
    return result.products
}
