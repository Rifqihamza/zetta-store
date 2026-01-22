import Link from "next/link"
import { brand } from "../../config/brand"

export default function Footer() {
    const quickLinks = [
        { title: "Home", href: "/" },
        { title: "About", href: "#aboutPage" },
        { title: "Assets", href: "#assetPage" },
        { title: "How It Works", href: "#how-it-works" },
        { title: "Why Zetta", href: "#why-zetta" },
    ]

    const legalLinks = [
        { title: "Terms of Service", href: "/terms" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "License & Usage Rights", href: "/license" },
    ]

    const contacts = [
        { title: "Instagram", href: "#" },
        { title: "X (Twitter)", href: "#" },
    ]

    return (
        <footer className="w-full">
            <hr className="translate-y-5 w-full max-w-7xl mx-auto text-(--primary)/40" />
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Top */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Brand */}
                    <div className="w-full">
                        <h2 className="text-xl md:text-3xl font-semibold tracking-wider uppercase">
                            {brand.name}
                        </h2>
                        <p className="text-md md:text-lg font-medium">
                            {brand.slogan}
                        </p>
                        <p className="mt-2 text-sm md:text-md text-(--text-gray) max-w-xs leading-relaxed">
                            Premium digital templates and assets designed to help creators
                            build faster with confidence.
                        </p>
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-(--accent) font-medium text-lg mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks.map((item) => (
                                    <li key={item.title}>
                                        <FooterLink href={item.href}>{item.title}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-(--accent) font-medium text-lg mb-4">
                                Legal
                            </h3>
                            <ul className="space-y-3">
                                {legalLinks.map((item) => (
                                    <li key={item.title}>
                                        <FooterLink href={item.href}>{item.title}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-(--accent) font-medium text-lg mb-4">
                                Contact
                            </h3>
                            <ul className="space-y-3">
                                {contacts.map((item) => (
                                    <li key={item.title}>
                                        <FooterLink href={item.href}>{item.title}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-center pt-20">
                    <p className="text-sm text-(--text-gray)">
                        © {new Date().getFullYear()} {brand.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

/* ---------- Reusable Footer Link ---------- */
function FooterLink({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className="relative inline-block text-(--text-gray) transition-colors duration-300 hover:text-white group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-(--accent) transition-all duration-300 group-hover:w-full" />
        </Link>
    )
}
