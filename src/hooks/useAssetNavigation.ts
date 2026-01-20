'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useAssetNavigation() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const navigateToAsset = (slug: string) => {
        router.push(`/AssetsPage/${slug}`)
    }

    const navigateToAssetsList = () => {
        router.push('/#assetPage')
    }

    const goBack = () => {
        router.back()
    }

    const navigateHome = () => {
        router.push('/')
    }

    const navigateToCheckout = (checkoutUrl: string) => {
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
    }

    const isAssetDetailPage = pathname?.startsWith('/AssetsPage/') && pathname !== '/AssetsPage'
    const isAssetsListPage = pathname === '/AssetsPage'

    return {
        navigateToAsset,
        navigateToAssetsList,
        goBack,
        navigateHome,
        navigateToCheckout,
        isAssetDetailPage,
        isAssetsListPage,
        pathname,
        searchParams
    }
}
