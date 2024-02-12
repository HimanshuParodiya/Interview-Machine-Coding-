import React from "react";
import "./CustomerInfo.css"; // Import your CSS file

const CustomerInfo = () => {
  return (
    <div className="customer-info-container">
      <h1 className="form-title">Provide your contact details</h1>
      <form className="user-form">
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input required type="text" name="userName" id="userName" />
        </div>

        <div className="form-group">
          <label htmlFor="userLastName">Last name</label>
          <input type="text" name="userLastName" id="userLastName" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input required type="email" name="email" id="email" />
        </div>

        <div className="form-group">
          <label htmlFor="mobileContact">Mobile</label>
          <input
            required
            type="number"
            name="mobileContact"
            id="mobileContact"
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerInfo;
