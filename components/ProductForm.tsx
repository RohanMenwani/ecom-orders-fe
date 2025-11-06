'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(product || {});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: value ? parseFloat(value) : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        price: formData.price ? parseFloat(String(formData.price)) : 0,
        stock_quantity: formData.stock_quantity ? parseInt(String(formData.stock_quantity)) : 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder-gray-600";
  const selectClass = "px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name *"
          value={formData.name || ''}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU *"
          value={formData.sku || ''}
          onChange={handleChange}
          required
          disabled={!!product}
          className={`${inputClass} disabled:bg-gray-100 disabled:cursor-not-allowed`}
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description || ''}
        onChange={handleChange}
        rows={3}
        className={`w-full ${inputClass} resize-none`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          name="price"
          placeholder="Price *"
          value={formData.price || 0}
          onChange={handleChange}
          step="0.01"
          required
          className={inputClass}
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={formData.stock_quantity || 0}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category || ''}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active || false}
          onChange={handleChange}
          className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer"
        />
        <span className="text-gray-900 font-medium">Active</span>
      </label>

      <div className="flex gap-2 pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition"
        >
          {loading ? 'Saving...' : product ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-medium transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}