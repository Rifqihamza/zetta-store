'use client'

import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-xl p-8 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">404</h1>
                    <h2 className="text-xl font-semibold text-slate-300 mb-2">Page Not Found</h2>
                    <p className="text-slate-400 mb-6">
                        The page you`re looking for doesn`t exist or has been moved.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => router.back()}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    )
}
