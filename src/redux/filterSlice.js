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
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
    }
  }, 
});

export default filterSlice.reducer;
export const { setCategory, setSortId, setCurrenPage, setFilters } = filterSlice.actions;
