'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { XCircle, RefreshCcw, Headset, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="mb-8">
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-100/50"
            >
              <XCircle size={48} className="text-red-500" />
            </motion.div>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4">عذراً، فشلت عملية الدفع</h1>
          <p className="text-gray-500 font-bold mb-8">
            يبدو أن هناك مشكلة حدثت أثناء معالجة عملية الدفع الخاصة بك. لم يتم خصم أي مبالغ من حسابك.
          </p>

          <div className="bg-red-50 p-6 rounded-3xl border border-red-100/50 mb-8 text-right">
            <h3 className="text-red-800 font-black mb-2 flex items-center gap-2 text-sm uppercase">
              أسباب محتملة للفشل:
            </h3>
            <ul className="text-xs text-red-700/70 font-bold space-y-2 list-disc list-inside">
              <li>رصيد غير كافٍ في البطاقة أو المحفظة</li>
              <li>رفض العملية من قبل البنك المصدر للبطاقة</li>
              <li>انقطاع في الاتصال أثناء المعالجة</li>
              <li>إدخال بيانات البطاقة أو رقم المحفظة بشكل خاطئ</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => router.push('/checkout')}
              className="w-full py-4 rounded-2xl bg-store hover:bg-store-dark text-white font-black border-0 shadow-lg"
            >
              <RefreshCcw className="ml-2" size={20} />
              المحاولة مرة أخرى
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/cart')}
              className="w-full py-4 rounded-2xl border-gray-100 hover:bg-gray-50 font-black text-gray-600"
            >
              <ArrowRight className="ml-2" size={20} />
              العودة للسلة
            </Button>
            <button className="flex items-center justify-center gap-2 mt-4 text-gray-400 hover:text-store font-bold text-sm transition-colors">
              <Headset size={18} />
              تحتاج للمساعدة؟ تواصل مع الدعم الفني
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
