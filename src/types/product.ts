import { Pagination } from "./query";

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    rich_description: string;
    imageUrl: string;
    allImages: string[];
    price: number;
    displayPrice?: string;
    item_types: string;
    labels: string[];
    variantId: string;
}

export interface ProductResponse {
    products: Product[];
    pagination: Pagination;
}