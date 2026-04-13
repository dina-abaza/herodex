'use client';

import React from 'react';

export function Newsletter() {
  return (
    <section className="py-20 bg-rose-600 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">انضمي لنشرتنا البريدية <br /> واحصلي على خصم 15%</h2>
            <p className="text-rose-100 text-lg mb-8">كوني أول من يعلم عن تشكيلاتنا الجديدة والعروض الحصرية.</p>
            <div className="flex max-w-md">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="flex-1 px-6 py-4 rounded-r-2xl text-gray-900 focus:outline-none"
              />
              <button className="bg-gray-900 text-white px-8 py-4 rounded-l-2xl font-bold hover:bg-black transition-colors">
                اشتراك
              </button>
            </div>
          </div>
          <div className="lg:w-1/3 hidden lg:block">
            <div className="relative">
              <div className="w-64 h-64 bg-rose-500 rounded-full absolute -top-10 -left-10 animate-pulse"></div>
              <div className="w-48 h-48 bg-rose-400 rounded-full absolute -bottom-10 -right-10 animate-bounce"></div>
              <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                <p className="text-white italic text-lg leading-relaxed">
                  "أفضل تجربة تسوق لمنتجات التجميل، الجودة والسرعة في التوصيل تجعلني أطلب دائماً من هنا."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="w-12 h-12 bg-rose-200 rounded-full"></div>
                  <div className="mr-4">
                    <p className="text-white font-bold">سارة أحمد</p>
                    <p className="text-rose-200 text-sm">عميلة مميزة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
