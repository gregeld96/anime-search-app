import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  page: number;
  list: any[];
  hasNextPage: boolean; // Tambahkan state baru
}

const initialState: SearchState = {
  query: "",
  page: 1,
  list: [],
  hasNextPage: true, // Default true
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetList: (state) => {
      state.list = [];
      state.page = 1;
      state.hasNextPage = true; // Reset ke true
    },
    appendList: (state, action: PayloadAction<any>) => {
      if (action.payload.data && action.payload.pagination) {
        state.list = [...state.list, ...action.payload.data];
        state.hasNextPage = action.payload.pagination.has_next_page;
      } else {
        state.list = [...state.list, ...action.payload];
        state.hasNextPage = action.payload.length > 0; 
      }
    },
    nextPage: (state) => {
      state.page += 1;
    },
    setHasNextPage: (state, action: PayloadAction<boolean>) => {
      state.hasNextPage = action.payload;
    }
  }
});

export const { 
  setQuery, 
  resetList, 
  appendList, 
  nextPage, 
  setHasNextPage 
} = searchSlice.actions;

export const selectQuery = (state: { search: SearchState }) => state.search.query;
export const selectPage = (state: { search: SearchState }) => state.search.page;
export const selectList = (state: { search: SearchState }) => state.search.list;
export const selectHasNextPage = (state: { search: SearchState }) => state.search.hasNextPage;

export default searchSlice.reducer;