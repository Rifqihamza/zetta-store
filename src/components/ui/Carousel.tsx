"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { urlFor } from "@/lib/image"
import { ImageAsset } from "sanity"

interface CarouselProps {
    images: ImageAsset[]
    title: string
}

export default function Carousel({ images, title }: CarouselProps) {
    const handlePrev = (currentIndex: number) => {
        const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
        document.getElementById(`slide${prevIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    const handleNext = (currentIndex: number) => {
        const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
        document.getElementById(`slide${nextIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    const handleSlideSelect = (index: number) => {
        document.getElementById(`slide${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    const safeImages = Array.isArray(images) ? images : []

    return (
        <div className="relative">
            <div className="carousel aspect-4/3 w-full h-auto mx-auto overflow-hidden rounded-lg">
                {safeImages.map((img, index) => (
                    <div
                        key={img._id || index}
                        id={`slide${index}`}
                        className="carousel-item relative w-full"
                    >
                        <Image
                            src={urlFor(img).width(900).url()}
                            alt={`${title} - Image ${index + 1}`}
                            fill
                            className="object-contain p-5"
                        />
                        {safeImages.length > 1 && (
                            <>
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <button
                                        onClick={() => handlePrev(index)}
                                        className="btn btn-circle btn-ghost bg-white/20 hover:bg-white/40 border-none text-white"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        onClick={() => handleNext(index)}
                                        className="btn btn-circle btn-ghost bg-white/20 hover:bg-white/40 border-none text-white"
                                    >
                                        <ChevronRight />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {safeImages.length > 1 && (
                <div className="flex justify-center w-full py-2 gap-2 absolute bottom-0 left-0">
                    {safeImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlideSelect(index)}
                            className="btn btn-xs btn-neutral"
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}