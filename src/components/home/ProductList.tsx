'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useGetProductsQuery } from '@/store/api/productApiSlice';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';

interface ProductListProps {
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
}

export function ProductList({ selectedCategory, onCategoryChange }: ProductListProps) {
  const [page, setPage] = useState(1);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const { data, isLoading, isFetching, refetch } = useGetProductsQuery({ 
    page, 
    limit: 8, 
    category: selectedCategory 
  });

  // Force refetch on mount to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  const products = data?.data?.products || [];
  const totalPages = data?.data?.pages || 1;

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-gray-50/80 via-store-muted/30 to-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-store-black">منتجاتنا المختارة</h2>
            <p className="text-gray-500 mt-2">اكتشفي الجمال في كل تفصيل</p>
          </div>
          <button 
            onClick={() => onCategoryChange('')}
            className="text-sm font-medium text-store hover:text-store-dark hover:underline cursor-pointer"
          >
            عرض الكل
          </button>
        </div>

        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[400px] bg-white animate-pulse rounded-2xl border border-gray-100"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center space-x-4 space-x-reverse">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  aria-label="الصفحة السابقة"
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                >
                  <ChevronRight size={20} />
                </Button>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      aria-label={`انتقل إلى الصفحة ${i + 1}`}
                      className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                        page === i + 1 
                          ? 'bg-store text-white shadow-md' 
                          : 'bg-white text-gray-400 hover:bg-store-muted hover:text-store'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  aria-label="الصفحة التالية"
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                >
                  <ChevronLeft size={20} />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-store/15">
            <div className="mx-auto w-20 h-20 bg-store-muted rounded-full flex items-center justify-center mb-6 ring-1 ring-store/15">
              <PackageSearch size={40} className="text-store/50" />
            </div>
            <h3 className="text-xl font-bold text-store-black">لا توجد منتجات</h3>
            <p className="text-gray-500 mt-2">عذراً، لا توجد منتجات متوفرة في هذا القسم حالياً</p>
            <Button 
              variant="primary" 
              className="mt-8 bg-store hover:bg-store-dark text-white border-0 shadow-lg"
              onClick={() => onCategoryChange('')}
            >
              العودة للكل
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
