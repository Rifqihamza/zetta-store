import { rupiahFormat } from "@/lib/currencyFormat";
import {
    CheckoutButton,
    CopyLinkButton,
    ShareButton,
    GoBackButton,
    ViewAllAssetsButton,
} from "@/hooks";
import { ArrowLeft, BoxIcon, Zap, CreditCard, FileText } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/productService";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) return notFound();

    return (
        // Gunakan px-4 untuk mobile, lg:px-8 untuk desktop agar tidak terlalu mepet tembok
        <section className="py-8 md:py-14 px-4 lg:px-8 max-w-7xl mx-auto relative min-h-screen pb-40 text-black">

            {/* 1. Navigasi Kembali */}
            <div className="mb-6 md:mb-10">
                <GoBackButton className="inline-flex items-center justify-center gap-2 bg-white p-2.5 md:p-3 border-4 border-black font-black uppercase text-[10px] md:text-xs tracking-tighter hover:bg-(--secondary) hover:-translate-y-1 transition-all [box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                    <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                    <span>Return_To_Vault</span>
                </GoBackButton>
            </div>

            {/* 2. Top Section: Hero Grid */}
            {/* Shadow dikecilkan di mobile (8px) dan besar di desktop (16px) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-black bg-white [box-shadow:8px_8px_0px_0px_rgba(0,0,0,1)] lg:[box-shadow:16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-12 md:mb-16">

                {/* Carousel Area */}
                <div className="border-b-4 lg:border-b-0 lg:border-r-4 border-black p-4 md:p-6 bg-[#eeeeee] overflow-hidden relative flex items-center">
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <Carousel images={product.allImages} title={product.title} />
                </div>

                {/* Info Area */}
                <div className="flex flex-col p-6 md:p-10 bg-white">
                    <div className="space-y-6 md:space-y-8 grow">
                        {/* Type Label */}
                        <div className="inline-flex items-center gap-2 bg-(--secondary) text-black border-2 border-black px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] [box-shadow:3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <Zap size={12} fill="currentColor" />
                            {product.item_types || "Standard Asset"}
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-[0.85] italic text-black wrap-break-word">
                                {product.title}<span className="text-(--primary) not-italic">.</span>
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {product.labels.map((label) => (
                                    <span key={label} className="bg-black text-white px-2 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-2 border-black">
                                        {label}
                                    </span>
                                ))}
                            </div>

                            <p className="text-base md:text-lg font-bold leading-tight text-black/70 font-mono">
                                {product.description}
                            </p>

                            <div className="bg-(--primary)/5 p-4 md:p-5 border-l-4 md:border-l-8 border-(--primary) font-bold text-xs md:text-sm leading-relaxed">
                                <span className="text-(--primary) font-black uppercase block mb-1">Architect Notes:</span>
                                High-performance digital components optimized for modern development workflows.
                            </div>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-8 md:mt-12 pt-6 md:pt-10 border-t-4 border-black space-y-6 md:space-y-8">
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-black/40 tracking-widest mb-1">Current_Value</span>
                                <p className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none">
                                    {product.displayPrice || rupiahFormat(product.price)}
                                </p>
                            </div>
                            {/* Di mobile kita sembunyikan atau perkecil agar tidak bertumpukan */}
                            <div className="hidden md:block rotate-12">
                                <div className="bg-green-400 border-4 border-black px-4 py-1 font-black text-xs uppercase [box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    Verified_Secure
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="w-full">
                                <CheckoutButton product={product} />
                            </div>
                            {/* Flex-wrap agar tombol aksi tidak overflow ke samping di HP kecil */}
                            <div className="flex flex-row gap-2 md:gap-3">
                                <ShareButton product={product} />
                                <CopyLinkButton product={product} />
                                <div className="hidden xs:block">
                                    <ViewAllAssetsButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">

                {/* Documentation Block */}
                <div className="lg:col-span-8 border-4 border-black bg-white p-6 md:p-10 [box-shadow:8px_8px_0px_0px_rgba(0,0,0,1)] lg:[box-shadow:12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4 mb-6 md:mb-10 border-b-4 md:border-b-8 border-black pb-4 md:pb-6">
                        <div className="bg-black p-1.5 md:p-2 text-white">
                            <FileText className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Description</h2>
                    </div>

                    <div
                        className="prose prose-sm md:prose-xl max-w-none font-bold
                                   prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
                                   prose-strong:bg-(--secondary) prose-strong:px-1 prose-p:text-black/80 prose-li:text-black"
                        dangerouslySetInnerHTML={{ __html: product.rich_description }}
                    />
                </div>

                {/* Sidebar Accordions */}
                <div className="lg:col-span-4 space-y-6 md:space-y-8">
                    <AccordionSection
                        icon={<BoxIcon className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Package_Contents"
                        headerColor="bg-(--secondary)"
                        color="text-black" // Pastikan kontras tinggi
                        items={[
                            "High-resolution source files",
                            "Commercial & personal license",
                            "Instant dashboard access",
                            "Lifetime updates"
                        ]}
                    />

                    <AccordionSection
                        icon={<CreditCard className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Security_Layer"
                        headerColor="bg-(--primary)"
                        color="text-white"
                        items={[
                            "256-bit SSL protection",
                            "Automatic invoice",
                            "24/7 Priority support"
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
function AccordionSection({ title, items, icon, color, headerColor }: { title: string; items: string[]; icon: React.ReactNode; color: string; headerColor: string }) {
    return (
        <div className="border-4 border-black bg-white [box-shadow:8px_8px_0px_0px_var(--border-color)]">
            <details className="group" open>
                <summary className={headerColor + " list-none cursor-pointer flex items-center justify-between p-5 text-white font-black uppercase text-sm tracking-[0.2em]"}>
                    <div className="flex items-center gap-4">
                        <span className={color + " p-2"}>{icon}</span>
                        {title}
                    </div>
                    <span className="group-open:rotate-180 transition-transform font-mono text-xl">↓</span>
                </summary>
                <div className="p-8 bg-white border-t-4 border-black">
                    <ul className="space-y-4">
                        {items.map((item, idx) => (
                            <li key={idx} className="text-black font-black text-xs uppercase flex items-start gap-4 group/item">
                                <div className={`w-3 h-3 mt-0.5 border-2 border-black shrink-0 transition-colors ${color}`} />
                                <span className="opacity-80 group-hover/item:opacity-100">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </details>
        </div>
    );
}