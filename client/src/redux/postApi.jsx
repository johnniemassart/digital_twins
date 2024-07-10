import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getFollowingPosts: builder.query({
      query: (id) => `api/following_posts/${id}`,
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetFollowingPostsQuery } = postApi;
