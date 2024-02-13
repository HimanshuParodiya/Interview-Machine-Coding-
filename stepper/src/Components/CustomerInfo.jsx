import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/slices/CustomerInfoSlice";
import { goToNextStep } from "../store/slices/StepSlice";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CustomerInfo.css"; // Import your CSS file

const CustomerInfo = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userLastName: "",
    userEmail: "",
    userMobile: undefined,
    formSubmit: false,
  });
  const { userName, userEmail, formSubmit } = useSelector(
    (state) => state.customer
  );
  // console.log(formSubmit);

  const { currentStep, isComplete, stepCount } = useSelector(
    (state) => state.steps
  );
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data in the local state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Dispatch the addData action with the form data
    toast.success("Customer details received successfully! Thank you!", {
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

    dispatch(addData(formData));
  };
  const handleNext = () => {
    // setCurrentStep((prev) => prev + 1);
    // console.log("yes", userName, userEmail);
    // dispatch(
    //   setCurrentStep((prev) => {
    //     if (prev === stepsConfigs.length - 1) {
    //       setIsComplete(true);
    //       return prev;
    //     } else {
    //       return prev + 1;
    //     }
    //   })
    // );

    // dispatch(goToNextStep({ stepsConfigs }));
    // let flag = true;
    // if (flag) {
    //   alert("Please fill the details");
    //   flag = false;
    // } else {
    //   if (stepCount < 3) {
    //     dispatch(goToNextStep({ stepIndex: currentStep + 1 }));
    //   }
    // }

    if (userName === "" || userEmail === "") {
      // alert("Please fill in all details");
    } else {
      if (stepCount < 3) {
        dispatch(goToNextStep({ stepIndex: currentStep + 1 }));
      }
    }
  };
  return (
    <div className="customer-info-container container">
      <ToastContainer />
      <h1 className="form-title">Provide your contact details</h1>
      <form onSubmit={handleFormSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            required
            type="text"
            onChange={handleInputChange}
            name="userName"
            id="userName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userLastName">Last name</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="userLastName"
            id="userLastName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userEmail">Email</label>
          <input
            required
            type="email"
            onChange={handleInputChange}
            name="userEmail"
            id="userEmail"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileContact">Mobile</label>
          <input
            required
            type="number"
            onChange={handleInputChange}
            name="mobileContact"
            id="mobileContact"
          />
        </div>
        <button type="submit" onClick={handleNext} className="submit-btn">
          {formSubmit ? "Next" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CustomerInfo;
