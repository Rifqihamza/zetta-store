import { LicenseType } from "@/types/product";

export const PRODUCT_CONTENT = {
    intro: (title: string) =>
        `Produk ${title} ini dirancang untuk membantu kamu bekerja lebih cepat dan efisien.`,

    whatYouGet: [
        "File digital siap pakai",
        "Akses instan setelah pembelian",
        "Lisensi sesuai pilihan",
        "Panduan penggunaan",
    ],

    licenseInfo: {
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
    } satisfies Record<LicenseType, string[]>,

    howToOrder: [
        "Pilih produk yang kamu inginkan",
        "Klik tombol beli",
        "Kamu akan diarahkan ke halaman checkout",
        "Akses produk setelah pembayaran",
    ],
};
