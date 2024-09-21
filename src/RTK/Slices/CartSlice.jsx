import { createSlice } from '@reduxjs/toolkit';

// الحصول على userId من localStorage
const userId = localStorage.getItem('userId');

// تعيين الحالة الأولية بناءً على بيانات المستخدم الحالي
const initialState = {
  items: JSON.parse(localStorage.getItem(`cart_${userId}`)) || [],
  count: JSON.parse(localStorage.getItem(`cart_${userId}`))?.length || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      state.count = state.items.length;

      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload._id);
      state.count = state.items.length;

      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      state.count = 0;
      // حذف بيانات السلة بناءً على userId
      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
