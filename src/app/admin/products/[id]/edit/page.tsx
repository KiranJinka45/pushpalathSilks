'use client';

import AdminSidebar from "@/components/AdminSidebar";
import AdminProductForm from "@/components/AdminProductForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  return (
    <ProtectedRoute role="admin">
      <div className="flex min-h-screen bg-black text-white">
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-6 md:p-12 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] mt-16 lg:mt-0">
          <div className="mb-12">
            <Link href="/admin/products" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary mb-6 transition-colors uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Link>
            <h2 className="text-3xl font-bold text-primary">Edit Saree</h2>
            <p className="text-muted-foreground">Update the details for this product in your collection.</p>
          </div>

          <AdminProductForm productId={id} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
