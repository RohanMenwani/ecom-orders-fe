'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filterActive?: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilterActive: (state, action: PayloadAction<boolean | undefined>) => {
      state.filterActive = action.payload;
    },
  },
});

export const { setLoading, setProducts, addProduct, updateProduct, deleteProduct, setError, setFilterActive } = productsSlice.actions;
export default productsSlice.reducer;