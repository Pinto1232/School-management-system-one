import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Package token", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPackages: builder.query({
        query: () => "/packages"
    }),

  })
});

export const { useGetStudentsQuery } = packageApi;

