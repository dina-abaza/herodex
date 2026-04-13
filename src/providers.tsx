'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { store } from './store';
import { setCredentials } from '@/store/slices/authSlice';

function AuthCallbackHandler() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const provider = searchParams.get('provider');
    const error = searchParams.get('error');

    if (error) {
      router.replace(pathname);
      return;
    }

    if (!token || provider !== 'google') return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    (async () => {
      try {
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: { authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json?.success && json?.data) {
          dispatch(setCredentials({ user: json.data, token }));
        }
      } finally {
        router.replace(pathname);
      }
    })();
  }, [dispatch, pathname, router, searchParams]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthCallbackHandler />
      {children}
    </Provider>
  );
}
