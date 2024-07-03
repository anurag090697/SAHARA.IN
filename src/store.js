/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { eCommerceReducer } from "./slice";

const store = configureStore({
  reducer: {
    eCommerceReducer: eCommerceReducer,
  },
});

export default store;
