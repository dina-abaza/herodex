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
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">تسوقي حسب الفئات</h2>
          <p className="text-gray-500 mt-4 text-lg font-medium">اختاري من بين تشكيلتنا المتنوعة والمنظمة</p>
          <div className="w-24 h-1.5 bg-rose-600 mx-auto mt-6 rounded-full shadow-sm shadow-rose-100"></div>
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
                  ? "bg-rose-600 border-rose-100 scale-110 shadow-rose-200" 
                  : "bg-gray-50 border-white hover:border-rose-100 hover:bg-rose-50"
              )}
            >
              <span className={cn(
                "text-lg font-black",
                selectedCategory === '' ? "text-white" : "text-gray-400 group-hover:text-rose-600"
              )}>الكل</span>
            </div>
            <span className={cn(
              "mt-4 font-bold text-sm transition-colors",
              selectedCategory === '' ? "text-rose-600" : "text-gray-500 group-hover:text-rose-600"
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
                      ? "border-rose-100 scale-110 shadow-rose-200" 
                      : "border-white hover:border-rose-100 group-hover:shadow-rose-50"
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
                    <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-300">
                      {category.name.charAt(0)}
                    </div>
                  )}
                  {selectedCategory === category._id && (
                    <div className="absolute inset-0 bg-rose-600/10 ring-4 ring-rose-600/30 inset-1 rounded-full pointer-events-none"></div>
                  )}
                </div>
                <span className={cn(
                  "mt-4 font-bold text-sm transition-colors",
                  selectedCategory === category._id ? "text-rose-600" : "text-gray-500 group-hover:text-rose-600"
                )}>{category.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
