'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Banner } from '@/components/home/Banner';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductList } from '@/components/home/ProductList';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <Banner />
        
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategoryChange} 
        />

        <ProductList 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />

        <ReviewsSection />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
