'use client'
import Stepper, { Step } from "../ui/Stepper";

export default function StepSection() {
    return (
        <section className="py-6 px-4">
            <Stepper
                initialStep={1}
                onStepChange={(step) => console.log(step)}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="← PREV_PHASE"
                nextButtonText="NEXT_PHASE →"
                // Penambahan transisi dan hover pada kontainer utama
                className="bg-white border-4 border-black rounded-none [box-shadow:12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl mx-auto overflow-hidden transition-all"
            >
                {/* STEP 01 */}
                <Step>
                    <div className="p-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-(--primary) text-white border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Phase 01
                            </span>
                            <span className="text-black/30 font-mono text-xs">STATUS: READY</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none">
                            Discover <br />
                            <span className="text-(--secondary) italic">Curated Assets</span>
                        </h2>

                        <p className="text-lg md:text-xl font-bold text-black/80 leading-relaxed max-w-2xl border-l-4 border-black pl-4">
                            Browse a growing collection of high-quality digital assets built for real-world projects. No fluff, just pure utility.
                        </p>
                    </div>
                </Step>

                {/* STEP 02 */}
                <Step>
                    <div className="p-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-(--primary) text-white border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Phase 02
                            </span>
                            <span className="text-black/30 font-mono text-xs">STATUS: ENCRYPTED</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none">
                            Get <br />
                            <span className="text-(--secondary) italic">Instant Access</span>
                        </h2>

                        <p className="text-lg md:text-xl font-bold text-black/80 leading-relaxed max-w-2xl border-l-4 border-black pl-4">
                            Purchase premium assets or access free resources with a seamless checkout experience. Secure and straightforward.
                        </p>
                    </div>
                </Step>

                {/* STEP 03 */}
                <Step>
                    <div className="p-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-(--primary) text-white border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Phase 03
                            </span>
                            <span className="text-black/30 font-mono text-xs">STATUS: DOWNLOADING</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none">
                            Instant <br />
                            <span className="text-(--secondary) italic">Delivery</span>
                        </h2>

                        <p className="text-lg md:text-xl font-bold text-black/80 leading-relaxed max-w-2xl border-l-4 border-black pl-4">
                            Your files are available immediately after purchase — no delays, no manual approval. Straight to your dashboard.
                        </p>
                    </div>
                </Step>

                {/* STEP 04 */}
                <Step>
                    <div className="p-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-(--primary) text-white border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Phase 04
                            </span>
                            <span className="text-black/30 font-mono text-xs">STATUS: COMPLETED</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none">
                            Build & <br />
                            <span className="text-(--secondary) italic">Launch Faster</span>
                        </h2>

                        <p className="text-lg md:text-xl font-bold text-black/80 leading-relaxed max-w-2xl border-l-4 border-black pl-4">
                            Integrate the assets into your projects, products, or client work with confidence. Deploy the future now.
                        </p>
                    </div>
                </Step>
            </Stepper>
        </section>
    )
}