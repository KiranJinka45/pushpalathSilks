'use client';

import AdminProductForm from "@/components/AdminProductForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, ShoppingBag, List, LogOut } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function NewProductPage() {
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
        <div className="w-64 bg-primary text-primary-foreground p-8 flex flex-col fixed h-full">
          <div className="mb-12 text-center">
            <h1 className="text-xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">Pushpalatha Silks</p>
          </div>
          <nav className="flex-grow space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 bg-secondary/20 rounded-xl text-white font-bold">
              <ShoppingBag size={20} />
              <span>Products</span>
            </Link>
            <Link href="/admin/categories" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
              <List size={20} />
              <span>Categories</span>
            </Link>
          </nav>
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-primary-foreground/60 hover:text-white transition-colors mt-auto">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-12">
          <div className="mb-12">
            <Link href="/admin/products" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary mb-6 transition-colors uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Link>
            <h2 className="text-3xl font-bold text-primary">Add New Saree</h2>
            <p className="text-muted-foreground">Enter details for the new product in your collection.</p>
          </div>

          <AdminProductForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
