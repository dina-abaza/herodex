'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PaymentComponent } from '@/components/checkout/PaymentComponent';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50/50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-store"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-black text-gray-900 mb-4">إتمام عملية الشراء</h1>
            <p className="text-gray-500 font-bold text-lg">يرجى مراجعة بياناتك واختيار وسيلة الدفع المناسبة</p>
          </motion.div>

          <PaymentComponent />
        </div>
      </main>

      <Footer />
    </div>
  );
}
