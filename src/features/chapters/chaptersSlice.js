import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    chapters: [{"id": "0", "title": "1. Introduction", "levels": [{"id": "0", "nLv": 1.1, "title": 'Hello World'}]},
        {"id": "1", "title": "2. Object-Oriented Programming Concepts", "levels":
                [{"id": "1", "nLv": 2.1, "title": 'Objects'}, {"id": "2", "nLv": 2.2, "title": 'Classes'}, {"id": "3", "nLv": 2.3, "title": 'Inheritance'},
                    {"id": "4", "nLv": 2.4, "title": 'More on Classes'}, {"id": "5", "nLv": 2.5, "title": 'Nested Classes'}]},
        {"id": "2", "title": "3. Annotations", "levels":
                [{"id": "6", "nLv": 3.1, "title": 'Basics'}, {"id": "7", "nLv": 3.2, "title": 'Predefined Annotation Types'}]},
        {"id": "3", "title": "4. Interfaces and Inheritance", "levels":
                [{"id": "8", "nLv": 4.1, "title": 'Defining an Interface'}, {"id": "9", "nLv": 4.2, "title": 'Implementing an Interface'}, {"id": "10", "nLv": 4.3, "title": 'Using an Interface as a Type'}]},
        {"id": "4", "title": "5. Numbers and Strings", "levels": []},
    ]
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
    // const response = await apiHandler.getChapters(language, difficulty);
    const response = [];
    dispatch(updateChapters(response));
}