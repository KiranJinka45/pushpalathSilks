'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, LayoutDashboard, ShoppingBag, List, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProductImage } from '@/lib/media';

interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  fabric: string;
  color: string;
  category?: string;
  stock_status: string;
  product_images: { id: string; image_url: string; sort_order: number }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*, product_images(image_url), categories(name)')
      .order('created_at', { ascending: false });
    
    if (data) {
      const formatted = data.map(p => {
        const raw = p as unknown as {
          categories: { name: string } | null;
        };
        return {
          ...p,
          category: raw.categories?.name
        };
      });
      setProducts(formatted as Product[]);
    }
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    // Delete related media first
    await supabase.from('product_images').delete().eq('product_id', id);
    await supabase.from('product_videos').delete().eq('product_id', id);

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert(`Error: ${error.message}`);
    }
  };

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
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary">Products</h2>
              <p className="text-muted-foreground">Manage your saree collection</p>
            </div>
            <Link 
              href="/admin/products/new" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold flex items-center space-x-2 hover:bg-accent transition-all shadow-lg"
            >
              <Plus size={20} />
              <span>Add New Product</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-muted overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30 border-b border-muted">
                  <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Product</th>
                  <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Price</th>
                  <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-10 bg-muted rounded overflow-hidden flex-shrink-0">
                          {(() => {
                            const imageUrl = getProductImage(product);
                            return imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-500 text-center">
                                No image
                              </div>
                            );
                          })()}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.fabric}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-muted-foreground font-medium">
                      {product.category || 'N/A'}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-primary">₹{product.price.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.stock_status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock_status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-4">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-muted-foreground hover:text-primary transition-colors inline-block">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <Link href={`/products/${product.slug}`} target="_blank" className="text-muted-foreground hover:text-secondary transition-colors inline-block">
                        <ExternalLink size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className="py-20 text-center text-muted-foreground font-medium">Loading products...</div>}
            {!loading && products.length === 0 && (
              <div className="py-20 text-center text-muted-foreground font-medium">No products found. Start by adding one!</div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
