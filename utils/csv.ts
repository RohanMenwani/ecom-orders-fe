'use client';

export const exportToCSV = (orders: any[]) => {
  if (!orders.length) {
    alert('No orders to export');
    return;
  }

  const headers = ['Order #', 'Customer', 'Email', 'Amount', 'Status', 'Payment', 'Items', 'Date'];
  const rows = orders.map(order => [
    order.order_number,
    order.customer_name,
    order.customer_email,
    parseFloat(String(order.total_amount)).toFixed(2),
    order.status,
    order.payment_status,
    order.items?.length || 0,
    new Date(order.created_at).toLocaleDateString(),
  ]);

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};