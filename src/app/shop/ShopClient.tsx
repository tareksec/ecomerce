"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag, MessageCircle, Filter, ChevronRight, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { SITE_CONFIG } from "@/lib/constants";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  salePrice?: number | null;
  fabric?: string | null;
  isClearance: boolean;
  ratingAvg: number;
  ratingCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: {
    id: string;
    url: string;
  }[];
}

interface ShopClientProps {
  products: ProductItem[];
  initialCategory?: string;
}

export function ShopClient({ products, initialCategory }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [onlyClearance, setOnlyClearance] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  // Unique categories list
  const categoriesList = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      map.set(p.category.slug, p.category.name);
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [products]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (onlyClearance) count++;
    if (maxPrice < 5000) count++;
    return count;
  }, [selectedCategory, onlyClearance, maxPrice]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const activePrice = p.salePrice || p.basePrice;
      if (activePrice > maxPrice) return false;
      if (selectedCategory !== "all" && p.category.slug !== selectedCategory) return false;
      if (onlyClearance && !p.isClearance) return false;
      return true;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.ratingAvg - a.ratingAvg);
    }

    return result;
  }, [products, selectedCategory, onlyClearance, sortBy, maxPrice]);

  const handleQuickAdd = (product: ProductItem) => {
    const primaryImg = product.images[0]?.url || "";
    addItemToCart({
      id: `${product.id}-40`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.salePrice || product.basePrice,
      image: primaryImg,
      size: "40",
    });

    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setOnlyClearance(false);
    setMaxPrice(5000);
  };

  return (
    <div className="py-6 md:py-12">
      {/* Header Banner */}
      <div className="mb-6 md:mb-10 text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight">
          Panjabi & Menswear Catalog
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Explore handcrafted designer Panjabis, everyday cotton essentials, and tailored trousers.
        </p>
      </div>

      {/* Mobile Sticky / Top Filter & Sort Bar (under 1024px) */}
      <div className="lg:hidden mb-4 px-4 sticky top-16 z-20 bg-[#FAFAF8]/95 backdrop-blur-md py-2 border-b border-[#E7E3DC]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 min-h-[44px] px-4 rounded-xl bg-white border border-[#E7E3DC] shadow-xs flex items-center justify-center gap-2 text-xs font-bold text-stone-900 active:scale-98 transition-transform"
          >
            <Filter className="w-4 h-4 text-[#C4653F]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C4653F] text-white text-[10px] flex items-center justify-center font-extrabold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex-1 min-h-[44px] relative bg-white border border-[#E7E3DC] rounded-xl shadow-xs flex items-center px-3">
            <span className="text-[11px] text-stone-500 font-medium mr-1.5">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-stone-900 outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips on Mobile */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-[11px]">
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F7E3DA] text-[#A9532F] font-semibold whitespace-nowrap">
                {categoriesList.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-stone-700"
                >
                  ✕
                </button>
              </span>
            )}
            {onlyClearance && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C4653F] text-white font-semibold whitespace-nowrap">
                Clearance
                <button
                  onClick={() => setOnlyClearance(false)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </span>
            )}
            {maxPrice < 5000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 font-semibold whitespace-nowrap">
                ≤ {formatPrice(maxPrice)}
                <button
                  onClick={() => setMaxPrice(5000)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-stone-700"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-[11px] text-stone-500 underline ml-1 whitespace-nowrap"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 sm:px-6">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E7E3DC] shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DC] text-stone-900 font-bold text-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C4653F]" />
                <span>Filter Catalog</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#C4653F] hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                Categories
              </h3>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[#111111] text-white"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-[#111111] text-white"
                        : "text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Clearance Toggle */}
            <div className="pt-4 border-t border-[#E7E3DC]">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-stone-800">
                <input
                  type="checkbox"
                  checked={onlyClearance}
                  onChange={(e) => setOnlyClearance(e.target.checked)}
                  className="w-4 h-4 accent-[#C4653F] rounded"
                />
                <span className="text-[#C4653F] font-bold">#স্টক_ক্লিয়ারেন্স_অফার Only</span>
              </label>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-[#E7E3DC]">
              <div className="flex justify-between text-xs font-semibold text-stone-800 mb-2">
                <span>Max Price</span>
                <span className="text-[#C4653F] font-bold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C4653F]"
              />
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          {/* Top Sort Bar (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E7E3DC] mb-6 shadow-xs">
            <span className="text-xs font-semibold text-stone-600">
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAFAF8] border border-[#E7E3DC] rounded-xl px-3 py-1.5 font-semibold text-stone-800 outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Cards Grid: 2 columns on mobile, 3 on desktop per MOBILE.md §5 */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E3DC] p-6 sm:p-8">
              <p className="text-base font-bold text-stone-800">No products found</p>
              <p className="text-xs text-stone-500 mt-1">Try resetting filters to view all products.</p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#C4653F] transition-colors min-h-[44px]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((prod) => {
                const primaryImg = prod.images[0]?.url || "";
                const isFavorite = isInWishlist(prod.id);
                const isAdded = addedMap[prod.id];
                const discount = prod.salePrice
                  ? Math.round(((prod.basePrice - prod.salePrice) / prod.basePrice) * 100)
                  : 0;

                return (
                  <div
                    key={prod.id}
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E7E3DC] p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-lg hover:border-[#C4653F]/40 transition-all duration-300"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F1EEE8] mb-2 sm:mb-3">
                        <Link href={`/product/${prod.slug}`} className="block w-full h-full">
                          <Image
                            src={primaryImg}
                            alt={prod.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Badges */}
                        {discount > 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#C4653F] text-white text-[10px] sm:text-[11px] font-extrabold uppercase shadow-xs">
                            -{discount}%
                          </div>
                        )}

                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          aria-label="Wishlist"
                          className="absolute top-2 right-2 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer active:scale-90 transition-transform"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorite ? "fill-[#C4653F] text-[#C4653F]" : "text-stone-600"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#F5A524]">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-bold text-stone-800">
                            {prod.ratingAvg.toFixed(1)}
                          </span>
                          <span className="text-stone-400">({prod.ratingCount})</span>
                        </div>

                        <Link href={`/product/${prod.slug}`}>
                          <h3 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#C4653F] transition-colors line-clamp-1">
                            {prod.name}
                          </h3>
                        </Link>

                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="text-sm sm:text-base font-extrabold text-[#C4653F]">
                            {formatPrice(prod.salePrice || prod.basePrice)}
                          </span>
                          {prod.salePrice && (
                            <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                              {formatPrice(prod.basePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Minimum 44px tap targets */}
                    <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#E7E3DC] grid grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleQuickAdd(prod)}
                        className={`min-h-[44px] py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs ${
                          isAdded
                            ? "bg-[#2E7D5B] text-white"
                            : "bg-[#111111] hover:bg-[#C4653F] text-white"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                          `Hello Zaya Zen, I want to order "${prod.name}" priced at ${formatPrice(
                            prod.salePrice || prod.basePrice
                          )}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] py-2 px-2 rounded-xl bg-[#2E7D5B]/10 hover:bg-[#2E7D5B] text-[#2E7D5B] hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Container */}
          <div className="relative z-10 bg-white rounded-t-3xl max-h-[85dvh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drag Handle & Header */}
            <div className="p-4 border-b border-[#E7E3DC] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C4653F]" />
                <h3 className="font-extrabold text-sm text-stone-900">Filter & Refine</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-500 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                  Categories
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`min-h-[44px] px-3 py-2 rounded-xl font-semibold border text-left transition-colors ${
                      selectedCategory === "all"
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#FAFAF8] text-stone-700 border-[#E7E3DC]"
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`min-h-[44px] px-3 py-2 rounded-xl font-semibold border text-left transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-[#FAFAF8] text-stone-700 border-[#E7E3DC]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clearance Filter */}
              <div className="pt-4 border-t border-[#E7E3DC]">
                <label className="flex items-center gap-3 cursor-pointer py-1 text-xs font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={onlyClearance}
                    onChange={(e) => setOnlyClearance(e.target.checked)}
                    className="w-5 h-5 accent-[#C4653F] rounded"
                  />
                  <span className="text-[#C4653F]">#স্টক_ক্লিয়ারেন্স_অফার Only</span>
                </label>
              </div>

              {/* Price Slider */}
              <div className="pt-4 border-t border-[#E7E3DC]">
                <div className="flex justify-between text-xs font-bold text-stone-800 mb-2">
                  <span>Max Price</span>
                  <span className="text-[#C4653F]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C4653F] h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 border-t border-[#E7E3DC] bg-[#FAFAF8] flex gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <button
                onClick={resetAllFilters}
                className="flex-1 min-h-[48px] rounded-xl border border-[#E7E3DC] text-stone-700 font-bold text-xs bg-white active:scale-98"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 min-h-[48px] rounded-xl bg-[#111111] text-white font-bold text-xs active:scale-98 shadow-md"
              >
                Apply ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
