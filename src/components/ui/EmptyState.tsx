interface EmptyStateProps {
    icon?: string
    title: string
    description: string
}

export default function EmptyState({ icon = "📦", title, description }: EmptyStateProps) {
    return (
        <div className="text-center py-16">
            <div className="mb-4">
                <span className="text-6xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-(--text-gray)">
                {title}
            </h3>
            <p className="text-(--text-gray)/70">
                {description}
            </p>
        </div>
    )
}
