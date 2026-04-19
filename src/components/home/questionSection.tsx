'use client';

import Image from 'next/image';
import { CheckCircle2, Truck, ShieldCheck, Headphones } from 'lucide-react';

export function QuestionSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* 1. قسم الصورة - ملء الحواف تماماً */}
          <div className="w-full md:sticky md:top-24">
            <div className="relative w-full aspect-[9/16] md:aspect-[9/20] max-h-[900px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <Image 
                src="/questionImage.webp" 
                alt="مميزات المنتج"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* 2. قسم المحتوى - ترتيب الألوان والخط الأخضر */}
          <div className="flex flex-col min-h-full py-4 text-right">
            
            {/* العنوان المعدل بالظبط زي ما طلبتِ */}
            <div className="mb-12 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black flex flex-row-reverse justify-end items-center gap-3 leading-tight">
                <span className="text-store">Herodex</span>
                <span className="text-store-gold lowercase">pharma</span>
              </h2>
              {/* الخط الأخضر المتدرج تحت pharma */}
              <div className="w-24 h-1.5 bg-gradient-to-l from-store to-transparent rounded-full mr-0" />
              
              <p className="text-gray-500 text-lg font-bold pt-2">
                كل ما تحتاجينه لمعرفة نتائج استخدام منتجاتنا
              </p>
            </div>

            {/* شبكة المعلومات - الـ 4 كروت كاملة ومحاذية لليمين */}
            <div className="flex flex-col gap-6 mb-16 w-full">
              
              {/* ميزة 1 */}
              <div className="p-6 rounded-3xl bg-store-muted/20 border border-store-muted/50 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store text-white flex items-center justify-center shadow-lg shadow-store/20">
                  <CheckCircle2 size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">نتائج سريعة</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">فرق ملحوظ في الكثافة والنعومة خلال 30 يوم فقط من الاستخدام.</p>
                </div>
              </div>

              {/* ميزة 2 */}
              <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store-gold text-white flex items-center justify-center shadow-lg shadow-store-gold/20">
                  <ShieldCheck size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">ضمان استرجاع</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">ضمان حقيقي لمدة 14 يوم لثقتنا الكاملة في جودة وفعالية منتجنا.</p>
                </div>
              </div>

              {/* ميزة 3 */}
              <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store text-white flex items-center justify-center shadow-lg shadow-store/20">
                  <Truck size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">شحن سريع آمن</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">توصيل منزلي سريع لجميع المحافظات مع إمكانية المعاينة قبل الدفع.</p>
                </div>
              </div>

              {/* ميزة 4 */}
              <div className="p-6 rounded-3xl bg-green-50/50 border border-green-100 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store-gold text-white flex items-center justify-center shadow-lg shadow-store-gold/20">
                  <Headphones size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">دعم متواصل</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">خدمة عملاء متوفرة دائماً للإجابة على استفساراتكم ومتابعة النتائج.</p>
                </div>
              </div>

            </div>

            {/* بوكس طريقة الاستخدام */}
            <div className="mt-auto bg-gradient-to-l from-store to-store-dark p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-3">طريقة الاستخدام المثالية:</h4>
                <p className="text-base opacity-90 leading-relaxed font-bold">
                  استخدمي الاسبراي مرتين يومياً (صباحاً ومساءً) مع تطبيق الأمبول (1 مل) في المساء فقط لأفضل النتائج.
                </p>
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}