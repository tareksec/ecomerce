"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Home, Grid, Heart, ShoppingBag, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { SITE_CONFIG } from "@/lib/constants";
import GlassDock, { DockItem } from "@/components/ui/glass-dock";

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartTotal = useCartStore((state) => state.getTotalCount());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.getCount());

  const navItems: DockItem[] = [
    {
      title: "Home",
      icon: Home,
      href: "/",
      isActive: pathname === "/",
    },
    {
      title: "Shop",
      icon: Grid,
      href: "/shop",
      isActive: pathname.startsWith("/shop") || pathname === "/clearance",
    },
    {
      title: "Wishlist",
      icon: Heart,
      href: "/wishlist",
      isActive: pathname === "/wishlist",
      badge: wishlistCount > 0 ? wishlistCount : null,
    },
    {
      title: "Bag",
      icon: ShoppingBag,
      onClick: openCart,
      isActive: false,
      badge: cartTotal > 0 ? cartTotal : null,
    },
    {
      title: "Chat",
      icon: MessageCircle,
      href: `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Zaya%20Zen,%20I%20would%20like%20to%20order`,
      isActive: false,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
      aria-label="Mobile Navigation Dock"
    >
      <GlassDock items={navItems} />
    </nav>
  );
}
