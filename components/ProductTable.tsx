'use client';

import { Product } from '@/types';
import { Edit2, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function ProductTable({ products, onEdit, onDelete, loading }: ProductTableProps) {
  if (loading) {
    return <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">No products found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">SKU</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{product.sku}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  {product.description && <div className="text-xs text-gray-500 truncate">{product.description}</div>}
                </td>
                <td className="px-6 py-4 text-gray-600">{product.category || '-'}</td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">${parseFloat(String(product.price)).toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`${product.stock_quantity > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}`}>
                    {product.stock_quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-900">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => confirm('Delete this product?') && onDelete(product.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
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