import { groq } from 'next-sanity'

export const PRODUCT_PROJECTION = groq`
  _id,
  title,
  slug,
  thumbnail,
  categories,
  productType,
  price,
  isFree,
  licenseType,
  highlights
`

export const PRODUCT_DETAIL_PROJECTION = groq`
  _id,
  title,
  slug,
  thumbnail,
  categories,
  productType,
  price,
  isFree,
  licenseType,
  checkoutUrl,
  highlights
`

export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc){
    ${PRODUCT_PROJECTION}
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0]{
    ${PRODUCT_DETAIL_PROJECTION}
  }
`
