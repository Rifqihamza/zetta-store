'use client'

import ProductCard from '@/components/ui/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyState from '@/components/ui/EmptyState'
import { Search, ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { useProducts } from '@/hooks'

export default function AssetsGrid() {
    const {
        products,
        categories,
        pagination,
        loading,

        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
    } = useProducts()

    return (
        <>
            {/* Search & Category */}
            <div className="mb-6 flex flex-col md:flex-row gap-2 w-full">
                <div className="relative w-full flex-5">
                    <span className="absolute top-3 left-3">
                        <Search size={20} />
                    </span>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search Assets"
                        className="px-4 py-2 pl-10 outline-none flex flex-row items-center justify-center gap-2 rounded-xl bg-(--primary)/20 border border-(--secondary)/40 focus:border-(--accent) duration-300 w-full"
                    />
                </div>

                <div className="dropdown dropdown-bottom flex-1">
                    <label
                        tabIndex={0}
                        className="px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-xl bg-(--primary)/20 border border-(--secondary)/40 focus:border-(--accent) duration-300 w-full"
                    >
                        <span>
                            {selectedCategory || 'All Categories'}
                        </span>
                        <ChevronDown size={20} />
                    </label>

                    <ul
                        tabIndex={0}
                        className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-xl w-52 max-h-72 overflow-y-auto"
                    >
                        <li>
                            <button
                                className={!selectedCategory ? 'active' : ''}
                                onClick={() => setSelectedCategory('')}
                            >
                                All Categories
                            </button>
                        </li>

                        {categories.map(cat => (
                            <li key={cat}>
                                <button
                                    className={selectedCategory === cat ? 'active' : ''}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {loading && <LoadingSpinner message="Loading assets..." />}

            {!loading && products.length === 0 && (
                <EmptyState
                    title="No Products Available"
                    description={
                        search || selectedCategory
                            ? 'No products match your search.'
                            : 'Please check back later.'
                    }
                />
            )}

            {!loading && products.length > 0 && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map(p => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                <ChevronLeft />
                            </button>

                            <span>
                                {currentPage} / {pagination.totalPages}
                            </span>

                            <button
                                disabled={currentPage === pagination.totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
