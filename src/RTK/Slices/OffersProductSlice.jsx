import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchOffersProduct = createAsyncThunk('offers/fetchOffersProduct', async () => {
  const response = await fetch('http://localhost:4000/Products/offers');
  const data = await response.json();
  console.log("data ", data.data);
  return data;
});

const offersProductSlice = createSlice({
  name: "offers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOffersProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Directly set the array of items
        console.log("action.payload:", action.payload);
      })
      .addCase(fetchOffersProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default offersProductSlice.reducer;
export {fetchOffersProduct}
