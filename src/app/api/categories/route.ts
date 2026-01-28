import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/productService';

export async function GET() {
    try {
        // Ambil produk (limit besar untuk memastikan semua kategori tercover)
        const { products } = await getProducts({ page: 100 });

        // Ambil kategori unik, bersihkan dari null/undefined, dan sortir
        const itemType = Array.from(
            new Set(products.flatMap((p) => p.item_types || []))
        )
            .filter(Boolean)
            .sort();

        return NextResponse.json({ itemType });
    } catch (error) {
        console.error('Category Fetch Error:', error);
        return NextResponse.json({ item_types: [] }, { status: 500 });
    }
}