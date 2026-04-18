'use client';

import React, { useEffect, useState } from 'react';
import { useGetReviewsQuery } from '@/store/api/reviewApiSlice';
import { Star } from 'lucide-react';
import Image from 'next/image';

export function ReviewsSection() {
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetReviewsQuery(undefined);

  const reviews = reviewsData?.data ? [...reviewsData.data] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // حركة تلقائية كل 4 ثواني فقط لو في أكتر من مراجعة
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

            {/* حاوية الكاروسيل — CSS transitions بدل AnimatePresence */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lg bg-gray-50">
              {reviews.map((review: any, idx: number) => (
                <div
                  key={idx}
                  className={`carousel-item${idx === currentIndex ? ' active' : ''}`}
                >
                  <Image
                    src={review.imageUrl || review.image || ''}
                    alt="مراجعة عميلة"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    unoptimized={!!(review.imageUrl || review.image)?.startsWith('http')}
                  />
                </div>
              ))}
            </div>

            {/* نقاط التنقل */}
            {reviews.length > 1 && (
              <div className="flex gap-3 mt-8">
                {reviews.map((_: any, idx: number) => (
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