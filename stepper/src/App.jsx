import React from "react";
import "./App.css";
import CheckoutStepper from "./Components/CheckoutStepper";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete Your Payment</div>,
  },
  {
    name: "Delivered",
    Component: () => <div>Confirm That Your order has been delivered</div>,
  },
];

const App = () => {
  return (
    <div>
      <h2>Checkout</h2>
      <CheckoutStepper stepsConfigs={CHECKOUT_STEPS} />
    </div>
  );
};

export default App;
