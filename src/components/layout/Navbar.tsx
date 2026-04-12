'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { useGetCartQuery } from '@/store/api/cartApiSlice';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cartData } = useGetCartQuery(undefined, { skip: !user });
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount = cartData?.data?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-rose-600">جمالك</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse flex-1 justify-center">
            <Link href="/" className="text-gray-600 hover:text-rose-600 font-medium">الرئيسية</Link>
            <Link href="/products" className="text-gray-600 hover:text-rose-600 font-medium">المنتجات</Link>
            <Link href="/categories" className="text-gray-600 hover:text-rose-600 font-medium">الأقسام</Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-5 space-x-reverse">
            <button className="text-gray-600 hover:text-rose-600 transition-colors">
              <Search size={22} />
            </button>
            
            <Link href="/cart" className="text-gray-600 hover:text-rose-600 transition-colors relative">
              <ShoppingCart size={22} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {mounted && user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link 
                  href={user.role === 'admin' ? '/admin/dashboard' : '/profile'} 
                  className="flex items-center text-gray-600 hover:text-rose-600"
                >
                  <User size={22} className="ml-1" />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button 
                  onClick={() => dispatch(logout())}
                  className="text-sm text-red-500 hover:underline"
                >
                  خروج
                </button>
              </div>
            ) : mounted ? (
              <Link href="/admin/login">
                <Button size="sm">دخول</Button>
              </Link>
            ) : (
              <div className="w-16 h-8" /> // Placeholder to prevent jump
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-rose-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn('md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4', !isOpen && 'hidden')}>
        <Link href="/" className="block text-gray-600 hover:text-rose-600 font-medium">الرئيسية</Link>
        <Link href="/products" className="block text-gray-600 hover:text-rose-600 font-medium">المنتجات</Link>
        <Link href="/categories" className="block text-gray-600 hover:text-rose-600 font-medium">الأقسام</Link>
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link href="/cart" className="flex items-center text-gray-600">
            <ShoppingCart size={22} className="ml-2" />
            <span>السلة ({cartItemsCount})</span>
          </Link>
          {mounted && user ? (
            <button onClick={() => dispatch(logout())} className="text-red-500">خروج</button>
          ) : mounted ? (
            <Link href="/admin/login" className="text-rose-600 font-medium">تسجيل الدخول</Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
