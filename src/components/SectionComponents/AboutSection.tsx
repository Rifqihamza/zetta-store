'use client'

import { Sparkles, Layers, Zap, CheckCircle2 } from "lucide-react"
import { brand } from "../../config/brand"
import FreesetsReveal from "../ui/AnimationReveal"

const WhatIsZetta = () => {
    const features = [
        {
            icon: <Layers size={24} />,
            title: "READY-TO-USE ASSETS",
            desc: "Premium digital templates and pixel-perfect assets licensed for commercial use. Just drag, drop, and deploy.",
        },
        {
            icon: <Zap size={24} />,
            title: "TURBO WORKFLOW",
            desc: "Skip the boring setup. Launch your indie projects faster with our pre-structured, reusable resources.",
        },
        {
            icon: <Sparkles size={24} />,
            title: "VERSATILE DIGITAL ASSETS",
            desc: "From UI components to environment sprites. A diverse collection designed to fit seamlessly into any retro project.",
        },
    ]

    return (
        <section id="what-zetta" className="relative py-10 px-4 max-w-7xl mx-auto">
            <FreesetsReveal>
                <div className="text-center max-w-3xl mx-auto mb-14">
                    {/* Badge Style - Dibuat lebih kontras */}
                    <span className="inline-block px-3 py-1 bg-black text-(--background) text-[10px] md:text-xs mb-6 tracking-[0.2em] font-black uppercase">
                        SYSTEM_OVERVIEW v1.0
                    </span>
                    <h2 className="text-3xl md:text-6xl mb-2 pixelTitle uppercase text-black">
                        What is {brand.name}?
                    </h2>
                    <p className="text-md md:text-xl leading-relaxed font-bold text-black/80">
                        {brand.name} is an <span className="bg-black text-white px-2 italic">elite vault</span> of
                        ready-to-use digital assets. We build the foundation, so you can focus on the
                        creative explosion.
                    </p>
                </div>
            </FreesetsReveal>

            {/* Cards - Menggunakan Putih agar kontras dengan Background Kuning/Pink */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {features.map((item, idx) => (
                    <FreesetsReveal key={idx}>
                        <div className="group h-full rounded-2xl bg-white p-8 [box-shadow:0px_10px_0px_0px_var(--primary)] hover:[box-shadow:0px_6px_0px_0px_var(--secondary)] hover:translate-y-1 transition-all duration-200">
                            <div className="flex flex-col gap-6">
                                {/* Icon Box - Menggunakan Warna Secondary (Ungu) */}
                                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-(--primary) group-hover:bg-(--secondary) text-(--primary-tint) group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl md:text-2xl uppercase font-black italic tracking-tighter">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base leading-relaxed text-black/70 font-bold uppercase tracking-tight">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FreesetsReveal>
                ))}
            </div>
        </section>
    )
}

const WhyIsZetta = () => {
    const reasons = [
        "Commercial-ready license included",
        "Structured & easy to customize",
        "Zero-setup architecture",
        "Built for high-performance creators",
        "Save 40+ hours per project",
    ]

    return (
        <section id="why-zetta" className="relative py-6 px-4 max-w-7xl mx-auto">
            {/* Inner Container: Putih dengan border hitam tebal */}
            <div className="rounded-2xl bg-white p-8 md:p-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <FreesetsReveal>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-6xl font-black uppercase mb-8 leading-[0.9] text-black">
                                Why Choose <br />
                                <span className="text-(--primary) italic">{brand.name}?</span>
                            </h2>
                            <p className="text-lg md:text-xl font-bold text-black/70 mb-8 uppercase tracking-tighter">
                                Everything you need to ship faster, without compromising on quality or licensing headaches.
                            </p>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-(--primary) text-white font-mono text-[10px] uppercase tracking-widest rounded-xl">
                                <span className="w-2 h-2 bg-green-400 animate-ping"></span>
                                System: Ready for Deployment
                            </div>
                        </div>
                    </FreesetsReveal>

                    <div className="grid grid-cols-1 gap-4">
                        {reasons.map((item, idx) => (
                            <FreesetsReveal key={idx}>
                                {/* List Item: Background Ungu (Secondary) ke Pink saat hover */}
                                <div className="group flex items-center gap-4 p-5 bg-(--primary) text-white rounded-xl hover:bg-(--secondary) hover:-translate-y-1 transition-all">
                                    <CheckCircle2 size={24} className="text-(--primary-light) group-hover:text-(--primary-tint)" />
                                    <p className="text-sm md:text-lg font-black uppercase tracking-tight">
                                        {item}
                                    </p>
                                </div>
                            </FreesetsReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function AboutSection() {
    return (
        <main className="relative overflow-hidden">
            <WhatIsZetta />
            <WhyIsZetta />
        </main>
    )
}