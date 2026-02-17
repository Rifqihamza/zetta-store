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
            <div className="relative h-full flex flex-col bg-(--primary) border-4 border-black p-4 
                            [box-shadow:8px_8px_0px_0px_rgba(0,0,0,1)] 
                            group-hover:[box-shadow:2px_2px_0px_0px_rgba(0,0,0,1)] 
                            group-hover:translate-x-1 group-hover:translate-y-1 
                            transition-all duration-200">

                {/* Image Container */}
                <div className="relative aspect-square w-full bg-(--background) border-4 border-black overflow-hidden mb-4">
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
                    <h1 className="font-black italic leading-tight text-lg md:text-xl uppercase tracking-tighter group-hover:text-(--text-alt) transition-colors line-clamp-3">
                        {product.title}
                    </h1>

                    {/* Tags/Labels */}
                    <div className="flex flex-wrap gap-2 my-3">
                        {product.labels.filter(Boolean).slice(0, 3).map((label, index) => (
                            <span
                                key={index}
                                className="text-[10px] font-bold uppercase bg-black/5 border border-black px-2 py-0.5"
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    {/* Bottom Section: Price & Action */}
                    <div className="pt-4 mt-auto flex items-end justify-between border-t-2 border-black/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-(--text-alt) uppercase font-black tracking-widest">Price</span>
                            <p className="text-xl font-black tracking-tighter group-hover:text-(--text-alt) transition-colors">
                                {product.displayPrice || rupiahFormat(product.price)}
                            </p>
                        </div>

                        {/* Action Button (Retro Style) */}
                        <div className="h-10 w-10 bg-(--primary) border-2 border-black flex items-center justify-center 
                                        [box-shadow:3px_3px_0px_0px_rgba(0,0,0,1)] 
                                        group-hover:[box-shadow:0px_0px_0px_0px_rgba(0,0,0,1)] 
                                        group-hover:bg-(--accent) text-white transition-all">
                            <ShoppingBag size={18} strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}