"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, MessageCircle, Phone, Sparkles, Tag, ShoppingBag } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#FAFAF8] text-[#111111] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Top Header */}
        <div className="p-4 border-b border-[#E7E3DC] flex items-center justify-between bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-xs">
              <Image
                src="/brand/logo.png"
                alt="ZAYA ZEN"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-sm tracking-tight text-[#111111]">ZAYA</span>
                <span className="font-extrabold text-sm tracking-tight text-[#C4653F] underline decoration-2 underline-offset-2">
                  ZEN
                </span>
              </div>
              <span className="text-[9px] text-stone-500 font-medium tracking-widest block uppercase">
                Panjabi & Menswear
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quick Search Button */}
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E3DC] text-stone-500 text-xs font-medium"
          >
            <span>Search Panjabi, shirts...</span>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-[10px] font-semibold text-stone-700">
              Search
            </span>
          </button>

          {/* Links */}
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 font-medium text-sm text-stone-900 transition-colors"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              href="/shop/panjabi"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 font-medium text-sm text-stone-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>Designer Panjabi</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F7E3DA] text-[#A9532F] text-[10px] font-bold uppercase">
                  Popular
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              href="/shop/cotton-casual"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 font-medium text-sm text-stone-900 transition-colors"
            >
              <span>Cotton & Casual Panjabi</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              href="/shop/menswear"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 font-medium text-sm text-stone-900 transition-colors"
            >
              <span>Menswear & Shirts</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              href="/shop/pajama-pants"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 font-medium text-sm text-stone-900 transition-colors"
            >
              <span>Pajama & Trousers</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>

            {/* Clearance Highlight */}
            <Link
              href="/clearance"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-[#F7E3DA]/60 hover:bg-[#F7E3DA] text-[#A9532F] font-bold text-sm transition-colors border border-[#F7E3DA]"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Stock Clearance Offer</span>
              </div>
              <span className="text-[10px] bg-[#C4653F] text-white px-2 py-0.5 rounded-full font-extrabold uppercase">
                Up to 40% Off
              </span>
            </Link>
          </nav>

          {/* Social Proof & Campaign Badge */}
          <div className="p-4 rounded-2xl bg-white border border-[#E7E3DC] space-y-2">
            <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider block">
              100% Quality Guaranteed
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              Premium combed cotton & tailored cuts crafted for Bangladeshi gentlemen.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E7E3DC] bg-white space-y-2.5">
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Zaya%20Zen,%20I%20would%20like%20to%20order`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#2E7D5B] text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-xs hover:bg-[#25664a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order via WhatsApp ({SITE_CONFIG.contact.phone})</span>
          </a>

          <div className="text-center text-[11px] text-stone-500 pt-1">
            Free Delivery across Bangladesh over ৳3,000
          </div>
        </div>
      </div>
    </div>
  );
}
