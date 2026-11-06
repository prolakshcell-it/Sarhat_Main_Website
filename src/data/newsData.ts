export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "Corporate" | "Project Milestone" | "Partnership" | "Policy & Industry" | "Technology";
  date: string;
  author: string;
  readTime: string;
  image: string;
  summary: string;
  featured?: boolean;
  content: string[];
  keyTakeaways: string[];
  pressReleaseUrl?: string;
  location?: string;
}

export const NEWS_CATEGORIES = [
  "All",
  "Corporate",
  "Project Milestone",
  "Partnership",
  "Policy & Industry",
  "Technology",
] as const;

export const newsArticles: NewsItem[] = [
  {
    id: "sarhat-secures-75mw-solar-bess-mandate-rajasthan",
    slug: "sarhat-secures-75mw-solar-bess-mandate-rajasthan",
    title: "Sarhat Energy Secures 75 MW Turnkey Solar + 20 MWh BESS EPC Mandate in Western Rajasthan",
    category: "Project Milestone",
    date: "October 24, 2026",
    author: "Corporate Communications",
    readTime: "4 min read",
    image: "/images/hero-solar.jpg",
    summary:
      "Sarhat Energy has been awarded full turnkey EPC responsibility for a 75 MW ground-mounted solar park co-located with a 20 MWh battery energy storage facility in Rajasthan's high-irradiance corridor.",
    featured: true,
    location: "Bikaner, Rajasthan",
    keyTakeaways: [
      "Full turnkey scope covers land civil grading, bifacial PV stringing, 20 MWh BESS enclosure, and 132kV DISCOM pooling substation.",
      "Project will deliver firm power into the western regional grid with scheduled commissioning inside 14 months.",
      "Features proprietary AI-driven automated robotic soiling wash systems to preserve module yield in arid desert terrains.",
    ],
    content: [
      "Sarhat Energy has finalized contract execution for a landmark 75 MW ground-mounted utility solar park integrated with a 20 MWh containerized Battery Energy Storage System (BESS) in Rajasthan.",
      "The project mandate encompasses complete site feasibility, precision MMS piling, bifacial N-type TOPCon module erection, dynamic single-axis tracker synchronization, and turnkey construction of a dedicated 132kV air-insulated substation (AIS).",
      "With high daytime solar generation and shifting evening tariff requirements across state DISCOMs, the 20 MWh lithium iron phosphate (LFP) storage system will provide automated frequency regulation, ramping control, and peak shaving into state evacuation feeders.",
      "Engineering deployment has commenced on site, with geotechnical test borings and substation civil foundations progressing ahead of schedule. The project targets commercial operation date (COD) within 14 calendar months under strict ISO-certified EHS standards.",
    ],
  },
  {
    id: "commissioning-220kv-substation-transmission-grid-sync",
    slug: "commissioning-220kv-substation-transmission-grid-sync",
    title: "Sarhat Energy Achieves Zero-Defect Grid Synchronization for 220/33 kV Central Substation",
    category: "Project Milestone",
    date: "September 18, 2026",
    author: "Grid Engineering Directorate",
    readTime: "3 min read",
    image: "/images/substation-project.jpg",
    summary:
      "Our electrical engineering teams have successfully charged and synchronized a 220/33 kV power evacuation substation, enabling multi-developer clean energy evacuation with zero CEIG defect remarks.",
    featured: false,
    location: "Central Transmission Corridor",
    keyTakeaways: [
      "Seamless charging with zero defect remarks from the Chief Electrical Inspector to Government (CEIG).",
      "Features dual 100 MVA power transformers, SF6 gas circuit breakers, and IEC 61850 compliant remote SCADA.",
      "Enables transmission connectivity for over 350 MW of upcoming solar parks across the regional pooling zone.",
    ],
    content: [
      "Sarhat Energy's High-Voltage Power Transmission division has officially commissioned a 220/33 kV central pooling substation, securing instant synchronisation approval from state transmission authorities.",
      "Built over 11 months across rugged terrain, the facility includes two 100 MVA oil-immersed power transformers, advanced numerical relay protection panels, remote RTU telemetry, and automated bay controllers.",
      "The evacuation facility is connected via a 14-kilometer double-circuit 220kV transmission line, engineered and strung by Sarhat's civil and transmission tower field crews.",
      "This commissioning milestone unlocks immediate transmission corridor access for multiple clean energy developers in the region, eliminating grid curtailment bottlenecks.",
    ],
  },
  {
    id: "strategic-partnership-tier1-bess-oems",
    slug: "strategic-partnership-tier1-bess-oems",
    title: "Sarhat Energy Inks Strategic Supply Framework with Tier-1 BESS Manufacturers",
    category: "Partnership",
    date: "August 30, 2026",
    author: "Strategic Procurement Cell",
    readTime: "5 min read",
    image: "/images/bess-substation.jpg",
    summary:
      "A long-term framework agreement guarantees supply access to over 200 MWh of liquid-cooled containerized battery storage systems for upcoming utility and C&I hybrid projects.",
    featured: false,
    location: "New Delhi, India",
    keyTakeaways: [
      "Volume framework agreement securing priority delivery slots for high-density containerized LFP cells.",
      "Guarantees 15-year performance warranties with integrated liquid thermal management for extreme Indian ambient temperatures.",
      "Strengthens Sarhat's supply chain predictability against global battery pricing fluctuations.",
    ],
    content: [
      "In a major step toward strengthening supply chain resilience for clean energy storage, Sarhat Energy has formalized a strategic framework agreement with leading global Tier-1 BESS manufacturers.",
      "The agreement secures reserved manufacturing bandwidth for up to 200 MWh of modular, liquid-cooled lithium-ion storage enclosures engineered specifically to operate under high ambient Indian summer conditions.",
      "Each storage block includes integrated thermal run-away containment, aerosol fire suppression systems, and smart Battery Management Systems (BMS) with cloud telemetry.",
      "This framework enables Sarhat to offer institutional developers guaranteed delivery timelines and fixed turnkey commercial terms across utility and industrial storage ventures.",
    ],
  },
  {
    id: "sarhat-field-safety-excellence-award-2026",
    slug: "sarhat-field-safety-excellence-award-2026",
    title: "Sarhat Energy Crosses 2.5 Million Safe Work Hours Across Active EPC Job Sites",
    category: "Corporate",
    date: "July 15, 2026",
    author: "EHS Corporate Council",
    readTime: "3 min read",
    image: "/images/timeline-2025.jpg",
    summary:
      "Demonstrating commitment to our People First philosophy, Sarhat Energy achieves 2,500,000 continuous hours worked with zero Lost Time Incidents (LTI) across all field operations.",
    featured: false,
    location: "Pan-India Job Sites",
    keyTakeaways: [
      "Zero Lost Time Incidents (LTI) maintained across 14 simultaneous high-voltage and civil project sites.",
      "Rigorous adherence to ISO 45001 safety frameworks and weekly interactive site hazard drills.",
      "Mandatory biometric safety clearances and regular heat-stress management camps for site personnel.",
    ],
    content: [
      "Sarhat Energy is proud to report a critical organizational safety benchmark: crossing 2.5 million consecutive safe work hours without a Lost Time Incident (LTI) across our pan-India sites.",
      "Operating simultaneously across utility-scale solar parks, high-voltage transmission lines, and heavy foundation piling, our site teams adhere to daily Toolbox Safety Talks (TBT), dynamic risk assessments, and zero-compromise personal protective equipment (PPE) enforcement.",
      "Our continuous safety training programs combine local language instructional modules, emergency medical drill simulations, and hydration monitoring during extreme heat periods.",
      "Safety is not merely a policy at Sarhat—it is our core cultural foundation. Every team member and contractor has the absolute authority to halt any activity if safe conditions are compromised.",
    ],
  },
  {
    id: "expanding-central-india-solar-execution-footprint",
    slug: "expanding-central-india-solar-execution-footprint",
    title: "Sarhat Energy Expands Central India Solar Portfolio with 42 MW C&I Group Captive Portfolio",
    category: "Project Milestone",
    date: "June 04, 2026",
    author: "Business Development Team",
    readTime: "4 min read",
    image: "/images/hero-solar.jpg",
    summary:
      "Expanding clean power delivery to industrial manufacturers, Sarhat kicks off execution for 42 MW of distributed group captive solar installations across key automotive and textile corridors.",
    featured: false,
    location: "Madhya Pradesh & Maharashtra",
    keyTakeaways: [
      "Delivering off-site group captive solar power for 8 multinational industrial off-takers.",
      "Projected to reduce off-taker electricity tariffs by 32% compared to standard grid industrial rates.",
      "Features remote SCADA metering and dedicated 33kV dedicated spur lines connecting to regional state transmission grids.",
    ],
    content: [
      "Sarhat Energy has commenced civil and electrical construction for a 42 MW portfolio of group captive solar plants dedicated to tier-1 manufacturing enterprises in Central India.",
      "Group captive solar models allow commercial consumers to procure clean energy at a predictable, fixed tariff for 25 years without incurring heavy initial capital expenditure.",
      "Our turnkey scope encompasses land aggregation, state open-access regulatory liaison, HT evacuation line design, string inverter installation, and SCADA telemetry.",
      "Once commissioned, the portfolio will generate over 68 million units of clean electricity annually, offsetting approximately 55,000 metric tons of carbon emissions.",
    ],
  },
  {
    id: "accelerating-pm-kusum-agricultural-feeders",
    slug: "accelerating-pm-kusum-agricultural-feeders",
    title: "Sarhat Energy Collaborates with State Agencies to Accelerate PM-KUSUM Feeder Solarization",
    category: "Policy & Industry",
    date: "May 12, 2026",
    author: "Regulatory Advisory Unit",
    readTime: "4 min read",
    image: "/images/agrivoltaics-project.jpg",
    summary:
      "Addressing rural electrification and farmer revenue enhancement, Sarhat establishes dedicated engineering task forces to expedite Component C solarization across regional DISCOM feeders.",
    featured: false,
    location: "Uttar Pradesh & Haryana",
    keyTakeaways: [
      "Targeted feeder solarization replacing daytime agricultural diesel consumption with decentralized solar power.",
      "Farmers gain stable supplementary income by exporting surplus daytime power to state DISCOMs.",
      "Sarhat provides comprehensive DPR planning, land vetting, and substation intertie engineering.",
    ],
    content: [
      "Decentralized solar generation under the PM-KUSUM initiative represents a transformative opportunity for rural economic resilience and agricultural modernization.",
      "Sarhat Energy's dedicated rural solar team is partnering with state nodal agencies and regional farmer cooperatives to execute feeder-level solar installations ranging from 1 MW to 5 MW.",
      "By placing solar generation directly adjacent to agricultural distribution substations, transmission losses are drastically curtailed while ensuring consistent 8-hour daytime irrigation power.",
      "Our engineering task forces provide turnkey feasibility audits, soil load testing, and swift CEIG safety inspection clearance to ensure accelerated project execution.",
    ],
  },
];

