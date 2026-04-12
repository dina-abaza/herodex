import { apiSlice } from './apiSlice';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart' as any],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart' as any],
    }),
    updateCartItem: builder.mutation({
      query: (data) => ({
        url: '/cart',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cart' as any],
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart' as any],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart' as any],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApiSlice;
