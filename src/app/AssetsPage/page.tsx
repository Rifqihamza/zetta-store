import AssetsGrid from "@/components/SectionComponents/AssetsGrid"
import Image from "next/image"

export default function AssetsPage() {
    return (
        <main className="relative">
            <Image
                src='/assets/mount.png'
                alt="Mountains"
                width={1920}
                height={1080}
                priority
                className="pixelated rotate-180 absolute -top-25 left-0 w-full h-32 object-cover object-bottom z-10"
            />
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10"
                style={{
                    backgroundImage: "url('/assets/stars-2.png')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px',
                }}
            />
            <section
                id="assetPage"
                className="py-36 px-2 max-w-7xl mx-auto"
            >
                <AssetsGrid />
            </section>
            <Image
                src='/assets/mount.png'
                alt="Mountains"
                width={1920}
                height={1080}
                priority
                className="pixelated absolute bottom-0 left-0 w-full h-32 object-cover object-bottom z-10"
            />
        </main>
    )
}
