import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShippingData } from "../store/slices/ShippingInfoSlice";
import { goToNextStep } from "../store/slices/StepSlice";
import "./ShippingInfo.css"; // Import the CSS file
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShippingInfo = () => {
  const [shippingFormData, setShippingFormData] = useState({
    address: "",
    city: "",
    pin: undefined,
  });
  const dispatch = useDispatch();
  const { address, formSubmit } = useSelector((state) => state.shipping);
  const { currentStep, isComplete, stepCount } = useSelector(
    (state) => state.steps
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.success("Shipping address received successfully! Thank you!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
      <ToastContainer />
      <h1 className="title">Enter your shipping address</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="shippingAddress">
            Shipping Address
          </label>
          <input
            className="input"
            required
            onChange={handleShippingInfoChange}
            type="text"
            name="address"
            id="shippingAddress"
            placeholder="Address"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="city">
            City
          </label>
          <input
            className="input"
            required
            onChange={handleShippingInfoChange}
            type="text"
            name="city"
            id="city"
            placeholder="city"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            className="input"
            required
            onChange={handleShippingInfoChange}
            type="number"
            name="pin"
            id="zipCode"
            maxLength={5}
            placeholder="ZipCode"
          />
        </div>

        <button className="submit-btn" onClick={handleNext} type="submit">
          {formSubmit ? "Next" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ShippingInfo;
