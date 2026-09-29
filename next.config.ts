import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare quick tunnels and any trycloudflare.com subdomains in dev mode
  allowedDevOrigins: [
    "faqs-usr-content-promotions.trycloudflare.com",
    "*.trycloudflare.com",
    "localhost:3000",
  ],
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
