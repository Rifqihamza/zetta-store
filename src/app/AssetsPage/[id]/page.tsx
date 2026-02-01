import { rupiahFormat } from "@/lib/currencyFormat";
import {
    CheckoutButton,
    CopyLinkButton,
    ShareButton,
    GoBackButton,
    ViewAllAssetsButton,
} from "@/hooks";
import { ArrowLeftCircle, BoxIcon, Sparkles, CreditCard, ShieldCheck, FileText } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/productService";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) return notFound();
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto relative min-h-screen">

            {/* 1. Navigasi Kembali */}
            <div className="mb-10">
                <GoBackButton className="flex flex-row items-center gap-2 border-none transition-colors hover:text-(--accent) text-gray-400 group">
                    <ArrowLeftCircle className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                </GoBackButton>
            </div>

            {/* 2. Top Section: Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-center mb-10">
                <Carousel images={product.allImages} title={product.title} />
                <div className="flex flex-col justify-between w-full">
                    <div className="space-y-4 relative z-10">

                        <div className="flex flex-wrap items-center gap-2 relative z-10">
                            {/* 1. Render Item Type (Utama) */}
                            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-(--accent) bg-(--accent)/15 px-3 py-1.5 rounded-full border border-(--accent)/30 font-bold">
                                <Sparkles size={12} className="animate-pulse" />
                                {product.item_types || "Asset"}
                            </div>

                            {/* 2. Render Labels (Tambahan) */}
                            {product.labels.map((label) => (
                                <div
                                    key={label}
                                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 font-semibold hover:border-(--accent)/50 hover:text-white transition-all duration-300"
                                >
                                    <div className="w-1 h-1 rounded-full bg-(--accent)/50" />
                                    {label}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {/* Product Title */}
                            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.1]">
                                {product.title}
                            </h1>
                            <p className="leading-relaxed text-md md:text-lg">{product.description}</p>
                            <div>
                                <span className="mt-2">Product Labels</span>
                                {product.labels.map((label) => (
                                    <ul key={label} className="pl-6 list-disc">
                                        <li className="text-sm text-(--text-gray)">{label}</li>
                                    </ul>
                                ))}
                            </div>

                            {/* Product Price */}
                            <p className="text-2xl md:text-3xl font-black text-(--accent)">
                                {product.displayPrice || rupiahFormat(product.price)}
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-4 relative">
                        <div className="space-y-4">
                            <div className="w-full transform transition-all hover:translate-y-0.5">
                                <CheckoutButton product={product} />
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-400 w-fit ">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                Verified Secure Payment via Scalev
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 border-t pt-4 pb-2 border-white/10">
                            <ShareButton product={product} />
                            <CopyLinkButton product={product} />
                            <ViewAllAssetsButton />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Middle Section: Description */}
            <div className="group">
                <div className="w-full bg-(--primary)/10 backdrop-blur-sm p-4 rounded-3xl border border-transparent group-hover:border group-hover:border-(--accent) transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-(--primary)/10 border border-(--primary)/20 group-hover:bg-(--accent) group-hover:border-(--accent) transition-all duration-300 p-3">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Description</h2>
                    </div>
                    <div
                        className="space-y-2 leading-relaxed text-justify text-gray-300"
                        dangerouslySetInnerHTML={{ __html: product.rich_description }}
                    />
                </div>
            </div>

            {/* 4. Bottom Section: Accordion */}
            <div className="grid grid-cols-1 gap-6 mt-6">
                <AccordionSection
                    icon={<BoxIcon className="w-5 h-5" />}
                    title="What's Included"
                    items={[
                        "High-resolution source files",
                        "Commercial & personal use license",
                        "Instant access via secure dashboard",
                        "Lifetime updates & bug fixes"
                    ]}
                />

                <AccordionSection
                    icon={<CreditCard className="w-5 h-5" />}
                    title="Payment & Security"
                    items={[
                        "Encoded 256-bit SSL protection",
                        "Multiple payment methods supported",
                        "Automatic receipt & invoice delivery",
                        "24/7 Priority customer assistance"
                    ]}
                />
            </div>
        </section>
    );
}

// Sub-component untuk Accordion
function AccordionSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
    return (
        <div className="collapse collapse-arrow group overflow-hidden bg-(--primary)/10 backdrop-blur-sm rounded-3xl border border-transparent hover:border hover:border-(--accent) transition-all duration-300">
            <input type="radio" name="asset-accordion" defaultChecked />
            <div className="collapse-title flex items-center gap-4 text-lg font-semibold p-4">
                <span className="rounded-full bg-(--primary)/10 border border-(--primary)/20 group-hover:bg-(--accent) group-hover:border-(--accent) transition-all duration-300 p-3">{icon}</span>
                {title}
            </div>
            <div className="collapse-content">
                <ul className="space-y-3 ml-12">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-(--accent)/50" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}