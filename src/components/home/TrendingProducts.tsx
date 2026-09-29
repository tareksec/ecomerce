"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag, MessageCircle, Sparkles, ArrowRight, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { SITE_CONFIG } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";

export interface SerializedProduct {
  id: string;
  name: string;
  nameBn?: string | null;
  slug: string;
  description: string;
  fabric?: string | null;
  basePrice: number;
  salePrice?: number | null;
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
    alt?: string | null;
    isPrimary: boolean;
  }[];
}

interface TrendingProductsProps {
  products: SerializedProduct[];
}

const TABS = [
  { label: "All Items", slug: "all" },
  { label: "Designer Panjabi", slug: "designer-panjabi" },
  { label: "Cotton & Casual", slug: "cotton-casual" },
  { label: "Semi-Formal", slug: "semi-formal" },
  { label: "Pajamas & Pants", slug: "pajama-pants" },
  { label: "Shirts", slug: "shirts" },
  { label: "Clearance Sale", slug: "clearance" },
];

export function TrendingProducts({ products }: TrendingProductsProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const filteredProducts = products.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "clearance") return item.isClearance;
    return item.category.slug === activeTab;
  });

  const handleQuickAdd = (product: SerializedProduct) => {
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

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8] border-b border-[#E7E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C4653F] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Trending Products
            </h2>
            <div className="w-12 h-1 bg-[#C4653F] rounded-full mt-2" />
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C4653F] hover:text-[#A9532F] transition-colors group"
          >
            <span>View All Catalog ({products.length} Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveTab(tab.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                activeTab === tab.slug
                  ? "bg-[#111111] text-white"
                  : "bg-white text-stone-700 hover:text-black hover:border-stone-400 border border-[#E7E3DC]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid — 2 columns on mobile per MOBILE.md §3.6 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((prod, idx) => {
            const primaryImg = prod.images[0]?.url || "";
            const isFavorite = isInWishlist(prod.id);
            const discountPercent = prod.salePrice
              ? Math.round(((prod.basePrice - prod.salePrice) / prod.basePrice) * 100)
              : 0;
            const isAdded = addedMap[prod.id];

            return (
              <Reveal key={prod.id} direction="up" delay={idx * 0.05}>
                <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#E7E3DC] p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#C4653F]/40 transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F1EEE8] mb-2 sm:mb-3">
                    <Link href={`/product/${prod.slug}`}>
                      <Image
                        src={primaryImg}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#C4653F] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide shadow-xs">
                        -{discountPercent}%
                      </div>
                    )}

                    {/* Wishlist Button with 44px touch target */}
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      aria-label="Add to wishlist"
                      className={`absolute top-2 right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center transition-all shadow-xs cursor-pointer touch-manipulation ${
                        isFavorite
                          ? "text-[#C4653F] fill-current"
                          : "text-stone-600 hover:text-[#C4653F]"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFavorite ? "fill-[#C4653F] text-[#C4653F]" : ""}`}
                      />
                    </button>

                    {/* Fabric description pill */}
                    <div className="hidden sm:block absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium text-center truncate">
                      {prod.fabric || "100% Fine Combed Cotton"}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 flex-1">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#F5A524]">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                      <span className="font-bold text-stone-800">{prod.ratingAvg.toFixed(1)}</span>
                      <span className="text-stone-400">({prod.ratingCount})</span>
                    </div>

                    {/* Title */}
                    <Link href={`/product/${prod.slug}`}>
                      <h3 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#C4653F] transition-colors line-clamp-1">
                        {prod.name}
                      </h3>
                    </Link>

                    {/* Price: Guaranteed Prominent Display */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
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

                  {/* Action Buttons */}
                  <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#E7E3DC] grid grid-cols-2 gap-1.5 sm:gap-2">
                    {/* Quick Add to Bag */}
                    <button
                      onClick={() => handleQuickAdd(prod)}
                      className={`py-2 px-1.5 sm:px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs min-h-[38px] sm:min-h-[44px] touch-manipulation ${
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

                    {/* WhatsApp Fast Order */}
                    <a
                      href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                        `Hello Zaya Zen, I want to order "${prod.name}" priced at ${formatPrice(
                          prod.salePrice || prod.basePrice
                        )} (Size 40)`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-1.5 sm:px-2 rounded-lg sm:rounded-xl bg-[#2E7D5B]/10 hover:bg-[#2E7D5B] text-[#2E7D5B] hover:text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-all min-h-[38px] sm:min-h-[44px] touch-manipulation"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
