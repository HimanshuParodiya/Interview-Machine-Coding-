import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cardNumber: 0,
    price: 0,
    otpCode: null,
}

const paymentSlice = createSlice({
    name: "Payment",
    initialState,
    reducers: {
        addPaymentData: (state, action) => {
            state.cardNumber = action.payload.cardNumber
            state.price = action.payload.price
            state.otpCode = action.payload.otpCode
        }
    }
})

export const { addPaymentData } = paymentSlice.actions

export default paymentSlice.reducer