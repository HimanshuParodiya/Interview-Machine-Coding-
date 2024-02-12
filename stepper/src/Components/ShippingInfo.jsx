import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShippingData } from "../store/slices/ShippingInfoSlice";
import { goToNextStep } from "../store/slices/StepSlice";
import "./ShippingInfo.css"; // Import the CSS file

const ShippingInfo = () => {
  const [shippingFormData, setShippingFormData] = useState({
    address: "",
    city: "",
    pin: undefined,
  });
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.shipping);
  const { currentStep, isComplete, stepCount } = useSelector(
    (state) => state.steps
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addShippingData(shippingFormData));
  };
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleNext = () => {
    if (address == "") {
      // alert("Please fill in all details");
    } else {
      if (stepCount < 3) {
        dispatch(goToNextStep({ stepIndex: currentStep + 1 }));
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Enter your shipping address</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="shippingAddress">
            Shipping Address:
          </label>
          <input
            className="input"
            required
            onChange={handleShippingInfoChange}
            type="text"
            name="address"
            id="shippingAddress"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="city">
            City:
          </label>
          <input
            className="input"
            required
            onChange={handleShippingInfoChange}
            type="text"
            name="city"
            id="city"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="zipCode">
            Zip Code:
          </label>
          <input
            className="input"
            required
            onChange={handleShippingInfoChange}
            type="number"
            name="pin"
            id="zipCode"
          />
        </div>

        <button className="submit-btn" onClick={handleNext} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingInfo;
