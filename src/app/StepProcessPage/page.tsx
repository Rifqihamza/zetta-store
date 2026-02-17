import StepSection from "@/components/SectionComponents/StepSection";
import FreesetsReveal from "@/components/ui/AnimationReveal";
export default function StepProcessPage() {
    return (
        <>
            <section id="how-it-works" className="bg-linear-to-b from-(--background) via-(--background) to-(--primary)">
                <FreesetsReveal>
                    <div className="py-32 px-2 space-y-10 relative w-full max-w-7xl mx-auto overflow-hidden ">
                        <div className="flex flex-col items-center justify-center space-y-4 mb-16">
                            {/* Badge Kecil di Atas Judul */}
                            <div className="bg-black text-white px-4 py-1 border-2 border-black font-black uppercase text-[10px] tracking-[0.3em] [box-shadow:4px_4px_0px_0px_rgba(251,107,162,1)] mb-2">
                                Execution_Protocol
                            </div>

                            {/* Judul Utama */}
                            <h1 className="font-black text-4xl md:text-6xl text-center uppercase tracking-tighter italic leading-none text-black">
                                How <span className="text-(--primary) not-italic">Zetta</span> Works<span className="text-(--secondary) not-italic"> ?</span>
                            </h1>

                            {/* Deskripsi dengan Garis Pembatas */}
                            <div className="relative">
                                <p className="max-w-xl leading-tight text-black font-bold text-center md:text-lg uppercase tracking-tight opacity-80 mt-2">
                                    Simple steps to access ready-to-use digital assets and <span className="bg-(--secondary) text-(--text-alt) px-1">accelerate your workflow</span>.
                                </p>

                                {/* Dekorasi Garis Bawah Brutalist */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-2 bg-black" />
                            </div>
                        </div>
                        <StepSection />
                    </div>
                </FreesetsReveal>
            </section>
        </>
    )
}