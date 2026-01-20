import Image from "next/image"
import Link from "next/link"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { urlFor } from "@/lib/image"
import { getProducts } from "@/lib/getProduct"
import { Product } from "@/types/product"
import { rupiahFormat } from "@/lib/currencyFormat"
import { brand } from "@/config/brand"

export default async function AssetsPage() {
    const products: Product[] = await getProducts()
    return (
        <>
            <section id="assetPage" className="relative w-full max-w-7xl mx-auto min-h-screen">
                <section
                    id="assetPage"
                    className="py-36 px-6 max-w-7xl mx-auto"
                >
                    {/* heading */}
                    <div className="mb-16 w-full">
                        <span className="text-sm tracking-wider text-(--text-color) bg-(--primary)/30 backdrop-blur-xl border border-(--accent) px-4 py-1 rounded-full">
                            {brand.name.toUpperCase()} ASSETS
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold mt-4">
                            Ready-to-use digital assets for faster builds.
                        </h2>
                    </div>

                    {/* grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mb-4">
                                <span className="text-6xl">📦</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2 text-(--text-gray)">
                                No Products Available
                            </h3>
                            <p className="text-(--text-gray)/70">
                                We`re currently out of stock. Please check back later for new assets.
                            </p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
                            {products.map((product: Product) => (
                                <Link
                                    key={product._id}
                                    href={`/AssetsPage/${product.slug.current}`}
                                    className="h-full"
                                >
                                    <SpotlightCard
                                        className=" h-full flex flex-col bg-(--primary)/10 border border-(--primary)/40 group hover:border-(--primary) transition-all duration-300"
                                        spotlightColor="rgb(93, 14, 215, 0.2)"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative aspect-square overflow-hidden rounded-lg">
                                            <Image
                                                src={urlFor(product.thumbnail).width(600).url()}
                                                alt={product.title}
                                                width={300}
                                                height={300}
                                                className=" mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex flex-col flex-1 space-y-2 pt-4">
                                            <hr className="border-(--text-gray)/30" />

                                            <div className="flex flex-wrap gap-1">
                                                {product.categories?.map((category, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs uppercase tracking-wider text-(--accent) bg-(--primary)/20 px-2 py-0.5 rounded"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>

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
                                                    {product.isFree ? "Free" : rupiahFormat(product.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

            </section>
        </>
    )
}
