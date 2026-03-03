import Image from "next/image";
import Link from "next/link";
import { rupiahFormat } from "@/lib/currencyFormat";
import { Product } from "@/types/product";
import { ShoppingBag, Camera } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/AssetsPage/${encodeURIComponent(product.id)}`} className="group block h-full">
            <div className="relative h-full flex flex-col rounded-2xl p-5 bg-(--primary-light) shadow-[6px_6px_0_0_var(--primary)] group-hover:shadow-[10px_10px_0_0_var(--primary)]  group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-video w-full bg-(--primary-tint) rounded-xl border border-(--text-muted) overflow-hidden mb-4">
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-contain p-4 pixelated transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Image Counter Badge (Retro Style) */}
                    {product.allImages.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-mono px-2 py-1 border-2 border-white flex items-center gap-1">
                            <Camera size={12} />
                            {product.allImages.length}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                    {/* Tags/Labels */}
                    <div className="flex flex-wrap gap-2">
                        {product.labels.filter(Boolean).slice(0, 3).map((label, index) => (
                            <span
                                key={index}
                                className="text-[10px] font-bold uppercase"
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <h1 className="font-medium line-clamp-2 py-1 mb-3">
                        {product.title}
                    </h1>

                    {/* Bottom Section: Price & Action */}
                    <div className="pt-4 mt-auto flex items-center justify-between border-t-2 border-black/10">
                        <div className="flex flex-col">
                            <p className="text-xl font-black tracking-tighter">
                                {product.displayPrice || rupiahFormat(product.price)}
                            </p>
                        </div>

                        {/* Action Button (Retro Style) */}
                        <div className="flex items-center gap-2 text-white bg-(--primary) px-4 font-medium uppercase py-1 rounded-xl hover:bg-(--secondary-light) hover:text-black transition-colors duration-300">
                            <ShoppingBag size={18} strokeWidth={3} />
                            Buy
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}