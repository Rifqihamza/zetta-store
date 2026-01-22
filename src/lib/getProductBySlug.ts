import { ProductService } from './sanity'

/**
 * @deprecated Use ProductService.getProductBySlug() instead
 * This function is kept for backward compatibility
 */
export async function getProductBySlug(slug: string): Promise<import('@/types/product').ProductDetail | null> {
    return ProductService.getProductBySlug(slug)
}
