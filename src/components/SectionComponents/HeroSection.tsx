'use client'

import Link from "next/link"
import Image from "next/image"
import { brand } from "../../config/brand"

export default function HeroSection() {
    return (
        <>
            {/* Gradient disesuaikan: Kuning ke Pink (Sunset) */}
            <section className="bg-linear-to-b from-(--background) via-(--background) to-(--primary) relative w-full h-dvh overflow-hidden">
                <div className="relative w-full h-full">

                    {/* --- MOUNTAINS / CLOUD HEADER (TOP) --- */}
                    <Image
                        src='/assets/invert-mount.png'
                        alt="Mountains"
                        width={1920}
                        height={1080}
                        priority
                        className="pixelated absolute top-0 left-0 w-full h-32 object-cover object-bottom z-10 opacity-90"
                    />

                    {/* --- BRICKS (FLOOR) --- */}
                    <Image
                        src='/assets/brick.png'
                        alt="Bricks"
                        width={1920}
                        height={1080}
                        className="pixelated absolute -bottom-10 left-0 w-full h-50 md:h-70 object-cover object-top z-10"
                    />

                    {/* --- STORE (LEFT) --- */}
                    <Image
                        src='/assets/store.png'
                        alt="Store"
                        width={500}
                        height={500}
                        className="pixelated absolute bottom-0 left-0 w-35 md:w-1/6 object-contain z-10"
                    />

                    {/* --- HALTE (RIGHT) --- */}
                    <Image
                        src='/assets/halte.png'
                        alt="Halte"
                        width={500}
                        height={500}
                        className="pixelated absolute bottom-0 right-0 w-30 md:w-1/6 object-contain z-10"
                    />

                    {/* --- DECORATIONS --- */}
                    <Image
                        src='/assets/stars.png'
                        alt="Stars"
                        width={125}
                        height={125}
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-80 md:w-125 opacity-40 mix-blend-overlay object-cover"
                    />

                    <Image
                        src='/assets/cloud-1.png'
                        alt="Cloud"
                        width={125}
                        height={125}
                        className="pixelated absolute top-1/4 left-5 md:left-40 animate-pulse w-16 md:w-24 object-contain"
                    />
                    <Image
                        src='/assets/cloud-1.png'
                        alt="Cloud"
                        width={125}
                        height={125}
                        className="pixelated absolute bottom-1/3 right-5 md:right-30 animate-pulse w-16 md:w-24 object-contain"
                    />
                </div>

                {/* --- TEXT CONTENT --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
                    {/* Teks Utama menggunakan Hitam agar terbaca di background kuning */}
                    <h2 className="text-4xl md:text-6xl font-black pixelTitle leading-tight text-black drop-shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
                        {brand.slogan}
                    </h2>

                    <p className="text-black/80 text-md md:text-xl font-bold max-w-xs md:max-w-sm leading-relaxed">
                        {brand.description} <br />
                        <span className="bg-black text-white px-2 py-0.5">
                            without starting from scratch.
                        </span>
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-6 md:mt-12 w-full max-w-sm">
                        {/* Button Utama: Pink (Primary) */}
                        <Link
                            href="#assetPage"
                            className="flex items-center justify-center px-3 py-2 md:px-4 md:py-3 font-black uppercase text-xs tracking-tighter bg-(--primary) text-white border-4 border-black [box-shadow:6px_6px_0px_0px_rgba(0,0,0,1)] hover:[box-shadow:2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            Explore Assets
                        </Link>

                        {/* Button Sekunder: Ungu (Secondary) sesuai screenshot terakhir kamu */}
                        <Link
                            href="#aboutPage"
                            className="flex items-center justify-center px-3 py-2 md:px-4 md:py-3 font-black uppercase text-xs tracking-tighter bg-(--secondary) text-white border-4 border-black [box-shadow:6px_6px_0px_0px_rgba(0,0,0,1)] hover:[box-shadow:2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            About Zetta
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}