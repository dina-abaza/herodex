'use client';

import React, { useState } from 'react';
import { useGetAllOrdersQuery } from '@/store/api/orderApiSlice';
import { 
  Search, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Calendar,
  CreditCard,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Modal } from '@/components/ui/Modal';

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetAllOrdersQuery({ 
    page, 
    limit: 10, 
    search 
  });

  const orders = data?.data?.orders || [];
  const totalPages = data?.data?.pages || 1;
  const totalItems = data?.data?.totalItems || 0;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'failed':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle2 size={14} className="ml-1.5" />;
      case 'pending':
        return <Clock size={14} className="ml-1.5" />;
      case 'failed':
        return <XCircle size={14} className="ml-1.5" />;
      default:
        return <AlertCircle size={14} className="ml-1.5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">إدارة الطلبات</h1>
          <p className="text-sm md:text-lg text-slate-500 mt-2 font-medium tracking-tight">
            متابعة طلبات العملاء وحالة الدفع والشحن
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-500 transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="بحث باسم العميل، البريد، أو الهاتف..."
            className="input-modern pr-12 text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset to first page on search
            }}
          />
        </div>
      </header>

      <div className="card-modern overflow-hidden border-none shadow-none md:border md:shadow-sm">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">رقم الطلب</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">العميل</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">المبلغ</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading || isFetching ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-8 py-8">
                      <div className="h-8 bg-slate-100 rounded-xl w-full"></div>
                    </td>
                  </tr>
                ))
              ) : orders.length > 0 ? (
                orders.map((order: any) => (
                  <tr key={order._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <span className="font-bold text-slate-500 text-sm">#{order._id.slice(-8).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-base tracking-tight">{order.user?.name || 'عميل غير معروف'}</span>
                        <span className="text-xs text-slate-400 font-bold">{order.user?.email || order.shippingAddress.phone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-slate-500 text-sm font-bold">
                        <Calendar size={14} className="ml-1.5 text-slate-300" />
                        {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-rose-600 tracking-tight">{order.totalPrice}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">جنيه مصري</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black border tracking-tight",
                        getStatusColor(order.paymentStatus)
                      )}>
                        {getStatusIcon(order.paymentStatus)}
                        {order.paymentStatus === 'paid' ? 'تم الدفع' : 
                         order.paymentStatus === 'pending' ? 'قيد الانتظار' : 'فشل الدفع'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-100 transition-all duration-300 active:scale-90"
                          title="عرض التفاصيل"
                        >
                          <Eye size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                        <ShoppingBag className="text-slate-300" size={32} />
                      </div>
                      <p className="text-slate-400 font-black text-xl">لا توجد طلبات تطابق بحثك</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4">
          {isLoading || isFetching ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 animate-pulse h-40"></div>
            ))
          ) : orders.length > 0 ? (
            orders.map((order: any) => (
              <div 
                key={order._id} 
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 relative"
                onClick={() => {
                  setSelectedOrder(order);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{order._id.slice(-8).toUpperCase()}</span>
                    <h3 className="font-black text-slate-900 text-lg mt-1">{order.user?.name || 'عميل غير معروف'}</h3>
                  </div>
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black border",
                    getStatusColor(order.paymentStatus)
                  )}>
                    {order.paymentStatus === 'paid' ? 'تم' : 'قيد'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-rose-600 tracking-tighter">{order.totalPrice} ج.م</span>
                    <span className="text-[10px] font-black text-slate-400">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : null}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-10 py-8 border-t border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-base font-bold text-slate-400">
              عرض الصفحة <span className="text-slate-900 font-black">{page}</span> من أصل <span className="text-slate-900 font-black">{totalPages}</span>
              <span className="mx-2">({totalItems} طلب إجمالي)</span>
            </span>
            <div className="flex gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronRight size={18} className="ml-2" />
                السابق
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="flex items-center px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                التالي
                <ChevronLeft size={18} className="mr-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="تفاصيل الطلب"
        className="max-w-4xl"
      >
        {selectedOrder && (
          <div className="space-y-8 py-2">
            {/* Header info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
                <div className="flex items-center text-slate-400 font-black text-xs uppercase tracking-widest">
                  <User size={14} className="ml-2" /> معلومات العميل
                </div>
                <div className="space-y-1">
                  <p className="font-black text-slate-900 text-lg">{selectedOrder.user?.name || 'غير متوفر'}</p>
                  <p className="text-slate-500 font-bold text-sm">{selectedOrder.user?.email || 'لا يوجد بريد'}</p>
                  <div className="flex items-center text-slate-900 font-bold text-sm mt-2">
                    <Phone size={14} className="ml-2 text-rose-500" />
                    {selectedOrder.shippingAddress.phone}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
                <div className="flex items-center text-slate-400 font-black text-xs uppercase tracking-widest">
                  <MapPin size={14} className="ml-2" /> عنوان الشحن
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-base leading-relaxed">
                    {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}
                  </p>
                  <p className="text-slate-500 font-bold text-sm">
                    الرمز البريدي: {selectedOrder.shippingAddress.postalCode} | {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
                <div className="flex items-center text-slate-400 font-black text-xs uppercase tracking-widest">
                  <CreditCard size={14} className="ml-2" /> الدفع والطلب
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold text-sm">الحالة:</span>
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-black",
                      getStatusColor(selectedOrder.paymentStatus)
                    )}>
                      {selectedOrder.paymentStatus === 'paid' ? 'تم الدفع' : 'معلق'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500">الطريقة:</span>
                    <span className="text-slate-900 capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                  {selectedOrder.paymobOrderId && (
                    <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-200">
                      ID: {selectedOrder.paymobOrderId}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-slate-100 rounded-3xl overflow-hidden">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 text-slate-400">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">المنتج</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">السعر</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">الكمية</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <span className="font-bold text-slate-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-600">{item.price} ج.م</td>
                      <td className="px-6 py-4 font-black text-slate-900">{item.quantity}</td>
                      <td className="px-6 py-4 font-bold text-rose-600 text-left">{item.price * item.quantity} ج.م</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-rose-50/30">
                    <td colSpan={3} className="px-6 py-5 text-lg font-black text-slate-900">الإجمالي النهائي</td>
                    <td className="px-6 py-5 text-2xl font-black text-rose-600 text-left">{selectedOrder.totalPrice} ج.م</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
