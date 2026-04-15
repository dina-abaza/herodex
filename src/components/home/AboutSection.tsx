'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative" dir="rtl">
      {/* Floating Background Balls */}
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-20 w-80 h-80 bg-store-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-store-muted/50 to-white backdrop-blur-sm rounded-[2.5rem] md:rounded-[4rem] border border-store-gold/20 shadow-2xl relative overflow-hidden group">
          
          <div className="flex flex-col relative z-20">
            
            {/* Image Side - دلوقتي فوق وعريضة */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#f8f8f8] border-b border-store-gold/10"
            >
              <Image 
                src="/aboutimage.webp" 
                alt="Herodex Products Flyer"
                fill
                className="object-contain md:object-cover p-4 md:p-0" // cover في الشاشات الكبيرة و contain في الصغيرة عشان الكلام ميتكتمش
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Text Content Side - المحتوى تحت الصورة */}
            <div className="p-8 md:p-12 lg:p-16 space-y-8 text-right">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-black mb-4 flex flex-row-reverse justify-end items-center gap-3">
                  <span className="text-store-dark">Herodex</span>
                  <span className="text-store-gold">pharma</span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-l from-store-gold to-transparent rounded-full" />
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-2xl text-gray-700 font-bold leading-relaxed max-w-3xl"
              >
                منتجات طبية مصرية بمواد طبيعية ١٠٠٪، خالية من المينوكسيديل ومعززة بالتركيبة الهندية المتطورة والكافيين المركز، لنتائج حقيقية في إنبات الشعر ومعالجة التساقط في أقل من ٣٠ يوم.
              </motion.p>

              {/* Features Grid - متوزعة بشكل عرضي تحت النص */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { text: "١٠٠٪ طبيعي", color: "bg-store-gold" },
                  { text: "بدون مينوكسيديل", color: "bg-store" },
                  { text: "نتائج سريعة", color: "bg-store-gold" },
                  { text: "تركيبة هندية", color: "bg-store" }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex items-center justify-center gap-2 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-store-gold/10 shadow-sm"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${feature.color} shrink-0`} />
                    <span className="text-store-dark font-black text-sm md:text-base whitespace-nowrap">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}