import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearch} = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.searchQuery;

export default searchSlice.reducer;
