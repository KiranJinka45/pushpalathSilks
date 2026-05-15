'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Trash2, Loader2 } from 'lucide-react';
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

  return (
    <ProtectedRoute role="admin">
      <div className="flex min-h-screen bg-black text-white">
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-6 md:p-12 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] mt-16 lg:mt-0">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary">Categories</h2>
            <p className="text-muted-foreground">Manage product categories for your store.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Add Category Form */}
            <div className="bg-[#050505] p-8 rounded-3xl shadow-2xl border border-primary/20 h-fit">
              <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Add Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Category Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary"
                    placeholder="e.g. Kanchipuram"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={adding}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-accent transition-all disabled:opacity-50 shadow-lg shadow-primary/10"
                >
                  {adding ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> <span>Create Category</span></>}
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="md:col-span-2 bg-[#050505] rounded-3xl shadow-2xl border border-primary/20 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/10 border-b border-primary/20">
                    <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Name</th>
                    <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest">Slug</th>
                    <th className="px-8 py-5 text-xs font-bold text-primary uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
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
