/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
