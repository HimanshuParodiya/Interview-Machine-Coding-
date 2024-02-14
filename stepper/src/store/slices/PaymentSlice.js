import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cardNumber: 0,
    price: 0,
    formSubmit: false
}

const paymentSlice = createSlice({
    name: "Payment",
    initialState,
    reducers: {
        addPaymentData: (state, action) => {
            state.cardNumber = action.payload.cardNumber
            state.price = action.payload.price
            state.formSubmit = true
        },

    }
})

export const { addPaymentData, setFormSubmit } = paymentSlice.actions

export default paymentSlice.reducer