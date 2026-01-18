import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "next-sanity"
import { getProductBySlug } from "@/lib/getProductBySlug"
import { urlFor } from "@/lib/image"
import { rupiahFormat } from "@/lib/currencyFormat"
import { notFound } from "next/navigation"

export default async function AssetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    if (!product) return notFound()

    return (
        <section className="py-32 px-6 max-w-6xl mx-auto space-y-24">
            {/* TOP */}
            <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* IMAGE */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-(--secondary)/20">
                    <Image
                        src={urlFor(product.thumbnail).width(900).url()}
                        alt={product.title}
                        fill
                        className="object-contain p-5"
                    />
                </div>

                {/* INFO */}
                <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-(--accent) bg-(--primary)/20 border border-(--primary) px-3 py-1 rounded-full">
                        {product.category}
                    </span>

                    <h1 className="text-3xl font-semibold mt-4">
                        {product.title}
                    </h1>

                    {/* INTRO */}
                    {product.intro && (
                        <article className="prose prose-neutral max-w-none leading-relaxed text-justify">
                            <PortableText value={product.intro} />
                        </article>
                    )}

                    <div className="space-y-1">
                        {product.isDiscounted && (
                            <p className="text-sm line-through text-gray-400">
                                {rupiahFormat(product.originalPrice)}
                            </p>
                        )}

                        <p className="text-2xl font-semibold text-(--primary)">
                            {product.isFree ? "Free" : rupiahFormat(product.price)}
                        </p>
                    </div>


                    <Link href="" className="mt-4 px-6 py-3 rounded-full bg-(--primary) text-white">
                        {product.isFree ? "Download" : "Buy Now"}
                    </Link>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="mx-auto space-y-4">
                <AccordionSection
                    title="What You Will Get?"
                    groupName="product-detail"
                    value={product.whatYouGet}
                />

                <AccordionSection
                    title="Why You Must Have This?"
                    groupName="product-detail"
                    value={product.whyMustHave}
                />

                <AccordionSection
                    title="Bonus!"
                    groupName="product-detail"
                    value={product.bonus}
                />

                <AccordionSection
                    title="How To Order?"
                    groupName="product-detail"
                    value={product.howToOrder}
                />
            </div>
        </section>
    )
}

function AccordionSection({
    title,
    value,
    groupName,
    defaultOpen = false,
}: {
    title: string
    value?: PortableTextBlock[]
    groupName: string
    defaultOpen?: boolean
}) {
    if (!value || value.length === 0) return null

    return (
        <div className="collapse collapse-arrow bg-(--primary)/5 border border-(--secondary)/50 rounded-xl">
            <input
                type="radio"
                name={groupName}
                defaultChecked={defaultOpen}
            />
            <div className="collapse-title text-lg font-medium">
                {title}
            </div>

            <div className="collapse-content">
                <article className="prose prose-neutral max-w-none text-sm">
                    <PortableText value={value} />
                </article>
            </div>
        </div>
    )
}
