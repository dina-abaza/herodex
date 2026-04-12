'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useGetCategoriesQuery } from '@/store/api/categoryApiSlice';

const productSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'السعر يجب أن يكون رقماً موجباً',
  }),
  description: z.string().min(10, { message: 'الوصف يجب أن يكون 10 أحرف على الأقل' }),
  category: z.string().min(1, { message: 'يرجى اختيار قسم' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string>(initialData?.image || '');
  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const categories = categoriesData?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || '',
      price: initialData?.price?.toString() || '',
      description: initialData?.description || '',
      category: initialData?.category?._id || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (values: ProductFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('category', values.category);
    if (image) formData.append('image', image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="اسم المنتج"
          placeholder="مثلاً: سيروم الهيالورونيك"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="السعر"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('price')}
          error={errors.price?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black text-slate-700 block mr-1 tracking-tight">القسم</label>
        <select
          {...register('category')}
          className="flex h-14 w-full rounded-2xl border-none bg-slate-50 px-5 py-2 text-base font-bold text-slate-900 focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
        >
          <option value="">اختر قسماً</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-xs font-bold text-rose-500 mt-1 mr-1">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black text-slate-700 block mr-1 tracking-tight">الوصف</label>
        <textarea
          {...register('description')}
          placeholder="اكتب وصفاً تفصيلياً للمنتج..."
          className="flex min-h-[120px] w-full rounded-2xl border-none bg-slate-50 px-5 py-4 text-base font-bold text-slate-900 focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all outline-none resize-none"
        />
        {errors.description && <p className="text-xs font-bold text-rose-500 mt-1 mr-1">{errors.description.message}</p>}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-black text-slate-700 block mr-1 tracking-tight">صورة المنتج</label>
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl group hover:scale-105 transition-transform duration-500">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse" />
                <span className="text-slate-300 text-[10px] font-black uppercase">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="cursor-pointer">
              <span className="inline-block px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-black text-sm hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm">
                اختيار صورة المنتج
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs font-bold text-slate-400 mt-2 mr-1">JPG, PNG أو WEBP (بحد أقصى 2 ميجا)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-slate-50">
        <Button type="submit" isLoading={isLoading} className="min-w-[180px]">
          {initialData ? 'تحديث البيانات' : 'إضافة المنتج للمتجر'}
        </Button>
      </div>
    </form>
  );
}
