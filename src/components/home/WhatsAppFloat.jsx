'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  const phoneNumber = '201101546900';
  const message = 'السلام عليكم، حابة استفسر عن المنتجات';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="تواصل معنا عبر واتساب"
    >
      {/* طبقة النبض الخارجية - تم تعديل الحجم والسرعة */}
      <span 
        className="absolute inset-1 rounded-full bg-green-400 opacity-40 animate-ping group-hover:animate-none"
        style={{ animationDuration: '3s' }} // جعل النبض أبطأ (3 ثواني بدلاً من 1)
      ></span>
      
      {/* الزر الرئيسي - صغرنا الحجم شوية p-3 بدلاً من p-4 */}
      <div className="relative bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
        <MessageCircle size={28} fill="currentColor" /> {/* صغرنا الأيقونة لـ 28 */}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          تحدثي معنا! 💬
        </span>
      </div>
    </a>
  );
}
