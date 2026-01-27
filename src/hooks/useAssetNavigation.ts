'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useAssetNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /**
     * Navigasi ke halaman detail asset berdasarkan slug
     */
    const navigateToAsset = (slug: string) => {
        if (!slug) return;
        router.push(`/AssetsPage/${encodeURIComponent(slug)}`);
    };

    /**
     * Navigasi ke halaman daftar asset
     */
    const navigateToAssetsList = () => {
        router.push('/#assetPage');
    };

    /**
     * Kembali ke halaman sebelumnya
     */
    const goBack = () => {
        router.back();
    };

    /**
     * Navigasi ke halaman utama
     */
    const navigateHome = () => {
        router.push('/');
    };

    /**
     * Buka halaman checkout di tab baru
     */
    const navigateToCheckout = (checkoutUrl: string) => {
        if (!checkoutUrl) return;
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    };

    /**
     * Flag untuk cek apakah sedang di halaman detail asset
     */
    const isAssetDetailPage =
        typeof pathname === 'string' &&
        pathname.startsWith('/AssetsPage/') &&
        pathname !== '/AssetsPage';

    /**
     * Flag untuk cek apakah sedang di halaman daftar asset
     */
    const isAssetsListPage = pathname === '/AssetsPage';

    return {
        navigateToAsset,
        navigateToAssetsList,
        goBack,
        navigateHome,
        navigateToCheckout,
        isAssetDetailPage,
        isAssetsListPage,
        pathname,
        searchParams,
    };
}