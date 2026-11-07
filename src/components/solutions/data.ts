import { Sun, Battery, Zap, type LucideIcon } from "lucide-react";

export interface Capability {
  id: string;
  tag: string;
  title: string;
  headline?: string;
  description: string;
  fullDetails: string;
  specs: string[];
  icon: LucideIcon;
  image?: string;
  accentColor?: string;
}

export interface ServiceStage {
  id: string;
  num: string;
  name: string;
  headline: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    id: "solar-energy",
    tag: "CORE SOLUTION 01",
    title: "Solar Energy",
    headline: "Utility Solar Parks, Rooftops & C&I Clean Energy Systems",
    description: "Utility ground-mount solar, C&I rooftops, open access and long-term O&M.",
    fullDetails:
      "Complete turnkey execution and engineering for utility-scale solar parks, commercial & industrial rooftop installations, institutional projects, and 24/7 telemetry asset management.",
    specs: ["Utility Solar Parks", "Rooftops & C&I", "Open Access PPA", "Comprehensive O&M"],
    icon: Sun,
    image: "/images/hero-solar.jpg",
    accentColor: "#6DAD45",
  },
  {
    id: "bess-hybrid",
    tag: "CORE SOLUTION 02",
    title: "BESS & Hybrid",
    headline: "Containerized Storage Systems for Grid Stability & Firm Dispatch",
    description: "Containerized BESS, solar + storage hybrids, backup power and peak shaving.",
    fullDetails:
      "Utility-scale containerized Battery Energy Storage Systems (BESS), solar + storage hybrid integration, emergency backup power, and automated peak-load shaving.",
    specs: ["Containerized BESS", "Solar + Storage Hybrids", "Grid Frequency Support", "Peak Shaving"],
    icon: Battery,
    image: "/images/bess-substation.jpg",
    accentColor: "#5EE72D",
  },
  {
    id: "infrastructure",
    tag: "CORE SOLUTION 03",
    title: "Infrastructure",
    headline: "Turnkey Substations, Evacuation Corridors & Site Civil Works",
    description: "AIS/GIS substations, evacuation lines, control buildings and foundation piling.",
    fullDetails:
      "High-voltage AIS/GIS substations, power evacuation transmission line corridors, SCADA protection bays, heavy-payload access roads, control room buildings, and equipment foundation piling.",
    specs: ["AIS/GIS Substations", "EHV Evacuation Lines", "SCADA Protection", "Foundation Piling & Roads"],
    icon: Zap,
    image: "/images/substation-project.jpg",
    accentColor: "#D4E012",
  },
];

