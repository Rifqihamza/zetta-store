import Link from "next/link"
import { brand } from "../../config/brand"

export default function Footer() {
    const quickLinks = [
        { title: "Home", href: "/" },
        { title: "About", href: "#aboutPage" },
        { title: "Assets", href: "#assetPage" },
        { title: "How It Works", href: "#how-it-works" },
        { title: "FAQ", href: "#faqPage" },
    ]

    const legalLinks = [
        { title: "Terms of Service", href: "/TermsServicePage" },
        { title: "Privacy Policy", href: "/PrivacyPage" },
        { title: "License Rights", href: "/LicensePage" },
    ]

    const contacts = [
        { title: "Instagram", href: "https://www.instagram.com/zettaproject.id" },
        { title: "Whatsapp", href: "https://wa.me/6285111600850" },
    ]

    return (
        // Menggunakan bg-black untuk kontras maksimal dengan section FAQ yang putih
        <footer className="w-full bg-black text-white pt-24 pb-28 px-4 border-t-12 border-(--primary)">
            <div className="max-w-7xl mx-auto">

                {/* Main Footer Box dengan Border Putih Tebal */}
                <div className="grid grid-cols-1 md:grid-cols-12 border-4 border-[rgba(251,107,162,1)]">

                    {/* Brand Section */}
                    <div className="md:col-span-5 p-10 border-b-4 md:border-b-0 md:border-r-4 border-[rgba(251,107,162,1)] bg-white/5">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 italic leading-none">
                            {brand.name}<span className="text-(--primary) not-italic">_</span>
                        </h2>
                        <p className="font-bold text-sm md:text-base leading-relaxed opacity-70 max-w-sm uppercase tracking-tight">
                            {brand.slogan}. Premium digital assets built for speed, designed for the <span className="text-(--secondary)">future frontier</span>.
                        </p>

                        {/* Status Indicator - Neon Feel */}
                        <div className="mt-10 inline-flex items-center gap-3 border-2 border-white px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] bg-white text-black font-black">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            System_Online
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3">
                        {/* Navigation */}
                        <div className="p-10 border-b-4 sm:border-b-0 sm:border-r-4 border-[rgba(251,107,162,1)] group hover:bg-(--primary)/10 transition-colors">
                            <h3 className="text-(--primary) font-black uppercase text-xs tracking-[0.3em] mb-8 border-b-2 border-(--primary) inline-block">
                                Menu
                            </h3>
                            <ul className="space-y-5">
                                {quickLinks.map((item) => (
                                    <li key={item.title}>
                                        <FooterLink href={item.href}>{item.title}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="p-10 border-b-4 sm:border-b-0 sm:border-r-4 border-[rgba(251,107,162,1)] group hover:bg-(--secondary)/10 transition-colors">
                            <h3 className="text-(--secondary) font-black uppercase text-xs tracking-[0.3em] mb-8 border-b-2 border-(--secondary) inline-block">
                                Legal
                            </h3>
                            <ul className="space-y-5">
                                {legalLinks.map((item) => (
                                    <li key={item.title}>
                                        <FooterLink href={item.href}>{item.title}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div className="p-10 group hover:bg-white/10 transition-colors">
                            <h3 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8 border-b-2 border-white inline-block">
                                Social
                            </h3>
                            <ul className="space-y-5">
                                {contacts.map((item) => (
                                    <li key={item.title}>
                                        <FooterLink href={item.href}>{item.title}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Terminal Style */}
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/40 gap-4">
                    <p className="hover:text-(--primary) transition-colors cursor-crosshair">
                        © {new Date().getFullYear()} {brand.name}Project // ALL_RIGHTS_RESERVED
                    </p>
                    <div className="flex gap-6">
                        <span>LAT: -6.2410°</span>
                        <span>LONG: 106.9924°</span>
                        <span className="animate-pulse">LOC: BEKASI_ID</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-tighter transition-all hover:text-white"
        >
            {/* Indikator CMD Prompt */}
            <span className="text-(--primary) group-hover:translate-x-1 transition-transform font-mono">
                {'>'}
            </span>
            <span className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                {children}
            </span>
        </Link>
    )
}