import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Mantener en false para desarrollo
  },
  experimental: {
    typedRoutes: true,
  },
};
export default nextConfig;
