# 🎨 Simple Orders Frontend - README

## Overview

**Simple Orders Frontend** is a production-ready admin dashboard for e-commerce order management built with **Next.js 14**, **React 19**, **Redux Toolkit**, **TypeScript**, and **TailwindCSS**.

**Live Frontend:** [https://ecom-orders-fe.vercel.app/](https://ecom-orders-fe.vercel.app/)

---

## ✨ Features

### Dashboard
- ✅ Orders management with advanced filtering
- ✅ Real-time pagination
- ✅ Sort by multiple columns
- ✅ Color-coded status badges
- ✅ One-click order details
- ✅ Export to CSV

### Products Management
- ✅ Full CRUD operations
- ✅ Active/Inactive filtering
- ✅ Stock quantity display
- ✅ Inline edit & delete
- ✅ Product form validation

### Analytics Dashboard
- ✅ Summary metrics cards
- ✅ Order status breakdown (bar chart)
- ✅ Payment status breakdown (pie chart)
- ✅ Daily revenue trends (line chart)
- ✅ Top 10 products ranking
- ✅ Top 10 customers metrics

### UI/UX
- ✅ High contrast, accessible inputs
- ✅ Loading skeletons
- ✅ Error boundaries
- ✅ Toast notifications
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode ready

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd simple-orders-frontend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Configure API URL
Edit .env.local:
NEXT_PUBLIC_API_URL=http://localhost:4000/api
# OR for production:
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api

# 5. Start development server
npm run dev

# 6. Open browser
# Visit: http://localhost:3000
```

---

## 📋 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# For production, use your Railway/Render URL:
# NEXT_PUBLIC_API_URL=https://simple-orders-api.up.railway.app/api
```

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with Redux provider
│   ├── page.tsx                # Orders dashboard
│   ├── products/
│   │   └── page.tsx            # Products management
│   ├── analytics/
│   │   └── page.tsx            # Analytics dashboard
│   └── globals.css             # Global styles
├── components/
│   ├── Navigation.tsx          # Header navigation
│   ├── OrderTable.tsx          # Orders table
│   ├── OrderDetailModal.tsx    # Order details modal
│   ├── OrderFilters.tsx        # Advanced filters
│   ├── ProductTable.tsx        # Products table
│   ├── ProductForm.tsx         # Product form (create/edit)
│   └── AnalyticsDashboard.tsx  # Analytics charts
├── redux/
│   ├── provider.tsx            # Redux provider component
│   ├── store.ts                # Redux store
│   └── slices/
│       ├── orders.ts           # Orders state
│       ├── products.ts         # Products state
│       └── analytics.ts        # Analytics state
├── services/
│   └── api.ts                  # API service
├── types/
│   └── index.ts                # TypeScript types
├── utils/
│   └── csv.ts                  # CSV export utility
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🎯 Pages

### Dashboard (/orders)
**Main order management interface**

Features:
- View all orders in table format
- Filter by status, payment status, date range, amount
- Search by order number or customer name
- Sort by created_at, total_amount, order_number
- Pagination with smart page navigation
- Color-coded status/payment badges
- Click row to view order details
- Export visible orders to CSV

**URL:** `https://ecom-orders-fe.vercel.app/`

---

### Order Details Modal
**Detailed order information**

Shows:
- Customer information
- Order total amount
- Order status & payment status
- Items list with product details
- Full audit trail with timestamps
- Action buttons (Cancel, Close)

---

### Products Page (/products)
**Product inventory management**

Features:
- View all products
- Create new product
- Edit product details
- Delete products
- Filter by active/inactive
- Stock quantity display
- Form validation

**URL:** `https://ecom-orders-fe.vercel.app/products`

---

### Analytics Page (/analytics)
**Business intelligence dashboard**

Displays:
- Summary cards (Total Orders, Revenue, AOV, Items Sold)
- Order status breakdown (bar chart)
- Payment status breakdown (pie chart)
- Daily revenue trend (line chart)
- Top 10 products with ranking
- Top 10 customers with metrics
- Revenue trend with cumulative values

**URL:** `https://ecom-orders-fe.vercel.app/analytics`

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.0.1 | React framework |
| **React** | 19.2.0 | UI library |
| **Redux Toolkit** | ^2.10.1 | State management |
| **React Redux** | ^9.2.0 | Redux bindings |
| **TypeScript** | ^5 | Type safety |
| **TailwindCSS** | 4 | Styling |
| **Recharts** | ^3.3.0 | Charts |
| **Axios** | ^1.13.2 | HTTP client |
| **Sonner** | ^2.0.7 | Toast notifications |
| **Lucide React** | ^0.552.0 | Icons |

---

## 🎨 UI Components

### Input Fields
- High contrast text (text-gray-900)
- Medium font weight for clarity
- 2px borders for visibility
- Blue focus ring for focus state
- Dark placeholder text

### Tables
- Striped rows for readability
- Hover effects
- Bold headers
- Color-coded status badges
- Responsive on mobile

### Modals
- Sticky headers
- Scrollable content
- Clear close buttons
- Action buttons

### Charts
- Recharts library
- Responsive sizing
- Tooltips on hover
- Legend display
- Smooth animations

---

## 🔌 API Integration

### Base Configuration
```typescript
// services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Available Methods

**Orders:**
- `ordersAPI.getAll(params)` - Get all orders with filters
- `ordersAPI.getById(id)` - Get order details
- `ordersAPI.cancel(id)` - Cancel order

**Products:**
- `productsAPI.getAll(isActive)` - Get all products
- `productsAPI.create(data)` - Create product
- `productsAPI.update(id, data)` - Update product
- `productsAPI.delete(id)` - Delete product

**Analytics:**
- `analyticsAPI.getDashboard()` - Get dashboard metrics

---

## 📦 Redux State Structure

### Orders State
```typescript
{
  items: Order[],
  selectedOrder: Order | null,
  pagination: PaginationInfo,
  loading: boolean,
  error: string | null,
  filters: {
    status?: string,
    payment_status?: string,
    search?: string,
    date_from?: string,
    date_to?: string,
    min_amount?: number,
    max_amount?: number,
    sort_by?: string,
    sort_order?: string,
  }
}
```

### Products State
```typescript
{
  items: Product[],
  loading: boolean,
  error: string | null,
  filterActive?: boolean,
}
```

### Analytics State
```typescript
{
  data: AnalyticsData | null,
  loading: boolean,
  error: string | null,
}
```

---

## 🎯 Type Definitions

```typescript
// Core Types
type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  status: OrderStatus;
  total_amount: number;
  payment_status: PaymentStatus;
  created_at: string;
  items?: OrderItem[];
  audit_logs?: AuditLog[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  sku: string;
  category?: string;
  is_active: boolean;
}
```

---

## 🚀 Deployment

### Vercel (Recommended - Free)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# Visit https://vercel.com
# Import project from GitHub

# 3. Set environment variable
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api

# 4. Deploy
# Vercel auto-deploys on git push
```

**Your live URL:** `https://your-project-name.vercel.app`

---

## 🔍 Development Scripts

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🐛 Troubleshooting

### API Connection Error
```
Error: Failed to fetch orders
```
**Solution:**
- Check backend is running
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check CORS settings on backend

### Input Fields Not Visible
```
Text is too light to read
```
**Solution:** Already fixed! Inputs have high contrast:
- Dark text (text-gray-900)
- Medium font weight
- 2px borders
- Blue focus ring

### Redux Provider Error
```
This function is not supported in React Server Components
```
**Solution:**
- Use `'use client';` at top of components
- Redux provider in separate client component

---

## 📊 Performance

- ✅ Next.js 14 App Router (optimal performance)
- ✅ Client-side state with Redux
- ✅ Efficient re-renders
- ✅ Image optimization
- ✅ CSS-in-JS with Tailwind
- ✅ Code splitting

---

## 🔐 Security

- ✅ Environment variables for API URL
- ✅ TypeScript for type safety
- ✅ HTTPS in production
- ✅ No sensitive data in code
- ✅ Input validation

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 📞 Support

For issues:
1. Check browser console for errors
2. Check backend API response
3. Verify environment variables
4. Check Redux DevTools

---

## 📄 License

MIT License - See LICENSE file

---

## 👨‍💻 Built With

- ❤️ Next.js 14
- ❤️ React 19
- ❤️ Redux Toolkit
- ❤️ TypeScript
- ❤️ TailwindCSS

---

## 🎉 Live Demo

**Dashboard:** [https://ecom-orders-fe.vercel.app/](https://ecom-orders-fe.vercel.app/)

**Products Page:** [https://ecom-orders-fe.vercel.app/products](https://ecom-orders-fe.vercel.app/products)

**Analytics:** [https://ecom-orders-fe.vercel.app/analytics](https://ecom-orders-fe.vercel.app/analytics)
