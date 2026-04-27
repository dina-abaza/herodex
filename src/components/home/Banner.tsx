'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useGetBannersQuery } from '@/store/api/bannerApiSlice';

interface BannerProps {
  initialBanners?: any[];
}

export function Banner({ initialBanners = [] }: BannerProps) {
  const [current, setCurrent] = useState(0);
  const { data: response, isLoading } = useGetBannersQuery(undefined, {
    skip: initialBanners.length > 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // الاعتماد كلياً على الباك اند فقط
  const apiBanners = response?.data || initialBanners;

  // الفلترة لعرض الصور المناسبة لكل جهاز (بدون تكرار)
  const banners = apiBanners.filter((b: any) => {
    if (!mounted) return b.type === 'laptop' || b.laptopPath; // الافتراضي للـ SSR
    if (isMobile) return b.type === 'mobile' || b.mobilePath;
    return b.type === 'laptop' || b.laptopPath;
  });

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const next = () => setCurrent((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev <= 0 ? banners.length - 1 : prev - 1));

  // إذا كان هناك بيانات أولية، لا نظهر الهيكل العظمي
  if (isLoading && initialBanners.length === 0) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200 animate-pulse" />
    );
  }

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full bg-transparent aspect-[16/9] md:aspect-[21/9] group overflow-hidden">
      {/* ضبط الأبعاد بناءً على الوثيقة: 16:9 للموبايل و 21:9 للابتوب */}
      <div className="grid grid-cols-1 grid-rows-1 transition-all duration-500 aspect-[16/9] md:aspect-[21/9]">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${current}-${isMobile}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative col-start-1 row-start-1 w-full h-full cursor-pointer z-10"
          >
            {/* استخدام object-fill لضمان ملء الأبعاد المحددة في الوثيقة تماماً */}
            <Image
              src={isMobile
                ? (banners[current].mobilePath || banners[current].originalPath)
                : (banners[current].laptopPath || banners[current].originalPath)
              }
              alt={`Banner ${current + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-store hover:border-store-gold/60 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-store hover:border-store-gold/60 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3 space-x-reverse">
          {banners.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === i ? 'w-8 bg-store-gold' : 'w-1.5 bg-black/20 hover:bg-store-gold-light'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
