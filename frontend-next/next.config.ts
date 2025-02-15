import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    apiBaseUrl: "http://localhost:3001",
  },
};

export default nextConfig;
