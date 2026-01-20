'use client'
import Stepper, { Step } from "../ui/Stepper";

export default function StepSection() {
    return (
        <Stepper
            initialStep={1}
            onStepChange={(step) => {
                console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
            className="bg-(--primary)/10 backdrop-blur-md rounded-2xl border border-(--accent)/40 w-full max-w-4xl mx-auto"
        >
            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">
                    Discover Curated Assets
                </h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">
                    Browse a growing collection of high-quality digital assets built for real-world projects.
                </p>
            </Step>

            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">
                    Get Instant Access
                </h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">
                    Purchase premium assets or access free resources with a seamless checkout experience.
                </p>
            </Step>

            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">
                    Instant Delivery
                </h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">
                    Your files are available immediately after purchase — no delays, no manual approval.
                </p>
            </Step>

            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">
                    Build & Launch Faster
                </h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">
                    Integrate the assets into your projects, products, or client work with confidence.
                </p>
            </Step>

        </Stepper>
    )
}