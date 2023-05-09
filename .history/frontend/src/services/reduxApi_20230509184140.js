import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        console.log("Token log:", token);
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
      }      
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
    }),
  }),
});

export const { useGetStudentsQuery } = studentApi;
export default studentApi;
