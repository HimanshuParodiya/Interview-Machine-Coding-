// store.js
import { configureStore } from '@reduxjs/toolkit';
import CustomerInfoSlice from './slices/CustomerInfoSlice';


const store = configureStore({
    reducer: {
        customer: CustomerInfoSlice
    },
    // other configurations if needed
});

export default store;
