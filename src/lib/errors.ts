/**
 * Error Handling Module
 *
 * This module provides custom error classes and utility functions
 * for consistent error handling throughout the application.
 */

/**
 * Custom error class for API-related errors
 *
 * @example
 * throw new ApiError("Failed to fetch products", 500, originalError);
 */
export class ApiError extends Error {
    /**
     * HTTP status code associated with this error
     */
    public status?: number;

    /**
     * Original error that caused this ApiError (if any)
     */
    public originalError?: unknown;

    /**
     * Create a new ApiError
     * @param message - Human-readable error message
     * @param status - Optional HTTP status code
     * @param originalError - Optional original error that caused this
     */
    constructor(message: string, status?: number, originalError?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.originalError = originalError;

        // Fix prototype chain for environments where subclassing Error is broken
        Object.setPrototypeOf(this, ApiError.prototype);

        // Capture stack trace if available (Node.js environment)
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

/**
 * Custom error class for validation failures
 *
 * @example
 * throw new ValidationError("Email is invalid", "email");
 */
export class ValidationError extends Error {
    /**
     * The field name that failed validation (if applicable)
     */
    public field?: string;

    /**
     * Create a new ValidationError
     * @param message - Validation error message
     * @param field - Optional field name that failed validation
     */
    constructor(message: string, field?: string) {
        super(message);
        this.name = "ValidationError";
        this.field = field;

        // Fix prototype chain
        Object.setPrototypeOf(this, ValidationError.prototype);

        // Capture stack trace if available
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, ValidationError);
        }
    }
}

/**
 * Custom error class for resource not found errors
 *
 * @example
 * throw new NotFoundError("Product", "123");
 * // Result: "Product (123) not found"
 */
export class NotFoundError extends Error {
    /**
     * Create a new NotFoundError
     * @param resource - Type of resource that was not found (e.g., "Product", "User")
     * @param identifier - Optional identifier of the resource
     */
    constructor(resource: string, identifier?: string) {
        const message = `${resource}${identifier ? ` (${identifier})` : ""} not found`;
        super(message);
        this.name = "NotFoundError";

        // Fix prototype chain
        Object.setPrototypeOf(this, NotFoundError.prototype);

        // Capture stack trace if available
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}

/**
 * Extract a human-readable error message from an unknown value
 *
 * @param u - The unknown value to extract message from
 * @returns Extracted message if found, otherwise undefined
 *
 * @example
 * const errorMessage = extractMessageFromUnknown(someError);
 */
export function extractMessageFromUnknown(u: unknown): string | undefined {
    if (u && typeof u === "object") {
        const record = u as Record<string, unknown>;
        // Try common error message fields
        const message = record["message"] ?? record["error"] ?? record["detail"];
        if (typeof message === "string") {
            return message;
        }
    }
    return undefined;
}

/**
 * Generic API error handler that converts various error types to ApiError
 *
 * @param error - The error to handle
 * @param context - Context description (e.g., "fetch products")
 * @throws ApiError with consistent format
 *
 * @example
 * try {
 *   // some API call
 * } catch (error) {
 *   handleApiError(error, "fetch products");
 * }
 */
export function handleApiError(error: unknown, context: string): never {
    // Log the original error for debugging
    console.error(`[${context}]`, error);

    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
        throw error;
    }

    // Convert regular Error to ApiError
    if (error instanceof Error) {
        throw new ApiError(`Failed to ${context}: ${error.message}`, undefined, error);
    }

    // Handle unknown error types
    throw new ApiError(`Failed to ${context}: Unknown error`);
}

/**
 * Validation Utilities
 */

/**
 * Validate that a value is not empty
 *
 * @param value - The value to validate
 * @param fieldName - Name of the field for error messages
 * @throws ValidationError if validation fails
 *
 * @example
 * validateRequired(userInput.email, "email");
 */
export function validateRequired(value: unknown, fieldName: string): void {
    if (value === null || value === undefined || value === "") {
        throw new ValidationError(`${fieldName} is required`, fieldName);
    }
}

/**
 * Validate that a string is a valid slug format
 *
 * @param slug - The slug string to validate
 * @throws ValidationError if validation fails
 *
 * @example
 * validateSlug("my-product-123"); // valid
 * validateSlug("Invalid Slug!"); // throws ValidationError
 */
export function validateSlug(slug: string): void {
    if (!slug || typeof slug !== "string") {
        throw new ValidationError("Invalid slug");
    }

    const normalized = slug.trim().toLowerCase();
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (!slugRegex.test(normalized)) {
        throw new ValidationError("Invalid slug format");
    }
}

/**
 * Format a number as Indonesian Rupiah currency
 *
 * @param value - The number to format
 * @param opts - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * rupiahFormat(1000); // "Rp1.000"
 * rupiahFormat(null, { nullLabel: "Free" }); // "Free"
 */
export function rupiahFormat(
    value: number | null | undefined,
    opts?: { nullLabel?: string }
): string {
    const nullLabel = opts?.nullLabel ?? "Price unavailable";

    // Handle null/undefined values
    if (value === null || value === undefined) {
        return nullLabel;
    }

    // Convert to number and validate
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return nullLabel;
    }

    // Format as Rupiah
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue);
}
