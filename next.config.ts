import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The Product Lab used to live at /resources/vault — keep old links alive.
    // Long-form pieces retired in the lab restructure land on the lab index.
    const retired = [
      "african-creator-economy-report-2026",
      "african-startup-funding-2026",
      "woman-who-builds-in-nigeria",
      "are-african-founders-building-right",
      "digital-product-income-study",
    ];
    return [
      ...retired.map((slug) => ({
        source: `/resources/lab/${slug}`,
        destination: "/resources/lab",
        permanent: true,
      })),
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
