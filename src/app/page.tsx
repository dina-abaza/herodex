// Server Component — لا 'use client' هنا عمداً
// الـ client state موجود في HomeClient.tsx وبيتحمّل بشكل lazy
import { HomeClient } from '@/components/home/HomeClient';

async function getInitialData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  try {
    const [categoriesRes, productsRes, bannersRes] = await Promise.all([
      fetch(`${baseUrl}/categories`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/products?pageNumber=1&limit=8`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/banners`, { next: { revalidate: 60 } })
    ]);

    const categories = await categoriesRes.json();
    const products = await productsRes.json();
    const banners = await bannersRes.json();

    return {
      initialCategories: categories?.data || [],
      initialProducts: products?.data || { products: [], pages: 1 },
      initialBanners: banners?.data || []
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      initialCategories: [],
      initialProducts: { products: [], pages: 1 },
      initialBanners: []
    };
  }
}

export default async function HomePage() {
  const data = await getInitialData();
  
  return <HomeClient initialData={data} />;
}
