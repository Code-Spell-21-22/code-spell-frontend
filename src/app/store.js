import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import chaptersReducer from '../features/chapters/chaptersSlice';
import levelsReducer from '../features/levels/levelsSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        chapters: chaptersReducer,
        levels: levelsReducer
    },
    middleware: applyMiddleware(thunk)
});

