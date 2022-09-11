import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload
    },
    setSortId(state, action) {
      state.sort = action.payload
    },
    setCurrenPage(state, action) {
      state.currentPage = action.payload
    }
  },
});

export default filterSlice.reducer;
export const { setCategory, setSortId, setCurrenPage } = filterSlice.actions;
