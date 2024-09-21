import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import { usersSlice } from "./Slices/UsersSlice";
import OffersProductSlice from "./Slices/OffersProductSlice";
import CartSlice from "./Slices/CartSlice";
import FavoriteProductsSlice from "./Slices/FavoriteProducts-Slice";
import PostSlice from "./Slices/PostSlice";
const store = configureStore({
  reducer: {
    posts:PostSlice,
    cart:CartSlice,
    auth: authReducer,
    users:usersSlice.reducer,
    favoriteProducts:FavoriteProductsSlice,
    offerProducts:OffersProductSlice
  },
 });
export default store;