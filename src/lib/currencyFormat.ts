export function rupiahFormat(value: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value)
}

export function formatPrice(isFree: boolean, price?: number): string {
    if (isFree) return "Free"
    if (price) return rupiahFormat(price)
    return "Price not available"
}
