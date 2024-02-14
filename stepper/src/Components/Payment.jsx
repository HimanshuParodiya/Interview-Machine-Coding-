import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentData } from "../store/slices/PaymentSlice";
import { goToNextStep } from "../store/slices/StepSlice";
import Confetti from "react-confetti";

const Payment = () => {
  const [price, setPrice] = useState(null);
  const [otpCode, setOtpCode] = useState(null);
  const [otpCodeFiled, setOtpCodeFiled] = useState(null);
  const [dateFiled, setDateFiled] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  //   const [priceField, setPriceField] = useState(null);
  //   console.log( price);
  //   console.log(priceField);

  const [formData, setFormData] = useState({
    cardNumber: "",
    price,
  });
  const { currentStep, isComplete, stepCount } = useSelector(
    (state) => state.steps
  );

  const { cardNumber, formSubmit } = useSelector((state) => state.payment);
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

  const handleOtpChange = (e) => {
    e.preventDefault();
    setOtpCodeFiled(e.target.value);
  };

  //   const handlePriceChange = (e) => {
  //     e.preventDefault();
  //     setPriceField(e.target.value);
  //   };
  const customId = "custom-id-not-render-more-than-one-tost";
  const tostConfig = {
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
  };

  const generateTostForOTP = () => {
    toast.success(`Your one time OTP is ${otpCode}`, tostConfig);
  };
  const handleCardChange = (e) => {
    const { name, value } = e.target;

    // Remove non-numeric characters and format the value with spaces
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };
  const handleExpiryChange = (e) => {
    const { value } = e.target;

    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Format the value with '/'
    const formattedValue =
      numericValue.slice(0, 2) +
      (numericValue.length > 2 ? "/" : "") +
      numericValue.slice(2, 6);

    setDateFiled(formattedValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: +value }));
  };

  //   let congrats = false;

  const handleSubmit = (e) => {
    // if (condition) {
    e.preventDefault();
    // }

    if (otpCode == otpCodeFiled) {
      //   congrats = true;

      dispatch(addPaymentData(formData));
      toast.success(`We have collected your payment`, tostConfig);
      setShowCongrats(true);

      setTimeout(() => {
        setShowCongrats(false);
      }, 5000);
    }
  };

  const handleNext = () => {
    // if (price !== +priceField) {
    //   toast.error(`Amount does not match `, tostConfig);
    // }

    if (otpCode !== otpCodeFiled) {
      toast.error(`OTP does not match! `, {
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
    } else {
      if (cardNumber == 0) {
        // alert("Please fill in all details");
      } else {
        if (stepCount < 3) {
          dispatch(goToNextStep({ stepIndex: currentStep + 1 }));
        }
      }
    }
  };
  //   console.log(formSubmit);
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
              maxLength={19}
              value={formData.cardNumber == 0 ? "" : formData.cardNumber}
              onChange={(handleChange, handleCardChange)}
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
              onChange={handleExpiryChange}
              value={dateFiled}
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
              maxLength={4}
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
              //   onChange={(handleChange, handlePriceChange)}
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
              onChange={(handleChange, handleOtpChange)}
              pattern="[0-9]*"
              maxLength={5}
              required
              value={otpCodeFiled === null ? "" : otpCodeFiled}
            />
          </div>
          <button type="submit" onClick={handleNext} className="submit-btn">
            {formSubmit ? "Next" : "Make Payment"}
          </button>
          {showCongrats && (
            <Confetti
              width={window.innerWidth || 300}
              height={window.innerHeight || 300}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default Payment;
