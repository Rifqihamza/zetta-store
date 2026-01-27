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
            className="flex flex-row items-center gap-2 border-none text-(--text-color) cursor-pointer hover:text-(--accent) transition"
            title="Copy link"
        >
            <Copy size={18} />
        </button>
    )
}
