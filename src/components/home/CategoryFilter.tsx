'use client';

import React from 'react';
import { useGetCategoriesQuery } from '@/store/api/categoryApiSlice';
import { cn } from '@/utils/cn';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery(undefined);
  const categories = categoriesData?.data || [];

  return (
    <div id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-store-black tracking-tight">تسوقي حسب الفئات</h2>
          <p className="text-gray-500 mt-4 text-lg font-medium">اختاري من بين تشكيلتنا المتنوعة والمنظمة</p>
          <div className="w-24 h-1.5 bg-gradient-to-l from-store-gold to-store mx-auto mt-6 rounded-full shadow-sm shadow-store/20"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {/* "All" Category */}
          <button
            onClick={() => onSelectCategory('')}
            className="flex flex-col items-center group transition-all duration-300"
          >
            <div 
              className={cn(
                "w-24 h-24 md:w-32 md:h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-md",
                selectedCategory === '' 
                  ? "bg-store border-store-gold/40 scale-110 shadow-lg shadow-store/30" 
                  : "bg-gray-50 border-white hover:border-store/25 hover:bg-store-muted"
              )}
            >
              <span className={cn(
                "text-lg font-black",
                selectedCategory === '' ? "text-white" : "text-gray-400 group-hover:text-store"
              )}>الكل</span>
            </div>
            <span className={cn(
              "mt-4 font-bold text-sm transition-colors",
              selectedCategory === '' ? "text-store" : "text-gray-500 group-hover:text-store"
            )}>جميع المنتجات</span>
          </button>

          {isLoading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100"></div>
                <div className="w-16 h-4 bg-gray-100 mt-4 rounded"></div>
              </div>
            ))
          ) : (
            categories.map((category: any) => (
              <button
                key={category._id}
                onClick={() => onSelectCategory(category._id)}
                className="flex flex-col items-center group transition-all duration-300"
              >
                <div 
                  className={cn(
                    "w-24 h-24 md:w-32 md:h-32 rounded-full border-4 overflow-hidden transition-all duration-500 shadow-md relative",
                    selectedCategory === category._id 
                      ? "border-store-gold/50 scale-110 shadow-lg shadow-store/20 ring-2 ring-store-gold/30" 
                      : "border-white hover:border-store/20 group-hover:shadow-store/10"
                  )}
                >
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                        selectedCategory === category._id ? "brightness-110" : "brightness-95 group-hover:brightness-105"
                      )}
                    />
                  ) : (
                    <div className="w-full h-full bg-store-muted flex items-center justify-center text-store/40">
                      {category.name.charAt(0)}
                    </div>
                  )}
                  {selectedCategory === category._id && (
                    <div className="absolute inset-0 bg-store/15 ring-4 ring-store-gold/35 inset-1 rounded-full pointer-events-none"></div>
                  )}
                </div>
                <span className={cn(
                  "mt-4 font-bold text-sm transition-colors",
                  selectedCategory === category._id ? "text-store" : "text-gray-500 group-hover:text-store"
                )}>{category.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
