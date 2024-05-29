import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const teacherApi = createApi({
  reducerPath: "teacherApi",
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
    getTeachers: builder.query({
      query: () => "/teachers",
    }),
    getTeacherById: builder.query({
      query: (id) => `/teachers/${id}`,
    }),
    createTeacher: builder.mutation({
      query: (teacherData) => ({
        url: "/teachers/register",
        method: "POST",
        body: teacherData,
      }),
    }),
    updateTeacher: builder.mutation({
      query: ({ id, teacherData }) => ({
        url: `/teachers/${id}`,
        method: "PUT",
        body: teacherData,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetTeacherQuery } = teacherApi;
export default teacherApi;
