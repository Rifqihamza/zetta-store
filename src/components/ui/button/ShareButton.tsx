'use client'

import { useAssetActions } from '@/hooks'
import { Product } from '@/types/product'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
    product: Product
}

export default function ShareButton({ product }: ShareButtonProps) {
    const { shareAsset } = useAssetActions()

    const handleShare = () => {
        // Use product ID as fallback if slug is not available
        const linkIdentifier = product.slug ?? product.id;
        shareAsset(product.title, linkIdentifier);
    }

    return (
        <button
            onClick={handleShare}
            className="flex flex-row items-center gap-2 border-none text-(--text-color) cursor-pointer hover:text-(--accent) transition"
            title="Share this asset"
        >
            <Share2 size={18} />
        </button>
    )
}
