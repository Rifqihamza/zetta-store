import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { rupiahFormat } from "@/lib/currencyFormat";
import { Product } from "@/types/product";

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
                {product.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 absolute top-3 left-3 z-10">
                        {product.categories.map((label) => (
                            <span key={label} className="text-xs bg-(--secondary)/20 px-2 py-0.5 rounded backdrop-blur-md">
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                <div className="relative w-30 h-30 md:w-50 md:h-50 mx-auto overflow-hidden rounded-lg">
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        sizes="500"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {product.allImages.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-3 h-3 text-[10px]">📷</span>
                            {product.allImages.length}
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-1 space-y-2 pt-4">
                    <hr className="border-(--text-gray)/30" />
                    <h3 className="font-medium leading-snug line-clamp-1">{product.title}</h3>
                    <div className="pt-3 mt-auto flex flex-row items-center justify-between">
                        <p className="text-xs px-2 py-0.5 text-(--accent) bg-(--primary)/10 backdrop-blur-xl rounded-full border border-(--accent) font-medium">
                            {product.categories.length > 0 ? product.categories[0] : "Digital Asset"}
                        </p>
                        <p className="text-md font-medium text-(--accent)">
                            {product.displayPrice || rupiahFormat(product.price)}
                        </p>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    );
}