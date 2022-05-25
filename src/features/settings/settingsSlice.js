import { createSlice } from '@reduxjs/toolkit';

// Default values
const initialState = {
    language: undefined,
    difficulty: undefined
};

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {

        updateLanguage: (state, action) => {
            state.language = action.payload;
        },

        updateDifficulty(state, action) {
            state.difficulty = action.payload;
        }
    }
})

export const selectLanguage = (state) => state.language.value;
export const selectDifficulty = (state) => state.difficulty.value;

export const { updateLanguage, updateDifficulty } = SettingsSlice.actions;

export default SettingsSlice.reducer;

export const fetchLanguage = () => async dispatch => {
    // const response = await apiHandler.getLanguage();
    const response = [];
    dispatch(updateLanguage(response));
}

export const fetchDifficulty = () => async dispatch => {
    // const response = await apiHandler.getDifficulty();
    const response = [];
    dispatch(updateDifficulty(response));
}