'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAddToCartMutation } from '@/store/api/cartApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { toast } from 'react-toastify';
import { trackViewContent, trackAddToCart } from '@/lib/meta-pixel';

import Image from 'next/image';

interface ProductCardProps {
  product: any;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [addToCart] = useAddToCartMutation();



  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    // Meta Pixel: track product detail view
    trackViewContent({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category?.name,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // تشغيل الإضافة في الخلفية بدون انتظار الرد (Optimistic UI)
    addToCart({ productId: product._id, quantity: 1, product: product });

    // Meta Pixel: track add to cart
    trackAddToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category?.name,
    });
    
    // إظهار رسالة النجاح فوراً لتجربة سريعة جداً
    toast.success(`تم إضافة ${product.name} إلى السلة بنجاح ✨`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // تشغيل الإضافة في الخلفية
    addToCart({ productId: product._id, quantity: 1, product: product });
    
    // التحويل اللحظي بما أن السلة ستتحدث تلقائياً بفضل الـ Optimistic updates
    router.push('/checkout');
  };

  return (
    <>
      {/* CSS animate-scale-in بدل motion.div initial/whileInView */}
      <div
        onClick={handleOpenModal}
        className="animate-scale-in group bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden bg-store-muted/30 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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

            {/* Description */}
            <div className="mt-2">
              <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed font-bold">
                {product.description}
              </p>
              <button
                onClick={handleOpenModal}
                aria-label={`عرض تفاصيل المنتج: ${product.name}`}
                className="text-store-gold text-[10px] font-black mt-1 hover:underline decoration-2 underline-offset-4"
              >
                قراءة المزيد...
              </button>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold line-through ml-1 leading-none mb-1">
                {(product.price + 100).toLocaleString('en-US')} ج.م
              </span>
              <span className="text-xl font-black text-store-dark tracking-tight">
                {product.price?.toLocaleString('en-US')} <span className="text-xs font-bold text-gray-500 mr-0.5">ج.م</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl w-10 h-10 border-store/20 text-store hover:bg-store/5"
                onClick={handleAddToCart}
                aria-label={`إضافة ${product.name} إلى سلة المشتريات`}
              >
                <ShoppingCart size={18} />
              </Button>
              <Button
                size="sm"
                className="rounded-xl px-4 h-10 bg-store hover:bg-store-dark text-white border-0 shadow-sm text-xs font-bold"
                onClick={handleBuyNow}
              >
                اشترِ الآن
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={product.name}
        className="sm:max-w-2xl"
      >
        <div className="flex flex-col md:flex-row gap-8 text-right overflow-hidden" dir="rtl">
          {/* Large Image */}
          <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden bg-store-muted/20 border border-neutral-100 shadow-inner relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Detailed Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-store-gold bg-store-gold/5 px-4 py-1.5 rounded-full border border-store-gold/10">
                  {product.category?.name || 'مستحضرات تجميل'}
                </span>
                <div className="flex items-center bg-store-muted/50 px-3 py-1 rounded-full">
                  <Star size={14} className="text-store-gold fill-store-gold ml-1.5" />
                  <span className="text-xs font-black text-store-dark">4.8</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                {product.name}
              </h2>

              <div className="space-y-2">
                <h4 className="text-sm font-black text-store-dark">وصف المنتج:</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Indian Formula Badge */}
              <div className="p-4 bg-gradient-to-br from-store-muted/50 to-white rounded-2xl border border-store/10 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-store/10 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-store rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-store uppercase tracking-wider">تركيبة هندية متطورة</p>
                  <p className="text-xs font-bold text-gray-600">غنية بالكافيين لنتائج في ٣٠ يوم</p>
                </div>
              </div>
            </div>

            {/* Price & Cart Inside Modal */}
            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through decoration-store-gold/40">
                  {(product.price * 1.2).toFixed(2)} ج.م
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-store tracking-tighter">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-store">ج.م</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 transition-all border border-gray-100"
                  onClick={handleAddToCart}
                  title="أضيفي للسلة"
                >
                  <ShoppingCart size={22} />
                </button>
                <Button
                  className="flex-1 h-14 rounded-2xl bg-store hover:bg-store-dark text-white font-bold text-lg shadow-xl shadow-store/20"
                  onClick={handleBuyNow}
                >
                  اشترِ الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}