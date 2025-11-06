import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Orders - Admin Dashboard",
  description: "E-commerce order management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster position="top-right" />
          </div>
      </body>
    </html>
  );
}