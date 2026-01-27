import { rupiahFormat } from "@/lib/currencyFormat";
import {
    CheckoutButton,
    CopyLinkButton,
    ShareButton,
    GoBackButton,
    ViewAllAssetsButton,
} from "@/hooks"; // Pastikan export di hooks/index.ts sudah benar
import { ArrowLeftCircle, BoxIcon, Info } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/productService";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) return notFound();
    console.log("Gambar untuk Carousel:", product.allImages);
    return (
        <section className="py-28 px-6 max-w-6xl mx-auto space-y-10 relative">
            <GoBackButton className="flex flex-row items-center gap-2 border-none transition-colors hover:text-(--accent)">
                <ArrowLeftCircle className="w-5 h-5" />
                Go Back
            </GoBackButton>

            <div className="grid md:grid-cols-2 gap-16">
                <Carousel images={product.allImages} title={product.title} />

                <div className="space-y-6">
                    {product.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="text-[10px] uppercase tracking-widest text-(--accent) bg-(--primary)/20 px-3 py-1 rounded-full border border-(--accent)/30"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-xl md:text-3xl font-bold tracking-tight">{product.title}</h1>
                    <div
                        className="text-md leading-relaxed text-gray-300"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <p className="text-3xl font-semibold text-(--accent)">
                        {product.displayPrice || rupiahFormat(product.price)}
                    </p>

                    <div className="space-y-3">
                        <CheckoutButton product={product} />
                        <p className="text-xs text-gray-500 italic">
                            Secure payment via our official partner (Scalev)
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-(--primary)/20">
                        <ShareButton product={product} />
                        <CopyLinkButton product={product} />
                        <ViewAllAssetsButton />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 py-16">
                <AccordionSection
                    icon={<BoxIcon className="w-5 h-5" />}
                    title="What You Will Get"
                    items={[
                        "High quality digital asset",
                        "Instant access after payment",
                        "Lifetime updates",
                        "Ready to use files",
                    ]}
                />

                <AccordionSection
                    icon={<Info className="w-5 h-5" />}
                    title="How To Order"
                    items={[
                        "Click the checkout button",
                        "Complete payment on Scalev page",
                        "Check your email for download link",
                    ]}
                />
            </div>
        </section>
    );
}

function AccordionSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
    return (
        <div className="collapse collapse-arrow border border-(--primary)/30 bg-(--primary)/5 backdrop-blur-sm rounded-xl">
            <input type="radio" name="asset-accordion" defaultChecked />
            <div className="collapse-title flex items-center gap-3 text-lg font-medium">
                <span className="text-(--accent)">{icon}</span>
                {title}
            </div>
            <div className="collapse-content pl-12">
                <ul className="list-disc space-y-2 text-gray-400 text-sm">
                    {items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}