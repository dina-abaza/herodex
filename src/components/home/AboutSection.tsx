'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export function AboutSection() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, index: number) => {
    revealRefs.current[index] = el;
  };

  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative" dir="rtl">
      {/* Floating Background Ball — CSS animation بدل framer */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-store-gold/10 rounded-full blur-3xl pointer-events-none animate-float" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-store-muted/50 to-white backdrop-blur-sm rounded-[2.5rem] md:rounded-[4rem] border border-store-gold/20 shadow-2xl relative overflow-hidden group">

          <div className="flex flex-col relative z-20">

            {/* Image Side */}
            <div
              ref={(el) => addRef(el, 0)}
              className="reveal relative w-full aspect-[16/14] md:aspect-[21/14] overflow-hidden bg-[#f8f8f8] border-b border-store-gold/10"
            >
              <Image
                src="/aboutimage.webp"
                alt="Herodex Products Flyer"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain md:object-cover p-4 md:p-0"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Text Content Side */}
            <div className="p-8 md:p-12 lg:p-16 space-y-8 text-right">
              <div
                ref={(el) => addRef(el, 1)}
                className="reveal"
              >
                <h2 className="text-3xl md:text-5xl font-black mb-4 flex flex-row-reverse justify-end items-center gap-3">
                  <span className="text-store-dark">Herodex</span>
                  <span className="text-store-gold">pharma</span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-l from-store-gold to-transparent rounded-full" />
              </div>

              <p
                ref={(el) => addRef(el, 2)}
                className="reveal animation-delay-200 text-lg md:text-2xl text-gray-900 font-bold leading-relaxed max-w-3xl"
              >
                منتجات طبية مصرية بمواد طبيعية ١٠٠٪، خالية من المينوكسيديل ومعززة بالتركيبة الهندية المتطورة والكافيين المركز، لنتائج حقيقية في إنبات الشعر ومعالجة التساقط في أقل من ٣٠ يوم.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { text: "١٠٠٪ طبيعي", color: "bg-store-gold" },
                  { text: "بدون مينوكسيديل", color: "bg-store" },
                  { text: "نتائج سريعة", color: "bg-store-gold" },
                  { text: "تركيبة هندية", color: "bg-store" }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="hover-lift flex items-center justify-center gap-2 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-store-gold/10 shadow-sm"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${feature.color} shrink-0`} />
                    <span className="text-store-dark font-black text-sm md:text-base whitespace-nowrap">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

