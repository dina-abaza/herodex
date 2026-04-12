'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Banner } from '@/components/home/Banner';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductCard } from '@/components/home/ProductCard';
import { useGetProductsQuery } from '@/store/api/productApiSlice';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery({ 
    page, 
    limit: 8, 
    category: selectedCategory 
  });

  const products = data?.data?.products || [];
  const totalPages = data?.data?.pages || 1;

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setPage(1); // Reset to first page on category change
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

        <section className="py-16 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">منتجاتنا المختارة</h2>
                <p className="text-gray-500 mt-2">اكتشفي الجمال في كل تفصيل</p>
              </div>
              <div className="text-sm font-medium text-rose-600 hover:underline cursor-pointer">
                عرض الكل
              </div>
            </div>

            {isLoading ? (
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
                      className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                    >
                      <ChevronRight size={20} />
                    </Button>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i + 1)}
                          className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                            page === i + 1 
                              ? 'bg-rose-600 text-white shadow-md' 
                              : 'bg-white text-gray-400 hover:bg-rose-50 hover:text-rose-600'
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
                      className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="mx-auto w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                  <PackageSearch size={40} className="text-rose-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">لا توجد منتجات</h3>
                <p className="text-gray-500 mt-2">عذراً، لا توجد منتجات متوفرة في هذا القسم حالياً</p>
                <Button 
                  variant="primary" 
                  className="mt-8"
                  onClick={() => handleCategoryChange('')}
                >
                  العودة للكل
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-20 bg-rose-600 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:flex items-center justify-between">
              <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
                <h2 className="text-4xl font-extrabold mb-6 leading-tight">انضمي لنشرتنا البريدية <br /> واحصلي على خصم 15%</h2>
                <p className="text-rose-100 text-lg mb-8">كوني أول من يعلم عن تشكيلاتنا الجديدة والعروض الحصرية.</p>
                <div className="flex max-w-md">
                  <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="flex-1 px-6 py-4 rounded-r-2xl text-gray-900 focus:outline-none"
                  />
                  <button className="bg-gray-900 text-white px-8 py-4 rounded-l-2xl font-bold hover:bg-black transition-colors">
                    اشتراك
                  </button>
                </div>
              </div>
              <div className="lg:w-1/3 hidden lg:block">
                <div className="relative">
                  <div className="w-64 h-64 bg-rose-500 rounded-full absolute -top-10 -left-10 animate-pulse"></div>
                  <div className="w-48 h-48 bg-rose-400 rounded-full absolute -bottom-10 -right-10 animate-bounce"></div>
                  <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                    <p className="text-white italic text-lg leading-relaxed">
                      "أفضل تجربة تسوق لمنتجات التجميل، الجودة والسرعة في التوصيل تجعلني أطلب دائماً من هنا."
                    </p>
                    <div className="mt-6 flex items-center">
                      <div className="w-12 h-12 bg-rose-200 rounded-full"></div>
                      <div className="mr-4">
                        <p className="text-white font-bold">سارة أحمد</p>
                        <p className="text-rose-200 text-sm">عميلة مميزة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
