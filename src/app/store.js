import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import chaptersReducer from '../features/chapters/chaptersSlice';
import levelsReducer from '../features/levels/levelsSlice';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        chapters: chaptersReducer,
        levels: levelsReducer
    },
});
