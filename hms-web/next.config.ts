import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // ── Image optimisation ────────────────────────────────────────────────────
  images: {
    // Serve WebP/AVIF automatically via Next.js built-in optimizer (needs sharp)
    formats: ["image/avif", "image/webp"],

    // Cache optimised images for 30 days (default is 60 s — far too short)
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Responsive breakpoints that match Tailwind sm/md/lg/xl/2xl
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920],

    // Additional intermediate sizes for fill/responsive images
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
  },

  async redirects() {
    return [
      {
        source: "/products/wall-mixer-3in1",
        destination: "/products/wall-shower",
        permanent: false,
      },
    ];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
