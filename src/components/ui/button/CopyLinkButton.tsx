'use client'

import { useAssetActions } from '@/hooks'
import { ProductDetail } from '@/types/product'
import { Copy } from 'lucide-react'

interface CopyLinkButtonProps {
    product: ProductDetail
}

export default function CopyLinkButton({ product }: CopyLinkButtonProps) {
    const { copyAssetLink } = useAssetActions()

    const handleCopyLink = () => {
        copyAssetLink(product.slug.current)
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
