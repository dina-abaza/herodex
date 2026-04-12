'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Sidebar } from './Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // If not logged in and not on login page, redirect to login
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    // If logged in as non-admin, redirect or show error (for safety)
    if (token && user?.role !== 'admin' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    // If logged in as admin and on login page, redirect to dashboard
    if (token && user?.role === 'admin' && pathname === '/admin/login') {
      router.push('/admin/dashboard');
    }
  }, [token, user, pathname, router]);

  // Don't show layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Prevent hydration mismatch: Server and first render won't have Redux state 
  // from localStorage, so return a loading state or null to match initially.
  if (!mounted) {
    return null;
  }

  // If not logged in and trying to access admin pages, show nothing while redirecting
  if (!token) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-cairo">
      <Sidebar />
      <main className="flex-1 lg:pr-72 relative overflow-y-auto focus:outline-none">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="admin-container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
