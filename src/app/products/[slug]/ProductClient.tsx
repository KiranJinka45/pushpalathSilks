'use client';

import { useState } from 'react';
import { ShoppingCart, MessageCircle, ArrowLeft, Heart, Share2, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from "@/context/CartContext";
import { getSellingPrice, getDiscountPercent, formatINR } from '@/lib/image-utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number;
  fabric: string;
  color: string;
  category: string;
  stock_status: string;
  images: string[];
  videos: string[];
}

export default function ProductClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const sellingPrice = getSellingPrice(product.price, product.discount_price);
  const discountPercent = getDiscountPercent(product.price, product.discount_price);
  
  const whatsappMessage = encodeURIComponent(
    `🛍️ Order from Pushpalatha Silk Sarees\n\nProduct: ${product.name}\nSelling Price: ${formatINR(sellingPrice)}\nQuantity: ${quantity}\nTotal: ${formatINR(sellingPrice * quantity)}\n\nCustomer Details:\nName: \nPhone: \n\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nPlease confirm availability.`
  );

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-12 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100 shadow-2xl"
            >
              {product.images[selectedImage] ? (
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name || "Saree product"}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-neutral-500">
                  No image uploaded
                </div>
              )}
            </motion.div>
            <div className="grid grid-cols-5 gap-4">
              {product.images.map((img: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  {img ? (
                    <img 
                      src={img} 
                      alt={`${product.name} ${i}`} 
                      className="h-full w-full object-cover" 
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                      <span className="text-[10px] text-neutral-400">No Image</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-primary">{formatINR(sellingPrice)}</span>
                {discountPercent > 0 && (
                  <span className="text-2xl text-muted-foreground line-through opacity-60">
                    M.R.P: {formatINR(product.price)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <p className="text-green-600 font-bold flex items-center space-x-2">
                  <CheckCircle size={18} />
                  <span>Save {formatINR(product.discount_price || 0)}</span>
                </p>
              )}
              <p className="text-primary font-medium">FREE delivery within 2–4 days</p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10 border-l-4 border-muted pl-6">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10 bg-muted/30 p-8 rounded-2xl">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Fabric</p>
                <p className="text-primary font-bold">{product.fabric}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Color</p>
                <p className="text-primary font-bold">{product.color}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-12">
              <div className="flex items-center border border-muted rounded-full px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-primary hover:text-secondary font-bold">-</button>
                <span className="px-6 font-bold text-primary">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-primary hover:text-secondary font-bold">+</button>
              </div>
              <div className="flex-1 flex items-center space-x-4 text-green-600">
                <CheckCircle size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {product.stock_status === 'available' ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button 
                onClick={() => addToCart({ ...product, price: sellingPrice, image_url: product.images[0] })}
                disabled={product.stock_status !== 'available'}
                className="flex-1 px-8 py-5 bg-primary text-primary-foreground rounded-full font-bold flex items-center justify-center space-x-3 hover:bg-accent transition-all shadow-xl hover:shadow-primary/30 disabled:opacity-50"
              >
                <ShoppingCart size={22} />
                <span>Add to Cart</span>
              </button>
              <a 
                href={`https://wa.me/918886851521?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-5 bg-[#25D366] text-white rounded-full font-bold flex items-center justify-center space-x-3 hover:opacity-90 transition-all shadow-xl hover:shadow-[#25D366]/30"
              >
                <MessageCircle size={22} />
                <span>Buy on WhatsApp</span>
              </a>
            </div>

            {/* Video Gallery */}
            {product.videos && product.videos.length > 0 && (
              <div className="mt-8 pt-8 border-t border-muted">
                <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-6 flex items-center">
                  <Play size={20} className="mr-2 text-secondary" />
                  Product Videos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.videos.map((vid: string, i: number) => (
                    <div key={i} className="aspect-video rounded-3xl overflow-hidden bg-black shadow-lg">
                      <video 
                        src={vid} 
                        controls 
                        className="w-full h-full object-cover"
                        poster={product.images[0]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-8 pt-8 border-t border-muted mt-12">
              <button className="flex items-center space-x-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                <Heart size={20} />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                <Share2 size={20} />
                <span>Share Saree</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
