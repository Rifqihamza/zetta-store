import Image from "next/image"
import { getProductBySlug } from "@/lib/getProductBySlug"
import { urlFor } from "@/lib/image"
import { formatPrice } from "@/lib/currencyFormat"
import { notFound } from "next/navigation"
import { CheckoutButton, CopyLinkButton, ShareButton, GoBackButton, ViewAllAssetsButton } from "@/hooks"
import { ArrowLeftCircle, Info, Package, CircleQuestionMark } from "lucide-react"
import { PRODUCT_CONTENT, LICENSE_INFO } from "@/constants/product-content"

export default async function AssetDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    if (!product) return notFound()

    return (
        <section className="py-28 px-6 max-w-6xl mx-auto space-y-10 relative">
            <GoBackButton className="flex flex-row items-center gap-2 border-none">
                <ArrowLeftCircle />
                Go Back
            </GoBackButton>
            <div className="grid md:grid-cols-2 gap-16">
                <div className="relative aspect-4/3 w-full h-auto mx-auto overflow-hidden">
                    <Image
                        src={urlFor(product.thumbnail).width(900).url()}
                        alt={product.title}
                        fill
                        className="object-contain p-5"
                    />
                </div>

                <div className="space-y-4">

                    <div className="flex flex-wrap gap-2">
                        {product.categories?.map((cat, i) => (
                            <span
                                key={i}
                                className="text-[8px] md:text-xs uppercase tracking-wider text-(--accent) bg-(--primary)/20 px-2 py-0.5 rounded-full border border-(--accent)"
                            >
                                {cat}
                            </span>
                        ))}
                        <span
                            className="text-[8px] md:text-xs uppercase tracking-wider text-(--accent) bg-(--primary)/20 px-2 py-0.5 rounded-full border border-(--accent)"
                        >
                            {product.licenseType.toUpperCase()} LICENSE
                        </span>
                    </div>

                    <h1 className="text-3xl font-semibold mt-3">{product.title}</h1>

                    <p className="text-sm text-(--text-gray)">
                        {PRODUCT_CONTENT.intro({
                            title: product.title,
                            productType: product.productType
                        })}
                    </p>

                    <p className="text-2xl font-semibold text-(--primary)">
                        {formatPrice(product.isFree, product.price)}
                    </p>

                    <CheckoutButton product={product} />

                    <p className="text-xs text-gray-400">
                        You will be redirected to our official partner
                    </p>
                    <div className="flex flex-row items-center gap-8 mt-4">
                        <ShareButton product={product} />
                        <CopyLinkButton product={product} />
                        <ViewAllAssetsButton />
                    </div>
                </div>
            </div>

            <div className="space-y-4 py-16">
                <Section
                    title="What You Will Get"
                    icon={<Package />}
                    items={PRODUCT_CONTENT.whatYouGet(product.productType)} />
                <Section
                    title="License Information"
                    icon={<Info />}
                    items={LICENSE_INFO[product.licenseType]}
                />
                <Section
                    title="How To Order"
                    icon={<CircleQuestionMark />}
                    items={PRODUCT_CONTENT.howToOrder} />
            </div>
        </section>
    )
}

function Section({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
    return (
        <div className="collapse collapse-arrow border border-(--primary) bg-(--primary)/10 backdrop-blur-xl">
            <input type="radio" name="accordion" defaultChecked />
            <div className="flex flex-row items-center gap-2 collapse-title">
                <h1 className="font-semibold text-xl">{title}</h1>
                <span>{icon}</span>
            </div>
            <div className="collapse-content pl-10 space-y-2">
                {items.map((item, i) => (
                    <ul key={i} className="list-disc text-gray-300">
                        <li >{item}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}
