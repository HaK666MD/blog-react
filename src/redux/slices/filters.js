import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    page: 1,
    tab: 0,
  },
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { setTab, setPage } = filtersSlice.actions;
