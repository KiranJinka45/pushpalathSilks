'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/hero/hero-1.jpg',
    badge: 'Premium Silk',
    title: 'Kanchipuram Heritage'
  },
  {
    image: '/hero/hero-2.jpg',
    badge: 'Handcrafted',
    title: 'Artisan Excellence'
  },
  {
    image: '/hero/hero-3.jpg',
    badge: 'New Arrival',
    title: 'Vibrant Traditions'
  },
  {
    image: '/hero/hero-4.jpg',
    badge: 'Luxury Store',
    title: 'Exquisite Collection'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-background">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-hero hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`badge-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-bold uppercase tracking-widest mb-6"
              >
                {slides[currentSlide].badge}
              </motion.span>
            </AnimatePresence>
            
            <div className="min-h-[160px] md:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary leading-[1.1] mb-6"
                >
                  {slides[currentSlide].title.split(' ')[0]} <br />
                  <span className="text-secondary italic">{slides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Discover the finest Dharmavaram and Kanchipuram silk sarees, handcrafted with passion and tradition in the heart of Andhra Pradesh.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/products" 
                className="px-10 py-5 gold-gradient text-black rounded-full font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:scale-105 transition-all shadow-2xl hover:shadow-primary/30 group"
              >
                <span>Explore Collection</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://wa.me/918886851521" 
                className="px-10 py-5 bg-transparent text-primary border-2 border-primary/20 rounded-full font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:bg-primary/5 transition-all"
              >
                <MessageCircle size={18} />
                <span className="whitespace-nowrap">WhatsApp Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative order-1 lg:order-2 w-full"
          >
            <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/5] rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl bg-muted group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Desktop Only */}
              <button 
                onClick={(e) => { e.preventDefault(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
              >
                <ChevronRight size={24} />
              </button>

              {/* Slide Badge Overlay (Mobile/Desktop) */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 transition-all rounded-full ${
                        currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
