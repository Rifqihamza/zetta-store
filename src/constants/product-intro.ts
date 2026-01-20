import { ProductType } from "@/types/product";

export const PRODUCT_INTRO_BY_TYPE: Record<
    ProductType,
    (title: string) => string
> = {
    assets: (title) =>
        `${title} berisi kumpulan aset digital berkualitas tinggi yang siap digunakan untuk mendukung kebutuhan desain dan konten kamu.`,

    canva: (title) =>
        `${title} adalah template Canva siap pakai yang memudahkan kamu membuat desain profesional tanpa ribet.`,

    ecourse: (title) =>
        `${title} merupakan e-course terstruktur yang membahas materi secara bertahap agar mudah dipahami dan langsung bisa dipraktikkan.`,

    design: (title) =>
        `${title} adalah produk desain yang dibuat dengan pendekatan visual profesional untuk meningkatkan kualitas tampilan brand atau konten kamu.`,

    template: (title) =>
        `${title} merupakan template siap pakai yang dirancang untuk mempercepat proses pembuatan desain maupun halaman digital.`,

    video: (title) =>
        `${title} adalah video pembelajaran yang dikemas secara ringkas dan fokus pada praktik agar mudah diikuti.`,

    ebook: (title) =>
        `${title} adalah e-book panduan praktis yang membahas strategi, insight, dan langkah-langkah yang bisa langsung kamu terapkan.`,

    powerpoint: (title) =>
        `${title} adalah template PowerPoint profesional yang membantu kamu membuat presentasi lebih rapi, menarik, dan mudah dipahami.`,

    elementor: (title) =>
        `${title} merupakan template Elementor siap pakai untuk membantu kamu membangun landing page atau website dengan cepat.`,

    mockups: (title) =>
        `${title} adalah mockup digital profesional yang memudahkan kamu menampilkan produk atau desain secara lebih menarik.`,
};
