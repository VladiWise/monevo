import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google avatars
      },
      {
        protocol: "https",
        hostname: "avatars.yandex.net", // Yandex avatars
      },
    ],
  },

  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },


};

export default nextConfig;
