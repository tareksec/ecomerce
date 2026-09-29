import React from "react";
import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | ZAYA ZEN",
  description: "Get in touch with ZAYA ZEN. Customer support, WhatsApp orders, and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-stone-600 text-sm mt-2">
            Have questions about sizes, fabrics, or existing orders? Our team is always ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white border border-[#E7E3DC] hover:border-[#2E7D5B] shadow-xs hover:shadow-md transition-all flex items-start gap-4 group block"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2E7D5B]/10 text-[#2E7D5B] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900 group-hover:text-[#2E7D5B] transition-colors">
                  WhatsApp Support & Orders
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Instant chat & order confirmation
                </p>
                <span className="text-xs font-bold text-[#2E7D5B] mt-2 block">
                  {SITE_CONFIG.contact.phone} →
                </span>
              </div>
            </a>

            {/* Phone Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E3DC] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C4653F]/10 text-[#C4653F] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900">Direct Hotline</h3>
                <p className="text-xs text-stone-500 mt-0.5">Everyday 10:00 AM – 10:00 PM</p>
                <span className="text-xs font-bold text-stone-900 mt-2 block">
                  {SITE_CONFIG.contact.phone}
                </span>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E3DC] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#111111]/5 text-stone-800 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900">Email Inquiry</h3>
                <p className="text-xs text-stone-500 mt-0.5">For corporate orders & partnerships</p>
                <span className="text-xs font-bold text-stone-900 mt-2 block">
                  {SITE_CONFIG.contact.email}
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E3DC] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C4653F]/10 text-[#C4653F] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900">Main Office & Dispatch</h3>
                <p className="text-xs text-stone-500 mt-0.5">Dhaka, Bangladesh</p>
                <span className="text-[11px] text-stone-400 mt-2 block">
                  Delivering to all 64 districts in Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E7E3DC] shadow-xs">
            <h2 className="text-lg font-bold text-stone-900 mb-6">Send Us a Direct Note</h2>
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
