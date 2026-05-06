'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    name: 'Mahitha Gandluri',
    rating: 5,
    text: "Beautiful sarees and excellent quality. I purchased multiple sarees and every piece looked premium."
  },
  {
    name: 'Pushpa Latha',
    rating: 5,
    text: "Very nice silk sarees with rich colors and good finishing. Loved the collection."
  },
  {
    name: 'D Gopal',
    rating: 5,
    text: "Good collection and reasonable pricing. The sarees look elegant and traditional."
  },
  {
    name: 'Amarnath Gunisetty',
    rating: 5,
    text: "Beautiful designs and smooth fabric. Perfect for functions and gifting."
  },
  {
    name: 'Kalyani Hari',
    rating: 5,
    text: "Loved the Dharmavaram saree collection. The color and border work were very attractive."
  },
  {
    name: 'Rama Subramanyam',
    rating: 5,
    text: "Great customer service and good quality sarees. I would definitely recommend this shop."
  }
];

export default function ReviewSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="py-24 bg-[#FDFCF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-[0.2em]">Customer Love</h2>
          <div className="flex flex-col items-center">
            <div className="flex justify-center space-x-1 mb-3 text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="currentColor" />
              ))}
            </div>
            <p className="text-muted-foreground font-semibold text-lg italic">
              “4.9 / 5 Rating from 127+ Verified Customers”
            </p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[350px] flex items-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-muted relative group">
                  <Quote className="absolute top-8 right-8 text-secondary/10" size={60} />
                  
                  <div className="flex space-x-1 mb-6 text-secondary">
                    {[...Array(reviews[current].rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-primary/90 italic mb-10 text-xl md:text-2xl leading-relaxed">
                    &quot;{reviews[current].text}&quot;
                  </p>

                  <div className="flex items-center space-x-4 pt-8 border-t border-muted/50">
                    <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xl border border-primary/10">
                      {reviews[current].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-primary text-lg tracking-tight">{reviews[current].name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-8 mt-12">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-muted shadow-sm hover:bg-primary hover:text-white transition-all duration-300 text-primary"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex space-x-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 bg-secondary' : 'w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-muted shadow-sm hover:bg-primary hover:text-white transition-all duration-300 text-primary"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
