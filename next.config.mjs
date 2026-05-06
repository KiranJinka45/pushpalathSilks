/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yxcotimyhjvvxxpyusic.supabase.co',
      },
    ],
  },
};

export default nextConfig;