'use client';

import React, { useState } from 'react';
import { 
  useGetReviewsQuery, 
  useCreateReviewMutation, 
  useDeleteReviewMutation 
} from '@/store/api/reviewApiSlice';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash2, ImageIcon, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const { data, isLoading } = useGetReviewsQuery(undefined);
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    try {
      await createReview(formData).unwrap();
      setIsModalOpen(false);
      setImage(null);
      setPreview('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المراجعة؟')) {
      try {
        await deleteReview(id).unwrap();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const reviews = data?.data || [];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">إدارة المراجعات</h1>
          <p className="text-lg text-slate-500 mt-2 font-medium tracking-tight">عرض وحذف صور مراجعات العملاء وتجاربهم</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary flex items-center group"
        >
          <Plus size={20} className="ml-3 group-hover:rotate-90 transition-transform duration-300" />
          إضافة مراجعة جديدة
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-grid-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-3xl"></div>
            ))
          ) : reviews.length > 0 ? (
            reviews.map((review: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={review._id}
                className="group relative aspect-square card-modern overflow-hidden cursor-pointer"
              >
                <img 
                  src={review.imageUrl || review.image || ''} 
                  alt="Review" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(review._id)}
                    className="p-5 bg-rose-600 text-white rounded-2xl shadow-xl shadow-rose-900/20"
                  >
                    <Trash2 size={24} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center card-modern border-dashed border-slate-200">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <Star className="text-slate-300" size={32} />
                </div>
                <p className="text-slate-400 font-black text-xl tracking-tight">لم يتم إضافة أي مراجعات بعد</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setImage(null);
          setPreview('');
        }}
        title="إضافة صورة مراجعة جديدة"
        className="max-w-xl"
      >
        <div className="space-y-8 py-4">
          <div 
            className="group border-4 border-dashed border-slate-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-white hover:border-rose-200 transition-all duration-500 relative overflow-hidden"
            onClick={() => document.getElementById('review-upload')?.click()}
          >
            {preview ? (
              <div className="relative w-full aspect-square max-h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ) : (
              <>
                <div className="p-6 bg-white rounded-3xl shadow-xl shadow-slate-200/50 mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                  <ImageIcon className="text-rose-500" size={40} />
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-slate-900 tracking-tight">اضغط لرفع صورة المراجعة</p>
                  <p className="text-sm text-slate-400 font-bold mt-2">يدعم JPG, PNG (حد أقصى 5 ميجا)</p>
                </div>
              </>
            )}
            <input
              id="review-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95"
            >
              إلغاء
            </button>
            <button
              onClick={handleCreate}
              disabled={!image || isCreating}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] flex items-center justify-center"
            >
              {isCreating ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'رفع المراجعة الآن'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
