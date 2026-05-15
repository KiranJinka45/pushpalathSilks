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
    cart.map(item => `- ${item.name} (x${item.quantity}) - ${formatINR(item.price * item.quantity)}\n  Image: ${item.image_url}`).join('\n') +
    `\n\nTotal Amount: ${formatINR(totalPrice)}\n\nDelivery Address: [Please enter your address]`
  );


  return (
    <div className="bg-black min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h1 className="text-4xl font-black text-primary uppercase tracking-[0.2em] flex items-center">
            <ShoppingBag className="mr-4 text-secondary" size={32} />
            Your Boutique
          </h1>
          <Link href="/products" className="text-xs font-black text-secondary hover:text-white transition-all flex items-center uppercase tracking-[0.2em] group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Curation
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-10">
            <div className="space-y-6">
              {cart.map((item) => {
                const safeSrc = normalizeImageUrl(item.image_url);
                const safeName = sanitizeText(item.name);

                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-center bg-neutral-900/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-primary/10 hover:border-primary/30 transition-all shadow-2xl"
                  >
                    <div className="relative h-40 w-32 rounded-2xl overflow-hidden bg-neutral-800 flex-shrink-0 mb-6 sm:mb-0 shadow-lg">
                      <Image 
                        src={safeSrc} 
                        alt={safeName} 
                        fill
                        className="object-cover" 
                        sizes="150px"
                      />
                    </div>
                    <div className="flex-grow sm:ml-10 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-primary mb-2 uppercase tracking-wide">{safeName}</h3>
                      <p className="text-secondary font-black text-xl mb-6">{formatINR(item.price)}</p>
                      <div className="flex items-center justify-center sm:justify-start space-x-6">
                        <div className="flex items-center bg-black/40 rounded-full px-4 py-2 border border-primary/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-primary hover:text-white font-bold transition-colors">-</button>
                          <span className="px-6 font-black text-sm text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-primary hover:text-white font-bold transition-colors">+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-all p-3 bg-red-500/5 rounded-full hover:bg-red-500/10"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-0 text-right">
                      <p className="text-3xl font-black text-primary tracking-tighter">{formatINR(item.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-neutral-950 p-10 md:p-12 rounded-[3rem] border border-primary/20 shadow-3xl mt-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <ShoppingBag size={120} className="text-primary" />
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs">Boutique Subtotal</span>
                <span className="text-4xl font-black text-primary tracking-tighter">{formatINR(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-12 pb-8 border-b border-primary/10">
                <span className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs">White Glove Delivery</span>
                <span className="text-green-400 font-black uppercase tracking-[0.2em] text-[10px] bg-green-400/10 px-3 py-1 rounded-full">Finalized via WhatsApp</span>
              </div>
              
              <div className="flex flex-col items-center">
                <a 
                  href={`https://wa.me/918886851521?text=${checkoutMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-[#25D366] text-white rounded-full font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-4 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl hover:shadow-[#25D366]/40"
                >
                  <MessageCircle size={24} />
                  <span>Finalize on WhatsApp</span>
                </a>
                <p className="mt-8 text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold opacity-60">
                  Secured transaction facilitated by master curators
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-40 bg-neutral-900/30 rounded-[3rem] border-2 border-dashed border-primary/10">
            <ShoppingCart size={80} className="mx-auto mb-8 text-primary opacity-20" />
            <h2 className="text-3xl font-black text-primary mb-4 uppercase tracking-[0.2em]">Curation Empty</h2>
            <p className="text-muted-foreground mb-12 font-light">Your personal selection of fine silks is currently empty.</p>
            <Link href="/products" className="inline-block px-12 py-5 gold-gradient text-black rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-2xl">
              Begin Curating
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
