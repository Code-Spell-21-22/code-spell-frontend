import { createSlice } from '@reduxjs/toolkit';
import {getAllUserSolutions, getLevels, getUserDetails} from "../../utils/api/apihandler";

// Default values
const initialState = {
    username: "",
    email: "",
    password: "",
    progress: {}
};

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        },
        updatePassword: (state, action) => {
            state.password = action.payload;
        },
        updateProgress: (state, action) => {
            state.progress = action.payload;
        }
    }
});

export const selectUsername = state => state.userDetails.username;
export const selectEmail = state => state.userDetails.email;
export const selectPassword = state => state.userDetails.password;
export const selectProgress = state => state.userDetails.progress;

export const { updateUsername, updateEmail, updatePassword, updateProgress } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

export const fetchUserDetails = () => async dispatch => {
    if (localStorage.hasOwnProperty('user_email')) {
        let email = localStorage.getItem('user_email');
        getUserDetails(email).then(res => {
            dispatch(updateUsername(res.data.username));
            dispatch(updateEmail(res.data.email));
            dispatch(updatePassword(res.data.password));
        });
    }
};

export const fetchUserProgress = (language, difficulty) => async dispatch => {

    getLevels(language, difficulty).then(res => {
        const nLevels = res.data.length;

        getAllUserSolutions().then(res => {
            let progress = {'Completed': res.data.length, 'Total': nLevels};
            dispatch(updateProgress(progress));
        });
    });
}

