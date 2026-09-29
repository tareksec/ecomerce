"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ArrowRight, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111111] via-[#262422] to-[#111111] text-white p-5 sm:p-10 lg:p-16 shadow-2xl border border-[#262422]">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4653F]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#C4653F] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                  <span>Limited Time Campaign</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  #স্টক_ক্লিয়ারেন্স_অফার
                </h2>

                <p className="text-stone-300 text-xs sm:text-base max-w-xl leading-relaxed">
                  Enjoy up to <strong className="text-[#C4653F]">40% off</strong> on selected handcrafted designer Panjabis and cotton classics. Pure comfort, limited pieces available per size!
                </p>

                {/* Countdown Timer: guaranteed 1-line at 360px per MOBILE.md §3.8 */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C4653F]" />
                    <span>Offer Ends In:</span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-center">
                    <div className="bg-stone-900 border border-stone-800 rounded-xl px-2.5 py-1.5 min-w-[46px] sm:min-w-[52px]">
                      <span className="font-extrabold text-base sm:text-lg text-white">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="block text-[8px] sm:text-[9px] uppercase text-stone-400 font-medium">
                        Hours
                      </span>
                    </div>
                    <span className="font-bold text-stone-600">:</span>
                    <div className="bg-stone-900 border border-stone-800 rounded-xl px-2.5 py-1.5 min-w-[46px] sm:min-w-[52px]">
                      <span className="font-extrabold text-base sm:text-lg text-white">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="block text-[8px] sm:text-[9px] uppercase text-stone-400 font-medium">
                        Mins
                      </span>
                    </div>
                    <span className="font-bold text-stone-600">:</span>
                    <div className="bg-stone-900 border border-stone-800 rounded-xl px-2.5 py-1.5 min-w-[46px] sm:min-w-[52px]">
                      <span className="font-extrabold text-base sm:text-lg text-[#C4653F]">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="block text-[8px] sm:text-[9px] uppercase text-stone-400 font-medium">
                        Secs
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link
                    href="/clearance"
                    className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 rounded-xl bg-[#C4653F] hover:bg-[#A9532F] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#C4653F]/30 active:scale-98"
                  >
                    <span>Claim Clearance Discount</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Zaya%20Zen,%20I%20want%20to%20know%20about%20the%20Stock%20Clearance%20Offer`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all border border-white/15 active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2E7D5B]" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

              {/* Right Column / Guarantee Card */}
              <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C4653F]/20 flex items-center justify-center text-[#C4653F]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Authentic Craftsmanship</h4>
                    <p className="text-xs text-stone-400">Directly from our workshop</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-300 pt-2 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4653F]" />
                    <span>100% fine combed breathable cotton</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4653F]" />
                    <span>Exact size replacement within 7 days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4653F]" />
                    <span>Cash on Delivery (COD) everywhere in BD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4653F]" />
                    <span>Instant order confirmation via WhatsApp & Messenger</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
