'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Banner } from '@/components/home/Banner';
import { Footer } from '@/components/layout/Footer';

// Components تحت الفولد — تُحمَّل بـ dynamic import لتأخير hydration
const CategoryFilter = dynamic(
  () => import('@/components/home/CategoryFilter').then((m) => m.CategoryFilter),
  { ssr: false }
);

const ProductList = dynamic(
  () => import('@/components/home/ProductList').then((m) => m.ProductList),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import('@/components/home/AboutSection').then((m) => m.AboutSection),
  { ssr: false }
);

// إضافة الكومبوننت الجديد بـ dynamic import
const QuestionSection = dynamic(
  () => import('@/components/home/questionSection').then((m) => m.QuestionSection),
  { ssr: false }
);

const ReviewsSection = dynamic(
  () => import('@/components/home/ReviewsSection').then((m) => m.ReviewsSection),
  { ssr: false }
);

export function HomeClient() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* فوق الفولد — يُحمَّل مباشرة */}
        <Banner />

        {/* تحت الفولد — dynamic imports لتقليل initial bundle */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />

        <ProductList
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
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