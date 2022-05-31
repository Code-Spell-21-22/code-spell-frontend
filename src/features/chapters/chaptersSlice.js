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

export const selectChapters = (state) => state.chapters.chapters;

export const { updateChapters } = ChaptersSlice.actions;

export default ChaptersSlice.reducer;

export const fetchChapters = (language, difficulty) => async dispatch => {
    // const data = await apiHandler.getChapters(language, difficulty);
    const data = [
        {
            "id": "89a2183ja126a712j",
            "title": "1. General Introduction",
            "description": "This chapter will provide a general introduction about the basic programming structures.",
            "language": "JAVA",
            "skill": "NOVICE"
        },
        {
            "id": "89a2183ja126a71er2j",
            "title": "2. Object-Oriented Programming Concepts",
            "description": "This chapter will discuss Object-Oriented Programming Concepts.",
            "language": "JAVA",
            "skill": "NOVICE"
        },
        {
            "id": "8dfa2183ja126a71er2j",
            "title": "3. Interfaces and Inheritance",
            "description": "This chapter will discuss Interfaces and Inheritance.",
            "language": "JAVA",
            "skill": "NOVICE"
        },
    ];
    dispatch(updateChapters(data));
}