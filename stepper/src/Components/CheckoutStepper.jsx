import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/slices/CustomerInfoSlice";
import { goToNextStep } from "../store/slices/StepSlice";

const CheckoutStepper = ({ stepsConfigs = [] }) => {
  // stepsConfigs is an empty array by default

  const dispatch = useDispatch();

  const { currentStep, isComplete, stepCount } = useSelector(
    (state) => state.steps
  );

  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  if (!stepsConfigs.length) {
    return <></>;
  }

  console.log("Current step is ", currentStep);
  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfigs.length - 1].offsetWidth / 2,
    });
    // console.log(stepRef.current[0].offsetWidth);
  }, [stepRef]);

  // const handleNext = () => {
  //   // setCurrentStep((prev) => prev + 1);
  //   // console.log("yes", userName, userEmail);
  //   // dispatch(
  //   //   setCurrentStep((prev) => {
  //   //     if (prev === stepsConfigs.length - 1) {
  //   //       setIsComplete(true);
  //   //       return prev;
  //   //     } else {
  //   //       return prev + 1;
  //   //     }
  //   //   })
  //   // );

  //   // dispatch(goToNextStep({ stepsConfigs }));
  //   if (stepCount < 3) {
  //     dispatch(goToNextStep({ stepIndex: currentStep + 1 }));
  //   }
  // };

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
      {/* {!isComplete && (
        <div className="btn_container">
          <button
            className="btn"
            onClick={handleNext}
            disabled={userName == "" && userEmail == ""}
          >
            {currentStep === stepsConfigs.length ? "Finish" : "Next"}
          </button>
        </div>
      )} */}
    </>
  );
};

export default CheckoutStepper;
