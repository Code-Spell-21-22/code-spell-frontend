import { createSlice } from '@reduxjs/toolkit';
import {getLevels} from "../../utils/api/apihandler";

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
    getLevels(language, difficulty).then(data => {dispatch(updateLevels(data))});
}