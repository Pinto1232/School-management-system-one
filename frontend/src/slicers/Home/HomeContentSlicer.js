import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HomeContentApi = createApi({
  reducerPath: "HomeContentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getContent: builder.query({
      query: () => "/content",
    }),
    getContentById: builder.query({
      query: (id) => `/content/${id}`,
    }),
    createContent: builder.mutation({
      query: (contentData) => ({
        url: "/content",
        method: "POST",
        body: contentData,
      }),
    }),
    updateContent: builder.mutation({
      query: ({ id, contentData }) => ({
        url: `/content/${id}`,
        method: "PUT",
        body: contentData,
      }),
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/content/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetContentQuery,
  useGetContentByIdQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = HomeContentApi;

export default HomeContentApi;