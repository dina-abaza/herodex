'use client';

import React from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAddToCartMutation } from '@/store/api/cartApiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: any;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/product/${product._id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await addToCart({ productId: product._id, quantity: 1 }).unwrap();
      if (response?.success) {
        toast.success(`تم إضافة ${product.name} إلى السلة بنجاح ✨`);
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message?.includes('already') || err?.status === 400) {
        toast.info('هذا المنتج موجود بالفعل في سلتك 😊');
      } else {
        toast.error('عذراً، حدث خطأ أثناء الإضافة. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="animate-scale-in group bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-store-muted/30 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center shadow-sm border border-white/20">
          <Star size={12} className="text-store-gold fill-store-gold ml-1" />
          <span className="text-xs font-bold text-gray-700 tracking-tighter">4.8</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <span className="text-[10px] font-black text-store-gold bg-store-gold/5 px-3 py-1 rounded-md uppercase tracking-[0.1em] mb-3 inline-block border border-store-gold/10">
            {product.category?.name || 'مستحضرات تجميل'}
          </span>

          <h3 className="text-lg font-bold text-gray-900 group-hover:text-store transition-colors line-clamp-1 leading-tight">
            {product.name}
          </h3>

          <div className="mt-2">
            <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed font-bold">
              {product.description}
            </p>
            <button
              onClick={handleCardClick}
              aria-label={`عرض تفاصيل المنتج: ${product.name}`}
              className="text-store-gold text-[10px] font-black mt-1 hover:underline decoration-2 underline-offset-4"
            >
              قراءة المزيد...
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold line-through ml-1 leading-none mb-1">
              {((product.price || 0) + 100).toLocaleString('en-US')} ج.م
            </span>
            <span className="text-xl font-black text-store-dark tracking-tight">
              {(product.price || 0).toLocaleString('en-US')} <span className="text-xs font-bold text-gray-500 mr-0.5">ج.م</span>
            </span>
          </div>

          <Button
            size="sm"
            className="rounded-xl px-4 py-2 shadow-lg shadow-store/10 text-xs font-bold gap-2"
            onClick={handleCardClick}
          >
            ادخل للرابط
            <Eye size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}