import AssetsGrid from "@/components/SectionComponents/AssetsGrid"
import Image from "next/image"

export default function AssetsPage() {
    return (
        <main className="relative">
            <div className="absolute -top-5 bottom-0 left-0 right-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <Image
                src='/assets/mount.png'
                alt="Mountains"
                width={1920}
                height={1080}
                priority
                className="pixelated rotate-180 absolute -top-25 left-0 w-full h-32 object-cover object-bottom z-10"
            />
            <section
                id="assetPage"
                className="py-36 px-2 max-w-7xl mx-auto"
            >
                <AssetsGrid />
            </section>
            <Image
                src='/assets/brick.png'
                alt="Bricks"
                width={1920}
                height={1080}
                className="pixelated absolute -bottom-10 left-0 w-full h-50 md:h-70 object-cover object-top z-10"
            />
        </main>
    )
}
