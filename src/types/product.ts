import { PortableTextBlock } from "next-sanity"
import { ImageAsset } from "sanity"

export interface Product {
    _id: string
    title: string
    slug: { current: string }
    thumbnail: ImageAsset
    category: "ui-kit" | "icon-set" | "template" | "bundling-pack"
    price: number
    isFree: boolean
    licenseType: LicenseType
    highlights?: string[]
}

export interface ProductDetail extends Product {
    originalPrice?: number
    isDiscounted: boolean
    checkoutUrl: string

    intro?: PortableTextBlock[]
    whatYouGet?: PortableTextBlock[]
    whyMustHave?: PortableTextBlock[]
    licenseNotes?: PortableTextBlock[]
    howToOrder?: PortableTextBlock[]
}

export type LicenseType =
    | "personal"
    | "commercial"
    | "plr"
    | "u-plr";