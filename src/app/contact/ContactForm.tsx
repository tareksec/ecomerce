"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#2E7D5B]/10 text-[#2E7D5B] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg text-stone-900">Message Received!</h3>
        <p className="text-xs text-stone-600 max-w-sm mx-auto">
          Thank you for contacting Zaya Zen. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
          Your Name *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Rakibul Hasan"
          className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-sm text-stone-900 outline-none focus:border-[#C4653F]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          required
          placeholder="01XXXXXXXXX"
          className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-sm text-stone-900 outline-none focus:border-[#C4653F]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
          Message or Question *
        </label>
        <textarea
          rows={4}
          required
          placeholder="How can we assist you?"
          className="w-full px-4 py-3 rounded-xl border border-[#E7E3DC] text-sm text-stone-900 outline-none focus:border-[#C4653F]"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 rounded-xl bg-[#111111] hover:bg-[#C4653F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <span>Submit Message</span>
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
