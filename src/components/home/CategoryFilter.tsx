'use client';

import React from 'react';
import Image from 'next/image';
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
    <div id="categories" className="py-20 bg-gray-50/50"> {/* خلفية هادئة لإبراز الكروت البيضاء */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">تسوق من الأقسام</h2>
          <div className="w-20 h-1.5 bg-store mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible justify-start md:justify-center gap-6 md:gap-10 pb-4 md:pb-0 no-scrollbar items-stretch ">
          {/* قسم "الكل" بتصميم بروفيشنال */}
       {/* الكلاسات المعدلة للـ Button */}
<button
  onClick={() => onSelectCategory('')}
  className="w-[45%] md:w-[28%] lg:w-[20%] flex flex-col items-center group transition-all duration-500 pt-2" // أضفنا pt-2 لإعطاء مساحة للـ translate فلا يظهر "مأكول"
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
  
  {/* النص السفلي المعدل */}
  <span className={cn(
    "mt-4 font-bold text-sm md:text-xl transition-colors tracking-wide text-center min-h-[3rem] flex items-start justify-center", // أضفنا min-h لتوحيد السطر
    selectedCategory === '' ? "text-store" : "text-slate-500 group-hover:text-slate-900"
  )}>
   كل المنتجات
  </span>
</button>

          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="w-[45%] md:w-[28%] lg:w-[20%] flex flex-col items-center animate-pulse">
                <div className="w-full aspect-[4/3] rounded-3xl bg-gray-200"></div>
                <div className="w-2/3 h-5 bg-gray-200 mt-4 rounded-full"></div>
              </div>
            ))
          ) : (
            categories.map((category: any) => (
              <button
                key={category._id}
                onClick={() => onSelectCategory(category._id)}
                className="w-[45%] md:w-[28%] lg:w-[20%] flex flex-col items-center group transition-all duration-500"
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
                        "object-cover transition-transform duration-1000 group-hover:scale-110", // object-cover تجعل الصورة تملأ الفريم
                        selectedCategory === category._id ? "scale-110" : "scale-100"
                      )}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized={category.image.startsWith('http')}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl font-bold">
                      {category.name.charAt(0)}
                    </div>
                  )}
                  {/* Overlay خفيف لجعل الصور تبدو متناسقة */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <span className={cn(
                  "mt-4 font-bold text-xl transition-colors tracking-wide text-center",
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