import { configureStore, createSlice } from '@reduxjs/toolkit';
import studentApi from '../services/studentApi';
import packageApi from '../services/packageApi';

export const userFormSlice = createSlice({
  name: 'userForm',
  initialState: {
    userPlan: {},
    userInfo: {},
  },
  reducers: {
    setUserPlan: (state, action) => {
      console.log('Updating user plan with', action.payload);
      state.userPlan = action.payload;
    },
    setUserInfo: (state, action) => {
      console.log('Updating user info with', action.payload);
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserPlan, setUserInfo } = userFormSlice.actions;

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    userForm: userFormSlice.reducer, // Add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware, packageApi.middleware),
});
