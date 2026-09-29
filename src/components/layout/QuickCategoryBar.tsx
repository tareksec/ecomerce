"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Flame, Tag, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function QuickCategoryBar() {
  const categories = SITE_CONFIG.quickCategories;

  return (
    <div className="bg-[#F1EEE8] border-b border-[#E7E3DC] py-2.5 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider hidden lg:flex items-center gap-1 mr-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C4653F]" />
          <span>Quick Select:</span>
        </span>

        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.isClearance ? "/clearance" : `/shop/${cat.slug}`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-2xs ${
              cat.isClearance
                ? "bg-[#C4653F] text-white hover:bg-[#A9532F] ring-2 ring-[#C4653F]/20"
                : "bg-white text-stone-800 hover:text-[#C4653F] hover:border-[#C4653F] border border-[#E7E3DC]"
            }`}
          >
            {cat.isClearance && <Flame className="w-3.5 h-3.5 animate-pulse" />}
            <span>{cat.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                cat.isClearance
                  ? "bg-black/30 text-white font-medium"
                  : "bg-stone-100 text-stone-500 font-normal"
              }`}
            >
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
