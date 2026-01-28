"use client";

import { useProducts } from "@/hooks/useProduct";
import { LoadingSpinner, EmptyState } from "@/components/ui/CommonStates";
import { ChevronDown, Sparkles } from "lucide-react";
import { brand } from "@/config/brand"
import FreesetsReveal from "../ui/AnimationReveal";
import ProductCard from "@/components/ui/ProductCard";

export default function AssetsGrid() {
    const { products, loading, search, setSearch, selectedItemType, setSelectedItemType, itemType } = useProducts();

    return (
        <div className="space-y-2">
            <FreesetsReveal>
                {/* heading */}
                <div className="mb-6 w-full border-b border-(--muted) pb-4">
                    <h2 className="flex flex-row items-center gap-2 text-3xl md:text-4xl font-semibold text-(--primary) brightness-150">
                        <Sparkles size={28} />
                        {brand.name} Assets
                    </h2>
                    <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                        Ready-to-use digital assets for faster builds.
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 my-6 justify-between">
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
                            {selectedItemType || "Item Type"}
                            <ChevronDown size={24} />
                        </div>

                        {/* Opsi yang bisa di-styling sesuka hati */}
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-1 menu px-2 py-3 shadow-lg bg-base-100 backdrop-blur-xl border border-(--accent) rounded-lg mt-2 w-full space-y-2"
                        >
                            <li>
                                <button
                                    onClick={() => setSelectedItemType("")}
                                    className={`rounded-md ${!selectedItemType ? "w-full bg-(--primary) font-semibold" : "w-full hover:bg-(--primary)/30 backdrop-blur-xl "}`}
                                >
                                    Categories
                                </button>
                            </li>
                            {itemType.map((items) => (
                                <li key={items}>
                                    <button
                                        onClick={() => setSelectedItemType(items)}
                                        className={`rounded-md ${selectedItemType === items ? "w-full bg-(--primary) font-semibold" : "w-full hover:bg-(--primary)/30 backdrop-blur-xl "}`}
                                    >
                                        {items}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div >
            </FreesetsReveal>

            {loading && !products.length ? (
                <LoadingSpinner message="Fetching amazing assets..." />
            ) : products.length > 0 ? (
                <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
                    {products.map((p) => (
                        <FreesetsReveal key={p.id}>
                            <ProductCard product={p} />
                        </FreesetsReveal>

                    ))}
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