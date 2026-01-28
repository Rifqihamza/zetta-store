"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ images, title }: { images: string[]; title: string }) {
    if (!images?.length) return null;

    const scrollTo = (e: React.MouseEvent, i: number) => {
        e.stopPropagation();
        const el = document.getElementById(`slide-${i}`);
        el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    return (
        <div className="relative group w-full mx-auto">
            {/* Box Utama dengan Aspect Ratio 4/3 */}
            <div className="carousel overflow-hidden aspect-4/3 bg-(--primary)/10 backdrop-blur-sm rounded-3xl border border-transparent group-hover:border group-hover:border-(--accent) duration-300">
                {images.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        id={`slide-${i}`}
                        className="carousel-item relative w-full h-full flex items-center justify-center"
                    >
                        <div className="relative w-1/2 h-auto transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src={src}
                                alt={`${title} ${i + 1}`}
                                width={1024}
                                height={768}
                                className="object-contain rounded-2xl"
                                priority={i === 0}
                            />
                        </div>

                        {/* Tombol Navigasi */}
                        {images.length > 1 && (
                            <div className="absolute inset-x-5 top-1/2 flex justify-between -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <button
                                    onClick={(e) => scrollTo(e, i === 0 ? images.length - 1 : i - 1)}
                                    className="bg-black/60 p-2.5 rounded-xl backdrop-blur-md hover:bg-(--accent) transition-colors text-white border border-white/10"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <button
                                    onClick={(e) => scrollTo(e, i === images.length - 1 ? 0 : i + 1)}
                                    className="bg-black/60 p-2.5 rounded-xl backdrop-blur-md hover:bg-(--accent) transition-colors text-white border border-white/10"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}