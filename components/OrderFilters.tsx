'use client';

interface OrderFiltersProps {
  onFiltersChange: (filters: any) => void;
  onExport: () => void;
  loading: boolean;
}

export default function OrderFilters({ onFiltersChange, onExport, loading }: OrderFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFiltersChange({ [name]: value || undefined });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onExport}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
        >
          📥 Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <select 
          name="status" 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white font-medium"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select 
          name="payment_status" 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white font-medium"
        >
          <option value="">All Payment Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <input 
          type="date" 
          name="date_from" 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
        />

        <input 
          type="date" 
          name="date_to" 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
        />

        <input 
          type="number" 
          name="min_amount" 
          placeholder="Min Amount" 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder-gray-600"
        />

        <input 
          type="number" 
          name="max_amount" 
          placeholder="Max Amount" 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder-gray-600"
        />

        <input 
          type="text" 
          name="search" 
          placeholder="Search order or customer..." 
          onChange={handleChange} 
          className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder-gray-600 md:col-span-2"
        />
      </div>
    </div>
  );
}