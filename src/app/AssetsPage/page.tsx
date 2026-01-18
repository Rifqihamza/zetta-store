import Image from "next/image"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { urlFor } from "@/lib/image"
import { getProducts } from "@/lib/getProduct"
import { Product } from "@/types/product"
import { rupiahFormat } from "@/lib/currencyFormat"
import Link from "next/link"

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
                    <div className="mb-16">
                        <span className="text-sm tracking-wider 
            text-(--accent) 
            bg-(--accent)/10 backdrop-blur-xl 
            border border-(--secondary)/60 
            px-4 py-1 rounded-full uppercase">
                            Nexora Assets
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold mt-4">
                            Crafted assets, ready for your next build.
                        </h2>
                    </div>

                    {/* grid */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {products.map((product: Product) => (
                            <Link
                                key={product._id}
                                href={`/AssetsPage/${product.slug.current}`}
                            >
                                <SpotlightCard
                                    className="custom-spotlight-card bg-(--primary)/10 group hover:border hover:border-(--primary) duration-300"
                                    spotlightColor="rgb(93, 14, 215, 0.2)"
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={urlFor(product.thumbnail).width(600).url()}
                                            alt={product.title}
                                            width={200}
                                            height={200}
                                            className="mx-auto object-contain group-hover:scale-105 duration-300"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <hr className="text-(--text-gray)/40" />
                                        <p className="text-xs uppercase tracking-wider text-(--accent)">
                                            {product.category}
                                        </p>

                                        <h3 className="font-medium">
                                            {product.title}
                                        </h3>

                                        <p className="text-md text-(--accent)">
                                            {product.isFree ? "Free" : rupiahFormat(product.price)}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        ))}
                    </div>
                </section>

            </section>
        </>
    )
}
