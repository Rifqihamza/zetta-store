'use client'

import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui/ToastProvider'

export function useAssetActions() {
    const [isLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { showToast } = useToast()

    const shareAsset = useCallback(async (title: string, slug: string) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Check out ${title}`,
                    text: `Check out this amazing asset: ${title}`,
                    url: `${window.location.origin}/AssetsPage/${slug}`
                })
                showToast('Asset shared successfully!', 'success')
            } catch (err) {
                // User cancelled share or error occurred
                console.log(err, 'Share cancelled or failed')
            }
        } else {
            // Fallback: copy to clipboard
            const url = `${window.location.origin}/AssetsPage/${slug}`
            try {
                await navigator.clipboard.writeText(url)
                showToast('Link copied to clipboard!', 'success')
            } catch (err) {
                console.error('Failed to copy link:', err)
                showToast('Failed to copy link', 'error')
            }
        }
    }, [showToast])

    const copyAssetLink = useCallback(async (slug: string) => {
        const url = `${window.location.origin}/AssetsPage/${slug}`
        try {
            await navigator.clipboard.writeText(url)
            showToast('Link copied to clipboard!', 'success')
        } catch (err) {
            console.error('Failed to copy link:', err)
            setError('Failed to copy link')
            showToast('Failed to copy link', 'error')
        }
    }, [showToast])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        isLoading,
        error,
        shareAsset,
        copyAssetLink,
        clearError
    }
}
