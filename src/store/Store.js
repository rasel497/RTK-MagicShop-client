import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "../component/State/userAuthSlice";
import productsSlice from "../component/State/productsSlice";
import cartSlice from "../component/State/cartSlice";

export const store = configureStore({
    reducer: {
        users: userAuthSlice,
        products: productsSlice,
        cart: cartSlice,
    }
});