import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    chapters: []
}

export const ChaptersSlice = createSlice({
    name: 'chapters',
    initialState: initialState,
    reducers: {
        updateChapters: (state, action) => {
            state.chapters = action.payload;
        }
    }
});

export const selectChapters = (state) => state.chapters;

export const { updateChapters } = ChaptersSlice.actions;

export default ChaptersSlice.reducer;

export const fetchChapters = (language, difficulty) => async dispatch => {
    // const response = await apiHandler.getChapters(language, difficulty);
    const response = [];
    dispatch(updateChapters(response));
}