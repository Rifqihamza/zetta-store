// components/ui/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { rupiahFormat } from "@/lib/currencyFormat";
import { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const thumbnail = product.images?.[0] ?? "/placeholder.png";
    const price = product.price ?? 0;
    return (
        <Link href={`/AssetsPage/${encodeURIComponent(product.id)}`} className="h-full">
            <SpotlightCard
                className="relative h-full flex flex-col bg-(--primary)/10 border border-(--primary)/40 group hover:border-(--primary) transition-all duration-300"
                spotlightColor="rgb(93, 14, 215, 0.2)"
            >
                {/* CATEGORIES */}
                {product.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 absolute top-3 left-3">
                        {product.categories.map((label) => (
                            <span key={label} className="text-xs bg-(--secondary)/20 px-2 py-0.5 rounded">
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={thumbnail}
                        alt={product.title ?? "Product image"}
                        width={300}
                        height={300}
                        className="mx-auto object-contain transition-transform duration-300 group-hover:scale-105 p-8"
                        priority={false}
                    />

                    {product.images?.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                            {product.images.length}
                        </div>
                    )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 space-y-2 pt-4">
                    <hr className="border-(--text-gray)/30" />

                    <h3 className="font-medium leading-snug line-clamp-2">
                        {product.title ?? "Untitled Product"}
                    </h3>

                    {/* PRICE */}
                    <div className="pt-3 mt-auto flex flex-row items-center justify-between">
                        <p className="text-md font-medium text-(--accent)">
                            {rupiahFormat(price)}
                        </p>
                        <p className="text-sm opacity-70 hover:text-(--secondary) transition-colors">View details →</p>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    );
}