'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        alert('Signup successful! Please check your email for verification.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/');
        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-muted">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-2 uppercase tracking-widest">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-muted-foreground text-sm">
          {type === 'login' ? 'Login to continue your shopping' : 'Join us for an exquisite saree collection'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-6">
        {type === 'signup' && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="John Doe"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="email" 
              placeholder="name@example.com"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="password" 
              placeholder="••••••••"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-accent transition-all shadow-xl hover:shadow-primary/20 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <span>{type === 'login' ? 'Login Now' : 'Sign Up'}</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-muted text-center">
        <p className="text-sm text-muted-foreground">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => router.push(type === 'login' ? '/signup' : '/login')}
            className="text-primary font-bold hover:text-secondary transition-colors"
          >
            {type === 'login' ? 'Sign Up Free' : 'Login Here'}
          </button>
        </p>
      </div>
    </div>
  );
}
