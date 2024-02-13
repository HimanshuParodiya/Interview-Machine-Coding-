import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userLastName: "",
    userEmail: "",
    userMobile: undefined,
    formSubmit: false
}

const CustomerInfoSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        addData: (state, action) => {
            // Update properties of state
            state.userName = action.payload.userName;
            state.userLastName = action.payload.userLastName;
            state.userEmail = action.payload.userEmail;
            state.userMobile = action.payload.userMobile;
            state.formSubmit = true
        }
    }
})

export const { addData } = CustomerInfoSlice.actions

export default CustomerInfoSlice.reducer