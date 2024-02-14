import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentStep: 1,
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
    }
})

export const { goToNextStep } = stepSlice.actions
export default stepSlice.reducer