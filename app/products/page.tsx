'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setLoading, setProducts, addProduct, updateProduct, deleteProduct, setFilterActive } from '@/redux/slices/products';
import ProductTable from '@/components/ProductTable';
import ProductForm from '@/components/ProductForm';
import { productsAPI } from '@/services/api';
import { toast } from 'sonner';

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, filterActive } = useSelector((state: RootState) => state.products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await productsAPI.getAll(filterActive);
      dispatch(setProducts(response.data.data));
    } catch (error: any) {
      toast.error('Failed to fetch products');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterActive]);

  const handleSubmit = async (data: any) => {
    try {
      if (editingProduct) {
        const response = await productsAPI.update((editingProduct as any).id, data);
        dispatch(updateProduct(response.data.data));
        toast.success('Product updated');
      } else {
        const response = await productsAPI.create(data);
        dispatch(addProduct(response.data.data));
        toast.success('Product created');
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await productsAPI.delete(id);
      dispatch(deleteProduct(id));
      toast.success('Product deleted');
    } catch (error: any) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <button onClick={() => { setEditingProduct(null); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          + Add Product
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => dispatch(setFilterActive(undefined))} className={`px-4 py-2 rounded-lg font-medium ${filterActive === undefined ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
          All
        </button>
        <button onClick={() => dispatch(setFilterActive(true))} className={`px-4 py-2 rounded-lg font-medium ${filterActive === true ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
          Active
        </button>
        <button onClick={() => dispatch(setFilterActive(false))} className={`px-4 py-2 rounded-lg font-medium ${filterActive === false ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
          Inactive
        </button>
      </div>

      {showForm ? (
        <ProductForm
          product={editingProduct as any}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
        />
      ) : (
        <ProductTable
          products={items}
          onEdit={(p) => { setEditingProduct(p); setShowForm(true); }}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
}