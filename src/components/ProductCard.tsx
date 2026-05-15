'use client';

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { getSellingPrice, getDiscountPercent, formatINR } from '@/lib/image-utils';
import { getProductImage } from '@/lib/media';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    discount_price?: number;
    fabric: string;
    product_images?: { image_url: string }[];
    image_url?: string;
    stock_status: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSoldOut = product.stock_status === 'sold_out';
  const { addToCart } = useCart();

  const imageUrl = getProductImage(product);
  const sellingPrice = getSellingPrice(product.price, product.discount_price);
  const discountPercent = getDiscountPercent(product.price, product.discount_price);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all border border-primary/10 hover:border-primary/30 relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.name || "Saree product"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-sm text-neutral-500">
            No image uploaded
          </div>
        )}
        
        {/* Discount Badge */}
        {discountPercent > 0 && !isSoldOut && (
          <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
            {discountPercent}% OFF
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 backdrop-blur-sm">
            <span className="bg-neutral-800 text-primary border border-primary/30 px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] text-xs">
              Sold Out
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 z-10">
          <Link 
            href={`/products/${product.slug}`}
            className="p-4 glass text-primary rounded-full hover:gold-gradient hover:text-black transition-all shadow-2xl border border-primary/20"
          >
            <Eye size={20} />
          </Link>
          {!isSoldOut && (
            <button 
              onClick={() => addToCart({ ...product, price: sellingPrice, image_url: imageUrl })}
              className="p-4 gold-gradient text-black rounded-full hover:scale-110 transition-all shadow-2xl"
            >
              <ShoppingCart size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="p-8">
        <p className="text-[10px] text-secondary font-black uppercase tracking-[0.3em] mb-3">{product.fabric}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl font-bold text-primary mb-3 line-clamp-1 group-hover:text-secondary transition-colors uppercase tracking-wide">
            {product.name}
          </h3>
        </Link>
        <div className="space-y-4">
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-primary tracking-tighter">{formatINR(sellingPrice)}</span>
            {discountPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through opacity-30">
                {formatINR(product.price)}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <p className="text-[10px] text-green-400 font-black bg-green-400/5 w-fit px-3 py-1 rounded-full border border-green-400/20 uppercase tracking-widest">
              {discountPercent}% Private Offer
            </p>
          )}
        </div>
        <button 
          disabled={isSoldOut}
          onClick={() => addToCart({ ...product, price: sellingPrice, image_url: imageUrl })}
          className={`w-full mt-8 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center space-x-3 ${
            isSoldOut 
              ? 'bg-muted text-muted-foreground/50 border border-muted cursor-not-allowed' 
              : 'gold-gradient text-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95'
          }`}
        >
          <ShoppingCart size={16} />
          <span>{isSoldOut ? 'Unavailable' : 'Secure Acquisition'}</span>
        </button>
      </div>
    </motion.div>
  );
}
