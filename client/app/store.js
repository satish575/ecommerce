import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/userSlice";
import orderReducer from "../features/orderSlice";
export const store=configureStore({
      reducer:{
        categoryReducer,
        productReducer,
        cartReducer,
        userReducer,
        orderReducer
      }
})