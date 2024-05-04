import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import dashboardSlice from "./slices/dashboardSlice";

//create a store and give it reducers
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    dashboard : dashboardSlice,
  },
  devTools : true,
});
