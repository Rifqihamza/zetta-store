'use client'

import { useAssetActions } from '@/hooks'
import { Product } from '@/types/product'
import { Copy } from 'lucide-react'

interface CopyLinkButtonProps {
    product: Product
}

export default function CopyLinkButton({ product }: CopyLinkButtonProps) {
    const { copyAssetLink } = useAssetActions()

    const handleCopyLink = () => {
        // Use product ID as fallback if slug is not available
        const linkIdentifier = product.slug ?? product.id;
        copyAssetLink(linkIdentifier);
    }

    return (
        <button
            onClick={handleCopyLink}
            className="cursor-pointer w-full flex items-center justify-center gap-2 font-medium p-2 bg-(--secondary) text-(--text-alt) border-3 border-(--border-color) hover:bg-(--primary) transition"
            title="Copy link"
        >
            <Copy size={18} />
            Copy Link
        </button>
    )
}
