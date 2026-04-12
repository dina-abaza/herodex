'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/api/authApiSlice';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await login(values).unwrap();
      if (res.success) {
        if (res.data.role !== 'admin') {
          setError('root', { message: 'ليس لديك صلاحيات الوصول كمسؤول' });
          return;
        }
        dispatch(setCredentials({ user: res.data, token: res.data.token }));
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      setError('root', { message: err?.data?.message || 'حدث خطأ في بيانات الدخول' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 font-cairo overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-rose-600 rounded-[2.5rem] shadow-2xl shadow-rose-200 mb-6 rotate-6"
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">لوحة تحكم المسؤول</h2>
          <p className="mt-4 text-lg text-slate-500 font-bold tracking-tight">
            أهلاً بك مجدداً في نظام إدارة متجر جمالك
          </p>
        </div>

        <div className="card-modern p-grid-4">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Input
                id="email"
                label="البريد الإلكتروني"
                type="email"
                placeholder="admin@jamalik.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                id="password"
                label="كلمة المرور"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <AnimatePresence>
              {errors.root && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm font-bold text-rose-600 bg-rose-50 p-4 rounded-2xl text-center border border-rose-100"
                >
                  {errors.root.message}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              size="lg"
            >
              <ShieldCheck className="ml-2" size={20} />
              دخول آمن للنظام
            </Button>
          </form>
        </div>

        <p className="text-center mt-10 text-slate-400 font-bold text-sm tracking-tight">
          © {new Date().getFullYear()} متجر جمالك - جميع الحقوق محفوظة
        </p>
      </motion.div>
    </div>
  );
}
