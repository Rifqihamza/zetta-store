import StepSection from "@/components/SectionComponents/StepSection";
import FreesetsReveal from "@/components/ui/AnimationReveal";
export default function StepProcessPage() {
    return (
        <>
            <FreesetsReveal>
                <section id="how-it-works" className="relative w-full max-w-7xl mx-auto overflow-hidden">
                    <div className="py-32 px-2 space-y-10">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-3xl text-center md:text-left">How Zetta Works?</h1>
                            <p className="leading-relaxed text-(--text-gray) text-center md:text-left">
                                Simple steps to access ready-to-use digital assets and accelerate your workflow.
                            </p>
                        </div>
                        <StepSection />
                    </div>
                </section>
            </FreesetsReveal>
        </>
    )
}