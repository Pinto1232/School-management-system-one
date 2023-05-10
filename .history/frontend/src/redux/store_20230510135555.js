import { configureStore } from '@reduxjs/toolkit';
import studentApi from '../services/studentApi';
import packageApi from '../services/packageApi';

export default configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});