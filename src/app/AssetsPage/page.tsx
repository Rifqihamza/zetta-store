import { brand } from "@/config/brand"
import AssetsGrid from "@/components/SectionComponents/AssetsGrid"

export default function AssetsPage() {
    return (
        <section id="assetPage" className="relative w-full max-w-7xl mx-auto min-h-screen">
            <section
                id="assetPage"
                className="py-36 px-2 max-w-7xl mx-auto"
            >
                {/* heading */}
                <div className="mb-16 w-full">
                    <span className="text-sm tracking-wider text-(--text-color) bg-(--primary)/30 backdrop-blur-xl border border-(--accent) px-4 py-1 rounded-full">
                        {brand.name.toUpperCase()} ASSETS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold mt-4">
                        Ready-to-use digital assets for faster builds.
                    </h2>
                </div>

                <AssetsGrid />
            </section>
        </section>
    )
}
