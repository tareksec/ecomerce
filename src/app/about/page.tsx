import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — The Story of ZAYA ZEN | Designer Panjabi & Menswear",
  description:
    "Discover the story behind ZAYA ZEN. Dedicated to crafting premium, breathable Panjabis with timeless elegance.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7E3DA] text-[#A9532F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Craft</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Elegance in Every Thread.
          </h1>
          <div className="w-16 h-1 bg-[#C4653F] rounded-full mx-auto" />
          <p className="text-stone-600 text-base leading-relaxed pt-2">
            ZAYA ZEN was founded with a singular conviction: that traditional Bangladeshi attire can be reimagined with modern minimalist restraint, world-class organic combed cotton, and bespoke sartorial comfort.
          </p>
        </div>

        {/* Brand Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F7E3DA] flex items-center justify-center text-[#C4653F]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900">100% Combed Cotton</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We eliminate rough short fibers, leaving only long, smooth, silky filaments that keep you cool even on the warmest celebrations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C4653F]/10 flex items-center justify-center text-[#C4653F]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900">Artisan Tailoring</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every placket, cuff, and collar is shaped with micrometer precision by master tailors in Dhaka, honoring heritage without excess.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D5B]/10 flex items-center justify-center text-[#2E7D5B]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900">Customer First</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Transparent pricing, direct WhatsApp assistance, hassle-free size replacement, and nationwide Cash on Delivery.
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="rounded-3xl bg-[#111111] text-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Experience the Touch of True Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mb-6">
            Explore our curated collections or chat directly with our stylists for personalized sizing recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl bg-[#C4653F] hover:bg-[#A9532F] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
