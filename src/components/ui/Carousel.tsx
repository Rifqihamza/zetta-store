"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ images, title }: { images: string[]; title: string }) {
    if (!images?.length) return null;

    const scrollTo = (i: number) => {
        const el = document.getElementById(`slide-${i}`);
        el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    return (
        <div className="relative group">
            <div className="carousel aspect-4/3 rounded-lg overflow-hidden bg-black/5">
                {images.map((src, i) => (
                    <div key={`${src}-${i}`} id={`slide-${i}`} className="carousel-item relative w-full">
                        <Image
                            src={src}
                            alt={`${title} ${i + 1}`}
                            width={500}
                            height={500}
                            className="object-contain p-5"
                            priority={i === 0}
                        />
                        {images.length > 1 && (
                            <div className="absolute inset-x-5 top-1/2 flex justify-between -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => scrollTo(i === 0 ? images.length - 1 : i - 1)} className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/40">
                                    <ChevronLeft />
                                </button>
                                <button onClick={() => scrollTo(i === images.length - 1 ? 0 : i + 1)} className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/40">
                                    <ChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}