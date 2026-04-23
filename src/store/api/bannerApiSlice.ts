import { apiSlice } from './apiSlice';

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => '/images',
      providesTags: ['Banner' as any],
    }),
    uploadBanner: builder.mutation({
      query: (formData) => ({
        url: '/images/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Banner' as any],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/images/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner' as any],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useUploadBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice;
