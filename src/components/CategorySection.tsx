'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Crown, Heart } from 'lucide-react';

const categories = [
  {
    name: 'Dharmavaram Silk',
    slug: 'dharmavaram-silk',
    color: 'from-amber-700 to-amber-900',
    icon: Crown,
    description: 'Traditional heavy gold borders'
  },
  {
    name: 'Kanchipuram Silk',
    slug: 'kanchipuram-silk',
    color: 'from-rose-700 to-rose-900',
    icon: Star,
    description: 'Vibrant colors and intricate weaves'
  },
  {
    name: 'Bridal Collection',
    slug: 'bridal-sarees',
    color: 'from-red-700 to-red-900',
    icon: Heart,
    description: 'Exquisite designs for your big day'
  },
  {
    name: 'Fancy Sarees',
    slug: 'fancy-sarees',
    color: 'from-emerald-700 to-emerald-900',
    icon: ShoppingBag,
    description: 'Modern styles with traditional roots'
  }
];

export default function CategorySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase tracking-widest">Featured Categories</h2>
          <div className="h-1 w-20 bg-secondary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections of the finest silk sarees from the weaving hubs of South India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/products?category=${category.slug}`} 
                className={`group block relative overflow-hidden rounded-3xl shadow-lg aspect-[3/4] bg-gradient-to-br ${category.color} transition-transform duration-500 hover:-translate-y-2`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <category.icon size={120} />
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                  <category.icon size={32} className="text-secondary mb-4 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" />
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/70 text-sm mb-6 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-secondary border-b border-secondary pb-1 w-fit">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
