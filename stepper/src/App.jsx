import React from "react";
import "./App.css";
import CheckoutStepper from "./Components/CheckoutStepper";
import CustomerInfo from "./Components/CustomerInfo";
import ShippingInfo from "./Components/ShippingInfo";
import Payment from "./Components/Payment";
import SummaryPage from "./Components/SummaryPage";

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
    name: "Status",
    Component: () => <SummaryPage />,
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
