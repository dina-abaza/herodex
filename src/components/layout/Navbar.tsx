'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, LogOut, Package } from 'lucide-react';
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

  // دالة لاختصار الاسم لأول اسمين فقط
  const getShortName = (name: string) => {
    if (!name) return "";
    const nameArray = name.trim().split(/\s+/);
    return nameArray.length > 2 ? `${nameArray[0]} ${nameArray[1]}` : name;
  };

  const cartItemsCount = cartData?.data?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    console.log("User logging out...");
    dispatch(logout());
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/#products' },
    { name: 'الأقسام', href: '/#categories' },
    { name: 'المراجعات', href: '/#reviews' },
    { name: 'عن الموقع', href: '/#about' },
  ];

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-store-muted py-1" 
          : "bg-white border-b border-gray-100 py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section - تم تكبير الحجم هنا */}
          <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-store-muted group-hover:border-store-gold/60 transition-colors shadow-sm">
              <Image 
                src="/logo/logo.jpeg" 
                alt="Logo" 
                fill 
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
            <div className="mr-3 flex flex-col">
              <span className="text-2xl font-black text-store tracking-tight leading-none ">Herodex</span>
              <span className="text-[10px] font-bold text-store-gold uppercase tracking-widest mt-0.5">Pharma</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 space-x-reverse flex-1 justify-center px-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="px-4 py-2 text-gray-600 hover:text-store font-bold transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-store-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <Link 
              href="/cart" 
              aria-label={`سلة التسوق (${cartItemsCount} منتجات)`}
              className="p-2 text-gray-500 hover:text-store hover:bg-store-muted rounded-full transition-all duration-200 relative"
            >
              <ShoppingCart size={22} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-store text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce-slow">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <div className="h-8 w-px bg-gray-100 mx-2" />

            {mounted && user ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link 
                  href={user.role === 'admin' ? '/admin/dashboard' : '/'} 
                  aria-label={user.role === 'admin' ? 'لوحة تحكم المسؤول' : 'الملف الشخصي'}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-store-muted text-store-dark hover:bg-store-muted/80 transition-colors group border border-neutral-200"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border border-neutral-200">
                    <User size={18} className="text-store" />
                  </div>
                  {/* عرض أول اسمين فقط */}
                  <span className="text-sm font-bold truncate max-w-[120px]">{getShortName(user.name)}</span>
                </Link>
                <Link 
                  href="/my-orders" 
                  aria-label="عرض طلباتي"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 group border border-transparent hover:border-neutral-200"
                  title="طلباتي"
                >
                  <Package size={20} className="text-gray-500 group-hover:text-store" />
                  <span className="text-sm font-bold text-gray-600 group-hover:text-store">طلباتي</span>
                </Link>

                <div className="h-4 w-px bg-gray-200 mx-1" />

                <button 
                  onClick={handleLogout}
                  aria-label="تسجيل الخروج"
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="تسجيل الخروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : mounted ? (
              <div className="flex items-center gap-4 space-x-reverse">
                <Link href="/login">
                  <Button 
                    size="sm" 
                    variant="outline"
                    aria-label="دخول إلى الحساب"
                    className="border-gray-200 hover:border-store/30 hover:text-store font-bold"
                  >
                    تسجيل دخول
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="sm" 
                    aria-label="إنشاء حساب جديد"
                    className="bg-store hover:bg-store-dark font-bold shadow-md text-white border-0"
                  >
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="w-20 h-9 bg-gray-50 rounded-md animate-pulse" />
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              className="p-2 text-gray-600 hover:text-store hover:bg-store-muted rounded-lg transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 space-y-2 pb-10 pt-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:text-store hover:bg-store-muted rounded-xl font-bold transition-all"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link 
                href="/cart" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 bg-store-muted rounded-xl text-store-dark font-bold border border-neutral-200"
              >
                <div className="flex items-center">
                  <ShoppingCart size={22} className="ml-3" />
                  <span>السلة</span>
                </div>
                <span className="bg-store text-white text-xs px-2 py-1 rounded-full">{cartItemsCount}</span>
              </Link>
              
              <div className="mt-4 flex flex-col space-y-2">
                {mounted && user ? (
                  <>
                    <Link 
                      href={user.role === 'admin' ? '/admin/dashboard' : '/'}
                      className="flex items-center px-4 py-3 text-gray-600 font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={20} className="ml-3" />
                      <span>{getShortName(user.name)}</span>
                    </Link>
                    <Link 
                      href="/my-orders"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-600 font-bold"
                    >
                      <Package size={20} className="ml-3" />
                      <span>طلباتي</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
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
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">تسجيل دخول</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-store hover:bg-store-dark text-white border-0">إنشاء حساب</Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}