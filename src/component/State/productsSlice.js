import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: true,
        loadProduct: true,
        products: [],
        updateProduct: null
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = false;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
            console.log('productSlice', action.payload);
        },
        setUpdateProduct: (state, action) => {
            state.updateProduct = action.payload;
        },
        loadProduct: (state, action) => {
            state.loadProduct = action.payload;
        },
    }
});

export const { setProducts, setLoading, loadProduct, setUpdateProduct } = productSlice.actions;
export default productSlice.reducer;