'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from '@/store/api/cartApiSlice';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

export default function CartPage() {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const [updateItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeItem, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const cart = cartData?.data || { items: [] };
  const subtotal = cart.items.reduce((acc: number, item: any) => acc + (item.product?.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 35;
  const total = subtotal + shipping;

  const handleQuantityChange = async (productId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      await updateItem({ productId, quantity: newQty }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId: string, productName: string) => {
    try {
      const response = await removeItem(productId).unwrap();
      if (response?.success) {
        toast.info(`تم حذف ${productName} من السلة 🗑️`);
      }
    } catch (err) {
      console.error(err);
      toast.error('عذراً، حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-store"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50/90 via-store-muted/20 to-gray-50/90">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-store-black mb-8">سلة المشتريات</h1>

          {cart.items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart.items.map((item: any) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={item._id}
                      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-50 flex-shrink-0">
                        <img 
                          src={item.product?.image} 
                          alt={item.product?.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="mr-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{item.product?.name}</h3>
                            <p className="text-gray-400 text-sm">{item.product?.category?.name || 'مستحضرات تجميل'}</p>
                          </div>
                          <button 
                            onClick={() => handleRemove(item.product?._id, item.product?.name)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1">
                            <button 
                              onClick={() => handleQuantityChange(item.product?._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-700">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.product?._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-extrabold text-store">{(item.product?.price * item.quantity).toFixed(2)} ج.م</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-500">
                      <span>المجموع الفرعي</span>
                      <span>{subtotal.toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>رسوم الشحن</span>
                      <span>{shipping === 0 ? 'مجاني' : `${shipping.toFixed(2)} ج.م`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-store-dark bg-store-gold-muted p-2 rounded-lg border border-store-gold/20">
                        أضيفي {(500 - subtotal).toFixed(2)} ج.م إضافية للحصول على شحن مجاني!
                      </p>
                    )}
                    <div className="border-t border-gray-50 pt-4 flex justify-between text-xl font-extrabold text-store-black">
                      <span>الإجمالي</span>
                      <span className="text-store">{total.toFixed(2)} ج.م</span>
                    </div>
                  </div>

                  <Button className="w-full py-4 rounded-2xl text-lg font-bold bg-store hover:bg-store-dark text-white border-0 shadow-lg">
                    إتمام الشراء
                  </Button>
                  
                  <Link href="/" className="mt-4 flex items-center justify-center text-gray-400 text-sm hover:text-store transition-colors">
                    <ArrowRight size={16} className="ml-2" />
                    مواصلة التسوق
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-store/15">
              <div className="mx-auto w-24 h-24 bg-store-muted rounded-full flex items-center justify-center mb-6 text-store/40 ring-1 ring-store/10">
                <ShoppingBag size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">سلتك فارغة</h2>
              <p className="text-gray-500 mt-2 mb-10 text-lg">يبدو أنك لم تضيفي أي منتجات للسلة بعد</p>
              <Link href="/">
                <Button size="lg" className="rounded-2xl px-12 bg-store hover:bg-store-dark text-white border-0 shadow-lg">تسوقي الآن</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
