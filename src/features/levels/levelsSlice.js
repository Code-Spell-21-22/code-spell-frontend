import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    levels: []
}

export const LevelsSlice = createSlice({
   name: 'levels',
   initialState: initialState,
   reducers: {
       updateLevels: (state, action) => {
           state.levels = action.payload;
       }
   }
});

export const selectLevels = (state) => state.levels.levels;

export const { updateLevels } = LevelsSlice.actions;

export default LevelsSlice.reducer;

export const fetchLevels = (language, difficulty) => async dispatch => {
    // const data = await apiHandler.getLevels(language, difficulty);
    const data = [
        {
            "id": "628910f54829b52a921fabb5",
            "title": "Variables",
            "description": "Description about variables level.",
            "language": "JAVA",
            "skill": "NOVICE",
            "number": 1.1,
            "chapter": "89a2183ja126a712j"
        },
        {
            "id": "1",
            "title": "Objects",
            "description": "Description about Objects level.",
            "language": "JAVA",
            "skill": "NOVICE",
            "number": 2.1,
            "chapter": "89a2183ja126a71er2j"
        },
        {
            "id": "2",
            "title": "Classes",
            "description": "Description about Classes level.",
            "language": "JAVA",
            "skill": "NOVICE",
            "number": 2.2,
            "chapter": "89a2183ja126a71er2j"
        },
        {
            "id": "2",
            "title": "Interfaces",
            "description": "Description about Interfaces level.",
            "language": "JAVA",
            "skill": "NOVICE",
            "number": 3.1,
            "chapter": "8dfa2183ja126a71er2j"
        },
    ];
    dispatch(updateLevels(data));
}