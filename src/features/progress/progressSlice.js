import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    progress: {}
};

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        updateProgress: (state, action) => {
            state.progress = action.payload;
        }
    }
});

export const selectProgress = state => state.progress.progress;

export const { updateProgress } = progressSlice.actions;

export default progressSlice.reducer;

export const fetchProgress = (language, difficulty) => async dispatch => {
    // const data = await apiHandler.getProgress();
    const data = {Completed: 12, NotCompleted: 8};
    dispatch(updateProgress(data));
};





