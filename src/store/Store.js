import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "../component/State/userAuthSlice";
import productsSlice from "../component/State/productsSlice";

export const store = configureStore({
    reducer: {
        users: userAuthSlice,
        products: productsSlice,
    }
});