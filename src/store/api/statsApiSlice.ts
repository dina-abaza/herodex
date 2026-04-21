import { apiSlice } from './apiSlice';

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => '/stats',
      providesTags: ['Stats'],
    }),
    getTopSelling: builder.query({
      query: (limit = 10) => `/stats/top-selling?limit=${limit}`,
      providesTags: ['Stats'],
    }),
  }),
});

export const { useGetStatsQuery, useGetTopSellingQuery } = statsApiSlice;
