# Pushpalatha Silk Sarees - E-commerce Catalog

A premium, mobile-first silk saree catalog website built with Next.js 14 and Supabase.

## Features
- **Premium Design**: Maroon, Gold, and Ivory aesthetic with Framer Motion animations.
- **Product Catalog**: Browsable grid with search, category, and price filters.
- **WhatsApp Checkout**: Direct enquiry system for orders via WhatsApp.
- **Admin Dashboard**: Secure management of products, categories, and inventory.
- **Image Management**: Integrated with Supabase Storage for product images.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database/Auth/Storage**: Supabase
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### 1. Prerequisites
- Node.js 18+ installed.
- A Supabase project with the schema applied from `supabase/schema.sql`.
- **Storage Buckets**: You MUST create two public buckets in your Supabase dashboard:
  - `product-images`: For product photography.
  - `product-videos`: For product showcase videos.

### 2. Environment Variables
The project is already configured with the provided Supabase keys in `.env.local`.

### 3. Database Setup
Ensure you run the SQL commands in `supabase/schema.sql` to create the following tables and set up RLS policies:
- `products`, `categories`, `profiles`
- `product_images`, `product_videos`
- `orders`, `order_items` (New for Phase 2)

### 4. SEO & Performance
- **Server Components**: Product details are now server-rendered for maximum SEO performance.
- **Dynamic Metadata**: Every product page generates unique title and meta tags.

### 3. Installation
```bash
npm install
```

### 4. Running Locally
```bash
npm run dev
```

### 5. Admin Access
1. Sign up as a new user on the `/signup` page.
2. In your Supabase Dashboard, go to the `profiles` table.
3. Find your user ID and change the `role` column from `'customer'` to `'admin'`.
4. You can now access the admin dashboard at `/admin`.

## Deployment
This project is ready for deployment on **Vercel**. Simply push to a GitHub repository and connect it to Vercel.
