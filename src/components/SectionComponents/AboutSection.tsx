'use client'

import { Sparkles, Layers, Zap, CheckCircle2 } from "lucide-react"
import SpotlightCard from "../ui/SpotlightCard"
import { brand } from "../../config/brand"
import FreesetsReveal from "../ui/AnimationReveal"

const WhatIsZetta = () => {
    const features = [
        {
            icon: <Layers size={24} />,
            title: "Ready-to-Use Templates",
            desc: "Pre-built digital templates and assets that you can customize and use instantly.",
        },
        {
            icon: <Zap size={24} />,
            title: "Work Faster",
            desc: "Skip repetitive setup and launch projects faster with structured, reusable resources.",
        },
        {
            icon: <Sparkles size={24} />,
            title: "Built for Modern Tools",
            desc: "Optimized for modern workflows, tools, and platforms used by today’s creators.",
        },
    ]

    return (
        <section
            id="what-zetta"
            className="relative py-32 px-2 max-w-7xl mx-auto"
        >
            {/* subtle background glow */}
            <div className="absolute inset-0 z-1">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-(--accent)/10 blur-[120px] rounded-full" />
            </div>


            {/* heading */}
            <FreesetsReveal>
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="mb-3">
                        <span className="text-sm tracking-wider text-(--accent) bg-(--accent)/10 backdrop-blur-xl border border-(--secondary)/60 px-4 py-1 rounded-full uppercase">
                            {brand.name}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        What is <span className="font-(family-name:--font-bodoni-moda)">{brand.name}</span>?
                    </h2>
                    <p className="text-(--text-gray) leading-relaxed">
                        <span className="text-(--text-color)">{brand.name}</span> provides ready-made digital templates and assets
                        designed to speed up your workflow - so you can focus on building,
                        not rebuilding.
                    </p>
                </div>
            </FreesetsReveal>

            {/* cards */}
            <div className="flex flex-row gap-6">
                {features.map((item, idx) => (
                    <FreesetsReveal key={idx}>
                        <SpotlightCard
                            className="custom-spotlight-card z-10 h-full"
                            spotlightColor="rgb(93, 14, 255, 1)">
                            <div className="flex flex-col gap-3">
                                {/* icon */}
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-(--primary)/50 text-(--accent)">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-(--text-gray)">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </SpotlightCard>
                    </FreesetsReveal>
                ))}
            </div>
        </section>

    )
}

const WhyIsZetta = () => {
    const reasons = [
        "Ready-to-use digital templates",
        "Structured & easy to customize",
        "No setup from scratch",
        "Built for creators & developers",
        "Save hours on every project",
    ]

    return (

        <section
            id="why-zetta"
            className="relative py-32 px-2 max-w-7xl mx-auto"
        >
            {/* background accent */}
            <div className="absolute inset-0">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-125 h-125 bg-(--accent)/10 blur-[120px] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <FreesetsReveal>
                    {/* left copy */}
                    <div className="text-center md:text-left">
                        <span className="text-3xl md:text-4xl font-bold">
                            Why <span className="font-(family-name:--font-bodoni-moda)">{brand.name}</span>?
                        </span>

                        <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-6">
                            Everything you need to build faster,
                            <br />
                            without starting from zero.
                        </h2>
                        <p className="text-(--text-gray) leading-relaxed max-w-md">
                            <span className="text-(--text-color)">{brand.name}</span> is designed for creators who value speed and clarity.
                            Every product is structured, documented, and ready to use -
                            so you can ship faster with confidence.
                        </p>
                        <p className="text-sm text-(--text-color) mt-2">
                            Pick a template. Customize it. Launch faster.
                        </p>
                    </div>
                </FreesetsReveal>

                {/* right list */}
                <div className="space-y-4">
                    {reasons.map((item, idx) => (
                        <FreesetsReveal key={idx}>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-(--primary)/5 border border-(--secondary)/50 backdrop-blur-xl">
                                <CheckCircle2 size={20} className="text-(--accent)"
                                />
                                <p className="text-sm">
                                    {item}
                                </p>
                            </div>
                        </FreesetsReveal>
                    ))}
                </div>
            </div>
        </section >
    )
}



export default function AboutSection() {
    return (
        <main className="">
            <WhatIsZetta />
            <WhyIsZetta />
        </main>
    )
}
