"use client";

import React from "react";
import { Sparkles, ShieldCheck, Truck, RefreshCw, Feather, Scissors } from "lucide-react";

const HIGHLIGHTS = [
  { text: "100% Fine Combed Breathable Cotton", icon: Feather },
  { text: "Handcrafted Neckline Embroidery", icon: Sparkles },
  { text: "Tailored Cuts for Bangladeshi Gentlemen", icon: Scissors },
  { text: "Cash on Delivery Available Nationwide", icon: Truck },
  { text: "7 Days Hassle-Free Size Exchange", icon: RefreshCw },
  { text: "Pre-Shrunk Luxury Fabric Finishing", icon: ShieldCheck },
];

export function BrandMarquee() {
  return (
    <div className="bg-[#111111] text-white py-4 overflow-hidden border-y border-[#262422]">
      <div className="flex w-max animate-marquee space-x-8">
        {[...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#C4653F]" />
              <Icon className="w-4 h-4 text-[#C4653F]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-stone-200">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
