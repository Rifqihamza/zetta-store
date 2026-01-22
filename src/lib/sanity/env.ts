/**
 * Environment validation for Sanity configuration
 * This ensures all required environment variables are present at startup
 */

const requiredEnvVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET'
] as const

export function validateSanityEnvironment(): void {
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required Sanity environment variables: ${missingVars.join(', ')}\n` +
            'Please check your .env.local file and ensure all Sanity variables are set.'
        )
    }
}

export function getSanityConfig() {
    validateSanityEnvironment()

    return {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
        token: process.env.SANITY_AUTH_TOKEN,
        useCdn: process.env.NODE_ENV === 'production'
    }
}
