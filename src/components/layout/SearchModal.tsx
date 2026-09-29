"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Designer Panjabi",
  "Cotton Panjabi",
  "White Panjabi",
  "Black Panjabi",
  "Clearance Offer",
  "Oxford Shirt",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FAFAF8] rounded-3xl shadow-2xl border border-[#E7E3DC] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#E7E3DC] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C4653F]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Panjabi, shirts, pajamas, or fabrics..."
            className="flex-1 bg-transparent border-none outline-none text-base text-stone-900 placeholder:text-stone-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-600 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Quick suggestions */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C4653F]" />
              <span>Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7E3DC] hover:border-[#C4653F] hover:text-[#C4653F] text-xs font-medium text-stone-700 transition-all cursor-pointer shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links to shop */}
          <div className="mt-6 pt-6 border-t border-[#E7E3DC]">
            <Link
              href="/shop"
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E7E3DC] hover:border-[#C4653F] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7E3DA] flex items-center justify-center text-[#C4653F]">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#C4653F] transition-colors">
                    Explore All Collections
                  </h4>
                  <p className="text-xs text-stone-500">View 24+ Designer Panjabis & Menswear</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C4653F] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
