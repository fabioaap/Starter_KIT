import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  transpilePackages: ["@starterkit/ui"]
};

export default nextConfig;
