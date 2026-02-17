'use client'

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Info, ShoppingBag, HelpCircle, Zap } from "lucide-react"
import { brand } from "@/config/brand"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const navLinks = [
        { title: "Home", href: "/", icon: <Home size={18} /> },
        { title: "About", href: "#aboutPage", icon: <Info size={18} /> },
        { title: "Assets", href: "#assetPage", icon: <ShoppingBag size={18} /> },
        { title: "Flow", href: "#how-it-works", icon: <Zap size={18} /> },
        { title: "FAQ", href: "#faqPage", icon: <HelpCircle size={18} /> },
    ]

    return (
        <header className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 w-auto">
            {/* ===== THE DOCK CONTAINER ===== */}
            <nav className="relative flex items-center gap-2 bg-(--primary) border-4 border-black p-2">

                {/* Brand / Logo (Mobile only or Icon) */}
                <Link
                    href="/"
                    className="hidden md:flex items-center justify-center px-4 py-2 bg-(--background) border-2 border-black font-black text-black text-sm uppercase mr-2"
                >
                    {brand.name}
                </Link>

                {/* Desktop Dock Items */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((item) => (
                        <li key={item.title}>
                            <Link
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-all font-mono text-xs uppercase font-bold"
                            >
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    ))}

                    {/* Action Button */}
                    <li className="ml-2">
                        <Link
                            href="#assetPage"
                            className="bg-(--secondary) border-2 border-black px-4 py-2 text-xs font-black text-white uppercase"
                        >
                            Get Access
                        </Link>
                    </li>
                </ul>

                {/* Mobile Toggle (Inside the floating dock) */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center p-3 text-white md:hidden"
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* ===== MOBILE MENU POPUP (Floating above dock) ===== */}
            {open && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 bg-white border-4 border-black p-4 [box-shadow:8px_8px_0px_0px_rgba(0,0,0,1)] md:hidden">
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-black font-black uppercase text-sm border-2 border-transparent hover:border-black hover:bg-(--background) transition-all"
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}