'use client';

import React from 'react';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/store/api/categoryApiSlice';
import { cn } from '@/utils/cn';
import LoadingSpinner from '@/components/ui/loading';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery(undefined);
  const categories = categoriesData?.data || [];

  return (
    <div id="categories" className="py-12 md:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* القسم العلوي المعدل - Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-store to-slate-900">
              تسوق من الأقسام
            </span>
          </h2>
          
          <p className="text-slate-500 text-lg md:text-xl font-bold italic opacity-80">
            اكتشفي مجموعتنا المختارة بعناية لتناسب جمالك
          </p>

          {/* الخط المتدرج المميز */}
          <div className="relative w-28 h-1.5 mx-auto mt-6">
            <div className="absolute inset-0 bg-store rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Mobile Layout (only visible on small screens) */}
        <div className="flex flex-col md:hidden gap-4 pb-4">
          {/* Categories first on mobile */}
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {isLoading ? (
              <div className="w-full flex justify-center py-16">
                <LoadingSpinner />
              </div>
            ) : (
              categories.map((category: any) => (
                <button
                  key={category._id}
                  onClick={() => onSelectCategory(category._id)}
                  className="w-[48%] flex flex-col items-center group transition-all duration-500 pt-2"
                >
                  <div 
                    className={cn(
                      "w-full aspect-[4/3] rounded-3xl border-2 overflow-hidden transition-all duration-500 relative shadow-md",
                      selectedCategory === category._id 
                        ? "border-store shadow-xl shadow-store/20 -translate-y-2 ring-4 ring-store/10" 
                        : "border-transparent bg-white hover:shadow-lg hover:-translate-y-1"
                    )}
                  >
                    {category.image ? (
                      <Image 
                        src={category.image} 
                        alt={category.name} 
                        fill
                        className={cn(
                          "object-cover transition-transform duration-1000 group-hover:scale-110",
                          selectedCategory === category._id ? "scale-110" : "scale-100"
                        )}
                        sizes="(max-width: 768px) 50vw"
                        unoptimized={category.image.startsWith('http')}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl font-bold">
                        {category.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <span className={cn(
                    "mt-4 font-bold text-base transition-colors tracking-wide text-center min-h-[3rem] flex items-start justify-center",
                    selectedCategory === category._id ? "text-store" : "text-slate-500 group-hover:text-slate-900"
                  )}>{category.name}</span>
                </button>
              ))
            )}
          </div>

          {/* "الكل" button on mobile, centered below */}
          <div className="w-full flex justify-center">
            <button
              onClick={() => onSelectCategory('')}
              className="w-[48%] flex flex-col items-center group transition-all duration-500 pt-2"
            >
              <div 
                className={cn(
                  "w-full aspect-[4/3] rounded-3xl border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden",
                  selectedCategory === '' 
                    ? "bg-store border-store shadow-xl shadow-store/20 -translate-y-2" 
                    : "bg-white border-transparent shadow-md hover:shadow-lg hover:-translate-y-1"
                )}
              >
                <span className={cn(
                  "text-xl font-black z-10",
                  selectedCategory === '' ? "text-white" : "text-slate-600 group-hover:text-store"
                )}>الكل</span>
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent"></div>
              </div>
              
              <span className={cn(
                "mt-4 font-bold text-lg transition-colors tracking-wide text-center min-h-[3rem] flex items-start justify-center",
                selectedCategory === '' ? "text-store" : "text-slate-500 group-hover:text-slate-900"
              )}>
                كل المنتجات
              </span>
            </button>
          </div>
        </div>

        {/* Desktop/Tablet Layout (original, only visible on md and up) */}
        <div className="hidden md:flex flex-nowrap overflow-x-auto justify-center gap-10 pb-0 no-scrollbar items-stretch">
          {/* زرار "الكل" FIRST on desktop */}
          <button
            onClick={() => onSelectCategory('')}
            className="w-[28%] lg:w-[20%] flex flex-col items-center group transition-all duration-500 pt-2"
          >
            <div 
              className={cn(
                "w-full aspect-[4/3] rounded-3xl border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden",
                selectedCategory === '' 
                  ? "bg-store border-store shadow-xl shadow-store/20 -translate-y-2" 
                  : "bg-white border-transparent shadow-md hover:shadow-lg hover:-translate-y-1"
              )}
            >
              <span className={cn(
                "text-lg md:text-2xl font-black z-10",
                selectedCategory === '' ? "text-white" : "text-slate-600 group-hover:text-store"
              )}>الكل</span>
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent"></div>
            </div>
            
            <span className={cn(
              "mt-4 font-bold text-sm md:text-xl transition-colors tracking-wide text-center min-h-[3rem] flex items-start justify-center",
              selectedCategory === '' ? "text-store" : "text-slate-500 group-hover:text-slate-900"
            )}>
              كل المنتجات
            </span>
          </button>

          {isLoading ? (
            <div className="w-full flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            categories.map((category: any) => (
              <button
                key={category._id}
                onClick={() => onSelectCategory(category._id)}
                className="w-[28%] lg:w-[20%] flex flex-col items-center group transition-all duration-500 pt-2"
              >
                <div 
                  className={cn(
                    "w-full aspect-[4/3] rounded-3xl border-2 overflow-hidden transition-all duration-500 relative shadow-md",
                    selectedCategory === category._id 
                      ? "border-store shadow-xl shadow-store/20 -translate-y-2 ring-4 ring-store/10" 
                      : "border-transparent bg-white hover:shadow-lg hover:-translate-y-1"
                  )}
                >
                  {category.image ? (
                    <Image 
                      src={category.image} 
                      alt={category.name} 
                      fill
                      className={cn(
                        "object-cover transition-transform duration-1000 group-hover:scale-110",
                        selectedCategory === category._id ? "scale-110" : "scale-100"
                      )}
                      sizes="(min-width: 768px) 25vw"
                      unoptimized={category.image.startsWith('http')}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl font-bold">
                      {category.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <span className={cn(
                  "mt-4 font-bold text-sm md:text-xl transition-colors tracking-wide text-center min-h-[3rem] flex items-start justify-center",
                  selectedCategory === category._id ? "text-store" : "text-slate-500 group-hover:text-slate-900"
                )}>{category.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
