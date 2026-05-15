'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { getSellingPrice, getDiscountPercent, formatINR } from '@/lib/image-utils';
import { getProductImage } from '@/lib/media';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price?: number;
  fabric: string;
  is_best_seller: boolean;
  product_images?: { id: string; image_url: string; sort_order: number }[];
  product_videos?: { id: string; video_url: string; sort_order: number }[];
}

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            product_images (id, image_url, sort_order),
            product_videos (id, video_url, sort_order)
          `)
          .eq('is_best_seller', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching best sellers:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBestSellers();
  }, []);

  if (!loading && products.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium">No best seller products added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">Best Sellers</h2>
            <p className="text-muted-foreground text-base max-w-xl font-light">
              Loved by many — shop our most sought-after silks and timeless craftsmanship.
            </p>
          </div>
          <Link 
            href="/products" 
            className="group flex items-center text-primary font-medium hover:text-secondary transition-colors"
          >
            View All 
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-muted rounded-xl mb-4" />
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-6 bg-muted rounded w-3/4" />
              </div>
            ))
          ) : (
            products.map((product, index) => {
              const imageUrl = getProductImage(product);
              const sellingPrice = getSellingPrice(product.price, product.discount_price);
              const discountPercent = getDiscountPercent(product.price, product.discount_price);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative glass rounded-xl overflow-hidden shadow-xl hover:shadow-primary/5 transition-all duration-500 border border-primary/5 hover:border-primary/20"
                >
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-neutral-500">
                          No image
                        </div>
                      )}
                      
                      {discountPercent > 0 && (
                        <div className="absolute top-3 right-3 bg-secondary text-white px-2 py-0.5 rounded-full text-[10px] font-bold z-20 shadow-lg">
                          {discountPercent}% OFF
                        </div>
                      )}

                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                    
                    <button 
                      className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-primary rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all transform hover:scale-110 active:scale-95 z-10"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Heart size={16} className="transition-colors" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-secondary font-bold mb-1">
                      {product.fabric}
                    </p>
                    <h3 className="text-base font-medium text-primary mb-1.5 line-clamp-1 group-hover:text-secondary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-primary tracking-tight">{formatINR(sellingPrice)}</span>
                        {discountPercent > 0 && (
                          <span className="text-[11px] text-muted-foreground line-through opacity-50 leading-none">
                            M.R.P: {formatINR(product.price)}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <p className="text-[10px] text-green-400 font-bold bg-green-400/10 w-fit px-1.5 py-0.5 rounded leading-none">
                          Save {formatINR(product.price - sellingPrice)}
                        </p>
                      )}
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Free Delivery</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          }))}
        </div>
      </div>
    </section>
  );
}
