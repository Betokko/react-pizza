import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
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
    
  },
});

export default filterSlice.reducer;
export const { setCategory, setSortId } = filterSlice.actions;
