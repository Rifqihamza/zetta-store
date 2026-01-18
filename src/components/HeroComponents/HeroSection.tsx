'use client'

import OrbComponent from "../ui/OrbComponent"
import Link from "next/link"

export default function HeroSection() {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-150 pointer-events-none">
                <OrbComponent hoverIntensity={0} />
            </div>

            <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs tracking-wider text-(--text-gray) bg-(--accent)/10 backdrop-blur-xl border border-(--secondary)/30 px-4 py-1 rounded-full">
                        NEXORA
                    </span>

                    <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
                        Build What`s Next.
                    </h1>

                    <p className="text-md text-(--text-gray) max-w-xl">
                        Premium digital assets designed to help <br />
                        <span className="text-white font-medium">
                            creators & developers
                        </span>{" "}
                        build faster and smarter.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link
                        href="#assetPage"
                        className="rounded-full
              bg-(--primary)
              px-4 py-2
              text-sm font-medium text-white
              hover:bg-(--secondary) transition-colors"
                    >
                        Explore Assets
                    </Link>

                    <Link
                        href="#how-it-works"
                        className="rounded-full 
              bg-(--primary)/20 
              border border-(--accent) 
              px-4 py-2 
              text-sm text-white 
              hover:bg-(--muted) transition-colors"
                    >
                        How It Works
                    </Link>
                </div>
            </section>
        </>
    )
}
