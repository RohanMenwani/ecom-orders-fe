'use client';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: number;
  customer_id: number;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  payment_status: PaymentStatus;
  payment_method?: string;
  shipping_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_email: string;
  items?: OrderItem[];
  audit_logs?: AuditLog[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  product_name: string;
  product_sku: string;
}

export interface AuditLog {
  id: number;
  order_id: number;
  action: string;
  old_value?: string;
  new_value?: string;
  changed_by?: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  sku: string;
  category?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface AnalyticsData {
  summary: {
    total_orders: number;
    total_revenue: number;
    average_order_value: number;
    total_items_sold: number;
  };
  status_breakdown: Array<{ status: string; count: number; revenue: number }>;
  payment_breakdown: Array<{ payment_status: string; count: number; revenue: number }>;
  daily_revenue: Array<{ date: string; revenue: number; order_count: number }>;
  top_products: Array<{ product_id: number; name: string; quantity_sold: number; revenue: number }>;
  top_customers: Array<{ customer_id: number; name: string; email: string; total_spent: number; order_count: number }>;
  revenue_trend: Array<{ date: string; daily_revenue: number; cumulative_revenue: number }>;
}