export default function SkeletonCard() {
    return (
        <div className="h-full flex flex-col bg-(--primary)/5 border border-(--primary)/20 rounded-xl p-4 animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-square bg-(--primary)/10 rounded-lg mb-4" />

            {/* Text Lines */}
            <div className="space-y-3 flex-1">
                <div className="h-4 bg-(--primary)/20 rounded w-3/4" />
                <div className="h-4 bg-(--primary)/20 rounded w-1/2" />

                <div className="pt-6 mt-auto flex justify-between items-center">
                    <div className="h-5 bg-(--accent)/20 rounded w-24" />
                    <div className="h-4 bg-(--primary)/20 rounded w-16" />
                </div>
            </div>
        </div>
    );
}
