'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// تأكدي إن الأيقونات دي بس هي اللي مستوردة عشان ميبقاش فيه Error
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-neutral-800 border-t border-neutral-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* العمود الأول: الشعار والوصف */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group w-fit">
              <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-store-muted group-hover:border-store transition-colors shadow-sm">
                <Image
                  src="/logo/logo.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="mr-3 flex flex-col">
                <span className="text-2xl font-black text-store tracking-tight leading-none">Herodex</span>
                <span className="text-[10px] font-bold text-store-gold uppercase tracking-widest mt-1 block">
                  Pharma
                </span>
              </div>
            </Link>
            <p className="text-neutral-600 leading-relaxed text-sm font-medium max-w-sm text-right">
              هيروديكس فارما - وجهتك الأولى لأفضل المنتجات الطبية والعناية بالشعر والبشرة بمكونات طبيعية ١٠٠٪. 
              <Link href="/#about" className="text-store-gold hover:underline mr-1 font-bold">اقرأ المزيد...</Link>
            </p>
            
            {/* السوشيال ميديا - تم تنظيفها تماماً وإصلاح السينتاكس وأحجام الأهداف */}
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/share/1AtoCKMpRZ/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="تابعنا على فيسبوك"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-store hover:bg-store hover:text-white transition-all duration-300 shadow-sm"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/herodex.pharma?igsh=bjlyMTkybHU3d3Yw&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="تابعنا على انستجرام"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-store hover:bg-store hover:text-white transition-all duration-300 shadow-sm"
              >
                <Instagram size={20} />
              </a>
              {/* أيقونة مؤقتة للتيك توك */}
              <a 
                href="#" 
                aria-label="تابعنا على تيك توك"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-store hover:bg-store hover:text-white transition-all duration-300 shadow-sm"
              >
                <Share2 size={20} />
              </a>
              <a 
                href="https://wa.me/201101546900" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="تواصل معنا عبر واتساب"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-store hover:bg-store hover:text-white transition-all duration-300 shadow-sm"
              >
                <MessageCircle size={20} />
              </a>
            </div> 
          </div>

          {/* باقي الأعمدة (روابط سريعة وتواصل) كما هي تماماً في تصميمك الأصلي */}
          <div className="lg:justify-self-center">
            <h3 className="text-lg font-bold text-store-black mb-6 border-r-4 border-store-gold pr-3">روابط سريعة</h3>
            <ul className="space-y-4">
              {[
                ['/', 'الرئيسية'],
                ['/#products', 'كل المنتجات'],
                ['/#categories', 'الأقسام'],
                ['/#reviews', 'المراجعات'],
                ['/#about', 'عن الموقع'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-neutral-600 hover:text-store hover:pr-2 text-sm transition-all duration-200 flex items-center">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:justify-self-end">
            <h3 className="text-lg font-bold text-store-black mb-6 border-r-4 border-store-gold pr-3">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-neutral-600 text-sm">
                <MapPin size={18} className="ml-3 text-store shrink-0 mt-0.5" />
                <span>القاهرة، جمهورية مصر العربية</span>
              </li>
              <li className="flex items-center text-neutral-600 text-sm text-left font-bold" dir="ltr">
                <Phone size={18} className="ml-3 text-store shrink-0" />
                +20 110 154 6900
              </li>
            </ul>
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500">
          <p className="text-xs font-medium italic">© {new Date().getFullYear()} Herodex Pharma. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}