'use client';

import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/orders';
import productsReducer from './slices/products';
import analyticsReducer from './slices/analytics';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;