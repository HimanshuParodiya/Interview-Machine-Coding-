// import React from "react";
// import "./SummaryPage.css";

// const SummaryPage = () => {
//   return (
//     <div>
//       fields status: reference id: user name: email: mobile: price: cardNumber:
//     </div>
//   );
// };

// export default SummaryPage;

import React, { useEffect, useState } from "react";
import "./SummaryPage.css";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";

const SummaryPage = () => {
  const { cardNumber, price } = useSelector((state) => state.payment);
  const generateReferenceId = () => {
    // You can use a more sophisticated method for generating reference IDs
    return `HP-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  };
  const hashedCardNumber = () => {
    const lastFourDigit = cardNumber.slice(15, 19);
    const stars = "************";
    return stars.concat(lastFourDigit);
  };

  const [referenceId] = useState(generateReferenceId());
  const [hashedCard] = useState(hashedCardNumber());
  const { userName, userEmail, userMobile, formSubmit } = useSelector(
    (state) => state.customer
  );

  const todayDate = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  // Format the date as per your requirement
  //   const deliveryDate =;
  //   console.log();
  const customId = "custom-id-not-render-more-than-one-tost";

  useEffect(() => {
    toast.success(`Congrats! We will deliver your product soon`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      toastId: customId,
    });
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <div className="summary-field">
        <span className="summary-label">Payment Status:</span>
        <span style={{ color: "#28a745" }}>Received</span>
      </div>

      <div className="summary-field">
        <span className="summary-label">Transaction ID:</span>
        <span>{referenceId}</span>
      </div>
      <div className="summary-field">
        <span className="summary-label">Transaction Date:</span>
        <span>{todayDate.toLocaleDateString()}</span>
      </div>
      <div className="summary-field">
        <span className="summary-label">Payment Amount:</span>
        <span>{price} USD</span>
      </div>

      <div className="summary-field">
        <span className="summary-label">User Name:</span>
        <span>{userName}</span>
      </div>

      <div className="summary-field">
        <span className="summary-label">User Email:</span>
        <span>{userEmail}</span>
      </div>

      <div className="summary-field">
        <span className="summary-label">User Mobile:</span>
        <span>{userMobile}</span>
      </div>

      {/* Add more fields as needed */}

      <div className="summary-field">
        <span className="summary-label">Card Number:</span>
        <span>{hashedCard}</span>
      </div>

      <hr />
      <div className="product-delivery-date">
        <span className="summary">"Product" Will deliver on </span>
        <span>{deliveryDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default SummaryPage;
