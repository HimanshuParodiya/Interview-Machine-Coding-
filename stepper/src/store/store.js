// store.js
import { configureStore } from '@reduxjs/toolkit';
import CustomerInfoSlice from './slices/CustomerInfoSlice';
import stepSlice from './slices/StepSlice';


const store = configureStore({
    reducer: {
        customer: CustomerInfoSlice,
        steps: stepSlice
    },
    // other configurations if needed
});

export default store;
