import { Sun, Battery, Zap, Building2, type LucideIcon } from "lucide-react";

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
    id: "renewable-energy",
    tag: "CORE SOLUTION 01",
    title: "Renewable Energy",
    headline: "Utility Solar, Wind & C&I Systems",
    description: "Solar Parks, Rooftops, C&I Open Access, Wind Farms & Long-term O&M",
    fullDetails:
      "Complete turnkey execution and engineering for utility-scale solar parks, commercial & industrial rooftop installations, wind energy generation, and 24/7 O&M telemetry asset management.",
    specs: ["Solar Parks", "Rooftops & C&I", "Wind Farms", "Comprehensive O&M"],
    icon: Sun,
    image: "/images/hero-solar.jpg",
    accentColor: "#6DAD45",
  },
  {
    id: "bess-storage",
    tag: "CORE SOLUTION 02",
    title: "BESS & Battery Storage",
    headline: "Grid Stability & Energy Storage",
    description: "Containerized BESS, Solar + Storage Hybrids, Backup & Peak Shaving",
    fullDetails:
      "Utility-scale containerized Battery Energy Storage Systems (BESS), solar + storage hybrid integration, emergency backup power, and automated peak-load shaving.",
    specs: ["Containerized BESS", "Solar + Storage Hybrids", "Backup Power", "Peak Shaving"],
    icon: Battery,
    image: "/images/bess-substation.jpg",
    accentColor: "#5EE72D",
  },
  {
    id: "energy-infrastructure",
    tag: "CORE SOLUTION 03",
    title: "Energy & Grid Infrastructure",
    headline: "Substations & DISCOM Evacuation",
    description: "33kV/132kV/220kV Substations, Transmission Lines & SCADA",
    fullDetails:
      "High-voltage AIS/GIS substations, power evacuation transmission line corridors, relay protection panels, remote SCADA, and turnkey DISCOM grid connectivity.",
    specs: ["Substations (AIS/GIS)", "33kV/132kV/220kV Bays", "Evacuation Lines", "SCADA Protection"],
    icon: Zap,
    image: "/images/substation-project.jpg",
    accentColor: "#D4E012",
  },
  {
    id: "civil-infrastructure",
    tag: "CORE SOLUTION 04",
    title: "Civil & Industrial Infrastructure",
    headline: "Heavy Piling, Buildings & Works",
    description: "Access Roads, Foundation Piling, Control Buildings & Drainage",
    fullDetails:
      "Heavy-payload access roads, control room buildings, equipment foundation piling, industrial civil works, and comprehensive project site sub-structure.",
    specs: ["Access Roads", "Control Room Buildings", "Equipment Piling", "Site Drainage"],
    icon: Building2,
    image: "/images/agrivoltaics-project.jpg",
    accentColor: "#6DAD45",
  },
];

export const detailedSolutions = [
  {
    id: "renewable-energy",
    title: "Renewable Energy Solutions",
    badge: "01 • RENEWABLE POWER GENERATION",
    headline:
      "Renewable energy and battery storage technologies provide customers with cost-effective, reliable and rapidly deployable power generation.",
    description:
      "With our in-house expertise in development, engineering, site design, procurement, construction management and asset services, we deliver safe, scalable, environmentally and socially responsible utility-scale solar, wind, and storage solutions.",
    image: "/images/hero-solar.jpg",
    buttonText: "DISCOVER SOLAR & RENEWABLE SOLUTIONS →",
    breakdownItems: [
      {
        name: "Solar Parks",
        desc: "Large-scale utility ground-mounted PV arrays with optimized string layout and high bifacial module efficiency.",
        metric: "47+ MW Executed",
      },
      {
        name: "Rooftops",
        desc: "C&I roof-mounted systems converting factory roofs into high-yield captive energy generators.",
        metric: "35% Cost Savings",
      },
      {
        name: "C&I Open Access",
        desc: "Group captive & third-party wheeling PPA models reducing corporate power tariffs.",
        metric: "Zero Tariff Volatility",
      },
      {
        name: "Wind Energy",
        desc: "High-hub wind turbines complementing solar generation profiles for firm power.",
        metric: "High Capacity Factor",
      },
      {
        name: "Comprehensive O&M",
        desc: "24/7 telemetry monitoring, automated solar washing, and preventive asset maintenance.",
        metric: "99.2% Uptime",
      },
    ],
  },
  {
    id: "bess-storage",
    title: "BESS & Battery Storage",
    badge: "02 • ENERGY STORAGE SYSTEMS",
    headline:
      "Battery energy storage systems (BESS) support grid stability by storing electricity when supply is high and releasing it when needed most.",
    description:
      "Our engineers design and optimize containerized battery storage systems, ensuring seamless integration into renewable energy assets to guarantee round-the-clock firm power purchase agreements.",
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
      {
        name: "AI Battery Telemetry",
        desc: "Predictive cell health analytics tracking State-of-Charge (SoC) and thermal safety.",
        metric: "Smart BMS",
      },
    ],
  },
  {
    id: "energy-infrastructure",
    title: "Energy & Grid Infrastructure",
    badge: "03 • ENERGY INFRASTRUCTURE",
    headline:
      "Reliable power energy infrastructure connecting clean energy assets directly to state transmission utilities.",
    description:
      "We engineer, construct, and commission 33kV, 132kV, and 220kV substations, transmission lines, and SCADA protection bays to ensure zero-delay DISCOM synchronization.",
    image: "/images/substation-project.jpg",
    buttonText: "VIEW GRID SUBSTATION SOLUTIONS →",
    breakdownItems: [
      {
        name: "AIS & GIS Substations",
        desc: "Air-insulated and gas-insulated substations built for high-voltage power transmission.",
        metric: "33kV / 132kV / 220kV",
      },
      {
        name: "Terminal Bays",
        desc: "Dedicated state DISCOM evacuation bays equipped with SF6 circuit breakers.",
        metric: "Full CEIG Clearance",
      },
      {
        name: "EHV Evacuation Lines",
        desc: "Overhead transmission lines and underground cabling routes for evacuation.",
        metric: "Zero-Loss Conductor",
      },
      {
        name: "SCADA & Protection",
        desc: "Numerical protection relays, RTU, and remote telemetry system integration.",
        metric: "Real-Time Telemetry",
      },
      {
        name: "Grid Charging",
        desc: "Turnkey inspection, cold/hot testing, and state utility synchronization.",
        metric: "Zero-Defect COD",
      },
    ],
  },
  {
    id: "civil-infrastructure",
    title: "Civil & Industrial Infrastructure",
    badge: "04 • HEAVY CIVIL WORKS",
    headline:
      "Heavy-duty civil infrastructure built to withstand severe environmental loads and support utility energy assets.",
    description:
      "From heavy-payload access roads and control room buildings to foundation piling and drainage systems, our field engineering teams deliver durable site civil works.",
    image: "/images/agrivoltaics-project.jpg",
    buttonText: "DISCUSS CIVIL INFRASTRUCTURE →",
    breakdownItems: [
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
      {
        name: "Site Infrastructure",
        desc: "Peripheral security fencing, lighting towers, water supply networks, and drainage.",
        metric: "Turnkey Site Prep",
      },
      {
        name: "Industrial Earthworks",
        desc: "Precision site leveling, grading, and slope stabilization across rugged terrain.",
        metric: "LIDAR Precision",
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
