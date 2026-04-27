// Server Component — لا 'use client' هنا عمداً
// الـ client state موجود في HomeClient.tsx وبيتحمّل بشكل lazy
import { HomeClient } from '@/components/home/HomeClient';

async function getInitialData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  try {
    const [categoriesRes, productsRes, bannersRes] = await Promise.all([
      fetch(`${baseUrl}/categories`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/products?pageNumber=1&limit=8`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/images`, { next: { revalidate: 60 } })
    ]);

    // وظيفة مساعدة لتحويل الاستجابة لـ JSON بأمان
    const safeJson = async (res: Response) => {
      if (!res.ok) return null;
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        return null;
      }
    };

    const categories = await safeJson(categoriesRes);
    const products = await safeJson(productsRes);
    const banners = await safeJson(bannersRes);

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
