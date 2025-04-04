import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import PostSlice from "./Slices/PostSlice";
const store = configureStore({
  reducer: {
    posts:PostSlice,
    auth: authReducer,
  },
 });
export default store;