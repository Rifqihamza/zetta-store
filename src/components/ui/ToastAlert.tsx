'use client'

import { useEffect, useState } from 'react'

interface ToastAlertProps {
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
    duration?: number
    onClose: () => void
}

export default function ToastAlert({ message, type, duration = 3000, onClose }: ToastAlertProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Allow animation to complete
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const alertClass = `alert ${type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : type === 'warning' ? 'alert-warning' : 'alert-info'}`

    return (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <div role="alert" className={alertClass}>
                <span>{message}</span>
                <button
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(onClose, 300)
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
