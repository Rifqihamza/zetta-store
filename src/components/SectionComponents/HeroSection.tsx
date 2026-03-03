'use client'

import Link from "next/link"
import { brand } from "../../config/brand"
import PixelBlast from '../ui/PixelBlast'
import Image from "next/image"
export default function HeroSection() {
    return (
        <>
            <div className="absolute top-0 left-0 z-0 w-full h-auto">
                <Image
                    src={'/assets/mountain.svg'}
                    alt="Mountain Top"
                    width={1920}
                    height={1080}
                    className="w-full h-full scale-105" />
                <PixelBlast
                    variant="square"
                    pixelSize={6}
                    color="#fb6ba2"
                    patternScale={8}
                    patternDensity={2}
                    pixelSizeJitter={4}
                    enableRipples
                    rippleSpeed={0.8}
                    rippleThickness={0.20}
                    rippleIntensityScale={1.5}
                    liquid={false}
                    liquidStrength={0.12}
                    liquidRadius={1.5}
                    liquidWobbleSpeed={5}
                    speed={0.9}
                    edgeFade={0.50}
                    transparent
                />
            </div>

            {/* Gradient disesuaikan: Kuning ke Pink (Sunset) */}
            <section className="w-full z-1">
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
                            className="flex items-center justify-center px-4 py-2 bg-(--primary) border-4 border-black text-sm md:text-base font-black text-white  uppercase shadow-[0_8px_0_0_#000] hover:shadow-[0_0px_0_0_#000] hover:translate-y-2 active:translate-y-2 translate-y-0"
                        >
                            Explore Assets
                        </Link>

                        {/* Button Sekunder: Ungu (Secondary) sesuai screenshot terakhir kamu */}
                        <Link
                            href="#aboutPage"
                            className="flex items-center justify-center px-4 py-2 bg-(--secondary) border-4 border-black text-sm md:text-base font-black text-white  uppercase shadow-[0_8px_0_0_#000] hover:shadow-[0_0px_0_0_#000] hover:translate-y-2 active:translate-y-2 translate-y-0"
                        >
                            About Zetta
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}