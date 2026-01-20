import { LicenseType, Product } from "@/types/product";

const CATEGORY_CONTENT: Record<string, string[]> = {
    assets: [
        "File digital siap pakai",
        "Resolusi tinggi",
        "Struktur rapi & profesional",
    ],
    template: [
        "Template siap edit",
        "Komponen reusable",
        "Dokumentasi penggunaan",
    ],
    canva: [
        "Editable di Canva",
        "Tanpa software tambahan",
        "Siap pakai untuk personal & bisnis",
    ],
    design: [
        "Design modern & konsisten",
        "Siap untuk branding",
    ],
    "e-course": [
        "Materi terstruktur",
        "Akses seumur hidup",
    ],
    video: [
        "Format video siap pakai",
        "Resolusi HD",
    ],
    "e-book": [
        "Format PDF",
        "Isi terkurasi & praktis",
    ],
};

const LICENSE_INFO: Record<LicenseType, string[]> = {
    personal: [
        "Digunakan untuk kebutuhan pribadi",
        "Tidak boleh dijual kembali",
    ],
    commercial: [
        "Boleh digunakan untuk proyek klien",
        "Tidak boleh dijual ulang sebagai produk",
    ],
    plr: [
        "Boleh diubah dan dijual kembali",
        "Tidak boleh mengklaim sebagai pembuat asli",
    ],
    "u-plr": [
        "Hak penuh untuk modifikasi dan penjualan",
        "Boleh klaim sebagai produk sendiri",
    ],
};

export function getProductContent(product: Product) {
    const categories = product.categories ?? []; // array
    const highlights = product.highlights ?? [];

    // gabungkan konten dari semua kategori
    const whatYouGet = Array.from(
        new Set(
            categories.flatMap(cat => CATEGORY_CONTENT[cat] ?? [])
        )
    );

    return {
        intro: `Produk ${product.title} dirancang untuk membantu kamu bekerja lebih cepat dan efisien.`,
        whatYouGet:
            whatYouGet.length > 0 ? whatYouGet : highlights,
        licenseInfo: LICENSE_INFO[product.licenseType],
        howToOrder: [
            "Pilih produk yang kamu inginkan",
            "Klik tombol beli",
            "Kamu akan diarahkan ke halaman checkout",
            "Akses produk setelah pembayaran",
        ],
    };
}
