import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
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
    },
    filterByArea: (state, action) => {
      state.shopData = initialState.shopData.filter(shop => {
        return shop.area === action.payload;
      });
    },
    filterByCategory: (state, action) => {
      state.shopData = initialState.shopData.filter(shop => {
        return shop.category === action.payload;
      })
    },
    filterByStatus: (state, action) => {
      const todayDate = moment(new Date());

      if (action.payload === "open") {
        state.shopData = initialState.shopData.filter(shop => {
          const openingDate = moment(new Date(shop.openingDate));
          const closingDate = moment(new Date(shop.closingDate));

          return todayDate.isBetween(openingDate, closingDate);
        });
      } else if (action.payload === "close") {
        state.shopData = initialState.shopData.filter(shop => {
          const openingDate = moment(new Date(shop.openingDate));
          const closingDate = moment(new Date(shop.closingDate));

          return !todayDate.isBetween(openingDate, closingDate);
        });
      }
    },
    clearFilter: (state, action) => {
      state.shopData = initialState.shopData;
    }
  }
});

export const {
  addShop,
  deleteShop,
  updateShop,
  addNewArea,
  addNewCategory,
  filterByArea,
  filterByCategory,
  filterByStatus,
  clearFilter,
} = shopListSlice.actions;

// shopList Selector
export const selectShopList = (state) => state;

export default shopListSlice.reducer;
