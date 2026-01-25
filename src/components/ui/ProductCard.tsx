import Image from "next/image"
import Link from "next/link"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { urlFor } from "@/lib/image"
import { Product } from "@/types/product"
import { formatPrice } from "@/lib/currencyFormat"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/AssetsPage/${product.slug.current}`}
            className="h-full"
        >
            <SpotlightCard
                className="relative h-full flex flex-col bg-(--primary)/10 border border-(--primary)/40 group hover:border-(--primary) transition-all duration-300"
                spotlightColor="rgb(93, 14, 215, 0.2)"
            >
                <div className="flex flex-wrap gap-2 absolute top-3 left-3">
                    {product.categories?.map((category, i) => (
                        <span
                            key={i}
                            className="text-[8px] md:text-[10px] uppercase tracking-wider text-(--accent) bg-(--primary)/20 px-2 py-0.5 rounded-full border border-(--accent)"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    {product.thumbnail && product.thumbnail.length > 0 && (
                        <>
                            <Image
                                src={urlFor(product.thumbnail[0]).width(600).url()}
                                alt={product.title}
                                width={300}
                                height={300}
                                className="mx-auto object-contain transition-transform duration-300 group-hover:scale-105 p-8"
                            />
                            {product.thumbnail.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                    </svg>
                                    {product.thumbnail.length}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 space-y-2 pt-4">
                    <hr className="border-(--text-gray)/30" />

                    <h3 className="font-medium leading-snug line-clamp-2">
                        {product.title}
                    </h3>

                    <p className="text-xs uppercase text-(--accent)">
                        {product.licenseType.toUpperCase()}
                    </p>
                    <ul className="text-xs text-(--text-gray) space-y-1 line-clamp-3">
                        {product.highlights?.slice(0, 3).map((item, i) => (
                            <li key={i}>• {item}</li>
                        ))}
                    </ul>

                    {/* PRICE (SELALU DI BAWAH) */}
                    <div className="pt-3 mt-auto">
                        <p className="text-md font-medium text-(--accent)">
                            {formatPrice(product.isFree, product.price)}
                        </p>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    )
}
