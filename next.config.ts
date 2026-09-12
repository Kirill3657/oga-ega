import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"], // AVIF отключён
  },
};

export default nextConfig;