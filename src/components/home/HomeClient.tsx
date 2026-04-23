'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Banner } from '@/components/home/Banner';
import { Footer } from '@/components/layout/Footer';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductList } from '@/components/home/ProductList';

// Components تحت الفولد — تُحمَّل بـ dynamic import لتأخير hydration مع توفير skeleton لمنع الـ CLS
const AboutSection = dynamic(
  () => import('@/components/home/AboutSection').then((m) => m.AboutSection),
  { 
    ssr: true,
    loading: () => <div className="py-24 bg-white h-[500px] md:h-[700px] animate-pulse" />
  }
);

// إضافة الكومبوننت الجديد بـ dynamic import مع skeleton
const QuestionSection = dynamic(
  () => import('@/components/home/questionSection').then((m) => m.QuestionSection),
  { 
    ssr: true,
    loading: () => <div className="py-20 bg-white h-[600px] md:h-[900px] animate-pulse" />
  }
);

const ReviewsSection = dynamic(
  () => import('@/components/home/ReviewsSection').then((m) => m.ReviewsSection),
  { 
    ssr: true,
    loading: () => <div className="py-24 bg-gray-50 h-[400px] md:h-[600px] animate-pulse" />
  }
);

interface HomeClientProps {
  initialData: {
    initialCategories: any[];
    initialProducts: {
      products: any[];
      pages: number;
    };
    initialBanners: any[];
  };
}

export function HomeClient({ initialData }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* فوق الفولد — يُحمَّل مباشرة */}
        <Banner initialBanners={initialData.initialBanners} />

        {/* Categories and Products are now part of the initial HTML */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          initialCategories={initialData.initialCategories}
        />

        <ProductList
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          initialProducts={initialData.initialProducts}
        />

        <AboutSection />
        
        {/* الكومبوننت الجديد مكانه هنا تحت الـ About */}
        <QuestionSection />

        <ReviewsSection />
      </main>

      <Footer />
    </div>
  );
}