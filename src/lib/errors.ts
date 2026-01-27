export class ApiError extends Error {
    constructor(
        public message: string,
        public status?: number,
        public details?: unknown
    ) {
        super(message);
        this.name = "ApiError";
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError || error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred";
}