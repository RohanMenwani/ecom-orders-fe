'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100';

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">📦 Simple Orders</h1>
        <nav className="flex gap-2">
          <Link href="/" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/')}`}>
            Orders
          </Link>
          <Link href="/products" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/products')}`}>
            Products
          </Link>
          <Link href="/analytics" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/analytics')}`}>
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
}