import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    productName: "",
    isLoading: false,
    isError: false
}

export const fetchProductName = createAsyncThunk("fetchProductName", async (productId) => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`)
    return response.json()
})

const productSlice = createSlice({
    name: "Product",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(fetchProductName.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchProductName.fulfilled, (state, action) => {
            state.isLoading = false
            state.productName = action.payload.title
        })
        builder.addCase(fetchProductName.rejected, (state, action) => {
            state.isError = true
        })
    }

})

export default productSlice.reducer