import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { QuickCategoryBar } from "@/components/layout/QuickCategoryBar";
import { Footer } from "@/components/layout/Footer";
import { ShopClient } from "../ShopClient";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await db.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return {
      title: "Category | ZAYA ZEN",
    };
  }

  return {
    title: `${category.name} | ZAYA ZEN`,
    description: category.description || "Designer Panjabi and menswear collection.",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;

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
        <ShopClient products={products} initialCategory={categorySlug} />
      </main>

      <Footer />
    </div>
  );
}
