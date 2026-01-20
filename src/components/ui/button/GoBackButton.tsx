'use client'

import { useAssetNavigation } from '@/hooks'

interface GoBackButtonProps {
    className?: string
    children?: React.ReactNode
}

export default function GoBackButton({ className = "", children }: GoBackButtonProps) {
    const { goBack } = useAssetNavigation()

    return (
        <button
            onClick={goBack}
            className={`cursor-pointer px-3 py-1 rounded-lg border border-(--primary) text-(--accent) hover:text-white transition-colors ${className}`}
        >
            {children || '← Go Back'}
        </button>
    )
}
