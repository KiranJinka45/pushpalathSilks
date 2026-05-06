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
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-muted relative"
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
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="bg-white text-primary px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
              Sold Out
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 z-10">
          <Link 
            href={`/products/${product.slug}`}
            className="p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-colors shadow-lg"
          >
            <Eye size={20} />
          </Link>
          {!isSoldOut && (
            <button 
              onClick={() => addToCart({ ...product, price: sellingPrice, image_url: imageUrl })}
              className="p-3 bg-primary text-white rounded-full hover:bg-accent transition-colors shadow-lg"
            >
              <ShoppingCart size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">{product.fabric}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">{formatINR(sellingPrice)}</span>
            {discountPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through opacity-60">
                M.R.P: {formatINR(product.price)}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <p className="text-xs text-green-600 font-medium">
              Save {formatINR(product.discount_price || 0)}
            </p>
          )}
          <p className="text-[10px] text-muted-foreground">FREE delivery within 2–4 days</p>
        </div>
        <button 
          disabled={isSoldOut}
          onClick={() => addToCart({ ...product, price: sellingPrice, image_url: imageUrl })}
          className={`w-full mt-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
            isSoldOut 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-primary/5 text-primary hover:bg-primary hover:text-white border border-primary/20'
          }`}
        >
          <ShoppingCart size={18} />
          <span>{isSoldOut ? 'Sold Out' : 'Add to Cart'}</span>
        </button>
      </div>
    </motion.div>
  );
}
