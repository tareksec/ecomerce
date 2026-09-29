"use client";

import React from "react";
import { X, Ruler, Check } from "lucide-react";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MEASUREMENTS = [
  { size: "38 (S)", chest: "40\"", length: "40\"", shoulder: "17.5\"", sleeve: "24\"" },
  { size: "40 (M)", chest: "42\"", length: "42\"", shoulder: "18.0\"", sleeve: "24.5\"" },
  { size: "42 (L)", chest: "44\"", length: "44\"", shoulder: "18.5\"", sleeve: "25.0\"" },
  { size: "44 (XL)", chest: "46\"", length: "45\"", shoulder: "19.0\"", sleeve: "25.5\"" },
  { size: "46 (XXL)", chest: "48\"", length: "46\"", shoulder: "19.5\"", sleeve: "26.0\"" },
];

export function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E7E3DC] overflow-hidden z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E3DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F7E3DA] flex items-center justify-center text-[#C4653F]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-stone-900">
                Panjabi Sizing Guide (Inches)
              </h3>
              <p className="text-xs text-stone-500">Standard regular comfort fit</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F1EEE8] text-stone-800 uppercase font-bold text-[11px]">
                <th className="p-3 rounded-l-xl">Size</th>
                <th className="p-3">Chest</th>
                <th className="p-3">Length</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3 rounded-r-xl">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E3DC]">
              {MEASUREMENTS.map((row) => (
                <tr key={row.size} className="hover:bg-stone-50 font-medium text-stone-700">
                  <td className="p-3 font-bold text-[#C4653F]">{row.size}</td>
                  <td className="p-3">{row.chest}</td>
                  <td className="p-3">{row.length}</td>
                  <td className="p-3">{row.shoulder}</td>
                  <td className="p-3">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tips */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E3DC] text-xs text-stone-600 space-y-1.5">
          <p className="font-semibold text-stone-900">💡 Fit Recommendation:</p>
          <p>
            If your body chest measurement is 38 inches, we recommend selecting size <strong>40</strong> for a comfortable regular drape with ease of movement.
          </p>
          <p className="text-[#2E7D5B] font-medium pt-1">
            ✓ Free size replacement within 7 days if the fit is not ideal.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-[#C4653F] text-white font-semibold text-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
