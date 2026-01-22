/**
 * Application initialization
 * This runs on app startup to validate configuration
 */

import { validateSanityEnvironment } from './sanity'

export function initializeApp(): void {
    try {
        // Validate Sanity environment variables
        validateSanityEnvironment()

        console.log('✅ Application initialized successfully')
    } catch (error) {
        console.error('❌ Application initialization failed:', error)

        // In development, throw to prevent app from starting
        if (process.env.NODE_ENV === 'development') {
            throw error
        }

        // In production, log but don't crash
        console.warn('Application started with configuration issues')
    }
}

// Auto-initialize when this module is imported
initializeApp()
