import { supabase } from '@/lib/supabase';
import ProductClient from './ProductClient';
import { Metadata } from 'next';
import Link from 'next/link';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('name, description, product_images(image_url)')
    .eq('slug', slug)
    .single();

  if (!product) return { title: 'Product Not Found | Pushpalatha Silk Sarees' };

  const rawProduct = product as any;
  const imageUrl = rawProduct.product_images?.[0]?.image_url || 'https://www.pushpalathasilks.com/placeholder-saree.jpg';

  return {
    title: `${product.name} | Pushpalatha Silk Sarees`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1200,
          alt: product.name,
        },
      ],
    }
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      categories(name),
      product_images(*),
      product_videos(*)
    `)
    .eq('slug', slug)
    .single();

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-primary">Product Not Found</h1>
        <Link href="/products" className="text-secondary hover:underline">Return to Collection</Link>
      </div>
    );
  }

  const raw = data as unknown as {
    categories: { name: string } | null;
    product_images: { image_url: string; sort_order: number }[];
    product_videos: { video_url: string; sort_order: number }[];
  };

  const product = {
    ...data,
    category: raw.categories?.name || 'Uncategorized',
    images: raw.product_images
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => img.image_url),
    videos: raw.product_videos
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((vid) => vid.video_url)
  };

  return <ProductClient product={product} />;
}
