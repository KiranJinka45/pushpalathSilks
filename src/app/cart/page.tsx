'use client';

import Image from 'next/image';
import { ShoppingCart, Trash2, MessageCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sanitizeText } from '@/lib/security';
import { useCart } from '@/context/CartContext';
import { normalizeImageUrl, formatINR } from '@/lib/image-utils';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const checkoutMessage = encodeURIComponent(
    `🛍️ Pushpalatha Silk Sarees - Order Checkout\n\n` +
    cart.map(item => `- ${item.name} (x${item.quantity}) - ${formatINR(item.price * item.quantity)}`).join('\n') +
    `\n\nTotal Amount: ${formatINR(totalPrice)}\n\nDelivery Address: [Please enter your address]`
  );


  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-primary uppercase tracking-widest flex items-center">
            <ShoppingBag className="mr-4" />
            Your Cart
          </h1>
          <Link href="/products" className="text-sm font-bold text-secondary hover:text-primary transition-colors flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              {cart.map((item) => {
                const safeSrc = normalizeImageUrl(item.image_url);
                const safeName = sanitizeText(item.name);

                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-3xl border border-muted shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32 w-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 mb-4 sm:mb-0">
                      <Image 
                        src={safeSrc} 
                        alt={safeName} 
                        fill
                        className="object-cover" 
                        sizes="100px"
                      />
                    </div>
                    <div className="flex-grow sm:ml-8 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-primary mb-1">{safeName}</h3>
                      <p className="text-secondary font-bold text-lg mb-4">{formatINR(item.price)}</p>
                      <div className="flex items-center justify-center sm:justify-start space-x-4">
                        <div className="flex items-center border border-muted rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-primary hover:text-secondary font-bold">-</button>
                          <span className="px-4 font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-primary hover:text-secondary font-bold">+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <p className="text-xl font-bold text-primary">{formatINR(item.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-[#FFFDF0] p-10 rounded-3xl border border-muted mt-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Subtotal</span>
                <span className="text-2xl font-bold text-primary">{formatINR(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-muted">
                <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Shipping</span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Calculated at WhatsApp</span>
              </div>
              
              <div className="flex flex-col items-center">
                <a 
                  href={`https://wa.me/918886851521?text=${checkoutMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#25D366] text-white rounded-full font-bold text-lg flex items-center justify-center space-x-4 hover:opacity-90 transition-all shadow-xl hover:shadow-[#25D366]/30"
                >
                  <MessageCircle size={24} />
                  <span>Checkout on WhatsApp</span>
                </a>
                <p className="mt-6 text-xs text-muted-foreground text-center">
                  Payment will be collected manually via UPI QR/Scanner during WhatsApp conversation.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <ShoppingCart size={64} className="mx-auto mb-6 text-muted-foreground opacity-20" />
            <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest">Your cart is empty</h2>
            <p className="text-muted-foreground mb-10">Add some beautiful silk sarees to your collection.</p>
            <Link href="/products" className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-accent transition-all shadow-xl">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
