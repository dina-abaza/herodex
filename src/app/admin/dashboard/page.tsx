// Trigger recompile
'use client';

import React from 'react';
import { useGetStatsQuery } from '@/store/api/statsApiSlice';
import { Package, Tags, Users, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="card-modern p-grid-4 flex items-start justify-between relative overflow-hidden group"
  >
    <div className="relative z-10">
      <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">{title}</p>
      <h3 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
      {trend && (
        <div className={`inline-flex items-center px-2 py-1 rounded-lg mt-4 text-xs font-bold ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          <span className="ml-1">{trend > 0 ? '+' : ''}{trend}%</span>
          منذ الشهر الماضي
        </div>
      )}
    </div>
    <div className={`p-4 rounded-2xl ${color} text-white shadow-xl shadow-opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
      <Icon size={24} />
    </div>
    {/* Decorative background shape */}
    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-[0.02] ${color}`} />
  </motion.div>
);

export default function DashboardPage() {
  const { data, isLoading } = useGetStatsQuery(undefined);

  if (isLoading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-100 rounded-[2rem]"></div>
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.data || { totalProducts: 0, totalCategories: 0, totalUsers: 0 };

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">نظرة عامة</h1>
          <p className="text-sm md:text-lg text-slate-500 mt-1 md:mt-2 font-medium">مرحباً بك في لوحة تحكم Herodex Pharma</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-slate-500">النظام يعمل بشكل ممتاز</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-4">
        <StatCard
          title="إجمالي المنتجات"
          value={stats.totalProducts}
          icon={Package}
          color="bg-rose-500"
          trend={12}
        />
        <StatCard
          title="إجمالي الأقسام"
          value={stats.totalCategories}
          icon={Tags}
          color="bg-amber-500"
          trend={5}
        />
        <StatCard
          title="إجمالي المستخدمين"
          value={stats.totalUsers}
          icon={Users}
          color="bg-indigo-500"
          trend={18}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-4">
        <section className="card-modern p-grid-4 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">آخر العمليات</h2>
            <button className="text-rose-600 font-bold text-sm hover:bg-rose-50 px-4 py-2 rounded-xl transition-colors">عرض الكل</button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
              <ShoppingCart className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 font-bold text-lg">لا توجد عمليات بيع مؤخراً</p>
          </div>
        </section>

        <section className="card-modern p-grid-4 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">أكثر الأقسام مبيعاً</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
              <Tags className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 font-bold text-lg">سيتم عرض المخططات البيانية هنا</p>
          </div>
        </section>
      </div>
    </div>
  );
}
