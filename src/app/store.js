import { configureStore } from '@reduxjs/toolkit';
import shopListReducer from '../features/shopList/shopListSlice';

export const store = configureStore({
  reducer: {
    shopList: shopListReducer,
  },
});
