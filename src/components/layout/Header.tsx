"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { MegaMenu } from "./MegaMenu";
import { SearchModal } from "./SearchModal";
import { MobileNav } from "./MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const cartTotal = useCartStore((state) => state.getTotalCount());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.getCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full pt-3 sm:pt-4 px-3 sm:px-6 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto h-16 sm:h-18 px-4 sm:px-6 rounded-full transition-all duration-300 flex items-center justify-between ${
            isScrolled
              ? "bg-[#FAFAF8]/95 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-[#E7E3DC]"
              : "bg-[#FAFAF8]/92 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E7E3DC]/90"
          }`}
        >
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation"
              className="lg:hidden p-2 rounded-full text-stone-700 hover:text-black hover:bg-stone-200/50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo with exact Zaya Zen visual styling */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/brand/logo.png"
                  alt="ZAYA ZEN"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#111111]">
                    ZAYA
                  </span>
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#C4653F] underline decoration-2 underline-offset-3">
                    ZEN
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#8A8580] font-semibold tracking-[0.2em] uppercase -mt-0.5 hidden xs:inline">
                  PANJABI & MENSWEAR
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation in Title Case matching reference design */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium tracking-normal text-stone-700">
            <Link
              href="/"
              className={`transition-colors py-1.5 relative ${
                pathname === "/"
                  ? "text-[#111111] font-semibold"
                  : "hover:text-[#111111]"
              }`}
            >
              <span>Home</span>
              {pathname === "/" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C4653F] rounded-full" />
              )}
            </Link>

            {/* Mega Menu Trigger for Panjabi */}
            <div
              className="relative py-1.5 cursor-pointer"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <Link
                href="/shop/panjabi"
                className={`flex items-center gap-1.5 transition-colors ${
                  pathname.startsWith("/shop/panjabi")
                    ? "text-[#111111] font-semibold"
                    : "hover:text-[#111111]"
                }`}
              >
                <span>Panjabi</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-[#C4653F]" : "text-stone-500"
                  }`}
                />
              </Link>
            </div>

            <Link
              href="/shop/menswear"
              className={`transition-colors py-1.5 ${
                pathname.startsWith("/shop/menswear")
                  ? "text-[#111111] font-semibold"
                  : "hover:text-[#111111]"
              }`}
            >
              <span>Menswear</span>
            </Link>

            <Link
              href="/clearance"
              className="relative py-1.5 text-stone-700 hover:text-[#C4653F] flex items-center gap-1.5 transition-colors"
            >
              <span>Clearance</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4653F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4653F]"></span>
              </span>
            </Link>

            <Link
              href="/about"
              className={`transition-colors py-1.5 ${
                pathname === "/about"
                  ? "text-[#111111] font-semibold"
                  : "hover:text-[#111111]"
              }`}
            >
              <span>About</span>
            </Link>

            <Link
              href="/contact"
              className={`transition-colors py-1.5 ${
                pathname === "/contact"
                  ? "text-[#111111] font-semibold"
                  : "hover:text-[#111111]"
              }`}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Right: Actions (Search, Wishlist, WhatsApp, Black Pill CTA Button) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search items"
              className="p-2.5 rounded-full hover:bg-stone-200/50 text-stone-700 hover:text-black transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              aria-label="View Wishlist"
              className="relative p-2.5 rounded-full hover:bg-stone-200/50 text-stone-700 hover:text-black transition-colors hidden sm:flex min-w-[40px] min-h-[40px] items-center justify-center touch-manipulation"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C4653F] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Contact Link (Desktop subtle link like "Log In" in reference design) */}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Zaya%20Zen,%20I%20would%20like%20to%20order%20a%20Panjabi`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 text-[14px] font-medium text-stone-700 hover:text-[#2E7D5B] transition-colors px-2 py-1"
            >
              <MessageCircle className="w-4 h-4 text-[#2E7D5B]" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button: Pill CTA Button (matches "Create your site" in reference) */}
            <button
              onClick={openCart}
              aria-label="View Shopping Bag"
              className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer touch-manipulation hover:scale-[1.02] active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#C4653F] text-white text-[11px] font-bold flex items-center justify-center">
                {cartTotal}
              </span>
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div className="relative">
          <MegaMenu
            isOpen={isMegaMenuOpen}
            onClose={() => setIsMegaMenuOpen(false)}
          />
        </div>
      </header>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <CartDrawer />
    </>
  );
}
