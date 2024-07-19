/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  images: {
    domains: ['budget-battles.s3.us-east-2.amazonaws.com'],
  },
  output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Add any custom configurations here
};

export default nextConfig;
