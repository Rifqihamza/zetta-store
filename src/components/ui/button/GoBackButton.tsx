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
            className={`cursor-pointer ${className}`}
        >
            {children || '← Go Back'}
        </button>
    )
}
