import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/solutions/supply-chain",
        destination: "/solutions/supply-chain-management",
        permanent: true,
      },
      {
        source: "/solutions/procurement",
        destination: "/solutions/supply-chain-management",
        permanent: true,
      },
      {
        source: "/solutions/oandm",
        destination: "/solutions/operation-and-maintenance",
        permanent: true,
      },
      {
        source: "/solutions/operation-maintenance",
        destination: "/solutions/operation-and-maintenance",
        permanent: true,
      },
      {
        source: "/solutions/health-check",
        destination: "/solutions/solar-plant-health-checkup",
        permanent: true,
      },
      {
        source: "/solutions/solar-plant-health-check-up",
        destination: "/solutions/solar-plant-health-checkup",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
