'use client'
import Link from "next/link"
import Image from "next/image"
export default function Navbar() {
    const NavLink = [
        { title: "Home", href: "/" },
        { title: "About", href: "#aboutPage" },
        { title: "Assets", href: "#assetPage" },
        { title: "How It Works", href: "#how-it-works" },
        { title: "Why Nexora", href: "#why-nexora" },
    ]

    return (
        <header className="fixed top-5 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between bg-(--primary)/10 backdrop-blur-xl px-8 py-3 border border-(--secondary)/20 rounded-full">
                <Image
                    src="/favicon/nexoraIcon.png"
                    alt="Nexora Store Logo"
                    width={80}
                    height={80}
                    className="w-20 h-auto scale-145"
                    priority
                />
                <ul className="flex items-center gap-5">
                    {NavLink.map((n, idx) => (
                        <li key={idx}>
                            <Link
                                href={n.href}
                                className="relative text-sm text-(--text-gray) hover:text-white transition-colors group"
                            >
                                {n.title}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--accent) group-hover:w-full transition-all duration-300" />
                            </Link>
                        </li>
                    ))}

                    <li>
                        <Link
                            href="#assetPage"
                            className="rounded-full 
                bg-(--primary) 
                px-5 py-2 
                text-sm font-medium text-white 
                hover:bg-(--secondary) transition-colors"
                        >
                            Get Access
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
