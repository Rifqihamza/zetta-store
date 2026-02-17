"use client";

import { useProducts } from "@/hooks/useProduct";
import { LoadingSpinner, EmptyState } from "@/components/ui/CommonStates";
import { ChevronDown, Sparkles, Search, Filter } from "lucide-react";
import { brand } from "@/config/brand";
import FreesetsReveal from "../ui/AnimationReveal";
import ProductCard from "@/components/ui/ProductCard";

export default function AssetsGrid() {
    const {
        products,
        loading,
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        categories,
        currentPage,
        pagination,
        setCurrentPage
    } = useProducts();

    return (
        <div className="space-y-12 pb-24 text-black">
            <FreesetsReveal>
                {/* Heading Section - Industrial Header */}
                <div className="px-4 mb-10 w-full border-b-4 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-black text-(--background) px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Sparkles size={14} className="text-(--primary)" />
                            {brand.name} Database v2.0
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter italic">
                            The Assets Vault
                        </h2>
                    </div>
                    <p className="text-sm md:text-right font-bold uppercase max-w-75 leading-tight opacity-70">
                        Ready-to-use digital assets for high-performance builds.
                    </p>
                </div>

                {/* Filter Section - Bold Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 px-4">
                    {/* Search Bar */}
                    <div className="relative grow group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                            <Search size={20} className="text-black" />
                        </div>
                        <input
                            type="text"
                            placeholder="SEARCH_ASSETS..."
                            className="w-full bg-white border-4 border-black px-12 py-3 font-black uppercase text-sm placeholder:text-black/30 outline-none focus:bg-(--primary) [box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="dropdown dropdown-bottom dropdown-end md:w-72">
                        <div
                            tabIndex={0}
                            role="button"
                            className="w-full bg-white border-4 border-black px-6 py-3 flex items-center justify-between font-black uppercase text-sm [box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <Filter size={18} />
                                {selectedCategory || "All Categories"}
                            </span>
                            <ChevronDown size={20} className="group-hover:rotate-180 transition-transform" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-50 menu p-2 shadow-none bg-white border-4 border-black w-full mt-2 space-y-1"
                        >
                            <li>
                                <button
                                    onClick={() => setSelectedCategory("")}
                                    className={`rounded-none px-4 py-2 text-left font-black uppercase text-xs ${!selectedCategory ? "bg-black text-white" : "hover:bg-(--background)"}`}
                                >
                                    [ ALL_CATEGORIES ]
                                </button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`rounded-none px-4 py-2 text-left font-black uppercase text-xs ${selectedCategory === cat ? "bg-black text-white" : "hover:bg-(--background)"}`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </FreesetsReveal>

            {/* Content States */}
            {loading && !products.length ? (
                <div className="py-20 flex justify-center">
                    <LoadingSpinner message="LOADING_SYSTEM_RESOURCES..." />
                </div>
            ) : products.length > 0 ? (
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
                    {products.map((p) => (
                        <FreesetsReveal key={p.id}>
                            <ProductCard product={p} />
                        </FreesetsReveal>
                    ))}
                </div>
            ) : (
                <div className="border-4 border-black border-dashed p-20 text-center bg-white/50">
                    <EmptyState
                        title="ERROR: NO_ASSETS_FOUND"
                        description={search ? `QUERY: "${search}" RETURNED ZERO RESULTS.` : "CATEGORY IS CURRENTLY EMPTY."}
                    />
                </div>
            )}

            {/* Pagination Section - Neo-Brutal Style */}
            {pagination && (pagination.hasNext || currentPage > 1) && (
                <div className="flex justify-center items-center gap-6 mt-20">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || loading}
                        className="group flex items-center justify-center px-6 py-3 bg-white border-4 border-black font-black uppercase tracking-tighter text-sm
                       [box-shadow:6px_6px_0px_0px_rgba(0,0,0,1)] 
                       hover:translate-x-1 hover:translate-y-1 hover:shadow-none
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                       transition-all"
                    >
                        ← PREV
                    </button>

                    {/* Page Indicator */}
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase opacity-40 mb-1 tracking-widest">Page</span>
                        <div className="bg-black text-(--background) border-4 border-black px-6 py-2 font-mono font-black text-xl [box-shadow:4px_4px_0px_0px_rgba(251,107,162,1)]">
                            {currentPage.toString().padStart(2, '0')}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={!pagination.hasNext || loading}
                        className="group flex items-center justify-center px-6 py-3 bg-(--primary) text-white border-4 border-black font-black uppercase tracking-tighter text-sm
                       [box-shadow:6px_6px_0px_0px_rgba(0,0,0,1)] 
                       hover:translate-x-1 hover:translate-y-1 hover:shadow-none
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                       transition-all"
                    >
                        NEXT →
                    </button>
                </div>
            )}
        </div>
    );
}