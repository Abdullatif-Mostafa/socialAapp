import { createSlice } from '@reduxjs/toolkit';

const userId = localStorage.getItem('userId'); // يجب أن يكون userId محفوظ في localStorage عند تسجيل الدخول
const initialState = {
  items: JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [],
  count: JSON.parse(localStorage.getItem(`favorites_${userId}`))?.length || 0,
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.items.push(action.payload);
      state.count = state.items.length;

      // احفظ البيانات في localStorage بناءً على userId
      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(state.items));
      }
    },
    removeFromFavorites(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload._id);
      state.count = state.items.length;

      // احفظ البيانات في localStorage بناءً على userId
      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(state.items));
      }
    },
    clearFavorites(state) {
      state.items = [];
      state.count = 0;

      // احذف المفضلات بناءً على userId
      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.removeItem(`favorites_${userId}`);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
