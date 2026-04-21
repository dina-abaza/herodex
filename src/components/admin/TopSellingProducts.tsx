import React from 'react';
import { useGetTopSellingQuery } from '@/store/api/statsApiSlice';
import { TrendingUp, Package, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export const TopSellingProducts = () => {
  const { data, isLoading } = useGetTopSellingQuery(5);

  if (isLoading) {
    return (
      <section className="card-modern p-grid-4 min-h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-900">المنتجات الأكثر مبيعاً</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse">
           <div className="w-20 h-20 bg-slate-100 rounded-full"></div>
           <div className="h-4 w-32 bg-slate-100 rounded"></div>
        </div>
      </section>
    );
  }

  const products = data?.data || [];

  // console.log(products);
  return (
    <section className="card-modern p-grid-4 min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-slate-900">المنتجات الأكثر مبيعاً</h2>
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
          <TrendingUp size={24} />
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
            <Package className="text-slate-300" size={32} />
          </div>
          <p className="text-slate-400 font-bold text-lg">لا توجد منتجات مبيعة بعد</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto pr-2">
          {products.map((product: any, index: number) => {
            const productImageUrl = product?.image?.url || product?.image || '';
            
            return (
              <div key={product._id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                  {productImageUrl ? (
                    <Image 
                      src={productImageUrl} 
                      alt={product.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="text-slate-300" size={24} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 font-bold truncate" title={product.name}>{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 text-sm font-medium">{product.price} ج.م</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                      مبيعات: {product.totalQuantitySold}
                    </span>
                  </div>
                </div>
                
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  index === 0 ? 'bg-amber-400 text-amber-900 shadow-lg shadow-amber-400/20' :
                  index === 1 ? 'bg-slate-300 text-slate-800' :
                  index === 2 ? 'bg-amber-600 text-white' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  #{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
