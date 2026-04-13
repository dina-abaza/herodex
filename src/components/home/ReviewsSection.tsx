'use client';

import React from 'react';
import { useGetReviewsQuery } from '@/store/api/reviewApiSlice';
import { Star } from 'lucide-react';

export function ReviewsSection() {
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetReviewsQuery(undefined);
  const reviews = reviewsData?.data || [];
console.log(reviews);
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-sm mb-6">
            <Star size={16} className="ml-2 fill-rose-600" />
            <span>آراء عميلاتنا</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">جمالك بعيون من جربونا</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">نفخر بمشاركة تجارب عميلاتنا الحقيقية مع منتجاتنا. الجودة هي سر ثقتكم بنا.</p>
        </div>

        {isReviewsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-50 animate-pulse rounded-3xl border border-gray-100"></div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: any) => (
              <div key={review._id} className="group relative overflow-hidden rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-100/50">
                <div className="aspect-[4/5] relative">
                  <img 
                    src={review.imageUrl} 
                    alt="Review" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="text-white">
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-current" />
                        ))}
                      </div>
                      <p className="font-bold">تجربة حقيقية</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">قريباً.. سنعرض تجارب عميلاتنا هنا</p>
          </div>
        )}
      </div>
    </section>
  );
}
