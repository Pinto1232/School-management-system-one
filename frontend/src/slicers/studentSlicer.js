import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      /* console.log("Token log:", token); */
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
    }),
    getStudentById: builder.query({
      query: (id) => `/students/${id}`,
    }),
    createStudent: builder.mutation({
      query: (studentData) => ({
        url: "/students",
        method: "POST",
        body: studentData,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, studentData }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: studentData,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetStudentsQuery } = studentApi;
export default studentApi;
