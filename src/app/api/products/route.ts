import { ProductService, QueryFilters } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        // Parse query parameters
        const search = searchParams.get('search') || undefined
        const category = searchParams.get('category') || undefined
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')

        // Build filters object
        const filters: QueryFilters = {}
        if (search) filters.search = search
        if (category) filters.category = category

        // Fetch products with pagination
        const result = await ProductService.getProducts(filters, { page, limit })

        if (!result.pagination) {
            return NextResponse.json({
                error: 'Pagination data not available'
            }, { status: 500 })
        }

        return NextResponse.json({
            products: result.products,
            pagination: result.pagination
        })

    } catch (error) {
        console.error('API Error:', error)

        return NextResponse.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
