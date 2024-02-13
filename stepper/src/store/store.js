// store.js
import { configureStore } from '@reduxjs/toolkit';
import CustomerInfoSlice from './slices/CustomerInfoSlice';
import stepSlice from './slices/StepSlice';
import shippingInfoSlice from './slices/ShippingInfoSlice';
import paymentSlice from './slices/PaymentSlice';


const store = configureStore({
    reducer: {
        customer: CustomerInfoSlice,
        steps: stepSlice,
        shipping: shippingInfoSlice,
        payment: paymentSlice
    },
    // other configurations if needed
});

export default store;
