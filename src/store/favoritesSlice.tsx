import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Anime } from '../type/index';

interface FavoritesState {
  items: Anime[];
}

const initialState: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Anime>) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.mal_id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites?.items;
export default favoritesSlice.reducer;