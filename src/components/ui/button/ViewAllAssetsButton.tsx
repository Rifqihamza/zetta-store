'use client'

import { useAssetNavigation } from '@/hooks'
import { Expand } from 'lucide-react'

export default function ViewAllAssetsButton() {
    const { navigateToAssetsList } = useAssetNavigation()

    return (
        <button
            onClick={navigateToAssetsList}
            className="cursor-pointer w-full flex items-center justify-center gap-2 font-medium p-2 bg-(--secondary) text-(--text-alt) border-3 border-(--border-color) hover:bg-(--primary) transition"
        >
            <Expand size={18} />
            View All Assets
        </button>
    )
}
