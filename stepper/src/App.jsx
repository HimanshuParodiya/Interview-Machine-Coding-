import React from "react";
import "./App.css";
import CheckoutStepper from "./Components/CheckoutStepper";
import CustomerInfo from "./Components/CustomerInfo";
import ShippingInfo from "./Components/ShippingInfo";
import Payment from "./Components/Payment";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <CustomerInfo />,
  },
  {
    name: "Shipping Info",
    Component: () => <ShippingInfo />,
  },
  {
    name: "Payment",
    Component: () => <Payment />,
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
