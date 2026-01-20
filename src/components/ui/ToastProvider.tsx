'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import ToastAlert from './ToastAlert'

interface Toast {
    id: string
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
    duration?: number
}

interface ToastContextType {
    showToast: (message: string, type?: Toast['type'], duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
        const id = Date.now().toString()
        const toast: Toast = { id, message, type, duration }
        setToasts(prev => [...prev, toast])
    }

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toasts.map(toast => (
                <ToastAlert
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
