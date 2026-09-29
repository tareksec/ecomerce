"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

interface TopPickCategory {
  title: string;
  slug: string;
  image: string;
  icon: React.ReactNode;
}

const TOP_PICKS: TopPickCategory[] = [
  {
    title: "DRESSES",
    slug: "designer-panjabi",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3h6l1 4-2 1v3l5 10H5l5-10V8L8 7l1-4z" />
      </svg>
    ),
  },
  {
    title: "KURTAS & SUITS",
    slug: "cotton-casual",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h12l2 4-3 1v13H7V8L4 7l2-4z" />
        <path d="M12 3v7" />
        <path d="M10 6h4" />
      </svg>
    ),
  },
  {
    title: "TOPS",
    slug: "shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    title: "BOTTOM WEAR",
    slug: "pajama-pants",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h12v3l-1 15h-4l-1-9-1 9H7L6 6V3z" />
      </svg>
    ),
  },
  {
    title: "BAGS",
    slug: "semi-formal",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9V7a6 6 0 0 1 12 0v2" />
        <rect width="18" height="13" x="3" y="9" rx="2" />
      </svg>
    ),
  },
  {
    title: "JEWELLERY",
    slug: "designer-panjabi",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8c0 5 3.5 10 7 10s7-5 7-10" />
        <circle cx="12" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "ACCESSORIES",
    slug: "clearance",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="14" r="4" />
        <circle cx="18" cy="14" r="4" />
        <path d="M10 14h4" />
        <path d="M6 10l2-6" />
        <path d="M18 10l-2-6" />
      </svg>
    ),
  },
];

const PROMO_BANNERS = [
  {
    tag: "SPECIAL OFFER",
    titleType: "flat20",
    subtitle: "On Your First Order",
    btnText: "SHOP NOW",
    btnColor: "bg-[#D64E68] hover:bg-[#be3d56]",
    bgColor: "bg-[#FDF0EE]",
    borderColor: "border-[#F8DED8]",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Special gift bags and offer",
  },
  {
    tag: "NEW COLLECTION",
    titleType: "summer",
    subtitle: "Be Bright. Be Beautiful.",
    btnText: "SHOP NOW",
    btnColor: "bg-[#D64E68] hover:bg-[#be3d56]",
    bgColor: "bg-[#FBF6EE]",
    borderColor: "border-[#F2E8D2]",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Summer collection outfit",
  },
  {
    tag: "ACCESSORIES SALE",
    titleType: "upTo30",
    subtitle: "On Selected Items",
    btnText: "SHOP NOW",
    btnColor: "bg-[#76519E] hover:bg-[#623f86]",
    bgColor: "bg-[#F3EFF8]",
    borderColor: "border-[#E5DBEE]",
    href: "/clearance",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Accessories jewellery sale",
  },
];

export function CategoryCards() {
  return (
    <section className="py-12 md:py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal tracking-normal">
              Explore Our Top Picks
            </h2>
          </div>
        </Reveal>

        {/* Top Picks 7 Category Cards Row */}
        <div className="flex lg:grid lg:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory">
          {TOP_PICKS.map((cat, idx) => (
            <Reveal
              key={cat.title}
              direction="up"
              delay={idx * 0.05}
              className="min-w-[130px] sm:min-w-[150px] lg:min-w-0 snap-start flex-1"
            >
              <Link
                href={cat.slug === "clearance" ? "/clearance" : `/shop/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden block aspect-[3.2/4.2] sm:aspect-[3/4] shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200/60 bg-stone-100"
              >
                {/* Full-bleed background image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 35vw, (max-width: 1024px) 25vw, 15vw"
                  className="object-cover object-top group-hover:scale-108 transition-transform duration-700"
                />

                {/* Bottom subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10 flex flex-col items-start">
                  <div className="mb-1 text-white/90 group-hover:scale-110 transition-transform duration-300 origin-left">
                    {cat.icon}
                  </div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-wider uppercase leading-tight line-clamp-1">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] text-white/80 font-normal group-hover:text-white flex items-center gap-1 mt-0.5">
                    Shop Now
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* 3 Pastel Promotional Feature Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {PROMO_BANNERS.map((banner, idx) => (
            <Reveal key={banner.tag} direction="up" delay={idx * 0.08}>
              <Link
                href={banner.href}
                className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 overflow-hidden flex items-center justify-between min-h-[180px] sm:min-h-[200px] border ${banner.bgColor} ${banner.borderColor} shadow-xs hover:shadow-lg transition-all duration-300`}
              >
                {/* Left Content */}
                <div className="relative z-10 flex flex-col justify-between h-full max-w-[62%] sm:max-w-[65%]">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1">
                      {banner.tag}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-stone-900">
                      {banner.titleType === "flat20" && (
                        <>
                          Flat{" "}
                          <span className="text-[#D64E68] font-semibold">
                            20% Off
                          </span>
                        </>
                      )}
                      {banner.titleType === "summer" && (
                        <span className="text-[#D64E68] font-medium">
                          Summer Vibes
                        </span>
                      )}
                      {banner.titleType === "upTo30" && (
                        <>
                          Up to{" "}
                          <span className="text-[#76519E] font-semibold">
                            30% Off
                          </span>
                        </>
                      )}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-stone-600 mt-1 mb-4">
                      {banner.subtitle}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center justify-center px-4 py-1.5 sm:py-2 rounded-md ${banner.btnColor} text-white text-[11px] font-extrabold uppercase tracking-wider transition-transform group-hover:scale-105 shadow-xs`}
                    >
                      {banner.btnText}
                    </span>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={banner.image}
                    alt={banner.imageAlt}
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    className="object-cover object-center"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
