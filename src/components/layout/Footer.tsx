import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 gap-y-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold text-rose-600">جمالك</Link>
            <p className="text-gray-500 leading-relaxed text-sm">
              وجهتك الأولى لأفضل منتجات التجميل والعناية بالبشرة. نهتم بجمالك ونوفر لك أفضل الماركات العالمية والمحلية بجودة مضمونة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">روابط سريعة</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-500 hover:text-rose-600 text-sm">الرئيسية</Link></li>
              <li><Link href="/products" className="text-gray-500 hover:text-rose-600 text-sm">كل المنتجات</Link></li>
              <li><Link href="/categories" className="text-gray-500 hover:text-rose-600 text-sm">الأقسام</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-rose-600 text-sm">عن المتجر</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">خدمة العملاء</h3>
            <ul className="space-y-4">
              <li><Link href="/shipping" className="text-gray-500 hover:text-rose-600 text-sm">سياسة الشحن</Link></li>
              <li><Link href="/returns" className="text-gray-500 hover:text-rose-600 text-sm">سياسة الاستبدال والاسترجاع</Link></li>
              <li><Link href="/privacy" className="text-gray-500 hover:text-rose-600 text-sm">سياسة الخصوصية</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-rose-600 text-sm">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-500 text-sm">
                <MapPin size={18} className="ml-3 text-rose-600" />
                الرياض، المملكة العربية السعودية
              </li>
              <li className="flex items-center text-gray-500 text-sm text-left" dir="ltr">
                <Phone size={18} className="ml-3 text-rose-600" />
                +966 50 000 0000
              </li>
              <li className="flex items-center text-gray-500 text-sm text-left" dir="ltr">
                <Mail size={18} className="ml-3 text-rose-600" />
                support@jamalak.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} جمالك. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6 space-x-reverse text-[10px] font-bold text-gray-300 uppercase">
            <span className="border border-gray-100 px-2 py-0.5 rounded">Visa</span>
            <span className="border border-gray-100 px-2 py-0.5 rounded">Mastercard</span>
            <span className="border border-gray-100 px-2 py-0.5 rounded">Mada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
