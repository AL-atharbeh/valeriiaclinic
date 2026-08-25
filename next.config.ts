import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // الجذر يذهب إلى العربية — اللغة الافتراضية
      { source: "/", destination: "/ar", permanent: false },
    ];
  },
};

export default nextConfig;
