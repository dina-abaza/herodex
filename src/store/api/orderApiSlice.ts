import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: '/orders/checkout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart' as any, 'Order' as any],
    }),
    getMyOrders: builder.query({
      query: () => '/orders/myorders',
      providesTags: ['Order' as any],
    }),
    getAllOrders: builder.query({
      query: ({ page = 1, limit = 10, search = '' }) => ({
        url: '/orders',
        params: { page, limit, search },
      }),
      providesTags: ['Order' as any],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order' as any],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
