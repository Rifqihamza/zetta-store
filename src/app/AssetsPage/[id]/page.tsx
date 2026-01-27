import { rupiahFormat } from "@/lib/currencyFormat";
import {
    CheckoutButton,
    CopyLinkButton,
    ShareButton,
    GoBackButton,
    ViewAllAssetsButton,
} from "@/hooks";
import { ArrowLeftCircle, BoxIcon, Info } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { notFound } from "next/navigation";
import { getProductByIdSimplified } from "@/lib/productServiceSimplified";
import { Product } from "@/types/product";

type AssetDetailPageProps = {
    params: Promise<{ id: string }> | { id: string };
};



export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
    // unwrap params if it's a Promise (Next.js may pass a Promise)
    const resolvedParams = (typeof (params as Promise<{ id: string }>)?.then === "function")
        ? await params
        : (params as { id: string });

    const { id } = resolvedParams ?? {};

    // validate id before calling service
    if (!id || typeof id !== "string") {
        // either show 404 or throw a controlled error
        return notFound();
    }

    const product: Product | null = await getProductByIdSimplified(id);

    if (!product) return notFound();

    const price = product.price

    return (
        <section className="py-28 px-6 max-w-6xl mx-auto space-y-10 relative">
            {/* Back Button */}
            <GoBackButton className="flex flex-row items-center gap-2 border-none">
                <ArrowLeftCircle />
                Go Back
            </GoBackButton>

            <div className="grid md:grid-cols-2 gap-16">
                {/* Product Images */}
                <Carousel images={product.images ?? []} title={product.title} />

                {/* Product Info */}
                <div className="space-y-4">
                    {/* Categories */}
                    {product.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="text-[8px] md:text-xs uppercase tracking-wider text-(--accent) bg-(--primary)/20 px-2 py-0.5 rounded-full border border-(--accent)"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl font-semibold mt-3">
                        {product.title || "Untitled Product"}
                    </h1>

                    <p className="text-2xl font-semibold text-(--primary)">
                        {rupiahFormat(price)}
                    </p>

                    {/* Checkout button (optional if product has checkoutUrl) */}

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

            {/* Extra Info Sections */}
            <div className="space-y-4 py-16">
                <Section
                    icon={<BoxIcon />}
                    title="What You Will Get"
                    items={[
                        "High quality digital asset",
                        "Instant access",
                        "Ready to use files",
                    ]}
                />

                <Section
                    icon={<Info />}
                    title="How To Order"
                    items={[
                        "Click checkout",
                        "Redirected to Scalev",
                        "Complete payment & download",
                    ]}
                />
            </div>
        </section>
    );
}

function Section({
    title,
    items,
    icon,
}: {
    title: string;
    items: string[];
    icon: React.ReactNode;
}) {
    return (
        <div className="collapse collapse-arrow border border-(--primary) bg-(--primary)/10 backdrop-blur-xl">
            <input type="radio" name="accordion" defaultChecked />
            <div className="flex flex-row items-center gap-2 collapse-title">
                <h1 className="font-semibold text-xl">{title}</h1>
                <span>{icon}</span>
            </div>
            <div className="collapse-content pl-10 space-y-2">
                <ul className="list-disc text-gray-300">
                    {items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}