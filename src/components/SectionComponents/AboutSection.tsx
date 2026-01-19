'use client'

import { Sparkles, Layers, Zap, CheckCircle2 } from "lucide-react"
import SpotlightCard from "../ui/SpotlightCard"
import { brand } from "../../config/brand"

const WhatIsZetta = () => {
    const features = [
        {
            icon: <Layers size={20} />,
            title: "Curated Assets",
            desc: "High-quality digital assets carefully selected for real-world projects.",
        },
        {
            icon: <Zap size={20} />,
            title: "Built for Speed",
            desc: "Save hours of work with ready-to-use templates and resources.",
        },
        {
            icon: <Sparkles size={20} />,
            title: "Modern Workflow",
            desc: "Designed to fit modern creators and developers workflow.",
        },
    ]

    return (
        <section
            id="what-zetta"
            className="relative py-15 px-6 max-w-7xl mx-auto"
        >
            {/* subtle background glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 
          w-150 h-150 
          bg-(--accent)/10 blur-[120px] rounded-full" />
            </div>

            {/* heading */}
            <div className="text-center max-w-2xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                    What is {brand.name}?
                </h2>

                <p className="text-(--text-gray) leading-relaxed">
                    {brand.name} is a premium digital assets platform built to help creators and
                    developers turn ideas into real projects—faster, cleaner, and smarter.
                </p>
            </div>

            {/* cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {features.map((item, idx) => (
                    <SpotlightCard key={idx}
                        className="custom-spotlight-card bg-(--primary)/10 border border-(--secondary)"
                        spotlightColor="rgb(93, 14, 255, 1)">
                        {/* icon */}
                        <div className="flex flex-row items-center gap-2 mb-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-(--accent)/15 text-(--accent)">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-medium">
                                {item.title}
                            </h3>
                        </div>

                        <p className="text-sm text-(--text-gray)">
                            {item.desc}
                        </p>
                    </SpotlightCard>
                ))}
            </div>
        </section>
    )
}

const WhyIsZetta = () => {
    const reasons = [
        "Curated assets for real-world projects",
        "Clean structure, easy to integrate",
        "Built for creators & developers",
        "No repetitive work, save your time",
        "Scalable for personal & commercial use",
    ]

    return (
        <section
            id="why-zetta"
            className="relative py-16 px-6 max-w-7xl mx-auto"
        >
            {/* background accent */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute right-0 top-1/2 
          -translate-y-1/2 
          w-125 h-125 
          bg-(--accent)/10 blur-[120px] rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* left copy */}
                <div>
                    <span className="text-sm tracking-wider
            text-(--accent)
            bg-(--accent)/10 backdrop-blur-xl
            border border-(--secondary)/60
            px-4 py-1 rounded-full uppercase">
                        Why {brand.name}?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                        Designed to help you build faster,
                        <br />
                        without compromising quality.
                    </h2>

                    <p className="text-(--text-gray) leading-relaxed max-w-md">
                        {brand.name} is built with a clear focus on efficiency and quality,
                        providing assets that fit seamlessly into modern workflows.
                    </p>
                </div>

                {/* right list */}
                <div className="space-y-4">
                    {reasons.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 
                p-4 rounded-xl 
                bg-(--primary)/5 
                border border-(--secondary)/50
                backdrop-blur-xl"
                        >
                            <CheckCircle2
                                size={20}
                                className="text-(--accent)"
                            />
                            <p className="text-sm text-(--text-gray)">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}



export default function AboutSection() {
    return (
        <main className="w-full flex flex-col items-center justify-center">
            <span className="text-xs tracking-wider
            text-(--text-gray)
            bg-(--accent)/10 backdrop-blur-xl
            border border-(--secondary)/30
            px-4 py-1 rounded-full uppercase">
                About {brand.name}
            </span>

            <WhatIsZetta />
            <WhyIsZetta />
        </main>
    )
}
