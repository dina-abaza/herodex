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
import Link from 'next/link';

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

          <div className="my-5 flex items-center gap-3">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-400">أو</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-gray-200 hover:border-store/30 hover:bg-gray-50 font-bold flex items-center justify-center gap-3 py-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
            الدخول عبر جوجل
          </Button>

          <p className="text-center text-sm text-gray-500 mt-5">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-store font-bold hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
