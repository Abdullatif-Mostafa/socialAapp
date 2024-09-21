// ProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching products
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page = 1) => {
  const response = await fetch(`https://tarmeezacademy.com/api/v1/posts?limit=10&page=${page}`);
  const data = await response.json();
  console.log("Fetched data for page", page, ":", data.data);
  return { posts: data.data, hasMore: data.data.length > 0 }; // return posts and check if there are more posts to load
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [], // Store the posts here
    status: 'idle',
    error: null,
    hasMore: true, // Keep track if there are more posts to load
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Append new posts to the existing list
        state.items = [...state.items, ...action.payload.posts];
        // Update whether there are more posts to load
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
