import React from "react";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WishlistClient } from "./WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist | ZAYA ZEN",
  description: "View and manage your saved Panjabi and menswear favorites.",
};

export const revalidate = 60;

export default async function WishlistPage() {
  const products = await db.product.findMany({
    where: { isActive: true },
    include: {
      images: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <WishlistClient products={products} />
      </main>

      <Footer />
    </div>
  );
}
