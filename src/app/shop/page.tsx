import React from "react";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { QuickCategoryBar } from "@/components/layout/QuickCategoryBar";
import { Footer } from "@/components/layout/Footer";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop Designer Panjabi & Menswear | ZAYA ZEN",
  description:
    "Explore our full collection of handcrafted designer Panjabis, soft combed cotton classics, and tailored menswear.",
};

export const revalidate = 60;

export default async function ShopPage() {
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
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />
      <QuickCategoryBar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ShopClient products={products} />
      </main>

      <Footer />
    </div>
  );
}
