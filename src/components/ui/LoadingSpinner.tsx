interface LoadingSpinnerProps {
    message?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    }

    return (
        <div className="text-center py-16">
            <div className={`animate-spin rounded-full border-b-2 border-(--accent) mx-auto ${sizeClasses[size]}`}></div>
            <p className="mt-4 text-(--text-gray)">{message}</p>
        </div>
    )
}
