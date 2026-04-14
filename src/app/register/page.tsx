'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/store/api/authApiSlice';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserPlus } from 'lucide-react';

const registerSchema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل' }),
    email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
    password: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
    confirmPassword: z.string().min(6, { message: 'يرجى تأكيد كلمة المرور' }),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    path: ['confirmPassword'],
    message: 'كلمتا المرور غير متطابقتين',
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const backendOrigin = apiUrl.replace(/\/api\/?$/, '');
  const googleAuthUrl = `${backendOrigin}/api/auth/google`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();

      if (res?.success) {
        if (res?.data?.token) {
          dispatch(setCredentials({ user: res.data, token: res.data.token }));
        }
        router.push('/');
      }
    } catch (err: unknown) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'data' in err &&
        typeof (err as { data?: { message?: string } }).data?.message === 'string'
          ? (err as { data?: { message?: string } }).data?.message
          : 'تعذر إنشاء الحساب حالياً';
      setError('root', { message });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-store text-white mb-4">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-black text-store-black">إنشاء حساب جديد</h1>
          <p className="text-gray-500 mt-2">سجلي بياناتك للبدء بالتسوق</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="name"
              label="الاسم"
              placeholder="الاسم الكامل"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              id="email"
              type="email"
              label="البريد الإلكتروني"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              id="password"
              type="password"
              label="كلمة المرور"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="تأكيد كلمة المرور"
              placeholder="••••••••"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            {errors.root && (
              <div className="text-sm font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
                {errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-store hover:bg-store-dark text-white border-0"
            >
              إنشاء الحساب
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            لديك حساب بالفعل؟{' '}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="text-store font-bold hover:underline"
            >
              الدخول عبر جوجل
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
