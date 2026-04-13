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
        src: '/logo/logo.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
      {
        src: '/logo/logo.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/logo/logo.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}
