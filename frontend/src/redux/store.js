import { configureStore } from '@reduxjs/toolkit';
import studentApi from '../services/studentApi';
import packageApi from '../services/packageApi';
import teacherApi from '../services/TeacherApi';

export default configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentApi.middleware,
      packageApi.middleware,
      teacherApi.middleware
    ),
});