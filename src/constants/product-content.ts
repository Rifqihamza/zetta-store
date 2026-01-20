import { ProductType, LicenseType } from "@/types/product";
import { generateProductIntro } from "@/utils/generateProductIntro";

export const CATEGORY_CONTENT: Record<ProductType, string[]> = {
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
        "Editable langsung di Canva",
        "Tanpa software tambahan",
        "Siap pakai untuk personal & bisnis",
    ],
    design: [
        "Design modern & konsisten",
        "Siap untuk branding",
    ],
    ecourse: [
        "Materi terstruktur",
        "Akses pembelajaran fleksibel",
    ],
    video: [
        "Format video siap pakai",
        "Resolusi HD",
    ],
    ebook: [
        "Format PDF",
        "Isi terkurasi & praktis",
    ],
    powerpoint: [
        "Slide profesional",
        "Struktur presentasi rapi",
    ],
    elementor: [
        "Template Elementor siap pakai",
        "Mudah dikustomisasi",
    ],
    mockups: [
        "Mockup resolusi tinggi",
        "Siap untuk presentasi & preview",
    ],
};

export const LICENSE_INFO: Record<LicenseType, string[]> = {
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


export const PRODUCT_CONTENT = {
    intro: (product: {
        title: string;
        productType?: ProductType;
    }) => generateProductIntro(product),

    whatYouGet: [
        "File digital siap pakai",
        "Akses instan setelah pembelian",
        "Lisensi sesuai pilihan",
        "Panduan penggunaan",
    ],

    howToOrder: [
        "Pilih produk yang kamu inginkan",
        "Klik tombol beli",
        "Kamu akan diarahkan ke halaman checkout",
        "Akses produk setelah pembayaran",
    ],
};
