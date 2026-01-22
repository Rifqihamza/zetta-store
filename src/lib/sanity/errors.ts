export class SanityError extends Error {
    constructor(message: string, public originalError?: Error) {
        super(message)
        this.name = 'SanityError'
    }
}

export class ValidationError extends Error {
    constructor(message: string, public field?: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export class NotFoundError extends Error {
    constructor(resource: string, identifier?: string) {
        super(`${resource}${identifier ? ` with ${identifier}` : ''} not found`)
        this.name = 'NotFoundError'
    }
}

export function handleSanityError(error: unknown, context: string): never {
    console.error(`Error in ${context}:`, error)

    if (error instanceof Error) {
        throw new SanityError(`Failed to ${context}: ${error.message}`, error)
    }

    throw new SanityError(`Failed to ${context}: Unknown error`)
}

export function validateRequired(value: unknown, fieldName: string): void {
    if (value === null || value === undefined || value === '') {
        throw new ValidationError(`${fieldName} is required`, fieldName)
    }
}

export function validateSlug(slug: string): void {
    if (!slug || typeof slug !== 'string') {
        throw new ValidationError('Invalid slug provided')
    }

    // Basic slug validation (alphanumeric, hyphens, underscores)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(slug)) {
        throw new ValidationError('Invalid slug format')
    }
}
