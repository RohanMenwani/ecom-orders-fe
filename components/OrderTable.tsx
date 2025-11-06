'use client';

import { Order, OrderStatus, PaymentStatus } from '@/types';

interface OrderTableProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  loading: boolean;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentColors: Record<PaymentStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-orange-100 text-orange-800',
};

export default function OrderTable({ orders, onSelectOrder, loading }: OrderTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center text-gray-500">Loading orders...</div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center text-gray-500">No orders found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Order</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Payment</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 cursor-pointer transition">
                <td className="px-6 py-4 font-medium text-gray-900">{order.order_number}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{order.customer_name}</div>
                  <div className="text-xs text-gray-500">{order.customer_email}</div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">${parseFloat(String(order.total_amount)).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColors[order.payment_status]}`}>
                    {order.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelectOrder(order)}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}