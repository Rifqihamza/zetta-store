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
        <div className="relative group w-full h-full">
            {/* Carousel Core - Tanpa border/shadow sendiri */}
            <div className="carousel overflow-hidden w-full h-full bg-transparent">
                {images.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        id={`slide-${i}`}
                        className="carousel-item relative w-full h-full flex items-center justify-center p-4"
                    >
                        {/* Wrapper Gambar dengan efek zoom tipis saat hover group */}
                        <div className="relative w-[60%] h-[60%] transition-transform duration-500 group-hover:scale-[1.02]">
                            <Image
                                src={src}
                                alt={`${title} ${i + 1}`}
                                fill
                                className="object-contain"
                                priority={i === 0}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Metadata Tag - Tetap dipertahankan untuk Vibe Industrial */}
                        <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] z-10">
                            DATA_REF: 0{i + 1}
                        </div>

                        {/* Navigasi - Neo Brutalist Style */}
                        {images.length > 1 && (
                            <div className="absolute inset-x-2 top-1/2 flex justify-between -translate-y-1/2 z-20 pointer-events-none">
                                <button
                                    onClick={(e) => scrollTo(e, i === 0 ? images.length - 1 : i - 1)}
                                    className="pointer-events-auto bg-(--primary) p-2 border-4 border-black text-white [box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:bg-black"
                                >
                                    <ChevronLeft size={20} strokeWidth={4} />
                                </button>
                                <button
                                    onClick={(e) => scrollTo(e, i === images.length - 1 ? 0 : i + 1)}
                                    className="pointer-events-auto bg-(--primary) p-2 border-4 border-black text-white [box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:bg-black"
                                >
                                    <ChevronRight size={20} strokeWidth={4} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Progress Dots - Nempel di bawah dalam container yang sama */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className="w-4 h-1 bg-black/20 border border-black group-hover:bg-black transition-colors"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}