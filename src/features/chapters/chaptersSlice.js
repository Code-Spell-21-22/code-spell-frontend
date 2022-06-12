import { createSlice } from '@reduxjs/toolkit';
import {getChapter} from "../../utils/api/apihandler";

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

export const selectChapters = (state) => state.chapters.chapters;

export const { updateChapters } = ChaptersSlice.actions;

export default ChaptersSlice.reducer;

export const fetchChapters = (language, difficulty) => async dispatch => {
    getChapter(language, difficulty).then(res => {
        dispatch(updateChapters(res.data))
    });
}