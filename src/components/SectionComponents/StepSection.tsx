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
        >
            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">Browse Assets</h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">Explore curated digital assets designed for creators & developers.</p>
            </Step>
            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">Get Access</h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">Purchase premium assets or download free ones instantly.</p>
            </Step>
            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">Instant Delivery</h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">No waiting. Access your files right after checkout.</p>
            </Step>
            <Step>
                <h2 className="text-lg md:text-3xl font-semibold tracking-wide text-(--accent)">Build & Create</h2>
                <p className="text-md font-medium tracking-wider leading-relaxed">Use the assets in your projects, products, or client work.</p>
            </Step>
        </Stepper>
    )
}