import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // requests per window

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const clientIP = request.headers.get('x-client-ip')

    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }
    if (realIP) {
        return realIP
    }
    if (clientIP) {
        return clientIP
    }

    return 'unknown'
}

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const userData = rateLimitStore.get(ip)

    if (!userData || now > userData.resetTime) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
        return false
    }

    if (userData.count >= RATE_LIMIT_MAX_REQUESTS) {
        return true
    }

    userData.count++
    return false
}

function sanitizeInput(input: string): string {
    // Basic XSS prevention - remove potentially dangerous tags
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim()
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const clientIP = getClientIP(request)

    // Rate limiting
    if (isRateLimited(clientIP)) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60',
                'Content-Type': 'text/plain',
            },
        })
    }

    // Input validation for search params
    const url = new URL(request.url)
    const searchParams = url.searchParams

    // Sanitize all query parameters
    for (const [key, value] of searchParams.entries()) {
        const sanitizedValue = sanitizeInput(value)
        if (sanitizedValue !== value) {
            searchParams.set(key, sanitizedValue)
        }
    }

    // Security headers for API routes (additional layer)
    if (pathname.startsWith('/api/')) {
        const response = NextResponse.next()

        // Additional API-specific security headers
        response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
        response.headers.set('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX_REQUESTS - (rateLimitStore.get(clientIP)?.count || 0)).toString())

        return response
    }

    // Block access to sensitive files
    const sensitivePaths = ['/.env', '/.git', '/node_modules', '/src']
    if (sensitivePaths.some(path => pathname.startsWith(path))) {
        return new NextResponse('Forbidden', { status: 403 })
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
