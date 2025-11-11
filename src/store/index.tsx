import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import favoritesReducer from './favoritesSlice';
import tabReducer from './tabSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    tab: tabReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
