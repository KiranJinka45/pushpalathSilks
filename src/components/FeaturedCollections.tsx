'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { getDiscountPercent } from '@/lib/image-utils';
import { getProductImage } from '@/lib/media';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price?: number;
  product_images?: { id: string; image_url: string; sort_order: number }[];
}

export default function FeaturedCollections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedCollections() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            product_images (id, image_url, sort_order)
          `)
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error('Error fetching featured collections:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedCollections();
  }, []);

  if (!loading && products.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium">No featured collection products added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-widest">Featured Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Hand-picked masterpieces that define the essence of Pushpalatha Silk Sarees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const imageUrl = getProductImage(product);
            const discountPercent = getDiscountPercent(product.price, product.discount_price);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer bg-neutral-100"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name || "Featured collection"}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-neutral-500">
                    No image uploaded
                  </div>
                )}

                {discountPercent > 0 && (
                  <div className="absolute top-6 right-6 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
                    {discountPercent}% OFF
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <Link href={`/products/${product.slug}`} className="text-white/80 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                    Explore Now →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
