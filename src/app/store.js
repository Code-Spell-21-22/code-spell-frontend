import {configureStore} from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import chaptersReducer from '../features/chapters/chaptersSlice';
import levelsReducer from '../features/levels/levelsSlice';
import progressReducer from "../features/progress/progressSlice";

// Redux Toolkit's configureStore API already adds the thunk middleware by default
export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        chapters: chaptersReducer,
        levels: levelsReducer,
        progress: progressReducer
    }
});

