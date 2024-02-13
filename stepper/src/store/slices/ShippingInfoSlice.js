import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    city: "",
    pin: undefined,
    formSubmit: false

}

const shippingInfoSlice = createSlice({
    name: "shippingInfo",
    initialState,
    reducers: {

        addShippingData: (state, action) => {
            state.address = action.payload.address
            state.city = action.payload.city
            state.pin = action.payload?.pin
            state.formSubmit = true

        }

    }
})

export const { addShippingData } = shippingInfoSlice.actions
export default shippingInfoSlice.reducer