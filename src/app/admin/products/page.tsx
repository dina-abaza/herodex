'use client';

import React, { useState } from 'react';
import { 
  useGetProductsQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} from '@/store/api/productApiSlice';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '@/components/admin/ProductForm';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data, isLoading } = useGetProductsQuery({ page, limit: 10 });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleCreate = async (formData: FormData) => {
    try {
      await createProduct(formData).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateProduct({ id: editingProduct._id, formData }).unwrap();
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const products = data?.data?.products || [];
  const totalPages = data?.data?.pages || 1;

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">إدارة المنتجات</h1>
          <p className="text-sm md:text-lg text-slate-500 mt-1 md:mt-2 font-medium tracking-tight">عرض، إضافة وتعديل المنتجات المتاحة في المتجر</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary flex items-center group py-3 px-6 md:py-4 md:px-8 text-sm md:text-base"
        >
          <Plus size={18} className="ml-2 md:ml-3 group-hover:rotate-90 transition-transform duration-300" />
          إضافة منتج
        </button>
      </header>

      <div className="card-modern overflow-hidden border-none shadow-none md:border md:shadow-sm">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">المنتج</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">القسم</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">السعر</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-10">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl"></div>
                        <div className="h-6 w-48 bg-slate-100 rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((product: any) => (
                  <tr key={product._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 text-xl tracking-tight">{product.name}</span>
                          <span className="text-sm text-slate-400 font-bold mt-1">ID: {product._id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-black tracking-tight">
                        {product.category?.name || 'غير مصنف'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-rose-600 tracking-tight">{product.price}</span>
                        <span className="text-xs font-black text-slate-400 uppercase">جنيه مصري</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 active:scale-90"
                          title="تعديل"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-100 transition-all duration-300 active:scale-90"
                          title="حذف"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                        <Package className="text-slate-300" size={32} />
                      </div>
                      <p className="text-slate-400 font-black text-xl">لا توجد منتجات حالياً</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stacked Layout */}
        <div className="md:hidden space-y-4 p-4">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 animate-pulse space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product: any) => (
              <div key={product._id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 relative group">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-50 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-900 text-lg truncate">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        {product.category?.name || 'غير مصنف'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-rose-600 tracking-tighter">{product.price}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase">جنيه مصري</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setIsModalOpen(true);
                      }}
                      className="p-3 bg-blue-50 text-blue-600 rounded-xl active:scale-90 transition-all"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-3 bg-rose-50 text-rose-600 rounded-xl active:scale-90 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : null}
        </div>

        {totalPages > 1 && (
          <div className="px-10 py-8 border-t border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-base font-bold text-slate-400">
              عرض الصفحة <span className="text-slate-900 font-black">{page}</span> من أصل <span className="text-slate-900 font-black">{totalPages}</span>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمتجر'}
        className="max-w-3xl"
      >
        <div className="py-4">
          <ProductForm
            initialData={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            isLoading={isCreating || isUpdating}
          />
        </div>
      </Modal>
    </div>
  );
}
