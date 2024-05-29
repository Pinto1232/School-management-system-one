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
    getPackages: builder.query({
      query: () => "/packages",
    }),
    getPackageById: builder.query({
      query: (id) => `/packages/${id}`,
    }),
    createPackage: builder.mutation({
      query: (packageData) => ({
        url: "/packages",
        method: "POST",
        body: packageData,
      }),
    }),
    updatePackage: builder.mutation({
      query: ({ id, packageData }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: packageData,
      }),
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = HomeContentApi;

export default HomeContentApi;