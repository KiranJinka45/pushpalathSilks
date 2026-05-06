'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRole = async (userId: string) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      setRole(profile?.role ?? 'customer');
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchRole(currentUser.id);
      } else {
        setRole(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchRole(currentUser.id);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-secondary transition-transform group-hover:rotate-12">
                <Sparkles size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary tracking-tight leading-none">Pushpalatha</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Silks</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop Sarees</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {role === 'admin' && (
                  <Link href="/admin" className="text-sm font-bold text-primary hover:text-secondary transition-colors">Admin</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center space-x-2 px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-foreground">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-muted animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium border-b border-muted/50">Home</Link>
            <Link href="/products" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium border-b border-muted/50">Shop Sarees</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium border-b border-muted/50">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium border-b border-muted/50">Contact</Link>
            {user ? (
              <>
                {role === 'admin' && (
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium border-b border-muted/50 text-secondary font-bold">Admin Console</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left px-3 py-4 text-base font-medium text-red-500">Logout</button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-primary">Login / Signup</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
