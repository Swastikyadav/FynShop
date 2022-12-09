import { createSlice } from '@reduxjs/toolkit';
import shopData from '../../utils/data';

const initialState = shopData;

export const shopListSlice = createSlice({
  name: 'shopList',
  initialState,
});

export const { } = shopListSlice.actions;

// shopList Selector
export const selectShopList = (state) => state;

export default shopListSlice.reducer;
