import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { rupiahFormat } from "@/lib/currencyFormat";
import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

    return (
        <Link href={`/AssetsPage/${encodeURIComponent(product.id)}`} className="h-full">
            <SpotlightCard
                className="relative h-full flex flex-col bg-(--primary)/10 border border-(--primary)/40 group hover:border-(--primary) transition-all duration-300"
                spotlightColor="rgb(93, 14, 215, 0.2)"
            >
                <div className="relative w-30 h-30 md:w-50 md:h-50 mx-auto overflow-hidden rounded-lg">
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        sizes="500"
                        className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                    />

                    {product.allImages.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-3 h-3 text-[10px]">📷</span>
                            {product.allImages.length}
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-1 pt-4 group">
                    {/* Divider dengan margin yang konsisten */}
                    <hr className="border-white/5 mb-4" />

                    {/* Metadata: Labels & Type */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">

                        {product.labels.map((label) => (
                            <div
                                key={label}
                                className="flex items-center gap-1.5"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                                    {label}
                                </span>
                            </div>
                        ))}

                    </div>

                    {/* Title: Dibatasi 2 baris agar card tingginya seragam */}
                    <h3 className="font-semibold text-white leading-snug text-base md:text-lg group-hover:text-(--accent) transition-colors">
                        {product.title}
                    </h3>

                    {/* Bottom Section: Price & Action */}
                    <div className="pt-5 mt-auto flex items-center justify-between border-t border-white/5">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-medium">Price</span>
                            <p className="text-lg font-bold text-white tracking-tight">
                                {product.displayPrice || rupiahFormat(product.price)}
                            </p>
                        </div>

                        {/* Aksen hiasan atau tombol kecil */}
                        <div className="h-12 w-12 rounded-full bg-(--primary)/10 flex items-center justify-center border border-(--primary)/20 group-hover:bg-(--accent) group-hover:border-(--accent) transition-all duration-300">
                            <ShoppingBag size={20} />
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    );
}