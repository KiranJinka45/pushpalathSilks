'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { getSellingPrice } from '@/lib/image-utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price?: number;
  fabric: string;
  product_images?: { image_url: string }[];
  image_url?: string;
  stock_status: string;
  category: string;
  color: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(p => 
      (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'All' || p.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return getSellingPrice(a.price, a.discount_price) - getSellingPrice(b.price, b.discount_price);
      }
      if (sortBy === 'price-high') {
        return getSellingPrice(b.price, b.discount_price) - getSellingPrice(a.price, a.discount_price);
      }
      return 0; // newest as default (requires date field, using original order for now)
    });

  return (
    <div>
      {/* Filters & Search */}
      <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-primary/10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search sarees by name..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary/10 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <select 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary/10 focus:outline-none appearance-none bg-black/50 text-white font-medium cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <select 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary/10 focus:outline-none appearance-none bg-black/50 text-white font-medium cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-muted-foreground mb-8 font-medium">
        Showing {filteredProducts.length} results
      </p>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-neutral-900/30 rounded-3xl border-2 border-dashed border-primary/10">
          <Search size={48} className="mx-auto mb-4 opacity-10" />
          <h3 className="text-xl font-bold text-primary mb-2">No sarees found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
