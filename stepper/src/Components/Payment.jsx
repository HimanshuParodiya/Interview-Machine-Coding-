import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentData } from "../store/slices/PaymentSlice";
import { goToNextStep } from "../store/slices/StepSlice";

const Payment = () => {
  const [price, setPrice] = useState(null);
  const [otpCode, setOtpCode] = useState(null);

  const [formData, setFormData] = useState({
    cardNumber: 0,
    price: 0,
    otpCode: null,
  });
  const { currentStep, isComplete, stepCount } = useSelector(
    (state) => state.steps
  );

  const { cardNumber } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const generatePrice = () => {
    let generatedPrice = Math.floor(Math.random() * (500 - 100) + 100);
    setPrice(generatedPrice);
  };

  const generateOTP = () => {
    let otp = "";
    for (let i = 0; i < 5; i++) {
      let eachNumber = Math.floor(Math.random() * 9);
      otp += eachNumber;
    }
    setOtpCode(otp);
  };
  const customId = "custom-id-not-render-more-than-one-tost";
  const generateTostForOTP = () => {
    toast.success(`Your one time OTP is ${otpCode}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      toastId: customId,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: +value }));
  };

  const handleSubmit = (e) => {
    // if (condition) {
    e.preventDefault();
    // }
    dispatch(addPaymentData(formData));
  };

  const handleNext = () => {
    if (cardNumber == 0) {
      // alert("Please fill in all details");
    } else {
      if (stepCount < 3) {
        dispatch(goToNextStep({ stepIndex: currentStep + 1 }));
      }
    }
  };

  //   console.log(otpCode);

  useEffect(() => {
    generateOTP();
    generatePrice();
  }, []);

  //   useEffect(() => {}, []);
  return (
    <>
      <ToastContainer />
      <div className="payment-price-container">
        Payment of <span className="payment-price">{price}</span> USD
      </div>
      <div className="payment-container">
        <h1 className="payment-title">Payment Details</h1>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="input-field"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className="input-field"
              placeholder="MM/YYYY"
              maxLength={7}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              className="input-field"
              placeholder="123"
              maxLength={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="input-field"
              placeholder="Enter amount"
              onChange={handleChange}
              required
            />
          </div>

          <button
            onClick={generateTostForOTP}
            type="button"
            className="otp-btn"
          >
            Get OTP
          </button>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otpCode"
              className="input-field"
              placeholder="Enter OTP"
              onChange={handleChange}
              pattern="[0-9]*"
              maxLength={5}
              required
            />
          </div>
          <button type="submit" onClick={handleNext} className="submit-btn">
            Make Payment
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
