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
      // يمكن إضافة تنبيه نجاح هنا
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
          <Star size={14} className="text-amber-400 fill-amber-400 ml-1" />
          <span className="text-xs font-bold text-gray-700">4.8</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
            {product.category?.name || 'مستحضرات تجميل'}
          </span>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">{(product.price * 1.2).toFixed(2)} ر.س</span>
            <span className="text-xl font-extrabold text-rose-600">{product.price.toFixed(2)} ر.س</span>
          </div>
          
          <Button 
            size="sm" 
            className="rounded-xl px-4 flex items-center" 
            onClick={handleAddToCart}
            isLoading={isLoading}
          >
            <ShoppingCart size={18} className="ml-2" />
            أضيفي للسلة
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
