'use client'

import OrbComponent from "../ui/OrbComponent"
import Link from "next/link"
import { brand } from "../../config/brand"

export default function HeroSection() {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-150 pointer-events-none">
                <OrbComponent hoverIntensity={0} />
            </div>

            <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-sm tracking-wider text-(--text-color) bg-(--primary)/30 backdrop-blur-xl border border-(--accent) px-4 py-1 rounded-full">
                        {brand.name.toUpperCase()}
                    </span>

                    <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
                        {brand.slogan}
                    </h1>

                    <p className="text-md text-(--text-gray) max-w-xs">
                        {brand.description} <br />
                        <span className="text-white font-medium">
                            without starting from scratch.
                        </span>
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 w-70 mx-auto">
                    <Link
                        href="#assetPage"
                        className="rounded-full px-2 py-2 text-sm bg-(--primary)/30 border border-(--accent) hover:bg-(--primary) hover:border-(--primary) transition"
                    >
                        Explore Assets
                    </Link>

                    <Link
                        href="#how-it-works"
                        className="rounded-full px-2 py-2 text-sm bg-(--primary)/30 border border-(--accent) hover:bg-(--primary) hover:border-(--primary) transition"
                    >
                        How It Works
                    </Link>
                </div>
            </section>
        </>
    )
}
