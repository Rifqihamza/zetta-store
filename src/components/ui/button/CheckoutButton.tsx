'use client'

import { useAssetNavigation } from '@/hooks'
import { ProductDetail } from '@/types/product'
import { ShoppingBag } from 'lucide-react'

interface CheckoutButtonProps {
    product: ProductDetail
    children?: React.ReactNode
}

export default function CheckoutButton({ product }: CheckoutButtonProps) {
    const { navigateToCheckout } = useAssetNavigation()

    const handleCheckout = () => {
        navigateToCheckout(product.checkoutUrl)
    }

    return (
        <button
            rel="noopener noreferrer"
            onClick={handleCheckout}
            className="cursor-pointer flex flex-row items-center justify-center gap-2 w-fit mt-4 px-6 py-2 rounded-xl text-white bg-(--primary)/30 backdrop-blur-xl border border-(--accent) hover:bg-(--primary) hover:border-(--primary) transition"
        >
            <ShoppingBag size={18} />
            Buy Now
        </button>
    )
}
