import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "http",
      hostname: "**"
    }, {
      protocol: "https",
      hostname: "**"
    }]
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/home',
      permanent: false
    }
  ]
  /* config options here */
};

export default nextConfig;
