/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.iportal.ru', 'assets.vercel.com'],
  },
};

module.exports = nextConfig;
