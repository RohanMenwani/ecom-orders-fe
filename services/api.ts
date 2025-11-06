'use client';

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Orders API
export const ordersAPI = {
  getAll: (params: any) => api.get('/orders', { params }),
  getById: (id: number) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  cancel: (id: number, reason?: string) => api.post(`/orders/${id}/cancel`, { reason }),
  updateStatus: (id: number, status: string) => api.put(`/orders/${id}/status`, { status }),
};

// Products API
export const productsAPI = {
  getAll: (isActive?: boolean) => {
    let url = '/products';
    if (isActive !== undefined) {
      url += `?active=${isActive}`;
    }
    return api.get(url);
  },
  getById: (id: number) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
};

export default api;