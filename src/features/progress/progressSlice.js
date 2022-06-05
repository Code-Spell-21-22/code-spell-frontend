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

export const fetchProgress = () => async dispatch => {
    // const data = await apiHandler.getProgress();
    const data = [{
        "language": "JAVA",
        "completed_levels": "8",
        "total_levels": "10",
        "percentage": 0.8
    },
    {
        "language": "PYTHON",
        "completed_levels": "2",
        "total_levels": "4",
        "percentage": 0.5
    },
    {
        "language": "JAVASCRIPT",
        "completed_levels": "0",
        "total_levels": "0",
        "percentage": 0
    },
    {
        "language": "C",
        "completed_levels": "0",
        "total_levels": "0",
        "percentage": 0
    }];
    dispatch(updateProgress(data));
};





