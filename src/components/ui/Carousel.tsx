"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
    images: readonly string[];
    title: string;
}

export default function Carousel({ images, title }: CarouselProps) {
    if (!images || images.length === 0) return null;

    const scrollTo = (i: number) => {
        const el = document.getElementById(`slide-${i}`);
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    };

    return (
        <div className="relative">
            <div className="carousel aspect-4/3 rounded-lg overflow-hidden">
                {images.map((src, i) => (
                    <div
                        key={`${src}-${i}`} // lebih aman daripada hanya src
                        id={`slide-${i}`}
                        className="carousel-item relative w-full"
                    >
                        <Image
                            src={src}
                            alt={`${title} ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain p-5"
                            priority={i === 0} // gambar pertama diprioritaskan
                        />

                        {images.length > 1 && (
                            <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={() => scrollTo(i === 0 ? images.length - 1 : i - 1)}
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={() => scrollTo(i === images.length - 1 ? 0 : i + 1)}
                                >
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