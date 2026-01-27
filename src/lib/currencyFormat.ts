export function rupiahFormat(
    value: number | null | undefined,
    opts?: { showCurrency?: boolean; nullLabel?: string }
): string {
    const { showCurrency = true, nullLabel = "Price unavailable" } = opts ?? {};

    if (value === null || value === undefined || !Number.isFinite(Number(value))) {
        return nullLabel;
    }

    return new Intl.NumberFormat("id-ID", {
        style: showCurrency ? "currency" : "decimal",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(value));
}