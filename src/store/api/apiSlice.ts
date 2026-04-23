import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    // إرسال التوكن إذا كان المستخدم مسجلاً
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    // إرسال guestId إذا كان موجوداً في localStorage
    if (typeof window !== 'undefined') {
      const guestId = localStorage.getItem('guestId');
      if (guestId) {
        headers.set('x-guest-id', guestId);
      }
    }
    
    return headers;
  },
});

// Wrapper لـ baseQuery لاستقبال وحفظ x-guest-id من السيرفر
const baseQueryWithGuestId: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  if (typeof window !== 'undefined') {
    // 1. التحقق من وجود الترويسة x-guest-id
    const guestIdFromHeader = result.meta?.response?.headers.get('x-guest-id');
    
    // 2. التحقق من وجود guestId داخل محتوى الاستجابة (Body)
    const guestIdFromBody = (result.data as any)?.data?.guestId;

    const finalGuestId = guestIdFromHeader || guestIdFromBody;

    if (finalGuestId) {
      const currentGuestId = localStorage.getItem('guestId');
      if (currentGuestId !== finalGuestId) {
        localStorage.setItem('guestId', finalGuestId);
      }
    }
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithGuestId,
  tagTypes: ['Product', 'Category', 'User', 'Review', 'Stats', 'Cart', 'Order', 'Banner'],
  endpoints: (builder) => ({}),
});
