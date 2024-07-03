import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://real-time-amazon-data.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_AMAZON_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
  },
});

export const productSearch = createAsyncThunk(
  "eCommerce/productSearch",
  async ({ 
    query, 
    page = "1", 
    country = "IN", 
    sortBy = "RELEVANCE", 
    condition = "ALL",
    limit = "100" // Added limit parameter
  }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { 
          query, 
          page, 
          country, 
          sort_by: sortBy, 
          product_condition: condition,
          limit // Include limit in the request
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categorySearch = createAsyncThunk(
  "eCommerce/categorySearch",
  async ({ 
    categoryId, 
    page = "1", 
    country = "IN", 
    sortBy = "RELEVANCE", 
    condition = "ALL",
    limit = "100" // Added limit parameter
  }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products-by-category", {
        params: { 
          category_id: categoryId, 
          page, 
          country, 
          sort_by: sortBy, 
          product_condition: condition,
          limit // Include limit in the request
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const offerProducts = createAsyncThunk(
  "eCommerce/offerProducts",
  async ({ asin, country = "IN", limit = "100", page = "1" }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product-offers", {
        params: { asin, country, limit, page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productDetailed = createAsyncThunk(
  "eCommerce/productDetailed",
  async ({ asin, country = "IN" }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product-details", {
        params: { asin, country },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eCommerceSlice = createSlice({
  name: "eCommerce",
  initialState: {
    searchResults: [],
    categoryResults: [],
    offerResults: [],
    productDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(productSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(categorySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categorySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryResults = action.payload;
      })
      .addCase(categorySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(offerProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(offerProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offerResults = action.payload;
      })
      .addCase(offerProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(productDetailed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productDetailed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(productDetailed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const eCommerceReducer = eCommerceSlice.reducer;