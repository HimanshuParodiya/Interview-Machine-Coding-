import React, { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ stepsConfigs = [] }) => {
  // stepsConfigs is an empty array by default
  const [currentStep, setCurrentStep] = useState(1);

  const [isComplete, setIsComplete] = useState(false);

  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  if (!stepsConfigs.length) {
    return <></>;
  }

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfigs.length - 1].offsetWidth / 2,
    });
    // console.log(stepRef.current[0].offsetWidth);
  }, [stepRef]);

  const handleNext = () => {
    // setCurrentStep((prev) => prev + 1);
    setCurrentStep((prev) => {
      if (prev === stepsConfigs.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfigs.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfigs[currentStep - 1].Component;
  return (
    <>
      <div className="stepper">
        {stepsConfigs.map((step, index) => (
          <div
            key={step.name}
            ref={(el) => (stepRef.current[index] = el)}
            className={`step ${
              currentStep > index + 1 || isComplete ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
          >
            <div className="step_number">
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step_name">{step.name}</div>
          </div>
        ))}

        <div
          className="progressBar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <div className="active_component">
        <ActiveComponent />
      </div>
      {!isComplete && (
        <div className="btn_container">
          <button className="btn" onClick={handleNext}>
            {currentStep === stepsConfigs.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </>
  );
};

export default CheckoutStepper;
