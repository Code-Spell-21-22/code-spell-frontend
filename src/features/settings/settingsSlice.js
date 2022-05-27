import {createSlice} from '@reduxjs/toolkit';

// Default values
const initialState = {
    language: '',
    difficulty: ''
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

export const selectLanguage = (state) => state.settings.language;
export const selectDifficulty = (state) => state.settings.difficulty;

export const { updateLanguage, updateDifficulty } = SettingsSlice.actions;

export default SettingsSlice.reducer;

export const fetchLanguage = () => async (dispatch) => {
    // const data = await apiHandler.getLanguage();
    const data = 'Java';
    dispatch(updateLanguage(data));
}

export const fetchDifficulty = () => async (dispatch) => {
    // const data = await apiHandler.getDifficulty();
    const data = 'Novice';
    dispatch(updateDifficulty(data));
}