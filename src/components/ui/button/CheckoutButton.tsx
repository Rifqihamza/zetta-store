'use client'

import { Product } from '@/types/product'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface CheckoutButtonProps {
    product: Product
}

export default function CheckoutButton({ product }: CheckoutButtonProps) {
    // Siapkan URL-nya
    const variantId = product.variantId || product.id
    const checkoutUrl = `https://zetta.myscalev.com/c/checkout?variant_ids=${variantId}&qty=1`

    return (
        <Link
            href={checkoutUrl}
            // WAJIB: Gunakan rel="noopener noreferrer" untuk keamanan navigasi eksternal
            rel="noopener noreferrer"
            className="cursor-pointer flex flex-row items-center justify-center gap-2 w-fit mt-4 px-6 py-2 rounded-xl text-white bg-(--primary)/30 backdrop-blur-xl border border-(--accent) hover:bg-(--primary) hover:border-(--primary) transition"
        >
            <ShoppingBag size={18} />
            Buy Now
        </Link>
    )
}