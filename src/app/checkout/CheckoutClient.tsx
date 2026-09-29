"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  ShoppingBag,
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export function CheckoutClient() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [thana, setThana] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= SITE_CONFIG.shipping.freeThreshold;
  const shippingCharge = isFreeShipping
    ? 0
    : district === "Dhaka"
    ? SITE_CONFIG.shipping.insideDhaka
    : SITE_CONFIG.shipping.outsideDhaka;
  const total = subtotal + shippingCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = `ZY-${Math.floor(100000 + Math.random() * 900000)}`;

      // Simulate order API creation
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          customerName: fullName,
          customerPhone: phone,
          shippingAddress: JSON.stringify({
            district,
            thana,
            address,
          }),
          paymentMethod,
          subtotal,
          shipping: shippingCharge,
          total,
          notes,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            size: i.size,
            unitPrice: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      clearCart();
      setOrderComplete(orderNumber);
    } catch (err) {
      console.error(err);
      alert("Order placement failed. Please try ordering via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#2E7D5B]/10 text-[#2E7D5B] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900">Order Confirmed!</h1>
        <p className="text-stone-600 text-sm mt-2">
          Thank you for choosing Zaya Zen! Your order number is{" "}
          <strong className="text-[#C4653F] font-bold">{orderComplete}</strong>.
        </p>
        <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto leading-relaxed">
          Our team will call you shortly on <strong>{phone}</strong> to confirm your delivery address and schedule shipment.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-xl bg-[#111111] hover:bg-[#C4653F] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Continue Shopping
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
              `Hello Zaya Zen, I just placed order #${orderComplete} for ${formatPrice(
                total
              )}. Please confirm!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#2E7D5B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#25664a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500 mt-2 mb-6">
          Add items to your shopping bag to proceed to checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#C4653F] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-block"
        >
          Browse Panjabi Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-14">
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-8">
        Checkout & Shipping
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Customer Info Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details Card */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E3DC] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900">1. Contact Information</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-base sm:text-sm text-stone-900 outline-none focus:border-[#C4653F] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number (Bangladesh) *
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-base sm:text-sm text-stone-900 outline-none focus:border-[#C4653F] transition-colors"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  We will call this number for delivery address verification.
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="p-4 sm:p-6 bg-white rounded-3xl border border-[#E7E3DC] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900">2. Delivery Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-base sm:text-sm text-stone-900 bg-white outline-none focus:border-[#C4653F] cursor-pointer"
                >
                  <option value="Dhaka">Inside Dhaka (৳70)</option>
                  <option value="Chittagong">Chittagong (৳130)</option>
                  <option value="Sylhet">Sylhet (৳130)</option>
                  <option value="Rajshahi">Rajshahi (৳130)</option>
                  <option value="Khulna">Khulna (৳130)</option>
                  <option value="Barisal">Barisal (৳130)</option>
                  <option value="Rangpur">Rangpur (৳130)</option>
                  <option value="Mymensingh">Mymensingh (৳130)</option>
                  <option value="Other">Other District (৳130)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Thana / Area
                </label>
                <input
                  type="text"
                  value={thana}
                  onChange={(e) => setThana(e.target.value)}
                  placeholder="e.g. Dhanmondi, Gulshan, Mirpur"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-base sm:text-sm text-stone-900 outline-none focus:border-[#C4653F] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Full Street Address / House / Road *
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Road #, Area, Landmark"
                className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-base sm:text-sm text-stone-900 outline-none focus:border-[#C4653F] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Order Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific delivery timing or special requests"
                className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-sm text-stone-900 outline-none focus:border-[#C4653F]"
              />
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E3DC] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900">3. Payment Option</h2>

            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "COD"
                    ? "border-[#C4653F] bg-[#F7E3DA]/30 ring-2 ring-[#C4653F]/20"
                    : "border-[#E7E3DC] hover:border-stone-400"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="accent-[#C4653F]"
                />
                <Banknote className="w-5 h-5 text-[#2E7D5B]" />
                <div className="flex-1">
                  <span className="font-bold text-sm text-stone-900 block">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-xs text-stone-500">
                    Pay with cash when the courier hands you the parcel.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "BKASH"
                    ? "border-[#C4653F] bg-[#F7E3DA]/30 ring-2 ring-[#C4653F]/20"
                    : "border-[#E7E3DC] hover:border-stone-400"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "BKASH"}
                  onChange={() => setPaymentMethod("BKASH")}
                  className="accent-[#C4653F]"
                />
                <CreditCard className="w-5 h-5 text-[#C4653F]" />
                <div className="flex-1">
                  <span className="font-bold text-sm text-stone-900 block">
                    bKash / Nagad / Online Payment
                  </span>
                  <span className="text-xs text-stone-500">
                    Payment instructions will be shared via SMS / WhatsApp.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E7E3DC] shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-[#E7E3DC]">
              Order Summary ({items.length} items)
            </h2>

            {/* Items */}
            <div className="divide-y divide-[#E7E3DC] max-h-72 overflow-y-auto pr-1 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                    <span className="text-xs font-bold text-[#C4653F]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-[#E7E3DC] space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Delivery Charge ({district === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                <span className="font-semibold text-stone-900">
                  {isFreeShipping ? (
                    <span className="text-[#2E7D5B] font-bold">FREE</span>
                  ) : (
                    formatPrice(shippingCharge)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-stone-900 pt-3 border-t border-[#E7E3DC]">
                <span>Total Amount</span>
                <span className="text-[#C4653F] text-xl">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#111111] hover:bg-[#C4653F] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <span>{isSubmitting ? "Placing Order..." : `Confirm Order (${formatPrice(total)})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct WhatsApp Quick Order Link */}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                `Hello Zaya Zen, I want to confirm order:\nCustomer: ${fullName || "[Name]"}\nPhone: ${
                  phone || "[Phone]"
                }\nAddress: ${address || district}\nItems:\n${items
                  .map((i) => `- ${i.name} (Size: ${i.size}, Qty: ${i.quantity})`)
                  .join("\n")}\nTotal: ${formatPrice(total)}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#2E7D5B]/10 hover:bg-[#2E7D5B] text-[#2E7D5B] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Or Order via WhatsApp</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E3DC] text-xs text-stone-500 space-y-1">
            <p className="font-semibold text-stone-800">🛡️ Buyer Protection:</p>
            <p>Check the parcel in front of the delivery agent. 7 days exchange guaranteed.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
