'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Plus, Trash2, LayoutDashboard, ShoppingBag, List, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (data) setCategories(data);
    setLoading(false);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) return;
    setAdding(true);

    const slug = newCategoryName.toLowerCase().replace(/ /g, '-');
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: newCategoryName, slug }])
      .select()
      .single();

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setCategories([...categories, data as Category].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategoryName('');
    }
    setAdding(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure? This will not delete products in this category but will set their category to null.')) return;
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
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
            <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
              <ShoppingBag size={20} />
              <span>Products</span>
            </Link>
            <Link href="/admin/categories" className="flex items-center space-x-3 px-4 py-3 bg-secondary/20 rounded-xl text-white font-bold">
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
            <h2 className="text-3xl font-bold text-primary">Categories</h2>
            <p className="text-muted-foreground">Manage product categories for your store.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Add Category Form */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-muted h-fit">
              <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Add Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Category Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-muted outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Kanchipuram"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={adding}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-accent transition-all disabled:opacity-50 shadow-lg"
                >
                  {adding ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> <span>Create Category</span></>}
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="md:col-span-2 bg-white rounded-3xl shadow-sm border border-muted overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 border-b border-muted">
                    <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Name</th>
                    <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Slug</th>
                    <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-8 py-6 font-bold text-primary">{category.name}</td>
                      <td className="px-8 py-6 text-sm text-muted-foreground">{category.slug}</td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => deleteCategory(category.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && <div className="py-20 text-center text-muted-foreground font-medium">Loading categories...</div>}
              {!loading && categories.length === 0 && (
                <div className="py-20 text-center text-muted-foreground font-medium">No categories found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
