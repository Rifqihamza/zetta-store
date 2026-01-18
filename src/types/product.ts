import { PortableTextBlock } from "next-sanity"
import { ImageAsset } from "sanity"

export interface Product {
    _id: string
    title: string
    slug: {
        current: string
    }
    thumbnail: ImageAsset
    category: "ui-kit" | "icon-set" | "template"
    price: number
    isFree: boolean
}

export interface ProductDetail {
    _id: string
    title: string
    slug: { current: string }
    thumbnail: ImageAsset
    category: "ui-kit" | "icon-set" | "template"
    originalPrice: number
    isDiscounted: boolean
    price: number
    isFree: boolean

    intro?: PortableTextBlock[]
    whatYouGet?: PortableTextBlock[]
    whyMustHave?: PortableTextBlock[]
    bonus?: PortableTextBlock[]
    howToOrder?: PortableTextBlock[]
}