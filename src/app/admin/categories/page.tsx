'use client';

import React, { useState } from 'react';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from '@/store/api/categoryApiSlice';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { Plus, Edit, Trash2, Tags } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data, isLoading } = useGetCategoriesQuery(undefined);
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleCreate = async (formData: FormData) => {
    try {
      await createCategory(formData).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateCategory({ id: editingCategory._id, formData }).unwrap();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      try {
        await deleteCategory(id).unwrap();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const categories = data?.data || [];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">إدارة الأقسام</h1>
          <p className="text-lg text-slate-500 mt-2 font-medium tracking-tight">عرض وتعديل أقسام المتجر المختلفة</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary flex items-center group"
        >
          <Plus size={20} className="ml-3 group-hover:rotate-90 transition-transform duration-300" />
          إضافة قسم جديد
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-grid-4">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 bg-slate-100 animate-pulse rounded-[2.5rem]"></div>
          ))
        ) : categories.length > 0 ? (
          categories.map((category: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={category._id}
              className="card-modern p-grid-3 group relative flex flex-col items-center text-center overflow-hidden"
            >
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-rose-50 transition-colors duration-500" />
              
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-rose-600 transition-colors tracking-tight">{category.name}</h3>
                <p className="text-sm text-slate-500 font-bold line-clamp-2 leading-relaxed px-4">{category.description || 'لا يوجد وصف مضاف لهذا القسم'}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 w-full flex justify-center gap-3 relative z-10">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setIsModalOpen(true);
                  }}
                  className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 active:scale-90"
                  title="تعديل"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-100 transition-all duration-300 active:scale-90"
                  title="حذف"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center card-modern border-dashed border-slate-200">
             <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <Tags className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-400 font-black text-xl tracking-tight">لم يتم إضافة أي أقسام بعد</p>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? 'تعديل بيانات القسم' : 'إضافة قسم جديد للمتجر'}
        className="max-w-2xl"
      >
        <div className="py-4">
          <CategoryForm
            initialData={editingCategory}
            onSubmit={editingCategory ? handleUpdate : handleCreate}
            isLoading={isCreating || isUpdating}
          />
        </div>
      </Modal>
    </div>
  );
}