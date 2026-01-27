// lib/currencyFormat.ts
export function rupiahFormat(
    value: number | null | undefined,
    opts?: { showCurrency?: boolean; nullLabel?: string }
): string {
    const { showCurrency = true, nullLabel = "Price unavailable" } = opts ?? {};

    if (value === null || value === undefined) return nullLabel;

    // Pastikan nilai numeric valid
    const n = Number(value);
    if (!Number.isFinite(n)) return nullLabel;

    const formatted = new Intl.NumberFormat("id-ID", {
        style: showCurrency ? "currency" : "decimal",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(n);

    // Jika showCurrency=false, Intl akan mengembalikan "1.000" (tanpa "Rp")
    return formatted;
}