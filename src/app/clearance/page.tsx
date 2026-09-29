import React from "react";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { QuickCategoryBar } from "@/components/layout/QuickCategoryBar";
import { Footer } from "@/components/layout/Footer";
import { ShopClient } from "@/app/shop/ShopClient";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "#স্টক_ক্লিয়ারেন্স_অফার — Stock Clearance | ZAYA ZEN",
  description:
    "Special clearance offers on designer Panjabis and menswear. Save up to 40% on limited stock items.",
};

export const revalidate = 60;

export default async function ClearancePage() {
  const clearanceProducts = await db.product.findMany({
    where: {
      isActive: true,
      isClearance: true,
    },
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
      basePrice: "desc",
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />
      <QuickCategoryBar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        {/* Clearance Banner Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-[#111111] via-[#262422] to-[#111111] p-8 sm:p-12 text-white mb-10 shadow-xl border border-[#262422] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C4653F] text-white text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>Limited Stock Campaign</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              #স্টক_ক্লিয়ারেন্স_অফার
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
              Enjoy flat discounts up to 40% on handcrafted designer Panjabis and cotton classics. When it&apos;s gone, it&apos;s gone!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 min-w-[200px]">
            <span className="text-xs text-stone-300 uppercase tracking-widest font-semibold block">
              Clearance Savings
            </span>
            <span className="text-4xl font-black text-[#C4653F] block mt-1">UP TO 40%</span>
            <span className="text-[11px] text-stone-400 mt-1 block">Free Delivery Over ৳3,000</span>
          </div>
        </div>

        <ShopClient products={clearanceProducts} initialCategory="all" />
      </main>

      <Footer />
    </div>
  );
}
