'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Loader2, Upload, X, Save, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductImage {
  id: string;
  image_url: string;
  sort_order: number;
}

interface ProductVideo {
  id: string;
  video_url: string;
  sort_order: number;
}

interface AdminProductFormProps {
  productId?: string;
}

export default function AdminProductForm({ productId }: AdminProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!productId);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [existingVideos, setExistingVideos] = useState<ProductVideo[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    discount_price: '',
    fabric: '',
    color: '',
    category_id: '',
    description: '',
    stock_status: 'available',
    is_featured: false,
    is_best_seller: false
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Categories
      const { data: catData } = await supabase.from('categories').select('id, name').order('name');
      if (catData) setCategories(catData);

      // Fetch Product if editing
      if (productId) {
        const { data: product } = await supabase
          .from('products')
          .select('*, product_images(*), product_videos(*)')
          .eq('id', productId)
          .single();

        if (product) {
          setFormData({
            name: product.name,
            slug: product.slug,
            price: product.price.toString(),
            discount_price: product.discount_price?.toString() || '',
            fabric: product.fabric,
            color: product.color,
            category_id: product.category_id || '',
            description: product.description,
            stock_status: product.stock_status,
            is_featured: product.is_featured || false,
            is_best_seller: product.is_best_seller || false
          });
          setExistingImages(product.product_images.sort((a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order));
          setExistingVideos(product.product_videos.sort((a: ProductVideo, b: ProductVideo) => a.sort_order - b.sort_order));
        }
        setFetching(false);
      }
    };
    fetchData();
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validation
      if (existingImages.length + images.length + newFiles.length > 5) {
        alert("Maximum 5 images allowed.");
        return;
      }

      for (const file of newFiles) {
        if (!file.type.startsWith("image/")) {
          alert(`File "${file.name}" is not an image.`);
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          alert(`Image "${file.name}" must be less than 20MB.`);
          return;
        }
      }

      setImages([...images, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validation
      if (existingVideos.length + videos.length + newFiles.length > 2) {
        alert("Maximum 2 videos allowed.");
        return;
      }

      for (const file of newFiles) {
        if (!file.type.startsWith("video/")) {
          alert(`File "${file.name}" is not a video.`);
          return;
        }
        if (file.size > 100 * 1024 * 1024) {
          alert(`Video "${file.name}" must be less than 100MB.`);
          return;
        }
      }

      setVideos([...videos, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setVideoPreviews([...videoPreviews, ...newPreviews]);
    }
  };

  const removeVideo = (index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);

    const newPreviews = [...videoPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setVideoPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const removeExistingImage = async (id: string) => {
    if (confirm('Delete this image permanently?')) {
      const { error } = await supabase.from('product_images').delete().eq('id', id);
      if (!error) {
        setExistingImages(existingImages.filter(img => img.id !== id));
      }
    }
  };

  const removeExistingVideo = async (id: string) => {
    if (confirm('Delete this video permanently?')) {
      const { error } = await supabase.from('product_videos').delete().eq('id', id);
      if (!error) {
        setExistingVideos(existingVideos.filter(vid => vid.id !== id));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload New Images
      const newImageUrls = [];
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          if (uploadError.message.includes('Bucket not found')) {
            throw new Error('Supabase Storage bucket "product-images" not found. Please create it in the dashboard.');
          }
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        newImageUrls.push(publicUrl);
      }

      // 1.1 Upload New Videos
      const newVideoUrls = [];
      for (const file of videos) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `videos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-videos')
          .upload(filePath, file);

        if (uploadError) {
          if (uploadError.message.includes('Bucket not found')) {
            throw new Error('Supabase Storage bucket "product-videos" not found. Please create it in the dashboard.');
          }
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-videos')
          .getPublicUrl(filePath);
        
        newVideoUrls.push(publicUrl);
      }

      let finalSlug = formData.slug;
      if (!productId) {
        const { data: existingSlugs, error: slugCheckError } = await supabase
          .from('products')
          .select('slug')
          .eq('slug', finalSlug);
          
        if (slugCheckError) throw slugCheckError;

        if (existingSlugs && existingSlugs.length > 0) {
          finalSlug = `${finalSlug}-${Date.now()}`;
        }
      }

      // 2. Upsert Product
      const productPayload = {
        name: formData.name,
        slug: finalSlug,
        price: parseFloat(formData.price),
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
        fabric: formData.fabric,
        color: formData.color,
        category_id: formData.category_id || null,
        description: formData.description,
        stock_status: formData.stock_status,
        is_featured: formData.is_featured,
        is_best_seller: formData.is_best_seller
      };

      let currentProductId = productId;

      if (productId) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productPayload)
          .eq('id', productId);
        if (updateError) throw updateError;
      } else {
        const { data: product, error: insertError } = await supabase
          .from('products')
          .insert([productPayload])
          .select()
          .single();
        if (insertError) throw insertError;
        currentProductId = product.id;
      }

      // 3. Insert new image links
      if (newImageUrls.length > 0) {
        const startingOrder = existingImages.length;
        const imageData = newImageUrls.map((url, index) => ({
          product_id: currentProductId,
          image_url: url,
          sort_order: startingOrder + index
        }));

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imageData);

        if (imagesError) throw imagesError;
      }

      // 4. Insert new video links
      if (newVideoUrls.length > 0) {
        const startingOrder = existingVideos.length;
        const videoData = newVideoUrls.map((url, index) => ({
          product_id: currentProductId,
          video_url: url,
          sort_order: startingOrder + index
        }));

        const { error: videosError } = await supabase
          .from('product_videos')
          .insert(videoData);

        if (videosError) throw videosError;
      }

      alert(productId ? 'Product updated successfully!' : 'Product added successfully!');
      router.push('/admin/products');
    } catch (err: any) {
      console.error(err);
      const message = err?.message || err?.error_description || 'An unexpected error occurred';
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-12 text-center font-bold text-primary animate-pulse">Loading Product Data...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-12 bg-black/40 backdrop-blur-xl p-6 md:p-12 rounded-3xl border-2 border-primary/50 shadow-2xl shadow-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Product Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Slug (URL Friendly)</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-muted/10 text-muted-foreground outline-none cursor-not-allowed"
              value={formData.slug}
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Price (₹)</label>
              <input 
                type="number" 
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Discount Price (₹)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary"
                value={formData.discount_price}
                onChange={(e) => setFormData({...formData, discount_price: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Fabric</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Pure Silk"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary"
                value={formData.fabric}
                onChange={(e) => setFormData({...formData, fabric: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Color</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Category</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all hover:border-primary cursor-pointer"
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Description</label>
            <textarea 
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-black/50 text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all hover:border-primary"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Product Images</label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Existing Images */}
              {existingImages.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden bg-muted group border border-muted">
                  <Image src={img.image_url} alt="Product" fill className="object-cover" sizes="100px" />
                  <button 
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {/* New Previews */}
              {previews.map((preview, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted group border-2 border-secondary">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-muted flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                <Upload size={24} className="text-muted-foreground mb-2" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Upload</span>
                <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Product Videos (Max 2)</label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Existing Videos */}
              {existingVideos.map((vid) => (
                <div key={vid.id} className="relative aspect-video rounded-xl overflow-hidden bg-black group border border-muted">
                  <video src={vid.video_url} className="w-full h-full object-cover" controls />
                  <button 
                    type="button"
                    onClick={() => removeExistingVideo(vid.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {/* New Previews */}
              {videoPreviews.map((preview, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-black group border-2 border-secondary">
                  <video src={preview} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeVideo(i)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(existingVideos.length + videos.length < 2) && (
                <label className="aspect-video rounded-xl border-2 border-dashed border-muted flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                  <Video size={24} className="text-muted-foreground mb-2" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Upload Video</span>
                  <input type="file" className="hidden" onChange={handleVideoChange} accept="video/mp4,video/webm,video/quicktime" />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 pt-4">
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                id="is_best_seller"
                className="w-5 h-5 rounded border-muted text-primary focus:ring-primary/20 cursor-pointer"
                checked={formData.is_best_seller}
                onChange={(e) => setFormData({...formData, is_best_seller: e.target.checked})}
              />
              <label htmlFor="is_best_seller" className="text-sm font-bold text-primary cursor-pointer">Add to Best Sellers</label>
            </div>
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                id="is_featured"
                className="w-5 h-5 rounded border-muted text-primary focus:ring-primary/20 cursor-pointer"
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
              />
              <label htmlFor="is_featured" className="text-sm font-bold text-primary cursor-pointer">Add to Featured Collections</label>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                className="px-4 py-2 rounded-lg border border-muted text-sm font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                value={formData.stock_status}
                onChange={(e) => setFormData({...formData, stock_status: e.target.value})}
              >
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-primary/20 flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="px-12 py-5 gold-gradient text-black rounded-full font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> <span>{productId ? 'Update Masterpiece' : 'Publish Masterpiece'}</span></>}
        </button>
      </div>
    </form>
  );
}
