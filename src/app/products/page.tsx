'use client';

import { useEffect, useState } from 'react';
import ProductGrid from "@/components/ProductGrid";
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  product_images: { image_url: string }[];
  image_url: string;
  stock_status: string;
  fabric: string;
  color: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          product_images(*),
          product_videos(*)
        `)
        .order('created_at', { ascending: false });

      if (data) {
        const formattedProducts = data.map((p) => {
          const raw = p as unknown as {
            categories: { name: string } | null;
            product_images: { image_url: string }[];
          };
          return {
            ...p,
            category: raw.categories?.name || 'Uncategorized',
            image_url: raw.product_images?.[0]?.image_url || '/placeholder-saree.jpg',
            product_images: raw.product_images || []
          };
        }) as Product[];
        setProducts(formattedProducts);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-black min-h-screen py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 uppercase tracking-widest">Our Collection</h1>
          <p className="text-muted-foreground">Browse our exquisite range of handcrafted silk sarees.</p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
