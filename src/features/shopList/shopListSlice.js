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
    deleteShop: (state, action) => {
      state.shopData = state.shopData.filter(shop => {
        return shop.id !== action.payload;
      });
    },
    updateShop: (state, action) => {
      state.shopData = state.shopData.map(shop => {
        if (shop.id === action.payload.id) {
          return action.payload;
        }

        return shop;
      });
    },
    addNewArea: (state, action) => {
      state.areaDropdownOptions.push(action.payload);
    },
    addNewCategory: (state, action) => {
      state.categoryDropdownOptions.push(action.payload);
    }
  }
});

export const {
  addShop,
  deleteShop,
  updateShop,
  addNewArea,
  addNewCategory
} = shopListSlice.actions;

// shopList Selector
export const selectShopList = (state) => state;

export default shopListSlice.reducer;
