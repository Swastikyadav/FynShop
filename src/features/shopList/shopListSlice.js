import { createSlice } from '@reduxjs/toolkit';
import { shopData, areaDropdownOptions, categoryDropdownOptions } from '../../utils/data';

const initialState = { shopData, areaDropdownOptions, categoryDropdownOptions };

export const shopListSlice = createSlice({
  name: 'shopList',
  initialState,

  reducers: {
    addShop: (state, action) => {
      state.shopData.push(action.payload);
    },
    addNewArea: (state, action) => {
      state.areaDropdownOptions.push(action.payload);
    },
    addNewCategory: (state, action) => {
      state.categoryDropdownOptions.push(action.payload);
    }
  }
});

export const { addShop, addNewArea, addNewCategory } = shopListSlice.actions;

// shopList Selector
export const selectShopList = (state) => state;

export default shopListSlice.reducer;
