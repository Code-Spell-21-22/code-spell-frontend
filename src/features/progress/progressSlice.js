import { createSlice } from '@reduxjs/toolkit';
import {getUserDetails} from "../../utils/api/apihandler";

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
    getUserDetails().then(data => {
        dispatch(updateProgress(data.progress));
    });
};





