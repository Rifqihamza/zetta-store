"use client";

import { useProducts } from "@/hooks/useProduct";
import ProductCard from "@/components/ui/ProductCard";
import { LoadingSpinner, EmptyState } from "@/components/ui/CommonStates";
import { ChevronDown } from "lucide-react";

export default function AssetsGrid() {
    const { products, loading, search, setSearch, selectedCategory, setSelectedCategory, categories } = useProducts();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <input
                    type="text"
                    placeholder="Search assets..."
                    className="w-full bg-(--primary)/10 border border-(--primary)/40 rounded-lg px-4 py-2 focus:border-(--accent) outline-none transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="dropdown dropdown-bottom">
                    {/* Tombol yang terlihat seperti Select */}
                    <div
                        tabIndex={0}
                        role="button"
                        className="w-full md:w-auto bg-(--primary)/10 border border-(--primary)/40 rounded-lg px-4 py-2 focus:border-(--accent) outline-none transition-colors flex flex-row items-center justify-between gap-4 cursor-pointer hover:bg-(--primary)/20 whitespace-nowrap"
                    >
                        {selectedCategory || "Categories"}
                        <ChevronDown size={24} />
                    </div>

                    {/* Opsi yang bisa di-styling sesuka hati */}
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-1 menu px-2 py-3 shadow-lg bg-base-100 backdrop-blur-xl border border-(--accent) rounded-lg mt-2 w-full space-y-2"
                    >
                        <li>
                            <button
                                onClick={() => setSelectedCategory("")}
                                className={`rounded-md ${!selectedCategory ? "w-full bg-(--primary) font-semibold" : "w-full hover:bg-(--primary)/30 backdrop-blur-xl "}`}
                            >
                                Categories
                            </button>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`rounded-md ${selectedCategory === cat ? "w-full bg-(--primary) font-semibold" : "w-full hover:bg-(--primary)/30 backdrop-blur-xl "}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div >

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
            )
            }
        </div >
    );
}