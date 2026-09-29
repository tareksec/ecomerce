"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getTotalCount } =
    useCartStore();
  const { stop, start } = useSmoothScroll();

  const subtotal = getSubtotal();
  const totalCount = getTotalCount();
  const freeThreshold = SITE_CONFIG.shipping.freeThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const amountNeeded = freeThreshold - subtotal;

  // Manage smooth scroll stopping while drawer is open per TRD §3.2
  useEffect(() => {
    if (isOpen) {
      stop();
      document.body.style.overflow = "hidden";
    } else {
      start();
      document.body.style.overflow = "";
    }
    return () => {
      start();
      document.body.style.overflow = "";
    };
  }, [isOpen, stop, start]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FAFAF8] text-[#111111] h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="p-5 border-b border-[#E7E3DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C4653F]" />
            <h2 className="font-semibold text-lg tracking-tight">Shopping Bag</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#F7E3DA] text-[#A9532F] text-xs font-semibold">
              {totalCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-4 bg-[#F1EEE8] border-b border-[#E7E3DC]">
          <div className="flex justify-between text-xs font-medium text-stone-600 mb-1.5">
            {amountNeeded > 0 ? (
              <span>
                Add <strong className="text-[#C4653F]">{formatPrice(amountNeeded)}</strong> more for{" "}
                <strong>Free Delivery</strong>!
              </span>
            ) : (
              <span className="text-[#2E7D5B] font-semibold">
                🎉 Congratulations! You have unlocked Free Delivery!
              </span>
            )}
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E7E3DC] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#C4653F] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F7E3DA] flex items-center justify-center text-[#C4653F] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-medium text-stone-800 mb-1">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Explore our premium handcrafted Panjabis and find the perfect attire for your occasion.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold tracking-wide uppercase hover:bg-[#C4653F] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E7E3DC] shadow-sm"
              >
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-stone-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">Size: {item.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E7E3DC] rounded-lg bg-[#FAFAF8]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-stone-200 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3 h-3 text-stone-600" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-stone-200 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3 h-3 text-stone-600" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#C4653F]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E7E3DC] bg-white space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Estimated Delivery</span>
                <span>{subtotal >= freeThreshold ? "FREE" : "Calculated at checkout"}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-[#E7E3DC]">
                <span>Total</span>
                <span className="text-[#C4653F]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Standard Checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-3.5 px-4 rounded-xl bg-[#111111] text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-[#C4653F] transition-all shadow-md group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* WhatsApp Direct Order CTA per Client Insights */}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                `Hello Zaya Zen, I want to order from my cart: \n${items
                  .map((i) => `- ${i.name} (Size: ${i.size}, Qty: ${i.quantity})`)
                  .join("\n")}\nSubtotal: ${formatPrice(subtotal)}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-[#2E7D5B]/30 bg-[#2E7D5B]/5 text-[#2E7D5B] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-[#2E7D5B] hover:text-white transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp Messenger</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
