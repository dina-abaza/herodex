'use client';

import Image from 'next/image';
import { CheckCircle2, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion'; // استدعاء مكتبة الأنيميشن

export function QuestionSection() {
  
  // تعريف إعدادات الأنيميشن (Variants)
  // ده الجزء اللي بيحدد الحركة (الظهور من أسفل لأعلى مع تغيير الشفافية)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 }, // الحالة الابتدائية (مخفي وتحت شوية)
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, // مدة الأنيميشن (ثواني) - خليتها طويلة سنة عشان تكون أهدى
        ease: [0.22, 1, 0.36, 1] // نوع الحركة (Incredibly smooth easing)
      } 
    }
  };

  // إعدادات لظهور العناصر تلو الأخرى (Stagger children)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // فرق التوقيت بين ظهور كل عنصر والتاني
      }
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* 1. قسم الصورة - ملء الحواف تماماً */}
          {/* حولنا الـ div لـ motion.div وضفنا إعدادات الأنيميشن */}
          <motion.div 
            className="w-full md:sticky md:top-24"
            initial="hidden"
            whileInView="visible" // يشتغل أول ما الصورة تدخل مجال الرؤية
            viewport={{ once: true, amount: 0.3 }} // يشتغل مرة واحدة بس لما 30% من الصورة تظهر
            variants={fadeInUp}
          >
            <div className="relative w-full aspect-[9/16] md:aspect-[9/20] max-h-[900px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <Image 
                src="/questionImage.webp" 
                alt="مميزات المنتج"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* 2. قسم المحتوى - ترتيب الألوان والخط الأخضر */}
          {/* حولنا الـ div لـ motion.div واستخدمنا staggerContainer عشان العناصر تظهر ورا بعض */}
          <motion.div 
            className="flex flex-col min-h-full py-4 text-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer} // الحاوية اللي بتنظم ظهور العناصر اللي جواها
          >
            
            {/* العنوان المعدل بالظبط زي ما طلبتِ */}
            {/* كل عنصر جوا هنا واخد variants={fadeInUp} عشان يطبق الحركة */}
            <motion.div className="mb-12 space-y-4" variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-black flex flex-row-reverse justify-end items-center gap-3 leading-tight">
                <span className="text-store">Herodex</span>
                <span className="text-store-gold lowercase">pharma</span>
              </h2>
              {/* الخط الأخضر المتدرج تحت pharma */}
              <div className="w-24 h-1.5 bg-gradient-to-l from-store to-transparent rounded-full mr-0" />
              
              <p className="text-gray-500 text-lg font-bold pt-2">
                كل ما تحتاجينه لمعرفة نتائج استخدام منتجاتنا
              </p>
            </motion.div>

            {/* شبكة المعلومات - الـ 4 كروت كاملة ومحاذية لليمين */}
            <div className="flex flex-col gap-6 mb-16 w-full">
              
              {/* ميزة 1 */}
              {/* الكارت حولناه لـ motion.div وضفنا لة variants={fadeInUp} */}
              <motion.div className="p-6 rounded-3xl bg-store-muted/20 border border-store-muted/50 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group" variants={fadeInUp}>
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store text-white flex items-center justify-center shadow-lg shadow-store/20">
                  <CheckCircle2 size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">نتائج سريعة</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">فرق ملحوظ في الكثافة والنعومة خلال 30 يوم فقط من الاستخدام.</p>
                </div>
              </motion.div>

              {/* ميزة 2 */}
              <motion.div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group" variants={fadeInUp}>
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store-gold text-white flex items-center justify-center shadow-lg shadow-store-gold/20">
                  <ShieldCheck size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">ضمان استرجاع</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">ضمان حقيقي لمدة 14 يوم لثقتنا الكاملة في جودة وفعالية منتجنا.</p>
                </div>
              </motion.div>

              {/* ميزة 3 */}
              <motion.div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group" variants={fadeInUp}>
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store text-white flex items-center justify-center shadow-lg shadow-store/20">
                  <Truck size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">شحن سريع آمن</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">توصيل منزلي سريع لجميع المحافظات مع إمكانية المعاينة قبل الدفع.</p>
                </div>
              </motion.div>

              {/* ميزة 4 */}
              <motion.div className="p-6 rounded-3xl bg-green-50/50 border border-green-100 flex flex-row-reverse items-start justify-start gap-5 transition-all hover:bg-white hover:shadow-xl group" variants={fadeInUp}>
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-store-gold text-white flex items-center justify-center shadow-lg shadow-store-gold/20">
                  <Headphones size={28} />
                </div>
                <div className="text-right flex-1">
                   <h3 className="font-black text-store text-lg mb-1">دعم متواصل</h3>
                   <p className="text-sm text-gray-600 font-bold leading-relaxed">خدمة عملاء متوفرة دائماً للإجابة على استفساراتكم ومتابعة النتائج.</p>
                </div>
              </motion.div>

            </div>

            {/* بوكس طريقة الاستخدام */}
            {/* بوكس طريقة الاستخدام بيظهر في الآخر بـ أنيميشن هادي برضه */}
            <motion.div className="mt-auto bg-gradient-to-l from-store to-store-dark p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden" variants={fadeInUp}>
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-3">طريقة الاستخدام المثالية:</h4>
                <p className="text-base opacity-90 leading-relaxed font-bold">
                  استخدمي الاسبراي مرتين يومياً (صباحاً ومساءً) مع تطبيق الأمبول (1 مل) في المساء فقط لأفضل النتائج.
                </p>
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}