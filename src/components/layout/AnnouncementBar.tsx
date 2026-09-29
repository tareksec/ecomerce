"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Globe, ChevronRight, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lang, setLang] = useState<"en" | "bn">("en");

  const messages = SITE_CONFIG.announcement;

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [messages.length, isPaused]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsPaused((prev) => !prev)}
      className="relative bg-[#111111] text-white text-xs border-b border-[#262422] z-40 select-none cursor-pointer"
      title="Tap to pause announcements"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-9 sm:h-10 flex items-center justify-between">
        {/* Left: Campaign Tag & Social Link */}
        <div className="hidden md:flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C4653F] text-white font-medium text-[11px] tracking-wide uppercase">
            Clearance
          </span>
          <a
            href={SITE_CONFIG.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-white transition-colors duration-200"
          >
            #স্টক_ক্লিয়ারেন্স_অফার
          </a>
        </div>

        {/* Center: Rotating Announcement Message */}
        <div className="flex-1 flex items-center justify-center overflow-hidden px-1">
          <div className="flex items-center gap-1.5 transition-all duration-500 ease-out transform">
            <span className="font-medium text-stone-200 text-center tracking-tight text-[11px] sm:text-xs line-clamp-1">
              {messages[currentIndex]}
            </span>
            <Link
              href="/clearance"
              className="hidden sm:inline-flex items-center gap-0.5 text-[#C4653F] hover:text-[#f7e3da] font-semibold underline underline-offset-2 transition-colors ml-1 text-xs"
            >
              Shop Now <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Hotline, Currency & Language */}
        <div className="hidden lg:flex items-center gap-4 text-stone-300">
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Zaya%20Zen,%20I%20would%20like%20to%20place%20an%20order`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#2E7D5B]" />
            <span className="text-[11px] font-medium">WhatsApp: {SITE_CONFIG.contact.phone}</span>
          </a>

          <div className="h-3 w-px bg-stone-700" />

          {/* Currency */}
          <span className="font-medium text-[11px] text-stone-400">৳ BDT</span>

          <div className="h-3 w-px bg-stone-700" />

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="flex items-center gap-1 text-[11px] font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>{lang === "en" ? "বাংলা" : "English"}</span>
          </button>

          {/* Dismiss button */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss Announcement"
            className="text-stone-500 hover:text-stone-300 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
