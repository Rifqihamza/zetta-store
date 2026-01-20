'use client'

import { useAssetNavigation } from '@/hooks'
import { Expand } from 'lucide-react'

export default function ViewAllAssetsButton() {
    const { navigateToAssetsList } = useAssetNavigation()

    return (
        <button
            onClick={navigateToAssetsList}
            className="flex flex-row items-center gap-2 border-none text-(--text-color) cursor-pointer hover:text-(--accent) transition"
        >
            <Expand size={18} />
        </button>
    )
}
