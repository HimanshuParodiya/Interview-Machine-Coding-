import React, { useState } from "react";
import "./CustomerInfo.css"; // Import your CSS file
import { addData } from "../store/slices/CustomerInfoSlice";
import { useDispatch } from "react-redux";

const CustomerInfo = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userLastName: "",
    userEmail: "",
    userMobile: undefined,
  });
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
    dispatch(addData(formData));
  };
  return (
    <div className="customer-info-container">
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
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            onChange={handleInputChange}
            name="email"
            id="email"
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
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerInfo;
