import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
  poweredByHeader: false
};
export default nextConfig;
