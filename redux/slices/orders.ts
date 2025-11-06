'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, PaginationInfo } from '@/types';

interface OrdersState {
  items: Order[];
  selectedOrder: Order | null;
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  filters: {
    status?: string;
    payment_status?: string;
    search?: string;
    date_from?: string;
    date_to?: string;
    min_amount?: number;
    max_amount?: number;
    sort_by?: string;
    sort_order?: string;
  };
}

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  pagination: { page: 1, limit: 10, total: 0, total_pages: 1 },
  loading: false,
  error: null,
  filters: { sort_by: 'created_at', sort_order: 'DESC' },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOrders: (state, action: PayloadAction<{ items: Order[]; pagination: PaginationInfo }>) => {
      state.items = action.payload.items;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetFilters: (state) => {
      state.filters = { sort_by: 'created_at', sort_order: 'DESC' };
    },
  },
});

export const { setLoading, setOrders, setSelectedOrder, setFilters, setError, resetFilters } = ordersSlice.actions;
export default ordersSlice.reducer;