import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.2'],

  // تحسين tree-shaking للمكتبات الكبيرة
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@heroicons/react',
      '@headlessui/react',
    ],
  },

  // تحسين الصور
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 يوم كاش
  },
};

export default nextConfig;