export const detailedSolutions = [
  {
    id: "solar-energy",
    title: "Solar Energy Solutions",
    badge: "SOLAR ENERGY",
    headline:
      "Utility-scale solar parks, rooftops, and high-efficiency photovoltaic systems.",
    description:
      "From land survey to CEIG commissioning and telemetry O&M, we engineer\nand construct high-yield solar assets with guaranteed performance.",
    image: "/images/hero-solar.jpg",
    buttonText: "DISCOVER SOLAR ENERGY SOLUTIONS →",
    breakdownItems: [
      {
        name: "Solar Parks",
        desc: "Large-scale utility ground-mounted PV arrays with optimized string layout and high bifacial module efficiency.",
        metric: "47+ MW Executed",
      },
      {
        name: "Rooftops & C&I",
        desc: "C&I roof-mounted systems converting factory roofs into high-yield captive energy generators.",
        metric: "35% Cost Savings",
      },
      {
        name: "C&I Open Access",
        desc: "Group captive & third-party wheeling PPA models reducing corporate power tariffs.",
        metric: "Zero Tariff Volatility",
      },
      {
        name: "Comprehensive O&M",
        desc: "24/7 telemetry monitoring, automated solar washing, and preventive asset maintenance.",
        metric: "99.2% Uptime",
      },
    ],
  },
  {
    id: "bess-hybrid",
    title: "BESS & Battery Storage",
    badge: "BESS ENERGY",
    headline:
      "Containerized battery storage systems for grid stability and dispatchable power.",
    description:
      "Our engineers integrate modular battery storage with solar assets to enable\nautomated peak shaving, frequency regulation, and steady 24/7 power.",
    image: "/images/bess-substation.jpg",
    buttonText: "EXPLORE BESS & STORAGE SOLUTIONS →",
    breakdownItems: [
      {
        name: "Containerized BESS",
        desc: "Pre-assembled lithium-ion & LFP storage containers with liquid thermal management.",
        metric: "Fast Dispatch",
      },
      {
        name: "Solar + Storage Hybrids",
        desc: "Co-located solar PV and battery storage maximizing PPA generation capacity.",
        metric: "24/7 RTC Power",
      },
      {
        name: "Grid Frequency Support",
        desc: "Sub-second response time for voltage regulation and state grid frequency control.",
        metric: "<20ms Response",
      },
      {
        name: "Peak Shaving",
        desc: "Shifting daytime peak solar power to high-demand evening tariff windows.",
        metric: "Peak Demand Control",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Grid & Civil Infrastructure",
    badge: "INFRASTRUCTURE",
    headline:
      "Turnkey substations, power evacuation lines, and heavy industrial civil works.",
    description:
      "From high-voltage AIS/GIS substations to access roads and control rooms,\nwe construct the physical backbone and foundations for utility assets.",
    image: "/images/substation-project.jpg",
    buttonText: "EXPLORE INFRASTRUCTURE SOLUTIONS →",
    breakdownItems: [
      {
        name: "AIS & GIS Substations",
        desc: "Air-insulated and gas-insulated substations built for high-voltage power transmission.",
        metric: "33kV / 132kV / 220kV",
      },
      {
        name: "EHV Evacuation Lines",
        desc: "Overhead transmission lines and underground cabling routes engineered for direct DISCOM sync.",
        metric: "Full CEIG Clearance",
      },
      {
        name: "SCADA & Protection",
        desc: "Numerical protection relays, RTU, and remote telemetry system integration.",
        metric: "Real-Time Telemetry",
      },
      {
        name: "Equipment Foundations",
        desc: "Transformer plinths, inverter room slabs, and MMS pile foundation load testing.",
        metric: "25-Yr Design Life",
      },
      {
        name: "Access Roads & Drainage",
        desc: "All-weather heavy vehicle access roads, culverts, and stormwater management.",
        metric: "All-Weather Access",
      },
      {
        name: "Control Buildings",
        desc: "Civil control room buildings housing SCADA servers, relay racks, and staff facilities.",
        metric: "Pre-Engineered Civil",
      },
    ],
  },
];

export const serviceStages: ServiceStage[] = [
  {
    id: "feasibility",
    num: "01",
    name: "Feasibility",
    headline: "Site Feasibility & Grid Audit",
    description: "Exhaustive site survey, solar resource mapping, land title check and DISCOM grid capacity analysis.",
  },
  {
    id: "engineering",
    num: "02",
    name: "Engineering",
    headline: "Detailed SLD & Technical Design",
    description: "Customized Single-Line Diagram (SLD) layout, PVSyst yield simulations and SCADA protection design.",
  },
  {
    id: "procurement",
    num: "03",
    name: "Procurement",
    headline: "Tier-1 Vendor Procurement",
    description: "Tier-1 module sourcing, inverter factory audits, transformer inspection and cable specs.",
  },
  {
    id: "construction",
    num: "04",
    name: "Construction",
    headline: "Civil & Electrical Assembly",
    description: "Precision foundation piling, MMS structure erection, string cabling and substation civil works.",
  },
  {
    id: "commissioning",
    num: "05",
    name: "Commissioning",
    headline: "Grid Evacuation & Charging",
    description: "Cold & hot electrical testing, CEIG inspection clearance, DISCOM tie-in and COD synchronization.",
  },
  {
    id: "oandm",
    num: "06",
    name: "O&M",
    headline: "24/7 Operations & Maintenance",
    description: "Real-time SCADA telemetry analytics, automated solar cleaning, and long-term asset health tracking.",
  },
];
