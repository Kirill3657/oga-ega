import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Разрешаем оба формата. Если AVIF всё ещё 400 — оставь только "image/webp".
    formats: ["image/avif"],
    // Локальные картинки из /public отдаются как есть, но на всякий случай:
    remotePatterns: [],
    // Минимальные размеры, которые Next будет генерить
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;