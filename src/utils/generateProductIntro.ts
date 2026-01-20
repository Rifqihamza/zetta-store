import { ProductType } from "@/types/product";
import { PRODUCT_INTRO_BY_TYPE } from "@/constants/product-intro";

export function generateProductIntro(product: {
    title: string;
    productType?: ProductType;
}) {
    if (product.productType && PRODUCT_INTRO_BY_TYPE[product.productType]) {
        return PRODUCT_INTRO_BY_TYPE[product.productType](product.title);
    }

    // fallback (kalau productType kosong / error)
    return `Produk ${product.title} merupakan produk digital siap pakai yang memberikan nilai dan manfaat nyata.`;
}
