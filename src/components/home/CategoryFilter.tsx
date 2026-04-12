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
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">تسوقي حسب الفئات</h2>
          <p className="text-gray-500 mt-2">اختاري من بين تشكيلتنا المتنوعة والمنظمة</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onSelectCategory('')}
            className={cn(
              'px-8 py-3 rounded-full text-sm font-bold transition-all border-2',
              selectedCategory === '' 
                ? 'bg-rose-600 border-rose-600 text-white shadow-lg' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-rose-100 hover:text-rose-600'
            )}
          >
            الكل
          </button>

          {isLoading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-24 bg-gray-100 animate-pulse rounded-full"></div>
            ))
          ) : (
            categories.map((category: any) => (
              <button
                key={category._id}
                onClick={() => onSelectCategory(category._id)}
                className={cn(
                  'px-8 py-3 rounded-full text-sm font-bold transition-all border-2 flex items-center space-x-2 space-x-reverse',
                  selectedCategory === category._id 
                    ? 'bg-rose-600 border-rose-600 text-white shadow-lg' 
                    : 'bg-white border-gray-100 text-gray-500 hover:border-rose-100 hover:text-rose-600'
                )}
              >
                {category.image && (
                  <img src={category.image} alt="" className="w-5 h-5 rounded-full object-cover" />
                )}
                <span>{category.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
