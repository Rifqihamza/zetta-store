import HeroSection from "@/components/SectionComponents/HeroSection"

export default function HomePage() {
    return (
        <>
            <section id="homePage" className="relative overflow-hidden min-h-screen bg-linear-to-b from-(--background) via-(--background) to-(--primary)">
                <HeroSection />
            </section>
        </>
    )
}