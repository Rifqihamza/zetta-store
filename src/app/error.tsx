'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const router = useRouter()

    useEffect(() => {
        console.error('Application error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-xl p-8 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
                    <p className="text-slate-400 mb-6">
                        We encountered an unexpected error. Please try again or contact support if the problem persists.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={reset}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Go Home
                    </button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-6 text-left">
                        <summary className="text-slate-400 cursor-pointer hover:text-slate-300">
                            Error Details (Development Only)
                        </summary>
                        <pre className="mt-2 p-3 bg-slate-900 rounded text-xs text-red-400 overflow-auto">
                            {error.message}
                            {error.stack && `\n\n${error.stack}`}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    )
}
