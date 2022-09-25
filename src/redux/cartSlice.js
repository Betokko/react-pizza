import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      findItem ? findItem.count++ : state.items.push({...action.payload, count: 1})
      state.totalPrice = state.items
        .reduce((acc, item) => acc + (item.price * item.count), 0)
    }
    ,
    removeItem(state, action) {
      state.items.filter(item => item.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
    },
    plusItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem) findItem.count++ 
    },    
    minusItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem) findItem.count-- 
    },
  }, 
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;
