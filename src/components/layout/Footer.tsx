import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-neutral-800 border-t border-neutral-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 gap-y-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-store-muted group-hover:border-store transition-colors shadow-sm">
                <Image
                  src="/logo/logo.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="mr-3 flex flex-col">
                <span className="text-2xl font-black text-store tracking-tight leading-none uppercase">Herodex</span>
                <span className="text-[10px] font-bold text-store-gold uppercase tracking-widest mt-1 block">
                  Pharma
                </span>
              </div>
            </Link>
            <p className="text-neutral-600 leading-relaxed text-sm font-medium">
              هيروديكس فارما - وجهتك الأولى لأفضل المنتجات الطبية والعناية بالشعر والبشرة بمكونات طبيعية ١٠٠٪. 
              <Link href="/#about" className="text-store-gold hover:underline mr-1 font-bold">اقرأ المزيد عن هيروديكس...</Link>
            </p>
            {/* <div className="flex gap-2">
              {[Globe, MessageCircle, Send, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-store hover:bg-black/5  hover:border-store transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          <div>
            <h3 className="text-lg font-bold text-store-black mb-6">روابط سريعة</h3>
            <ul className="space-y-4">
              {[
                ['/', 'الرئيسية'],
                ['/#products', 'كل المنتجات'],
                ['/#categories', 'الأقسام'],
                ['/#reviews', 'المراجعات'],
                ['/#about', 'عن الموقع'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-neutral-600 hover:text-store text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-bold text-store-black mb-6">خدمة العملاء</h3>
            <ul className="space-y-4">
              {[
                ['/shipping', 'سياسة الشحن'],
                ['/returns', 'سياسة الاستبدال والاسترجاع'],
                ['/privacy', 'سياسة الخصوصية'],
                // ['/contact', 'تواصل معنا'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-neutral-600 hover:text-store text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          <div>
            <h3 className="text-lg font-bold text-store-black mb-6">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-neutral-600 text-sm">
                <MapPin size={18} className="ml-3 text-store shrink-0" />
                القاهرة، جمهورية مصر العربية
              </li>
              <li className="flex items-center text-neutral-600 text-sm text-left" dir="ltr">
                <Phone size={18} className="ml-3 text-store shrink-0" />
                +20 10 66 230 290
              </li>
              <li className="flex items-center text-neutral-600 text-sm text-left" dir="ltr">
                <Phone size={18} className="ml-3 text-store shrink-0" />
                +20 12 112 15 315
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-xs">
          <p>© {new Date().getFullYear()} Herodex Pharma. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6 space-x-reverse text-[10px] font-bold uppercase text-neutral-400">
            {/* <span className="border border-neutral-200 px-2 py-0.5 rounded">Visa</span> */}
            <span className="border border-neutral-200 px-2 py-0.5 rounded">vodafone cash</span>
            <span className="border border-neutral-200 px-2 py-0.5 rounded">cash on delivery</span>
            {/* <span className="border border-neutral-200 px-2 py-0.5 rounded">Mada</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
