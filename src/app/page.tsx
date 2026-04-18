// Server Component — لا 'use client' هنا عمداً
// الـ client state موجود في HomeClient.tsx وبيتحمّل بشكل lazy
import { HomeClient } from '@/components/home/HomeClient';

export default function HomePage() {
  return <HomeClient />;
}
