import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    progress: []
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

export const selectProgress = state => state.progress;

export const { updateProgress } = progressSlice.actions;

export default progressSlice.reducer;

export const fetchProgress = () => async dispatch => {
    // const response = await apiHandler.getProgress();
    const response = [];
    dispatch(updateProgress(response));
};





