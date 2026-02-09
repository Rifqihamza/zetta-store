'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { brand } from "@/config/brand"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 32)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { title: "Home", href: "/" },
        { title: "About", href: "#aboutPage" },
        { title: "Assets", href: "#assetPage" },
        { title: "How It Works?", href: "#how-it-works" },
        { title: "FAQ", href: "#faqPage" },
    ]

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full overflow-x-hidden transition-all duration-300
        ${isScrolled
                    ? "bg-(--primary)/5 backdrop-blur-xl shadow-lg shadow-black/40"
                    : "bg-transparent"}
        `}
        >
            {/* ===== NAV BAR ===== */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6">
                {/* Brand */}
                <Link
                    href="/"
                    className="text-3xl text-white font-semibold tracking-wider font-(family-name:--font-bodoni-moda)"
                >
                    {brand.name}
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-6 md:flex">
                    {navLinks.map((item) => (
                        <li key={item.title}>
                            <NavItem href={item.href}>{item.title}</NavItem>
                        </li>
                    ))}

                    <li>
                        <Link
                            href="#assetPage"
                            className="rounded-full bg-(--primary) px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-(--secondary)"
                        >
                            Get Access
                        </Link>
                    </li>
                </ul>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="inline-flex items-center justify-center md:hidden"
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* ===== MOBILE MENU ===== */}
            {open && (
                <div className="md:hidden w-full max-w-full overflow-x-hidden border-t border-(--accent)/20 bg-black/95 backdrop-blur-xl">
                    <ul className="flex flex-col gap-6 px-6 py-8">
                        {navLinks.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block text-lg text-(--text-gray) transition-colors hover:text-white"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}

                        <li className="pt-4">
                            <Link
                                href="#assetPage"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-full items-center justify-center rounded-full bg-(--primary) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--secondary)"
                            >
                                Get Access
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}

/* ===== DESKTOP NAV ITEM ===== */
function NavItem({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className="group relative text-sm text-(--text-gray) transition-colors hover:text-white"
        >
            {children}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-(--accent) transition-all duration-300 group-hover:w-full" />
        </Link>
    )
}
