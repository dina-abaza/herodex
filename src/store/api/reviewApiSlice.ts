import { apiSlice } from './apiSlice';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => '/reviews',
      providesTags: ['Review'],
    }),
    createReview: builder.mutation({
      query: (formData) => ({
        url: '/reviews',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;
