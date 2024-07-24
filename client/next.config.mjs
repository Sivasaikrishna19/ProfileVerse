import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_DEV_URL: process.env.NEXT_PUBLIC_DEV_URL,
    NEXT_PUBLIC_PROD_URL: process.env.NEXT_PUBLIC_PROD_URL,
    NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET_PROD: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET_PROD,
    NEXT_PUBLIC_LINKEDIN_CLIENT_ID_PROD: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID_PROD,
    NEXT_PUBLIC_LINKEDIN_REDIRECT_URI_PROD: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI_PROD,
  },
};

export default nextConfig;
