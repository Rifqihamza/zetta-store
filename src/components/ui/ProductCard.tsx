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
                            className="text-xs uppercase tracking-wider text-(--accent) bg-(--primary)/20 px-2 py-0.5 rounded"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={urlFor(product.thumbnail).width(600).url()}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
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
