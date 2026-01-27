'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/ToastProvider';

export function useAssetActions() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    const getAssetUrl = (slug: string) =>
        `${window.location.origin}/AssetsPage/${encodeURIComponent(slug)}`;

    const shareAsset = useCallback(
        async (title: string, slug: string) => {
            const url = getAssetUrl(slug);
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
                if (err instanceof Error && err.name === 'AbortError') return;
                setError('Failed to share asset');
                showToast('Failed to share asset', 'error');
            } finally {
                setIsLoading(false);
            }
        },
        [showToast]
    );

    const copyAssetLink = useCallback(
        async (slug: string) => {
            setIsLoading(true);
            try {
                await navigator.clipboard.writeText(getAssetUrl(slug));
                showToast('Link copied to clipboard!', 'success');
            } catch (err) {
                console.log(err)
                setError('Failed to copy link');
                showToast('Failed to copy link', 'error');
            } finally {
                setIsLoading(false);
            }
        },
        [showToast]
    );

    const clearError = useCallback(() => setError(null), []);

    return { isLoading, error, shareAsset, copyAssetLink, clearError };
}