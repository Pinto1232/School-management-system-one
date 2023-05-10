import { configureStore } from '@reduxjs/toolkit';
import studentApi from '../services/reduxApi';


export default configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});