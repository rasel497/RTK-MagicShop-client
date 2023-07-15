import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: [],
        cartQuantity: 0,
        cartTotalAmount: 0
    },

    reducers: {
        // setAddToCart: (state, action) => {
        //     state.cartItem = (action.payload);
        // }
        setAddToCart: (state, action) => {
            console.log('KLL', action.payload);
            const iteamIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
            if (iteamIndex >= 0) {
                state.cartItem[iteamIndex].cartQuantity += 1;
                toast.info(`increased ${state.cartItem[iteamIndex].productName} quantity`, {
                    position: "bottom-center",
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItem.push(tempProduct);
                toast.success(`${action.payload.productName} added to cart`, {
                    position: "bottom-center",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
        }
    }
});

export const { setAddToCart } = cartSlice.actions;
export default cartSlice.reducer;