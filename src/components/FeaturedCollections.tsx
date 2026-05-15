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
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium">No featured collection products added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 uppercase tracking-widest">Featured Collections</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">Hand-picked masterpieces that define the essence of Pushpalatha Silk Sarees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="group relative aspect-[1/1] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-primary/5 hover:border-primary/20"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name || "Featured collection"}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-neutral-500">
                    No image
                  </div>
                )}

                {discountPercent > 0 && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-2 py-0.5 rounded-full text-[10px] font-bold z-20 shadow-lg">
                    {discountPercent}% OFF
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <Link href={`/products/${product.slug}`} className="text-secondary font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">
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
