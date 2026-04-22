import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'جمالك | متجر مستحضرات التجميل',
    short_name: 'جمالك',
    description: 'وجهتك الأولى لأفضل منتجات التجميل والعناية بالبشرة',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e11d48',
    icons: [
      {
        src: '/logo/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
      {
        src: '/logo/logo.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/logo/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  }
}
