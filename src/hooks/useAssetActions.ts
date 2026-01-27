'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/ToastProvider';

export function useAssetActions() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    /**
     * Share asset via Web Share API (mobile) atau fallback copy link
     */
    const shareAsset = useCallback(
        async (title: string, slug: string) => {
            const url = `${window.location.origin}/AssetsPage/${encodeURIComponent(slug)}`;
            setIsLoading(true);

            try {
                if (navigator.share) {
                    await navigator.share({
                        title: `Check out ${title}`,
                        text: `Check out this amazing asset: ${title}`,
                        url,
                    });
                    showToast('Asset shared successfully!', 'success');
                } else {
                    await navigator.clipboard.writeText(url);
                    showToast('Link copied to clipboard!', 'success');
                }
            } catch (err) {
                console.error('Share failed:', err);
                setError('Failed to share asset');
                showToast('Failed to share asset', 'error');
            } finally {
                setIsLoading(false);
            }
        },
        [showToast]
    );

    /**
     * Copy asset link ke clipboard
     */
    const copyAssetLink = useCallback(
        async (slug: string) => {
            const url = `${window.location.origin}/AssetsPage/${encodeURIComponent(slug)}`;
            setIsLoading(true);

            try {
                await navigator.clipboard.writeText(url);
                showToast('Link copied to clipboard!', 'success');
            } catch (err) {
                console.error('Failed to copy link:', err);
                setError('Failed to copy link');
                showToast('Failed to copy link', 'error');
            } finally {
                setIsLoading(false);
            }
        },
        [showToast]
    );

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isLoading,
        error,
        shareAsset,
        copyAssetLink,
        clearError,
    };
}