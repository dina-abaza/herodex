import { apiSlice } from './apiSlice';
import type { GetProductsArg, GetProductsResponse } from '@/types/productsApi';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsArg | void>({
      queryFn: async (arg, _api, _extra, baseQuery) => {
        const { page = 1, limit = 10, category = '' } = arg || {};
        const result = await baseQuery(
          `/products?pageNumber=${page}&limit=${limit}&category=${category}`
        );
        if (result.error) return { error: result.error };
        return { data: result.data as GetProductsResponse };
      },
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
