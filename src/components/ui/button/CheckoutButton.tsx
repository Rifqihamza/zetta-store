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
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 font-black uppercase text-xs tracking-tighter bg-(--primary) text-white border-4 border-black [box-shadow:6px_6px_0px_0px_rgba(0,0,0,1)] hover:[box-shadow:2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
        >
            <ShoppingBag size={18} />
            Buy Now
        </Link>
    )
}