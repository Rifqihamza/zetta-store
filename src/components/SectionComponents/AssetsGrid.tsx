"use client";

import { useProducts } from "@/hooks/useProduct";
import ProductCard from "@/components/ui/ProductCard";
import { LoadingSpinner, EmptyState } from "@/components/ui/CommonStates";

export default function AssetsGrid() {
    const { products, loading, search, setSearch, selectedCategory, setSelectedCategory, categories } = useProducts();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search assets..."
                    className="w-full md:max-w-xs bg-(--primary)/10 border border-(--primary)/40 rounded-lg px-4 py-2 focus:border-(--accent) outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="w-full md:w-auto bg-(--primary)/10 border border-(--primary)/40 rounded-lg px-4 py-2 outline-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            {loading && !products.length ? (
                <LoadingSpinner message="Fetching amazing assets..." />
            ) : products.length > 0 ? (
                <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
                    {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            ) : (
                <EmptyState
                    title="No assets found"
                    description={`We couldn't find anything for "${search}". Try another keyword.`}
                />
            )}
        </div>
    );
}