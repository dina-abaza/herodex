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
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">إدارة المراجعات</h1>
          <p className="text-sm md:text-lg text-slate-500 mt-1 md:mt-2 font-medium tracking-tight">عرض وحذف صور مراجعات العملاء وتجاربهم</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary flex items-center group py-3 px-6 md:py-4 md:px-8 text-sm md:text-base"
        >
          <Plus size={18} className="ml-2 md:ml-3 group-hover:rotate-90 transition-transform duration-300" />
          إضافة مراجعة
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-grid-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-2xl md:rounded-3xl"></div>
            ))
          ) : reviews.length > 0 ? (
            reviews.map((review: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={review._id}
                className="group relative aspect-square card-modern overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl shadow-md"
              >
                <img 
                  src={review.imageUrl || review.image || ''} 
                  alt="Review" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* For Mobile: Clear Delete Button */}
                <div className="md:hidden absolute top-2 left-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(review._id);
                    }}
                    className="p-2.5 bg-white/95 text-rose-600 rounded-xl shadow-xl border border-rose-100 active:scale-90 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center">
                  {/* Desktop Actions */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(review._id);
                    }}
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
            className="group relative aspect-square md:aspect-video w-full border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-rose-200 transition-all duration-500 mb-8 cursor-pointer overflow-hidden p-4"
            onClick={() => document.getElementById('review-upload')?.click()}
          >
            {preview ? (
              <div className="relative w-full aspect-square md:aspect-video max-h-60 md:max-h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ) : (
              <>
                <div className="p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                  <ImageIcon className="text-rose-500" size={32} />
                </div>
                <div className="text-center px-4">
                  <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">اضغط لرفع صورة المراجعة</p>
                  <p className="text-[10px] md:text-sm text-slate-400 font-bold mt-1 md:mt-2">يدعم JPG, PNG (حد أقصى 5 ميجا)</p>
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

          <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 bg-slate-100 text-slate-600 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:bg-slate-200 transition-all active:scale-95 order-2 md:order-1"
            >
              إلغاء
            </button>
            <button
              onClick={handleCreate}
              disabled={!image || isCreating}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto md:min-w-[160px] flex items-center justify-center py-3 md:py-4 text-sm md:text-base order-1 md:order-2"
            >
              {isCreating ? (
                <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
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
