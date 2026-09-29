import React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { QuickCategoryBar } from "@/components/layout/QuickCategoryBar";
import { HeroSlider } from "@/components/home/HeroSlider";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryCards } from "@/components/home/CategoryCards";
import { TrendingProducts, SerializedProduct } from "@/components/home/TrendingProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Footer } from "@/components/layout/Footer";
import { db } from "@/lib/db";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 60; // ISR revalidate every minute

export default async function HomePage() {
  // Fetch all active products with images and category
  const products = await db.product.findMany({
    where: { isActive: true },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      ratingCount: "desc",
    },
  });

  const serializedProducts: SerializedProduct[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    nameBn: p.nameBn,
    slug: p.slug,
    description: p.description,
    fabric: p.fabric,
    basePrice: p.basePrice,
    salePrice: p.salePrice,
    isClearance: p.isClearance,
    ratingAvg: p.ratingAvg,
    ratingCount: p.ratingCount,
    category: p.category,
    images: p.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      isPrimary: img.isPrimary,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Glassmorphism Header */}
      <Header />

      {/* 3. Quick Category Pill Bar */}
      <QuickCategoryBar />

      <main className="flex-1">
        {/* 4. Hero Slider with GSAP & Price Callouts */}
        <HeroSlider />

        {/* 5. Infinite Brand Marquee (Why Zaya Zen) */}
        <BrandMarquee />

        {/* 6. Category Cards (Pastel / Warm Palettes) */}
        <CategoryCards />

        {/* 7. Trending Products with Category Filter Tabs & Instant Actions */}
        <TrendingProducts products={serializedProducts} />

        {/* 8. Promotional Stock Clearance Campaign Banner with Timer */}
        <PromoBanner />
      </main>

      {/* 9. Floating WhatsApp Chat Button per PRD §1.2 */}
      <a
        href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Zaya%20Zen,%20I%20have%20an%20inquiry`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#2E7D5B] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/80 group touch-manipulation"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="hidden sm:inline absolute right-full mr-3 bg-[#111111] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with Zaya Zen
        </span>
      </a>

      {/* 10. Comprehensive Footer */}
      <Footer />
    </div>
  );
}
