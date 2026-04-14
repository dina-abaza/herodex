'use client';

import React, { useEffect, useState } from 'react';
import { useGetReviewsQuery } from '@/store/api/reviewApiSlice';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ReviewsSection() {
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetReviewsQuery(undefined);
  
  // لغرض التجربة عندك عشان تشوفي الحركة كرري السطر اللي تحت لو حبيتي
  const reviews = reviewsData?.data ? [...reviewsData.data, ...reviewsData.data] : [];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // حركه تلقائية كل 4 ثواني فقط لو في أكتر من مراجعة
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* العناوين */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-store-muted text-store font-bold text-sm mb-6 border border-store/15">
            <Star size={16} className="ml-2 fill-store-gold text-store-gold" />
            <span>آراء عميلاتنا</span>
          </div>
          <h2 className="text-4xl font-black text-store-black mb-4 tracking-tight">جمالك بعيون من جربونا</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            نفخر بمشاركة تجارب عميلاتنا الحقيقية. الجودة هي سر ثقتكم بنا.
          </p>
        </div>

        {isReviewsLoading ? (
          <div className="flex justify-center">
            <div className="w-full max-w-[400px] aspect-[4/5] bg-gray-50 animate-pulse rounded-[2.5rem]"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="relative flex flex-col items-center">
            
            {/* حاوية الكاروسيل المطورة لمنع اللون الأبيض */}
            <div className="relative w-full overflow-hidden py-4 min-h-[550px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="group relative w-full max-w-[450px] aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl border border-neutral-100 bg-white"
                >
                  <img 
                    src={reviews[currentIndex].imageUrl || reviews[currentIndex].image || ''} 
                    alt="مراجعة عميلة" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay التدرج اللوني (الأخضر الغامق) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-store-dark/90 via-transparent to-transparent flex items-end p-10">
                    <div className="text-white transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                      <div className="flex text-store-gold mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-current" />
                        ))}
                      </div>
                      <p className="font-bold text-xl mb-1 italic">تجربة حقيقية</p>
                      <p className="text-white/70 text-sm">ثقة عميلاتنا هي سر تميزنا</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* نقاط التنقل (Bullets) تظهر فقط لو في أكتر من مراجعة */}
            {reviews.length > 1 && (
              <div className="flex gap-3 mt-8">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      currentIndex === idx ? 'w-8 bg-store-gold' : 'w-2 bg-gray-200 shadow-inner'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* حالة عدم وجود مراجعات */
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic tracking-wide">قريباً.. سنعرض تجارب عميلاتنا هنا</p>
          </div>
        )}
      </div>
    </section>
  );
}