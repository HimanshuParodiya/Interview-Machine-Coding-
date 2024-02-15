import React from "react";
import "./App.css";
import CheckoutStepper from "./Components/CheckoutStepper";
import CustomerInfo from "./Components/CustomerInfo";
import ShippingInfo from "./Components/ShippingInfo";
import Payment from "./Components/Payment";
import SummaryPage from "./Components/SummaryPage";
import { useDispatch, useSelector } from "react-redux";
import { goToBackStep } from "./store/slices/StepSlice";

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
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state) => state.steps);
  const handleGoBack = () => {
    if (currentStep != 1) {
      dispatch(goToBackStep());
    }
  };
  return (
    <div>
      <p
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={handleGoBack}
      >
        &#8592; Go back
      </p>

      <h2>Checkout</h2>
      <CheckoutStepper stepsConfigs={CHECKOUT_STEPS} />
    </div>
  );
};

export default App;
