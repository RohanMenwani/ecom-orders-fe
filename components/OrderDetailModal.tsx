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
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Order {order.order_number}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-1">Customer</p>
              <p className="font-bold text-gray-900 text-lg">{order.customer_name}</p>
              <p className="text-sm font-medium text-gray-800">{order.customer_email}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">${parseFloat(String(order.total_amount)).toFixed(2)}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-1">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-1">Payment Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${paymentColors[order.payment_status]}`}>
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">Items</h3>
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-gray-900">Product</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-900">Qty</th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">Price</th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-bold text-gray-900">{item.product_name}</div>
                          <div className="text-xs font-medium text-gray-700 mt-1">{item.product_sku}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">${parseFloat(String(item.unit_price)).toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900 text-lg">${parseFloat(String(item.subtotal)).toFixed(2)}</td>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">Audit Trail</h3>
              <div className="space-y-3">
                {order.audit_logs.map(log => (
                  <div key={log.id} className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900 capitalize text-base">{log.action}</span>
                      <span className="text-sm font-medium text-gray-800">{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                    {log.old_value && <div className="text-gray-800 font-medium text-sm mb-1">From: <span className="font-bold text-gray-900">{log.old_value}</span></div>}
                    {log.new_value && <div className="text-gray-800 font-medium text-sm mb-1">To: <span className="font-bold text-gray-900">{log.new_value}</span></div>}
                    <div className="text-xs font-medium text-gray-700 mt-2">By: {log.changed_by || 'System'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t-2 border-gray-300 pt-6 flex gap-2 justify-end">
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition shadow-md"
            >
              Close
            </button>
            {order.status !== 'cancelled' && order.status !== 'delivered' && onCancel && (
              <button
                onClick={() => onCancel(order.id)}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md"
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