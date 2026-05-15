'use client';

import AdminSidebar from "@/components/AdminSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ShoppingBag, Plus, List, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ProtectedRoute role="admin">
      <div className="flex min-h-screen bg-black text-white">
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-6 md:p-12 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] mt-16 lg:mt-0">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary">Overview</h2>
              <p className="text-muted-foreground">Store performance and statistics</p>
            </div>
            <Link 
              href="/admin/products/new" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold flex items-center space-x-2 hover:bg-accent transition-all shadow-lg"
            >
              <Plus size={20} />
              <span>Add New Product</span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              { label: 'Total Products', value: '48', icon: <ShoppingBag />, color: 'bg-blue-500' },
              { label: 'Available', value: '42', icon: <Plus />, color: 'bg-green-500' },
              { label: 'Sold Out', value: '6', icon: <List />, color: 'bg-red-500' },
              { label: 'Categories', value: '6', icon: <Settings />, color: 'bg-purple-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#050505] p-8 rounded-3xl shadow-2xl border border-primary/10 hover:border-primary/30 transition-all group">
                <div className={`h-12 w-12 ${stat.color}/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity / Quick Actions */}
          <div className="bg-[#050505] p-10 rounded-3xl shadow-2xl border border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-8">Quick Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/admin/products" className="p-8 border border-primary/10 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-between group">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Manage All Products</h4>
                  <p className="text-sm text-muted-foreground mt-1">Edit prices, descriptions, and stock.</p>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </Link>
              <Link href="/admin/categories" className="p-8 border border-primary/10 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-between group">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Manage Categories</h4>
                  <p className="text-sm text-muted-foreground mt-1">Add or remove product categories.</p>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
