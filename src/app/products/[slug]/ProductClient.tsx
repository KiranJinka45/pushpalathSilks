'use client';

import { useState } from 'react';
import { ShoppingCart, MessageCircle, ArrowLeft, CheckCircle, Play } from 'lucide-react';
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
  
  const handleBuyOnWhatsApp = async () => {
    const message = `🛍️ *Pushpalatha Silk Sarees - Order Inquiry*\n\n*Product:* ${product.name}\n*Fabric:* ${product.fabric}\n*Color:* ${product.color}\n*Price:* ${formatINR(sellingPrice)}\n*Quantity:* ${quantity}\n*Total:* ${formatINR(sellingPrice * quantity)}\n\n*Is this available?*`;
    
    // Check if we can use the Web Share API to send a real image file + caption
    if (typeof navigator !== 'undefined' && navigator.share && product.images[selectedImage]) {
      try {
        const response = await fetch(product.images[selectedImage]);
        const blob = await response.blob();
        const file = new File([blob], `${product.slug}.jpg`, { type: 'image/jpeg' });
        
        const shareData = {
          files: [file],
          title: 'Pushpalatha Silk Sarees',
          text: message,
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return; // Success, stop here
        }
      } catch (error) {
        console.error('Error sharing image to WhatsApp:', error);
        // If it fails, fall through to the direct link method
      }
    }
    
    // Fallback: Direct Link (Only sends text, image depends on WhatsApp preview engine)
    const imageUrl = product.images[selectedImage] || '';
    const fallbackMessage = `${imageUrl}\n\n${message}`;
    const whatsappUrl = `https://wa.me/918886851521?text=${encodeURIComponent(fallbackMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

    return (
      <div className="bg-black min-h-screen py-6 md:py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
            {/* Image Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-primary/10 max-w-md mx-auto lg:mx-0"
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
              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto lg:mx-0">
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
              <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-2">{product.category}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">{product.name}</h1>
              
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-black text-primary tracking-tighter">{formatINR(sellingPrice)}</span>
                  <div className="flex flex-col">
                    {discountPercent > 0 && (
                      <span className="text-base text-muted-foreground line-through opacity-40">
                        M.R.P: {formatINR(product.price)}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="text-green-400 font-bold text-sm">
                        {discountPercent}% OFF Special Deal
                      </span>
                    )}
                  </div>
                </div>
                {discountPercent > 0 && (
                  <p className="text-green-600 font-bold flex items-center space-x-2">
                    <CheckCircle size={18} />
                    <span>Save {formatINR(product.discount_price || 0)}</span>
                  </p>
                )}
                <p className="text-primary font-medium">FREE delivery within 2–4 days</p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 border-l-4 border-muted pl-6">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-neutral-900/50 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Fabric</p>
                  <p className="text-primary font-bold text-base">{product.fabric}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Color</p>
                  <p className="text-primary font-bold text-base">{product.color}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center bg-black/40 rounded-full px-4 py-2 border border-primary/10">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-primary hover:text-white transition-colors font-bold">-</button>
                  <span className="px-6 font-bold text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-primary hover:text-white transition-colors font-bold">+</button>
                </div>
                <div className="flex-1 flex items-center space-x-4 text-green-600">
                  <CheckCircle size={20} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {product.stock_status === 'available' ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => addToCart({ ...product, price: sellingPrice, image_url: product.images[0] })}
                  disabled={product.stock_status !== 'available'}
                  className="px-6 py-3 gold-gradient text-black rounded-full font-black uppercase tracking-[0.1em] text-xs flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={handleBuyOnWhatsApp}
                  className="px-6 py-3 bg-[#25D366] text-white rounded-full font-black uppercase tracking-[0.1em] text-xs flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                >
                  <MessageCircle size={18} />
                  <span className="whitespace-nowrap">Buy on WhatsApp</span>
                </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
