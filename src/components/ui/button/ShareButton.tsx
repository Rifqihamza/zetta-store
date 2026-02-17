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
            className="cursor-pointer w-full flex items-center justify-center gap-2 font-medium p-2 bg-(--secondary) text-(--text-alt) border-3 border-(--border-color) hover:bg-(--primary) transition"
            title="Share this asset"
        >
            <Share2 size={18} />
            Share this asset
        </button>
    )
}
