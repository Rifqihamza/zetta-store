'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { brand } from "@/config/brand"
import { Menu, X } from "lucide-react"

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
        { title: "Why Zetta?", href: "#why-zetta" },
        { title: "How It Works?", href: "#how-it-works" },
    ]

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out 
            ${isScrolled
                ? "bg-(--primary)/5 backdrop-blur-xl shadow-lg shadow-black/40 py-3"
                : "py-2"}
            `}>
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="text-xl font-semibold tracking-wider uppercase">
                    {brand.name}
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((item) => (
                        <li key={item.title}>
                            <NavItem href={item.href}>{item.title}</NavItem>
                        </li>
                    ))}

                    <li>
                        <Link
                            href="#assetPage"
                            className="rounded-full bg-(--primary) px-5 py-2 text-sm font-medium text-white hover:bg-(--secondary) transition-colors"
                        >
                            Get Access
                        </Link>
                    </li>
                </ul>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-(--accent)/20">
                    <ul className="flex flex-col gap-6 px-6 py-8">
                        {navLinks.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block text-lg text-(--text-gray) hover:text-white transition-colors"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}

                        <li className="pt-4">
                            <Link
                                href="#assetPage"
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center w-full rounded-full bg-(--primary) px-6 py-3 text-sm font-medium text-white hover:bg-(--secondary) transition-colors"
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

/* ---------- Desktop Nav Item ---------- */
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
            className="relative text-sm text-(--text-gray) hover:text-white transition-colors group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-(--accent) transition-all duration-300 group-hover:w-full" />
        </Link>
    )
}
