import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "BDT"): string {
  // Amount in BDT
  return `৳${amount.toLocaleString("en-BD")}`;
}
