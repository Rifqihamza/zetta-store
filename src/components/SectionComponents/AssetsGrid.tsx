"use client";

import { useProducts } from "@/hooks/useProduct";
import { LoadingSpinner, EmptyState } from "@/components/ui/CommonStates";
import { Sparkles, Search, Grid2X2 } from "lucide-react";
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
                            The Assets List
                        </h2>
                    </div>
                    <p className="text-sm md:text-right font-bold uppercase max-w-75 leading-tight opacity-70">
                        Ready-to-use digital assets for high-performance builds.
                    </p>
                </div>

                {/* Filter Section - Bold Badge Controls */}
                <div className="flex flex-col gap-8 mb-12 px-4">
                    {/* Search Bar */}
                    <div className="relative group w-full">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                            <Search size={20} className="text-black" />
                        </div>
                        <input
                            type="text"
                            placeholder="SEARCH_ASSETS..."
                            className="w-full rounded-2xl bg-white border-4 border-(--primary) px-12 py-3 font-black uppercase text-sm placeholder:text-black/30 outline-none [box-shadow:0_6px_0px_0px_var(--primary)] transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Category Badges - Horizontal Scrollable on Mobile */}
                    <div className="flex overflow-scroll gap-3 py-2">
                        {/* All Categories Badge */}
                        <button
                            onClick={() => setSelectedCategory("")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-sm tracking-wider transition-all text-nowrap
                ${!selectedCategory
                                    ? "bg-(--primary) text-white [box-shadow:4px_4px_0px_0px_var(--primary-light)]"
                                    : "bg-white text-black hover:bg-(--primary)"
                                }`}
                        >
                            <Grid2X2 size={18} />
                            All
                        </button>

                        {/* Dynamic Category Badges */}
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl font-black uppercase text-sm tracking-wider transition-all text-nowrap
                    ${selectedCategory === cat
                                        ? "bg-(--primary) text-white [box-shadow:4px_4px_0px_0px_var(--primary-light)]"
                                        : "bg-white text-black hover:bg-(--primary)"
                                    }`}
                            >
                                {cat.replace("_", " ")}
                            </button>
                        ))}
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
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-20">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || loading}
                        className="group flex items-center justify-center px-4 py-2 rounded-2xl text-white bg-(--secondary) border-2 border-(--text-muted) [box-shadow:0_6px_0px_0px_var(--secondary-light)] font-black uppercase tracking-tighter text-sm hover:opacity-70 cursor-pointer hover:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        ← PREV
                    </button>

                    {/* Page Indicator */}
                    <div className="flex flex-col items-center">
                        <div className="rounded-2xl bg-(--primary-light) border-4 border-(--primary) px-4 py-2 [box-shadow:0_6px_0px_0px_var(--primary)]">
                            {currentPage.toString().padStart(2, '0')}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={!pagination.hasNext || loading}
                        className="group flex items-center justify-center px-4 py-2 rounded-2xl text-white bg-(--primary) border-2 border-(--text-muted) [box-shadow:0_6px_0px_0px_var(--secondary-light)] font-black uppercase tracking-tighter text-sm hover:opacity-70 cursor-pointer hover:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        NEXT →
                    </button>
                </div>
            )}
            <div className="w-fit px-4 py-2 leading-snug mx-auto bg-(--text-alt) [box-shadow:-8px_0px_0px_0px_#000] text-center font-black italic">
                <p>Tidak Melihat Produk Yang Kamu Cari?<br /><span className="text-(--text-alt) bg-black px-1">Ketik di Search Bar!</span></p>
            </div>
        </div>
    );
}