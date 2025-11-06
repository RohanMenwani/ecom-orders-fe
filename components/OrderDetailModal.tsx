'use client';

import { useState } from 'react';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { X } from 'lucide-react';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onCancel?: (id: number) => void;
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

export default function OrderDetailModal({ order, onClose, onCancel }: OrderDetailModalProps) {
  const [cancelReason, setCancelReason] = useState('');

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Order {order.order_number}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-semibold text-gray-900">{order.customer_name}</p>
              <p className="text-sm text-gray-600">{order.customer_email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">${parseFloat(String(order.total_amount)).toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Payment Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${paymentColors[order.payment_status]}`}>
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Product</th>
                      <th className="px-4 py-2 text-left font-semibold">Qty</th>
                      <th className="px-4 py-2 text-right font-semibold">Price</th>
                      <th className="px-4 py-2 text-right font-semibold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">
                          <div className="font-medium">{item.product_name}</div>
                          <div className="text-xs text-gray-600">{item.product_sku}</div>
                        </td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">${parseFloat(String(item.unit_price)).toFixed(2)}</td>
                        <td className="px-4 py-2 text-right font-semibold">${parseFloat(String(item.subtotal)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Audit Trail */}
          {order.audit_logs && order.audit_logs.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Audit Trail</h3>
              <div className="space-y-2">
                {order.audit_logs.map(log => (
                  <div key={log.id} className="border border-gray-200 rounded-lg p-3 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900 capitalize">{log.action}</span>
                      <span className="text-gray-600">{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                    {log.old_value && <div className="text-gray-600">From: {log.old_value}</div>}
                    {log.new_value && <div className="text-gray-600">To: {log.new_value}</div>}
                    <div className="text-xs text-gray-500 mt-1">By: {log.changed_by || 'System'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t pt-6 flex gap-2 justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400">
              Close
            </button>
            {order.status !== 'cancelled' && order.status !== 'delivered' && onCancel && (
              <button
                onClick={() => onCancel(order.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}