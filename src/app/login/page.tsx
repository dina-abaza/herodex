'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/api/authApiSlice';
import { apiSlice } from '@/store/api/apiSlice';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const backendOrigin = apiUrl.replace(/\/api\/?$/, '');
  const googleAuthUrl = `${backendOrigin}/api/auth/google`;

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
      // مسح الكاش القديم قبل تسجيل الدخول لضمان عدم بقاء بيانات سلة مستخدم سابق
      dispatch(apiSlice.util.resetApiState());
      
      const res = await login(values).unwrap();
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
          : 'حدث خطأ في بيانات الدخول';
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
            <LogIn size={28} />
          </div>
          <h1 className="text-3xl font-black text-store-black">تسجيل الدخول</h1>
          <p className="text-gray-500 mt-2">أهلا بك مرة أخرى</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              تسجيل الدخول
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
            className="w-full border-gray-200 hover:border-store/30 hover:text-store font-bold"
          >
            الدخول عبر جوجل
          </Button>

          <p className="text-center text-sm text-gray-500 mt-5">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-store font-bold hover:underline">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
