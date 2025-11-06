'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setLoading, setOrders, setSelectedOrder, setFilters } from '@/redux/slices/orders';
import OrderTable from '@/components/OrderTable';
import OrderDetailModal from '@/components/OrderDetailModal';
import OrderFilters from '@/components/OrderFilters';
import { ordersAPI } from '@/services/api';
import { exportToCSV } from '@/utils/csv';
import { toast } from 'sonner';

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selectedOrder, pagination, loading, filters } = useSelector((state: RootState) => state.orders);
  const [pageNum, setPageNum] = useState(1);

  const fetchOrders = async (filterParams: any = {}) => {
    dispatch(setLoading(true));
    try {
      const params = { page: pageNum, limit: 10, ...filters, ...filterParams };
      const response = await ordersAPI.getAll(params);
      dispatch(setOrders({ items: response.data.data, pagination: response.data.pagination }));
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to fetch orders');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pageNum]);

  const handleFiltersChange = (newFilters: any) => {
    dispatch(setFilters(newFilters));
    setPageNum(1);
    fetchOrders(newFilters);
  };

  const handleOrderSelect = (order: any) => {
    dispatch(setSelectedOrder(order));
  };

  const handleCancelOrder = async (id: number) => {
    try {
      await ordersAPI.cancel(id);
      toast.success('Order cancelled successfully');
      fetchOrders();
      dispatch(setSelectedOrder(null));
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to cancel order');
    }
  };

  const handleExport = () => {
    exportToCSV(items);
    toast.success('Orders exported to CSV');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Orders Dashboard</h1>

      <OrderFilters onFiltersChange={handleFiltersChange} onExport={handleExport} loading={loading} />

      <OrderTable orders={items} onSelectOrder={handleOrderSelect} loading={loading} />

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Showing <span className="font-semibold">{items.length}</span> of{' '}
          <span className="font-semibold">{pagination.total}</span> orders
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPageNum(Math.max(1, pageNum - 1))}
            disabled={pageNum === 1 || loading}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
          >
            Previous
          </button>
          {Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
            .slice(Math.max(0, pageNum - 2), Math.min(pagination.total_pages, pageNum + 1))
            .map(p => (
              <button
                key={p}
                onClick={() => setPageNum(p)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  p === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          <button
            onClick={() => setPageNum(Math.min(pagination.total_pages, pageNum + 1))}
            disabled={pageNum === pagination.total_pages || loading}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>

      <OrderDetailModal order={selectedOrder} onClose={() => dispatch(setSelectedOrder(null))} onCancel={handleCancelOrder} />
    </div>
  );
}