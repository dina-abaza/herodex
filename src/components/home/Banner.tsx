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
  const [isMobile, setIsMobile] = useState(false); // يمكن حذفه لاحقاً لو لم يستخدم
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // لم نعد بحاجة لفحص isMobile هنا لأننا نستخدم CSS
  }, []);

  // الاعتماد كلياً على الباك اند فقط
  const apiBanners = response?.data || initialBanners;
//  console.log("apiBanners") 
//  console.log(apiBanners) 

  // تجهيز القوائم مسبقاً
  const mobileBanners = apiBanners.filter((b: any) => b.type === 'mobile' || b.mobilePath);
  const laptopBanners = apiBanners.filter((b: any) => b.type === 'laptop' || b.laptopPath);
  
  // نستخدم قائمة واحدة للتحكم في الترقيم (الاندكس) 
  // نفترض أن عدد البانرات متساوي أو نستخدم الأطول
  const displayBanners = laptopBanners.length > 0 ? laptopBanners : mobileBanners;

  useEffect(() => {
    if (displayBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= displayBanners.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [displayBanners.length]);

  const next = () => setCurrent((prev) => (prev >= displayBanners.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev <= 0 ? displayBanners.length - 1 : prev - 1));

  if (isLoading) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200 animate-pulse" />
    );
  }

  if (apiBanners.length === 0) return null;

  // البوردر رادياس للبانر
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwMwF9ukfQAAAABJRU5ErkJggg==";

  return (
    <div className="relative w-full bg-transparent aspect-[16/9] md:aspect-[21/9] group overflow-hidden">
      <div className="grid grid-cols-1 grid-rows-1 transition-all duration-500 aspect-[16/9] md:aspect-[21/9]">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative col-start-1 row-start-1 w-full h-full cursor-pointer z-10"
          >
            {/* عرض نسخة الموبايل - تظهر فقط على الموبايل عبر CSS */}
            {mobileBanners[current] && (
              <div className="block md:hidden relative w-full h-full">
                <Image
                  src={mobileBanners[current].originalPath}
                  alt={`Mobile Banner ${current + 1}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  priority={current === 0}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            )}

            {/* عرض نسخة اللابتوب - تظهر فقط على الشاشات الكبيرة عبر CSS */}
            {laptopBanners[current] && (
              <div className="hidden md:block relative w-full h-full">
                <Image
                  src={laptopBanners[current].originalPath}
                  alt={`Laptop Banner ${current + 1}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  priority={current === 0}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {displayBanners.length > 1 && (
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
      {displayBanners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3 space-x-reverse">
          {displayBanners.map((_: any, i: number) => (
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
