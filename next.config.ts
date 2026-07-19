import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The Product Lab used to live at /resources/vault — keep old links alive.
    return [
      {
        source: "/resources/vault",
        destination: "/resources/lab",
        permanent: true,
      },
      {
        source: "/resources/vault/:slug",
        destination: "/resources/lab/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
