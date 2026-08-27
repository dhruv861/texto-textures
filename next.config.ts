import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Optimized clips + posters are content-addressed by filename in
        // this repo (scripts/optimize-media.mjs re-encodes on demand) — safe
        // to cache for a year. Next.js's own "public/" default is
        // `max-age=0`, so this needs to be set explicitly.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
