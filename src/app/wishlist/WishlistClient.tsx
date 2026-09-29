"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";

interface WishlistClientProps {
  products: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    salePrice?: number | null;
    images: { url: string }[];
  }[];
}

export function WishlistClient({ products }: WishlistClientProps) {
  const { productIds, toggleWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const savedProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="py-8 md:py-14">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E3DC]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {savedProducts.length} items saved for later
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold text-[#C4653F] hover:underline flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E7E3DC] p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F7E3DA] text-[#C4653F] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-stone-500 mt-1.5 mb-6">
            Explore our handcrafted Panjabis and click the heart icon to save your favorites.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#C4653F] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-block"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((prod) => {
            const primaryImg = prod.images[0]?.url || "";
            return (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl border border-[#E7E3DC] p-3 sm:p-4 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F1EEE8] mb-3">
                    <Link href={`/product/${prod.slug}`}>
                      <Image
                        src={primaryImg}
                        alt={prod.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-red-500 hover:scale-110 transition-all shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link href={`/product/${prod.slug}`}>
                    <h3 className="text-sm font-semibold text-stone-900 group-hover:text-[#C4653F] transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-extrabold text-[#C4653F]">
                      {formatPrice(prod.salePrice || prod.basePrice)}
                    </span>
                    {prod.salePrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(prod.basePrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E7E3DC]">
                  <button
                    onClick={() => {
                      addItem({
                        id: `${prod.id}-40`,
                        productId: prod.id,
                        name: prod.name,
                        slug: prod.slug,
                        price: prod.salePrice || prod.basePrice,
                        image: primaryImg,
                        size: "40",
                      });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#111111] hover:bg-[#C4653F] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
