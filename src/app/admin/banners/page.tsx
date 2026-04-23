'use client';

import React, { useState } from 'react';
import { 
  useGetBannersQuery, 
  useUploadBannerMutation, 
  useDeleteBannerMutation 
} from '@/store/api/bannerApiSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Upload, 
  Loader2, 
  AlertCircle,
  Monitor,
  Smartphone
} from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminBannersPage() {
  const { data: response, isLoading, refetch } = useGetBannersQuery(undefined);
  const [uploadBanner, { isLoading: isUploading }] = useUploadBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bannerType, setBannerType] = useState<'laptop' | 'mobile'>('laptop');

  const banners = response?.data || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // فحص الحجم (5 ميجا بايت كحد أقصى للصور في الويب)
      // ملاحظة: المستخدم طلب التنبيه لـ 5 جيجا ولكن منطقياً للصور هو 5 ميجا
      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        toast.error('الصورة مرفوضة لأن وزنها أكبر من 5 ميجا، يجب أن يكون أقل');
        e.target.value = '';
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('يرجى اختيار صورة أولاً');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('type', bannerType);

    try {
      await uploadBanner(formData).unwrap();
      toast.success('تم رفع البانر بنجاح');
      setSelectedFile(null);
      // Reset input
      const fileInput = document.getElementById('banner-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      toast.error(err.data?.message || 'حدث خطأ أثناء الرفع');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا البانر؟')) return;
    try {
      await deleteBanner(id).unwrap();
      toast.success('تم حذف البانر بنجاح');
    } catch (err: any) {
      toast.error(err.data?.message || 'حدث خطأ أثناء الحذف');
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">إدارة البانرات</h1>
          <p className="text-gray-500 font-bold mt-1">إضافة وحذف صور السلايدر الرئيسي</p>
        </div>
      </div>

      {/* Upload Section */}
      <section className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Plus className="text-store" size={24} />
          إضافة بانر جديد
        </h2>

        {/* Info Alert for Dimensions */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
            <AlertCircle size={24} />
          </div>
          <div className="space-y-1">
            <p className="text-base font-black text-gray-900">تنبيه للأبعاد المطلوبة لضمان أفضل ظهور:</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <div className="flex items-center gap-2">
                <Monitor size={18} className="text-store" />
                <span className="text-sm font-bold text-gray-700">لابتوب (Laptop): <span className="text-store font-black">21:9</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-store" />
                <span className="text-sm font-bold text-gray-700">موبايل (Mobile): <span className="text-store font-black">16:9</span></span>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 mr-2">نوع البانر</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'laptop', label: 'لابتوب (21:9)', icon: Monitor },
                  { id: 'mobile', label: 'موبايل (16:9)', icon: Smartphone },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setBannerType(type.id as any)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                      bannerType === type.id 
                        ? 'border-store bg-store/5 text-store' 
                        : 'border-gray-50 text-gray-400 hover:border-gray-100'
                    }`}
                  >
                    <type.icon size={20} />
                    <span className="text-xs font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 mr-2">اختر الصورة</label>
              <div className="relative group">
                <input 
                  id="banner-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label 
                  htmlFor="banner-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-store/50 hover:bg-store/5 transition-all group"
                >
                  {selectedFile ? (
                    <div className="text-center">
                      <ImageIcon className="mx-auto text-store mb-2" size={32} />
                      <p className="text-xs font-bold text-gray-600 truncate max-w-[200px]">{selectedFile.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-gray-300 group-hover:text-store mb-2 transition-colors" size={32} />
                      <p className="text-xs font-bold text-gray-500">اضغط لرفع صورة</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            isLoading={isUploading}
            disabled={!selectedFile}
            className="w-full py-4 bg-store hover:bg-store-dark text-white rounded-2xl font-black shadow-lg shadow-store/20"
          >
            رفع البانر الآن
          </Button>
        </form>
      </section>

      {/* List Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
          <ImageIcon className="text-store" size={24} />
          البانرات الحالية ({banners.length})
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[21/9] bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : banners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner: any) => (
              <motion.div 
                layout
                key={banner._id}
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="aspect-[21/9] relative bg-gray-50">
                  <img 
                    src={banner.laptopPath || banner.originalPath} 
                    alt="Banner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      {banner.type}
                    </span>
                    <span className="px-3 py-1 bg-store/80 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      {banner.aspectRatio}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="text-[10px] text-gray-400 font-bold">
                    تم الرفع: {new Date(banner.createdAt).toLocaleDateString('ar-EG')}
                  </div>
                  <button 
                    onClick={() => handleDelete(banner._id)}
                    disabled={isDeleting}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
            <ImageIcon className="mx-auto text-gray-200 mb-4" size={64} />
            <h3 className="text-lg font-black text-gray-900">لا توجد بانرات حالياً</h3>
            <p className="text-sm text-gray-500 font-bold">ابدأ برفع أول صورة سلايدر للمتجر</p>
          </div>
        )}
      </section>
    </div>
  );
}
