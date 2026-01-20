import { groq } from "next-sanity"

export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc){
    _id,
    title,
    slug,
    thumbnail,
    category,
    price,
    isFree,
    licenseType,
    highlights
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    thumbnail,
    category,
    price,
    isFree,
    licenseType,
    checkoutUrl
  }
`
