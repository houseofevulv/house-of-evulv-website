import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2400],
  },
  poweredByHeader: false,
  // One address for the site: www.houseofevulv.com redirects permanently to houseofevulv.com
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.houseofevulv.com" }],
        destination: "https://houseofevulv.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
