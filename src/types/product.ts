import { PortableTextBlock } from "next-sanity"
import { ImageAsset } from "sanity"

export interface Product {
    _id: string
    title: string
    slug: { current: string }
    thumbnail: ImageAsset[]
    price: number
    isFree: boolean
    categories: string[]
    licenseType: LicenseType
    productType: ProductType
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

export type ProductType =
    | "assets"
    | "canva"
    | "ecourse"
    | "design"
    | "template"
    | "video"
    | "ebook"
    | "powerpoint"
    | "elementor"
    | "mockups"
