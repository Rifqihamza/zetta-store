import Image from "next/image"
import Link from "next/link"
import { brand } from "../../config/brand"
export default function Footer() {
    const quickLink = [
        { title: "Home", href: "/" },
        { title: "About", href: "#aboutPage" },
        { title: "Assets", href: "#assetPage" },
        { title: "How It Works", href: "#how-it-works" },
        { title: "Why Zetta", href: "#why-zetta" },

    ]

    const legalData = [
        { title: "Terms of Service" },
        { title: "Privacy Policy" },
        { title: "License/Usage Rights" },
    ]

    const contactSupport = [
        { title: "Instagram", href: "", icon: "/img/instagram.png" },
        { title: "X", href: "", icon: "/img/x.png" },
    ]
    return (
        <>
            <footer className="p-6 w-full max-w-7xl mx-auto border-t border-(--accent)/40">
                <div className="flex flex-row items-start justify-between">
                    {/* Brand + Tagline */}
                    <div className="flex-1 space-y-2">
                        <Image
                            src="/favicon/zettaIcon.png"
                            alt={`Icon ${brand.name}`}
                            width={500}
                            height={500}
                            className="w-20 h-auto scale-145 ml-2"
                        />
                        <p className="font-medium text-sm tracking-wide max-w-sm">{brand.slogan}</p>
                    </div>

                    <div className="flex-1 flex flex-row items-start justify-between gap-4">
                        {/* Quick Links */}
                        <div>
                            <h1 className="text-(--accent) font-medium tracking-wide text-xl">Quick Links</h1>
                            {quickLink.map((ql, idx) => (
                                <ul key={idx} className="space-y-2">
                                    <li>
                                        <Link href={ql.href} className="text-(--text-gray) hover:text-white group relative duration-300">
                                            {ql.title}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--accent) group-hover:w-full duration-300"></span>
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </div>

                        {/* Legal */}
                        <div className="space-y-2">
                            <h1 className="text-(--accent) font-medium tracking-wide text-xl">Legal</h1>
                            {legalData.map((legal, idx) => (
                                <ul key={idx} className="space-y-2">
                                    <li>
                                        <Link href="/" className="text-(--text-gray) hover:text-white group relative duration-300">
                                            {legal.title}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--accent) group-hover:w-full duration-300"></span>
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        {/* Contact Support */}
                        <div className="space-y-2">
                            <h1 className="text-(--accent) font-medium tracking-wide text-xl">Contact</h1>
                            {contactSupport.map((cs, idx) => (
                                <ul key={idx} className="space-y-2">
                                    <li className="flex flex-col items-start justify-center">
                                        <Link href={cs.href} className="flex flex-row items-center justify-center gap-2">
                                            <p className="text-(--text-gray) hover:text-white group relative duration-300">
                                                {cs.title}
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--accent) group-hover:w-full duration-300"></span>
                                            </p>
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
                <p
                    className="text-sm text-(--text-gray) text-center mt-10">
                    &copy; {new Date().getFullYear()}
                    {brand.name} Store. <a href="/syarat-ketentuan">All rights reserved</a>.
                </p>
            </footer>
        </>
    )
}
