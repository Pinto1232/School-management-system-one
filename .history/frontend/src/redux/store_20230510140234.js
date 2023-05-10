import { configureStore } from '@reduxjs/toolkit';
import studentApi from '../services/studentApi';
import packageApi from '../services/packageApi';

export default configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [packagesApi.reducerPath]: packagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentApi.middleware,
      packagesApi.middleware
    ),
});