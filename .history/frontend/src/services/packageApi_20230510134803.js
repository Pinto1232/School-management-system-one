import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Package token", token);

      if (token) {
        headers.set("", ``);
      }
    },
  }),
});
