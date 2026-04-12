'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Banner() {
  return (
    <div className="relative bg-rose-50 h-[400px] md:h-[500px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-rose-600 font-bold tracking-wider text-sm uppercase">تشكيلة الربيع الجديدة</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-4 leading-tight">
              أبرزي جمالك الطبيعي <br /> 
              <span className="text-rose-600">بأفضل المنتجات</span>
            </h1>
            <p className="text-gray-500 text-lg mt-6 leading-relaxed">
              اكتشفي تشكيلتنا الواسعة من منتجات التجميل والعناية بالبشرة المختارة بعناية لأجلك. شحن سريع وضمان جودة.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-4 space-x-reverse"
          >
            <Button size="lg" className="px-10">تسوقي الآن</Button>
            <Button variant="outline" size="lg" className="px-10">اكتشفي المزيد</Button>
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-rose-300/10 rounded-full blur-3xl" 
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-3xl" />
      </div>
      
      {/* Visual Image Replacement - Placeholder for actual banner image */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-[40%] h-[90%] z-0">
        <div className="w-full h-full bg-rose-100 rounded-tr-[100px] relative overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center text-rose-300 text-sm font-medium">
             (صورة بانر توضيحية)
           </div>
        </div>
      </div>
    </div>
  );
}
