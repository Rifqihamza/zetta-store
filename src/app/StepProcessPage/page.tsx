import StepSection from "@/components/SectionComponents/StepSection";

export default function StepProcessPage() {
    return (
        <>
            <section id="how-it-works" className="relative w-full max-w-7xl mx-auto min-h-screen">
                <div className="py-36 space-y-10">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-semibold text-3xl">How Zetta Works?</h1>
                        <p className="leading-relaxed text-(--text-gray)">
                            Simple steps to access ready-to-use digital assets and accelerate your workflow.
                        </p>
                    </div>
                    <StepSection />
                </div>
            </section>
        </>
    )
}