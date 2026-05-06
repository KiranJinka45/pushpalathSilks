'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import { LayoutDashboard, ShoppingBag, List, Settings, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <ProtectedRoute role="admin">
      <div className="flex min-h-screen bg-muted/20">
        {/* Sidebar */}
        <div className="w-64 bg-primary text-primary-foreground p-8 flex flex-col">
          <div className="mb-12">
            <h1 className="text-xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">Pushpalatha Silks</p>
          </div>

          <nav className="flex-grow space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-secondary/20 rounded-xl text-white font-bold">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
              <ShoppingBag size={20} />
              <span>Products</span>
            </Link>
            <Link href="/admin/categories" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
              <List size={20} />
              <span>Categories</span>
            </Link>
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 text-primary-foreground/60 hover:text-white transition-colors mt-auto"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12">
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
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-muted">
                <div className={`h-12 w-12 ${stat.color}/10 rounded-2xl flex items-center justify-center text-primary mb-6`}>
                  {stat.icon}
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity / Quick Actions */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-muted">
            <h3 className="text-xl font-bold text-primary mb-6">Quick Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/admin/products" className="p-6 border border-muted rounded-2xl hover:border-secondary transition-colors flex items-center justify-between group">
                <div>
                  <h4 className="font-bold text-primary group-hover:text-secondary transition-colors">Manage All Products</h4>
                  <p className="text-sm text-muted-foreground">Edit prices, descriptions, and stock.</p>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-secondary transition-all" />
              </Link>
              <Link href="/admin/categories" className="p-6 border border-muted rounded-2xl hover:border-secondary transition-colors flex items-center justify-between group">
                <div>
                  <h4 className="font-bold text-primary group-hover:text-secondary transition-colors">Manage Categories</h4>
                  <p className="text-sm text-muted-foreground">Add or remove product categories.</p>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-secondary transition-all" />
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
