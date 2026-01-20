'use client'

import { useAssetActions } from '@/hooks'
import { ProductDetail } from '@/types/product'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
    product: ProductDetail
}

export default function ShareButton({ product }: ShareButtonProps) {
    const { shareAsset } = useAssetActions()

    const handleShare = () => {
        shareAsset(product.title, product.slug.current)
    }

    return (
        <button
            onClick={handleShare}
            className="flex flex-row items-center gap-2 border-none text-(--text-color) cursor-pointer hover:text-(--accent) transition"
            title="Share this Assets"
        >
            <Share2 size={18} />
        </button>
    )
}
