/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { eCommerceReducer } from "./slice";

const store = configureStore({
  reducer: {
    eCommerce: eCommerceReducer,  
  },
});

export default store;
