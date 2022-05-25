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

export const selectLevels = (state) => state.levels;

export const { updateLevels } = LevelsSlice.actions;

export default LevelsSlice.reducer;

export const fetchLevels = (language, difficulty, chapter) => async dispatch => {
    // const response = await apiHandler.getLevels(language, difficulty, chapter);
    const response = [];
    dispatch(updateLevels(response));
}
