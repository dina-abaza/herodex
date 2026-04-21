'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useGetProductsQuery } from '@/store/api/productApiSlice';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';
interface ProductListProps {
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  initialProducts?: {
    products: any[];
    pages: number;
  };
}

export function ProductList({ 
  selectedCategory, 
  onCategoryChange, 
  initialProducts = { products: [], pages: 1 } 
}: ProductListProps) {
  const [page, setPage] = useState(1);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const { data, isLoading, isFetching, refetch } = useGetProductsQuery({ 
    page, 
    limit: 8, 
    category: selectedCategory 
  }, {
    // Skip the initial fetch if we have products from SSR and no filters are applied
    skip: initialProducts.products.length > 0 && selectedCategory === '' && page === 1,
  });

  const products = data?.data?.products || (selectedCategory === '' && page === 1 ? initialProducts.products : []);
  const totalPages = data?.data?.pages || (selectedCategory === '' && page === 1 ? initialProducts.pages : 1);
  
  // Only show loading if we don't have data AND we aren't using initialProducts
  const isInitialLoad = selectedCategory === '' && page === 1 && initialProducts.products.length > 0;
  const showLoading = (isLoading || isFetching) && !isInitialLoad && products.length === 0;

  return (
    <section id="products" className="py-10 md:py-16 bg-gradient-to-b from-gray-50/80 via-store-muted/30 to-gray-50/80">
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

        {showLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="bg-white rounded-3xl p-4 shadow-sm animate-pulse">
                 <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                 <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                 <div className="h-4 bg-gray-200 rounded w-1/2" />
               </div>
             ))}
           </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {products.map((product: any, index: number) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  priority={isInitialLoad && index < 4} 
                />
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
