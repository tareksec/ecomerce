import React from "react";
import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | ZAYA ZEN",
  description: "Complete your Panjabi order with fast Cash on Delivery across Bangladesh.",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <CheckoutClient />
      </main>

      <Footer />
    </div>
  );
}
