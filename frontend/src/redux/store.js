import { configureStore } from '@reduxjs/toolkit';
import studentApi from '../slicers/studentSlicer';
import packageApi from '../slicers/packageSlicer';
import teacherApi from '../slicers/teacherSlicer';

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
