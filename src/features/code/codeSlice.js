import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    id: '',
    analysisStatus: '',
    executionStatus: '',
    steps: null,
    score: 0,
    output: '',
    errors: [],
}

/*
const example = {"id":"e88fbfb9-c177-4ea3-85f6-811af1864074",
    "analysisStatus":"SUCCESS",
    "executionStatus":"SUCCESS",
    "steps":[{"id":1,"successful":true,"args":null},{"id":2,"successful":true,"args":null},{"id":3,"successful":true,"args":["SGVsbG8gV29ybGQh"]}],
    "score":0,
    "output":["Hello World!"],
    "errors":null}

   const example2 = {"id":"a937a625-21d5-46a5-bb59-6d9a856b2fc2",
    "analysisStatus":"COMPILATION_ERROR",
    "executionStatus":null,
    "steps":null,
    "score":0,
    "output":null,
    "errors":["Error on Line 54 in /code-spell-code-executor/src/main/java/pt/ua/deti/codespell/chapters/chapter_1/Level_1.java","Caused by: cannot find symbol","  symbol:   class voi","  location: class pt.ua.deti.codespell.chapters.chapter_1.HelloWorldApp"]}
 */

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
export const selectScore = (state) => state.code.score;
export const selectOutput = (state) => state.code.output;
export const selectErrors = (state) => state.code.errors;

export const { updateId, updateAnalysisStatus, updateExecutionStatus, updateSteps, updateScore, updateErrors, updateOutput } = CodeSlice.actions;

export default CodeSlice.reducer;