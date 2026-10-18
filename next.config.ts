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
      {
        source: "/products/grounded-mounted-pv",
        destination: "/products/ground-mounted-pv",
        permanent: true,
      },
      {
        source: "/products/grounded-moutend-pv",
        destination: "/products/ground-mounted-pv",
        permanent: true,
      },
      {
        source: "/products/kusum",
        destination: "/products/ground-mounted-pv",
        permanent: true,
      },
      {
        source: "/products/ground-mounted-pv/kusum",
        destination: "/products/ground-mounted-pv",
        permanent: true,
      },
      {
        source: "/products/open-access-solar",
        destination: "/products/ground-mounted-pv/open-access",
        permanent: true,
      },
      {
        source: "/products/ground-mounted-pv/open-access-solar",
        destination: "/products/ground-mounted-pv/open-access",
        permanent: true,
      },
      {
        source: "/products/floating-solar",
        destination: "/products/floating-pv/surya-sarovar",
        permanent: true,
      },
      {
        source: "/products/surya-srover",
        destination: "/products/floating-pv/surya-sarovar",
        permanent: true,
      },
      {
        source: "/products/floating-pv/surya-srover",
        destination: "/products/floating-pv/surya-sarovar",
        permanent: true,
      },
      {
        source: "/products/canal-top-solar",
        destination: "/products/floating-pv/canal-top",
        permanent: true,
      },
      {
        source: "/products/floating-pv/canal-top-solar",
        destination: "/products/floating-pv/canal-top",
        permanent: true,
      },
      {
        source: "/products/agrivoltaics",
        destination: "/products/agri-pv",
        permanent: true,
      },
      {
        source: "/products/agrovoltaics",
        destination: "/products/agri-pv",
        permanent: true,
      },
      {
        source: "/products/agri-solar",
        destination: "/products/agri-pv",
        permanent: true,
      },
      {
        source: "/products/rooftop-solar",
        destination: "/products/rooftop/residential",
        permanent: true,
      },
      {
        source: "/products/residential-solar",
        destination: "/products/rooftop/residential",
        permanent: true,
      },
      {
        source: "/products/pm-surya-ghar",
        destination: "/products/rooftop/residential",
        permanent: true,
      },
      {
        source: "/products/c-and-i",
        destination: "/products/rooftop/industrial-commercial",
        permanent: true,
      },
      {
        source: "/products/c-and-i-solar",
        destination: "/products/rooftop/industrial-commercial",
        permanent: true,
      },
      {
        source: "/products/ci-solar",
        destination: "/products/rooftop/industrial-commercial",
        permanent: true,
      },
      {
        source: "/products/commercial-solar",
        destination: "/products/rooftop/industrial-commercial",
        permanent: true,
      },
      {
        source: "/products/industrial-solar",
        destination: "/products/rooftop/industrial-commercial",
        permanent: true,
      },
      {
        source: "/products/institutional-solar",
        destination: "/products/rooftop/institutional",
        permanent: true,
      },
      {
        source: "/products/school-solar",
        destination: "/products/rooftop/institutional",
        permanent: true,
      },
      {
        source: "/products/hospital-solar",
        destination: "/products/rooftop/institutional",
        permanent: true,
      },
      {
        source: "/products/bess",
        destination: "/products/bess-hybrid/standalone-bess",
        permanent: true,
      },
      {
        source: "/products/battery-storage",
        destination: "/products/bess-hybrid/standalone-bess",
        permanent: true,
      },
      {
        source: "/products/bess-storage",
        destination: "/products/bess-hybrid/standalone-bess",
        permanent: true,
      },
      {
        source: "/substations",
        destination: "/infrastructure/substations",
        permanent: true,
      },
      {
        source: "/switchyards",
        destination: "/infrastructure/substations",
        permanent: true,
      },
      {
        source: "/infrastructure/switchyards",
        destination: "/infrastructure/substations",
        permanent: true,
      },
      {
        source: "/solutions/substations",
        destination: "/infrastructure/substations",
        permanent: true,
      },
      {
        source: "/transmission",
        destination: "/infrastructure/transmission-lines",
        permanent: true,
      },
      {
        source: "/transmission-lines",
        destination: "/infrastructure/transmission-lines",
        permanent: true,
      },
      {
        source: "/products/transmission",
        destination: "/infrastructure/transmission-lines",
        permanent: true,
      },
      {
        source: "/solutions/transmission",
        destination: "/infrastructure/transmission-lines",
        permanent: true,
      },
      {
        source: "/solutions/transmission-lines",
        destination: "/infrastructure/transmission-lines",
        permanent: true,
      },
      {
        source: "/piling",
        destination: "/infrastructure/piling-foundations",
        permanent: true,
      },
      {
        source: "/piling-foundations",
        destination: "/infrastructure/piling-foundations",
        permanent: true,
      },
      {
        source: "/foundations",
        destination: "/infrastructure/piling-foundations",
        permanent: true,
      },
      {
        source: "/solutions/piling",
        destination: "/infrastructure/piling-foundations",
        permanent: true,
      },
      {
        source: "/solutions/piling-foundations",
        destination: "/infrastructure/piling-foundations",
        permanent: true,
      },
      {
        source: "/solutions/foundations",
        destination: "/infrastructure/piling-foundations",
        permanent: true,
      },
      {
        source: "/telecom",
        destination: "/infrastructure/telecom-towers",
        permanent: true,
      },
      {
        source: "/telecom-towers",
        destination: "/infrastructure/telecom-towers",
        permanent: true,
      },
      {
        source: "/telecommunication-towers",
        destination: "/infrastructure/telecom-towers",
        permanent: true,
      },
      {
        source: "/solutions/telecom",
        destination: "/infrastructure/telecom-towers",
        permanent: true,
      },
      {
        source: "/solutions/telecom-towers",
        destination: "/infrastructure/telecom-towers",
        permanent: true,
      },
      {
        source: "/industrial-buildings",
        destination: "/infrastructure/industrial-buildings",
        permanent: true,
      },
      {
        source: "/solutions/industrial-buildings",
        destination: "/infrastructure/industrial-buildings",
        permanent: true,
      },
      {
        source: "/commercial-buildings",
        destination: "/infrastructure/commercial-buildings",
        permanent: true,
      },
      {
        source: "/solutions/commercial-buildings",
        destination: "/infrastructure/commercial-buildings",
        permanent: true,
      },
      {
        source: "/infrastructure/commercial",
        destination: "/infrastructure/commercial-buildings",
        permanent: true,
      },
      {
        source: "/roads-drainage",
        destination: "/infrastructure/roads-drainage",
        permanent: true,
      },
      {
        source: "/solutions/roads-drainage",
        destination: "/infrastructure/roads-drainage",
        permanent: true,
      },
      {
        source: "/infrastructure/roads",
        destination: "/infrastructure/roads-drainage",
        permanent: true,
      },
      {
        source: "/infrastructure/drainage",
        destination: "/infrastructure/roads-drainage",
        permanent: true,
      },
      {
        source: "/products/roads",
        destination: "/infrastructure/roads-drainage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
