/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDatabase, ref, set, get, remove } from "firebase/database";
// import { db } from './firebase';

const API_BASE_URL = "https://real-time-amazon-data.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_AMAZON_API_KEY;

const db = getDatabase();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
  },
});

// export const fetchCart = createAsyncThunk(
//   'eCommerce/fetchCart',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const cartRef = ref(db, `carts/${userId}`);
//       const snapshot = await get(cartRef);
//       if (snapshot.exists()) {
//         return snapshot.val();
//       } else {
//         return [];
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updateCart = createAsyncThunk(
  "eCommerce/updateCart",
  async ({ userId, product, quantity }, { rejectWithValue }) => {
    try {
      const cartRef = ref(db, `carts/${userId}/${product.asin}`);
      if (cartRef) {
        await set(cartRef, { ...product, quantity });
        return { ...product, quantity };
      } else {
        await remove(cartRef);
        return { asin: product.asin, removed: true };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWishlist = createAsyncThunk(
  "eCommerce/updateWishlist",
  async ({ userId, product, isAdding }, { rejectWithValue }) => {
    try {
      const wishlistRef = ref(db, `wishlists/${userId}/${product.asin}`);
      if (isAdding) {
        await set(wishlistRef, product);
        return product;
      } else {
        await remove(wishlistRef);
        return { asin: product.asin, removed: true };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const productSearch = createAsyncThunk(
//   "eCommerce/productSearch",
//   async ({ query, page = "1", country = "IN", sortBy = "RELEVANCE", condition = "ALL" }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/search", {
//         params: { query, page, country, sort_by: sortBy, product_condition: condition },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const productSearch = createAsyncThunk(
  "eCommerce/productSearch",
  async (
    {
      query,
      page = "1",
      country = "IN",
      sortBy = "RELEVANCE",
      condition = "ALL",
      limit = "100", // Added limit parameter
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: {
          query,
          page,
          country,
          sort_by: sortBy,
          product_condition: condition,
          limit, // Include limit in the request
        },
      });
      // console.log(response.data);
      return response.data.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "eCommerce/fetchBestSellers",
  async (
    { type = "BEST_SELLERS", page = "1", country = "IN" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/best-sellers", {
        params: { type, page, country },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDealProducts = createAsyncThunk(
  "eCommerce/fetchDealProducts",
  async (
    { country = "IN", sort_by = "FEATURED", page = "1" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/deal-products", {
        params: { country, sort_by, page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeals = createAsyncThunk(
  "eCommerce/fetchDeals",
  async (
    {
      country = "IN",
      min_product_star_rating = "ALL",
      price_range = "ALL",
      discount_range = "ALL",
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/deals-v2", {
        params: {
          country,
          min_product_star_rating,
          price_range,
          discount_range,
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
  async (
    {
      categoryId,
      page = "1",
      country = "IN",
      sortBy = "RELEVANCE",
      condition = "ALL",
      limit = "100", // Added limit parameter
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/products-by-category", {
        params: {
          category_id: categoryId,
          page,
          country,
          sort_by: sortBy,
          product_condition: condition,
          limit, // Include limit in the request
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
  async (
    { asin, country = "IN", limit = "100", page = "1" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/product-offers", {
        params: { asin, country, limit, page },
      });
      return response.data.data.products;
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
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// export const productDetailed = createAsyncThunk(
//   'eCommerce/productDetailed',
//   async ({ asin, country = 'IN' }, { rejectWithValue }) => {
//     const options = {
//       method: 'GET',
//       url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
//       params: {
//         asin,
//         country
//       },
//       headers: {
//         'X-RapidAPI-Key': API_KEY,
//         'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const eCommerceSlice = createSlice({
  name: "eCommerce",
  initialState: {
    searchResults: [],
    categoryResults: [],
    offerResults: [],
    productDetails: null,
    // bestSellers: [],
    deals: [],
    dealProducts: [],
    cart: [],
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((ele) => ele.asin === item.asin);
      // if (item && item.length) {
      //   item.forEach((ele) => {
      //     state.cart.push(ele);
      //   });
      // } else
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // let disc =
        //   parseInt(item.product_original_price) - parseInt(item.product_price);
        const newItem = {
          asin: item.asin,
          title: item.product_title,
          price: item.product_price,
          original_price: item.product_original_price,
          // discount: disc,
          photo: item.product_photo,
          delivery: item.delivery,
          quantity: 1,
        };
        state.cart.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      const asin = action.payload;
      state.cart = state.cart.filter((item) => item.asin !== asin);
    },
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.wishlist.find((ele) => ele.asin === item.asin);
      // if (item && item.length) {
      //   item.forEach((ele) => {
      //     state.wishlist.push(ele);
      //   });
      // } else
      if (!exists) {
        const newItem = {
          asin: item.asin,
          title: item.product_title,
          price: item.product_price,
          original_price: item.product_original_price,
          photo: item.product_photo,
          delivery: item.delivery,
        };
        state.wishlist.push(newItem);
      } else {
        state.wishlist = state.wishlist.filter((ele) => ele.asin !== item.asin);
      }
    },
    clearCart: (state) => {
      state.cart = [];

      if (state.userId) {
        const cartRef = ref(db, `carts/${state.userId}`);
        set(cartRef, state.cart).catch((error) => {
          console.error("Error clearing cart in Firebase Realtime Database: ", error);
        });
      }
    },
  },
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
      })
      // .addCase(fetchBestSellers.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.bestSellers = action.payload;
      // })
      // .addCase(fetchBestSellers.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchBestSellers.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload;
      // })
      // .addCase(updateCart.fulfilled, (state, action) => {
      //   if (action.payload.removed) {
      //     state.cart = state.cart.filter(
      //       (item) => item.asin !== action.payload.asin
      //     );
      //   } else {
      //     const index = state.cart.findIndex(
      //       (item) => item.asin === action.payload.asin
      //     );
      //     if (index !== -1) {
      //       state.cart[index] = action.payload;
      //     } else {
      //       state.cart.push(action.payload);
      //     }
      //   }
      // })
      // .addCase(updateWishlist.fulfilled, (state, action) => {
      //   if (action.payload.removed) {
      //     state.wishlist = state.wishlist.filter(
      //       (item) => item.asin !== action.payload.asin
      //     );
      //   } else {
      //     const index = state.wishlist.findIndex(
      //       (item) => item.asin === action.payload.asin
      //     );
      //     if (index !== -1) {
      //       state.wishlist[index] = action.payload;
      //     } else {
      //       state.wishlist.push(action.payload);
      //     }
      //   }
      // })

      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchDealProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDealProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealProducts = action.payload;
      })
      .addCase(fetchDealProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, addToWishlist, clearCart } =
  eCommerceSlice.actions;

export const eCommerceReducer = eCommerceSlice.reducer;
