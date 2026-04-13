'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { useGetCartQuery } from '@/store/api/cartApiSlice';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cartData } = useGetCartQuery(undefined, { skip: !user });
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cartData?.data?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const backendOrigin = apiUrl.replace(/\/api\/?$/, '');
  const googleAuthUrl = `${backendOrigin}/api/auth/google`;

  const handleGoogleLogin = () => {
    window.location.href = googleAuthUrl;
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/#products' },
    { name: 'الأقسام', href: '/#categories' },
    { name: 'المراجعات', href: '/#reviews' },
  ];

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-50 py-1" 
          : "bg-white border-b border-gray-100 py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-rose-100 group-hover:border-rose-300 transition-colors shadow-sm">
              <Image 
                src="/logo/logo.jpeg" 
                alt="Logo" 
                fill 
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <div className="mr-3 flex flex-col">
              <span className="text-2xl font-black text-rose-600 tracking-tight leading-none">جمالك</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">للجمال عنوان</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse flex-1 justify-center px-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="px-4 py-2 text-gray-600 hover:text-rose-600 font-bold transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-200">
              <Search size={22} />
            </button>
            
            <Link 
              href="/cart" 
              className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-200 relative"
            >
              <ShoppingCart size={22} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce-slow">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <div className="h-8 w-px bg-gray-100 mx-2" />

            {mounted && user ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link 
                  href={user.role === 'admin' ? '/admin/dashboard' : '/'} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center overflow-hidden">
                    <User size={18} className="text-rose-600" />
                  </div>
                  <span className="text-sm font-bold truncate max-w-[100px]">{user.name}</span>
                </Link>
                <button 
                  onClick={() => dispatch(logout())}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="تسجيل الخروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : mounted ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleGoogleLogin}
                  className="border-gray-200 hover:border-rose-200 hover:text-rose-600 font-bold"
                >
                  جوجل
                </Button>
                <Link href="/admin/login">
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-700 font-bold shadow-md shadow-rose-100">
                    دخول
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="w-20 h-9 bg-gray-50 rounded-md animate-pulse" />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-50 shadow-xl',
          isOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        )}
      >
        <div className="px-4 space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-all"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link 
              href="/cart" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 bg-rose-50 rounded-xl text-rose-700 font-bold"
            >
              <div className="flex items-center">
                <ShoppingCart size={22} className="ml-3" />
                <span>السلة</span>
              </div>
              <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-full">{cartItemsCount}</span>
            </Link>
            
            <div className="mt-4 flex flex-col space-y-2">
              {mounted && user ? (
                <>
                  <Link 
                    href={user.role === 'admin' ? '/admin/dashboard' : '/'}
                    className="flex items-center px-4 py-3 text-gray-600 font-bold"
                  >
                    <User size={20} className="ml-3" />
                    <span>{user.name}</span>
                  </Link>
                  <button 
                    onClick={() => {
                      dispatch(logout());
                      setIsOpen(false);
                    }} 
                    className="flex items-center px-4 py-3 text-red-600 font-bold"
                  >
                    <LogOut size={20} className="ml-3" />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : mounted ? (
                <div className="grid grid-cols-2 gap-3 px-2">
                  <Button variant="outline" onClick={handleGoogleLogin} className="w-full">جوجل</Button>
                  <Link href="/admin/login" className="w-full">
                    <Button className="w-full bg-rose-600">دخول</Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
