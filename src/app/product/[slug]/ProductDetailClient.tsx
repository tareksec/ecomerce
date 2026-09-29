"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { SITE_CONFIG } from "@/lib/constants";
import { SizeChartModal } from "@/components/product/SizeChartModal";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    nameBn?: string | null;
    slug: string;
    description: string;
    fabric?: string | null;
    care?: string | null;
    basePrice: number;
    salePrice?: number | null;
    isClearance: boolean;
    ratingAvg: number;
    ratingCount: number;
    category: {
      name: string;
      slug: string;
    };
    images: {
      id: string;
      url: string;
      alt?: string | null;
    }[];
    variants: {
      id: string;
      size: string;
      stock: number;
    }[];
    reviews: {
      id: string;
      name: string;
      rating: number;
      comment: string;
      isVerified: boolean;
      createdAt: Date;
    }[];
  };
}

export function ProductDetailClient({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0]?.size || "40"
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);

  const activePrice = product.salePrice || product.basePrice;
  const discountPercent = product.salePrice
    ? Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    const primaryImg = product.images[selectedImage]?.url || product.images[0]?.url || "";
    addItemToCart(
      {
        id: `${product.id}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: activePrice,
        image: primaryImg,
        size: selectedSize,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Zaya Zen, I would like to order:\n- Product: ${product.name}\n- Size: ${selectedSize}\n- Quantity: ${quantity}\n- Price: ${formatPrice(
      activePrice * quantity
    )}\n- Link: https://zayazenbd.com/product/${product.slug}`
  );

  return (
    <div className="py-8 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link
          href={`/shop/${product.category.slug}`}
          className="hover:text-black transition-colors"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#F1EEE8] border border-[#E7E3DC] shadow-sm">
            <Image
              src={product.images[selectedImage]?.url || product.images[0]?.url || ""}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-top"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discountPercent > 0 && (
                <span className="px-3 py-1 rounded-full bg-[#C4653F] text-white text-xs font-extrabold uppercase shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
              {product.isClearance && (
                <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider">
                  #স্টক_ক্লিয়ারেন্স_অফার
                </span>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-[#C4653F] text-[#C4653F]" : "text-stone-600"
                }`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#C4653F] ring-2 ring-[#C4653F]/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#C4653F]">
                {product.category.name}
              </span>
              <div className="flex items-center gap-1 text-[#F5A524]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-stone-800">
                  {product.ratingAvg.toFixed(1)}
                </span>
                <span className="text-stone-400">({product.ratingCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              {product.name}
            </h1>
            {product.nameBn && (
              <p className="text-sm font-semibold text-stone-600 mt-1">
                {product.nameBn}
              </p>
            )}

            {/* Price Callout */}
            <div className="flex items-baseline gap-3 pt-3">
              <span className="text-3xl font-black text-[#C4653F]">
                {formatPrice(activePrice)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-stone-400 line-through font-medium">
                  {formatPrice(product.basePrice)}
                </span>
              )}
            </div>
          </div>

          {/* Fabric & Comfort Highlights (Client Insight §1.2) */}
          <div className="p-4 rounded-2xl bg-[#F7E3DA]/50 border border-[#F7E3DA] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A9532F] uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Fabric & Texture Quality</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              {product.fabric ||
                "100% Fine Combed Cotton — Soft on skin, highly breathable and tailored for Bangladesh weather."}
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Select Size: <strong className="text-[#C4653F]">{selectedSize}</strong>
              </span>

              <button
                onClick={() => setIsSizeChartOpen(true)}
                className="flex items-center gap-1 text-xs text-[#C4653F] hover:underline font-semibold cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {["38", "40", "42", "44"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                    selectedSize === size
                      ? "bg-[#111111] text-white shadow-md ring-2 ring-[#111111]/20"
                      : "bg-white text-stone-700 hover:border-stone-400 border border-[#E7E3DC]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E7E3DC] rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  isAdded
                    ? "bg-[#2E7D5B] text-white"
                    : "bg-[#111111] hover:bg-[#C4653F] text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag ({formatPrice(activePrice * quantity)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Instant Ordering CTA (Client Insight §1.2) */}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E7D5B] hover:bg-[#25664a] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2E7D5B]/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant Order via WhatsApp</span>
            </a>
          </div>

          {/* Value Props & Guarantees */}
          <div className="pt-6 border-t border-[#E7E3DC] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#C4653F] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">COD in Bangladesh</h4>
                <p className="text-[11px] text-stone-500">Pay when you receive</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#C4653F] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">7-Day Exchange</h4>
                <p className="text-[11px] text-stone-500">Hassle-free size change</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#C4653F] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">100% Authentic</h4>
                <p className="text-[11px] text-stone-500">Original Zaya Zen quality</p>
              </div>
            </div>
          </div>

          {/* Description & Reviews */}
          <div className="pt-6 border-t border-[#E7E3DC] space-y-4">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Customer Reviews Section */}
            <div className="pt-4 space-y-3">
              <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                Customer Feedback ({product.reviews.length})
              </h3>
              <div className="space-y-3">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-white border border-[#E7E3DC] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{rev.name}</span>
                        {rev.isVerified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2E7D5B]/10 text-[#2E7D5B] font-semibold">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 text-[#F5A524]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile per MOBILE.md §4 */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E7E3DC] px-4 py-2.5 shadow-lg flex items-center gap-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom))]">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-stone-500 font-medium">Size: {selectedSize}</div>
          <div className="text-base font-extrabold text-[#C4653F] leading-tight">
            {formatPrice(activePrice)}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl bg-[#C4653F] hover:bg-[#A9532F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all min-h-[44px] touch-manipulation cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isAdded ? "Added" : "Add to Bag"}</span>
        </button>

        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          className="w-11 h-11 rounded-xl bg-[#2E7D5B] text-white flex items-center justify-center flex-shrink-0 shadow-md active:scale-95 transition-all min-w-[44px] min-h-[44px] touch-manipulation"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
    </div>
  );
}
