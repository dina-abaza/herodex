import { apiSlice } from './apiSlice';

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => '/stats',
      providesTags: ['Stats'],
    }),
  }),
});

export const { useGetStatsQuery } = statsApiSlice;
