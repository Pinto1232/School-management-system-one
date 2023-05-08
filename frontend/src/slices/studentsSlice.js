import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api";

export const fetchStudentsAsync = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const students = await api.fetchStudents();
    return students;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const student = await api.addStudent(newStudent);
    return student;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStudentsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default studentsSlice.reducer;
