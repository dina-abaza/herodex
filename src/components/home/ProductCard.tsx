'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAddToCartMutation } from '@/store/api/cartApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/admin/login');
      return;
    }

    try {
      await addToCart({ productId: product._id, quantity: 1 }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image Section - تحسين عرض الصورة */}
      <div className="relative aspect-[4/5] overflow-hidden bg-store-muted/30 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center shadow-sm border border-white/20">
          <Star size={12} className="text-store-gold fill-store-gold ml-1" />
          <span className="text-xs font-bold text-gray-700 tracking-tighter">4.8</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div>
          {/* Category */}
          <span className="text-[10px] font-black text-store-gold bg-store-gold/5 px-3 py-1 rounded-md uppercase tracking-[0.1em] mb-3 inline-block border border-store-gold/10">
            {product.category?.name || 'مستحضرات تجميل'}
          </span>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-store transition-colors line-clamp-1 leading-tight">
            {product.name}
          </h3>
          
          {/* Description - الوصف كامل */}
          <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Price and Action Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 line-through decoration-store-gold/30">
              {(product.price * 1.2).toFixed(2)} ر.س
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-store tracking-tighter">
                {product.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-store">ر.س</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="rounded-xl px-5 py-6 flex items-center bg-store hover:bg-store-dark text-white border-0 shadow-lg shadow-store/20 transition-all duration-300" 
            onClick={handleAddToCart}
            isLoading={isLoading}
          >
            <ShoppingCart size={18} className="ml-2" />
            <span className="font-bold text-sm">أضيفي للسلة</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}