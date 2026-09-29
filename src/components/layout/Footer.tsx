"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, Mail, MapPin, ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white border-t border-[#262422]">
      {/* Trust Highlights Strip */}
      <div className="border-b border-[#262422] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-[#C4653F]/10 flex items-center justify-center text-[#C4653F]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Nationwide Delivery</h4>
                <p className="text-xs text-stone-400 mt-0.5">Free delivery on orders over ৳3,000</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-[#C4653F]/10 flex items-center justify-center text-[#C4653F]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Premium Quality Fabric</h4>
                <p className="text-xs text-stone-400 mt-0.5">100% fine combed breathable cotton</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-[#C4653F]/10 flex items-center justify-center text-[#C4653F]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Easy Exchange</h4>
                <p className="text-xs text-stone-400 mt-0.5">7 days hassle-free size exchange</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-[#2E7D5B]/10 flex items-center justify-center text-[#2E7D5B]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">WhatsApp Assistance</h4>
                <p className="text-xs text-stone-400 mt-0.5">Direct chat & instant order confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-sm">
                <Image
                  src="/brand/logo.png"
                  alt="ZAYA ZEN"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-white">ZAYA</span>
                  <span className="font-extrabold text-2xl tracking-tight text-[#C4653F] underline decoration-3 underline-offset-3">
                    ZEN
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-semibold tracking-[0.2em] uppercase -mt-0.5 block">
                  PANJABI & MENSWEAR
                </span>
              </div>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Elegance in Every Thread. We craft premium designer Panjabis and contemporary menswear tailored for gentlemen who value unmatched comfort and understated prestige.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300 hover:text-white hover:border-[#C4653F] transition-all"
              >
                Facebook Page
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#2E7D5B]/20 text-[#2E7D5B] text-xs font-semibold hover:bg-[#2E7D5B] hover:text-white transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/shop/panjabi" className="hover:text-white transition-colors">
                  Designer Panjabi
                </Link>
              </li>
              <li>
                <Link href="/shop/cotton-casual" className="hover:text-white transition-colors">
                  Cotton & Casual Panjabi
                </Link>
              </li>
              <li>
                <Link href="/shop/semi-formal" className="hover:text-white transition-colors">
                  Semi-Formal Series
                </Link>
              </li>
              <li>
                <Link href="/shop/pajama-pants" className="hover:text-white transition-colors">
                  Pajamas & Pants
                </Link>
              </li>
              <li>
                <Link href="/shop/shirts" className="hover:text-white transition-colors">
                  Premium Shirts
                </Link>
              </li>
              <li>
                <Link href="/clearance" className="text-[#C4653F] font-semibold hover:underline">
                  Stock Clearance Offer
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/size-chart" className="hover:text-white transition-colors">
                  Panjabi Size Chart
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Store Info
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C4653F] flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C4653F] flex-shrink-0" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C4653F] flex-shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </li>
              <li className="pt-2 text-stone-400 text-[11px]">
                Payment Methods: Cash on Delivery (COD), bKash, Nagad, Visa/Mastercard.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#262422] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ZAYA ZEN. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">
              Terms of Service
            </Link>
            <a href="https://zayazenbd.com" className="hover:text-stone-300 transition-colors">
              zayazenbd.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
