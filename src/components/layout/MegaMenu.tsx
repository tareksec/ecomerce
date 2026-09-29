"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Flame, ShieldCheck } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 w-full pt-2 z-30 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 bg-[#FAFAF8]/98 backdrop-blur-xl border border-[#E7E3DC] shadow-2xl rounded-3xl">
        <div className="grid grid-cols-12 gap-8">
          {/* Col 1: Designer & Formal */}
          <div className="col-span-3 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E7E3DC]">
              <Sparkles className="w-4 h-4 text-[#C4653F]" />
              <h3 className="font-bold text-sm tracking-wider uppercase text-stone-900">
                Designer Collection
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/shop/panjabi?type=royal-black"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors flex items-center justify-between group"
                >
                  <span>Royal Black Embroidered</span>
                  <span className="text-[10px] bg-[#F7E3DA] text-[#A9532F] px-1.5 py-0.5 rounded font-semibold">
                    Best
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/panjabi?type=terracotta"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Terracotta Signature Series
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/panjabi?type=zari"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Midnight Indigo Zari Accents
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/panjabi?type=hand-stitched"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Imperial Hand-Stitched Placket
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/panjabi?type=monochrome"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Onyx Shadow Minimalist
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Cotton & Daily Comfort */}
          <div className="col-span-3 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E7E3DC]">
              <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
              <h3 className="font-bold text-sm tracking-wider uppercase text-stone-900">
                Pure Cotton & Daily
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/shop/cotton-casual?type=white"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors flex items-center justify-between"
                >
                  <span>Crisp White Jumu&apos;ah Special</span>
                  <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded font-semibold">
                    100% Voile
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/cotton-casual?type=olive"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Olive Moss Slub Cotton
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/cotton-casual?type=sand"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Desert Sand Classic Fit
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/cotton-casual?type=slate"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Slate Blue Pre-Washed
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/cotton-casual?type=jacquard"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Warm Ivory Jacquard Weave
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Menswear & Pairings */}
          <div className="col-span-3 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E7E3DC]">
              <Flame className="w-4 h-4 text-[#C4653F]" />
              <h3 className="font-bold text-sm tracking-wider uppercase text-stone-900">
                Pajamas & Pairings
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/shop/pajama-pants"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Tailored Straight Cut Pajamas
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/pajama-pants"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Classic Aligarh White Pajamas
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/shirts"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Executive Oxford Cotton Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/shirts"
                  onClick={onClose}
                  className="text-stone-600 hover:text-[#C4653F] transition-colors"
                >
                  Mandarin Collar Linen Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/clearance"
                  onClick={onClose}
                  className="text-[#C4653F] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View All Clearance Items</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Promo Card */}
          <div className="col-span-3 bg-gradient-to-br from-[#111111] to-[#262422] rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C4653F] text-[10px] font-bold uppercase tracking-wider mb-2">
                Special Campaign
              </span>
              <h4 className="font-extrabold text-base leading-tight">
                #স্টক_ক্লিয়ারেন্স_অফার
              </h4>
              <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                Enjoy flat discounts up to 40% on handcrafted designer Panjabis. Limited stock!
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="/clearance"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#111111] text-xs font-bold hover:bg-[#C4653F] hover:text-white transition-colors"
              >
                <span>Shop Clearance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
