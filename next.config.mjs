/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Add any custom configurations here
};

export default nextConfig;
