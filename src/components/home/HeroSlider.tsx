"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.99 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="relative w-full bg-[#1A1916] text-white overflow-hidden">
      {/* Full-Screen Bleed Hero Banner (Edge-to-Edge 100vw) */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-[#1F1E1B] group"
      >
        {/* Banner Container: Full width, edge to edge */}
        <Link
          href="/shop/panjabi"
          className="block relative w-full aspect-[1024/597] cursor-pointer select-none"
          aria-label="Shop Premium Men's Panjabi Collection - Tradition Meets Modern Style"
        >
          <Image
            src="/images/hero-banner.jpg"
            alt="Premium Men's Panjabi Collection - Tradition Meets Modern Style - Zaya Zen"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.008]"
          />
        </Link>
      </div>

      {/* Mobile Fast Action CTA (Thumb reach on small phones) */}
      <div className="p-3 sm:hidden bg-[#1A1916]">
        <Link
          href="/shop/panjabi"
          className="w-full min-h-[48px] px-6 py-3 rounded-full bg-[#D8B486] active:bg-[#C9A475] text-[#1E1B18] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
        >
          <span>Explore Panjabi Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
