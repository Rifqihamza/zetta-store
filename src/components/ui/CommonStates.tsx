export function LoadingSpinner({ message = "Loading...", size = 'md' }) {
    const sizes = { sm: 'h-6 w-6', md: 'h-12 w-12', lg: 'h-16 w-16' };
    return (
        <div className="text-center py-16">
            <div className={`animate-spin rounded-full border-b-2 border-(--accent) mx-auto ${sizes[size as keyof typeof sizes]}`}></div>
            <p className="mt-4 text-(--text-gray)">{message}</p>
        </div>
    );
}

export function EmptyState({ icon = "📦", title, description }: { icon?: string; title: string; description: string }) {
    return (
        <div className="text-center py-16">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2 text-(--text-gray)">{title}</h3>
            <p className="text-(--text-gray)/70 max-w-xs mx-auto">{description}</p>
        </div>
    );
}