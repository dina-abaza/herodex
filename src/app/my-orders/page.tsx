'use client';

import React from 'react';
import { useGetMyOrdersQuery } from '@/store/api/orderApiSlice';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Package, Calendar, CreditCard, Wallet, ShoppingBag, ArrowLeft, CheckCircle2, Clock, Truck, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { data: response, isLoading } = useGetMyOrdersQuery(undefined);
  const orders = response?.data || [];

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'processing':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'shipped':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle2 size={14} />;
      case 'pending':
        return <Clock size={14} />;
      case 'processing':
        return <Package size={14} />;
      case 'shipped':
        return <Truck size={14} />;
      case 'cancelled':
        return <XCircle size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'تم التوصيل';
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'جاري التنفيذ';
      case 'shipped': return 'تم الشحن';
      case 'cancelled': return 'ملغي';
      default: return status || 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl font-black text-gray-900 mb-2">طلباتي</h1>
              <p className="text-gray-500 font-bold">عرض تفاصيل طلباتك وتاريخ مشترياتك</p>
            </motion.div>
            
            <Link href="/">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 font-black text-sm shadow-sm transition-all hover:bg-gray-50"
              >
                <ArrowLeft size={18} />
                مواصلة التسوق
              </motion.button>
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-white rounded-3xl animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order: any, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={order._id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="p-6 md:p-8 border-b border-gray-50 bg-gray-50/30">
                    <div className="flex gap-6 flex-wrap">
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">تاريخ الطلب</p>
                        <div className="flex items-center gap-2 text-gray-700 font-bold">
                          <Calendar size={16} className="text-store" />
                          {new Date(order.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">وسيلة الدفع</p>
                        <div className="flex items-center gap-2 text-gray-700 font-bold">
                          {order.paymentMethod === 'COD' ? <CreditCard size={16} className="text-store" /> : <Wallet size={16} className="text-store" />}
                          {order.paymentMethod === 'COD' ? 'دفع عند الاستلام' : 'محفظة إلكترونية'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">المجموع</p>
                        <p className="text-store font-black">{order.totalPrice.toFixed(2)} ج.م</p>
                      </div>
                      <div className="mr-auto flex flex-col items-end gap-2">
                        <div className={cn(
                          "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border tracking-tight",
                          getStatusStyles(order.orderStatus)
                        )}>
                          {getStatusIcon(order.orderStatus)}
                          {getStatusLabel(order.orderStatus)}
                        </div>
                        {/* payment status */}
                        {order.paymentMethod !=='COD' && (
                        <div className={cn(
                          "text-[10px] font-black px-2 py-0.5 rounded-lg border",
                          order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                        )}>
                          {order.paymentStatus === 'paid' ? 'تم الدفع' : order.paymentStatus === 'pending' ? 'بانتظار الدفع' : 'فشل الدفع'}
                        </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {order.items.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="flex gap-4 group/item">
                          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 p-1 overflow-hidden transition-transform group-hover/item:scale-105">
                            <img 
                              src={item.image || (item.product?.image)} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate mb-1">{item.name}</p>
                            <p className="text-xs text-gray-400 font-bold flex items-center gap-1">
                              <Package size={12} />
                              الكمية: {item.quantity} x {item.price.toFixed(2)} ج.م
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">ليس لديك طلبات سابقة</h2>
              <p className="text-gray-500 font-bold mb-10 max-w-xs mx-auto">عندما تقوم بإجراء عمليات شراء، ستظهر جميع تفاصيل طلباتك هنا.</p>
              <Link href="/">
                <button className="px-10 py-4 bg-store hover:bg-store-dark text-white rounded-2xl font-black shadow-lg shadow-store/20 transition-all">
                  ابدأ التسوق الآن
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
