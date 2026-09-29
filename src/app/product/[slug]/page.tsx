import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailClient } from "./ProductDetailClient";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | ZAYA ZEN`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: "asc" },
      },
      variants: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Related products from same category
  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isActive: true,
    },
    take: 4,
    include: {
      images: true,
      category: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailClient product={product} />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-14 border-t border-[#E7E3DC]">
            <h2 className="text-2xl font-extrabold text-[#111111] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => {
                const img = rel.images[0]?.url || "";
                return (
                  <Link
                    key={rel.id}
                    href={`/product/${rel.slug}`}
                    className="group bg-white rounded-2xl border border-[#E7E3DC] p-3 hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F1EEE8] mb-3">
                      <Image
                        src={img}
                        alt={rel.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-stone-900 group-hover:text-[#C4653F] line-clamp-1">
                      {rel.name}
                    </h3>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-sm font-bold text-[#C4653F]">
                        {formatPrice(rel.salePrice || rel.basePrice)}
                      </span>
                      {rel.salePrice && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(rel.basePrice)}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
