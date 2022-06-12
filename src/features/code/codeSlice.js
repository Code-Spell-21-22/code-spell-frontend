import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    id: '',
    analysisStatus: '',
    executionStatus: '',
    steps: null,
    tips: [],
    score: 0,
    output: '',
    errors: [],
}

export const CodeSlice = createSlice({
    name: 'code',
    initialState: initialState,
    reducers: {
        updateId: (state, action) => {
            state.id = action.payload;
        },
        updateAnalysisStatus: (state, action) => {
            state.analysisStatus = action.payload;
        },
        updateExecutionStatus: (state, action) => {
            state.executionStatus = action.payload;
        },
        updateSteps: (state, action) => {
            state.steps = action.payload;
        },
        updateTips: (state, action) => {
            state.tips = action.payload;
        },
        updateScore: (state, action) => {
            state.score = action.payload;
        },
        updateOutput: (state, action) => {
            state.output = action.payload;
        },
        updateErrors: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export const selectId = (state) => state.code.id;
export const selectAnalysisStatus = (state) => state.code.analysisStatus;
export const selectExecutionStatus = (state) => state.code.executionStatus;
export const selectSteps = (state) => state.code.steps;
export const selectTips = (state) => state.code.tips;
export const selectScore = (state) => state.code.score;
export const selectOutput = (state) => state.code.output;
export const selectErrors = (state) => state.code.errors;

export const { updateId, updateAnalysisStatus, updateExecutionStatus, updateSteps, updateTips, updateScore, updateErrors, updateOutput } = CodeSlice.actions;

export default CodeSlice.reducer;