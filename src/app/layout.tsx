import type { Metadata, Viewport } from "next";
import { Poppins, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZAYA ZEN — Designer Panjabi & Menswear",
    template: "%s | ZAYA ZEN",
  },
  description:
    "Elegance in Every Thread. Premium designer Panjabis, shirts, and menswear in Bangladesh. High quality craftsmanship with comfortable fabrics.",
  keywords: [
    "Zaya Zen",
    "Panjabi",
    "Designer Panjabi Bangladesh",
    "Menswear Dhaka",
    "Cotton Panjabi",
    "Stock Clearance Panjabi",
  ],
  openGraph: {
    title: "ZAYA ZEN — Designer Panjabi & Menswear",
    description: "Elegance in Every Thread. Premium designer Panjabis in Bangladesh.",
    url: "https://zayazenbd.com",
    siteName: "ZAYA ZEN",
    locale: "en_BD",
    type: "website",
  },
  icons: {
    icon: "/brand/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${hindSiliguri.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#111111] selection:bg-[#F7E3DA] selection:text-[#A9532F] pb-16 md:pb-0">
        <SmoothScrollProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </SmoothScrollProvider>
        <MobileBottomNav />
      </body>
    </html>
  );
}
