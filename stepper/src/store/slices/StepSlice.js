import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentStep: 3,
    isComplete: false,
    stepCount: 0,
}

const stepSlice = createSlice({
    name: "steps",
    initialState,
    reducers: {
        goToNextStep: (state, action) => {
            const { stepIndex } = action.payload;
            state.currentStep = stepIndex;
            state.isComplete = stepIndex === state.stepsConfigs?.length - 1;
            state.stepCount += 1;
        },
        goToBackStep: (state) => {
            state.currentStep -= 1
        }
    }
})

export const { goToNextStep, goToBackStep } = stepSlice.actions
export default stepSlice.reducer