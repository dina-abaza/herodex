'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const bannerImages = [
  {
    desktop: '/banars/panars [219]/first panar 1776084748544.jpg',
    mobile: '/banars/panar16 9/first panar 1776086532329.jpg'
  },
  {
    desktop: '/banars/panars [219]/1776084757590.jpg',
    mobile: '/banars/panar16 9/1776086526115.jpg'
  },
  {
    desktop: '/banars/panars [219]/1776084769058.jpg',
    mobile: '/banars/panar16 9/1776086717551.png'
  },
  {
    desktop: '/banars/panars [219]/1776084775534.jpg',
    mobile: '/banars/panar16 9/1776086743742.png'
  }
];

export function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));

  return (
    <div className="relative w-full lg:object-cover h-[95%] lg:h-[100%] overflow-hidden bg-white group aspect-[16/9] md:aspect-[25/9] lg:aspect-[21/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* Desktop Image */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={bannerImages[current].desktop}
              alt={`Banner ${current + 1} Desktop`}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile Image */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src={bannerImages[current].mobile}
              alt={`Banner ${current + 1} Mobile`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 hover:border-rose-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 hover:border-rose-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3 space-x-reverse">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all duration-300 rounded-full ${
              current === i ? 'w-10 bg-rose-600' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

