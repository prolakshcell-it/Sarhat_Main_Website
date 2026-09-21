export interface ProjectDetail {
  id: string;
  title: string;
  location: string;
  district: string;
  capacity: string;
  vertical: "Solar EPC" | "BESS Storage" | "Substation" | "Agrivoltaics" | "Civil Infra";
  discom: string;
  status: "Commissioned" | "In Execution" | "Advanced Engineering";
  completionYear: string;
  image: string;
  summary: string;
  keyHighlights: string[];
}

export interface StateProjectData {
  slug: string;
  name: string;
  code: string;
  region: string;
  mwInstalled: string;
  activeProjectsCount: number;
  discom: string;
  summary: string;
  mapCoords: { top: string; left: string };
  keyHubs: string[];
  projects: ProjectDetail[];
}

export const stateProjectsData: StateProjectData[] = [
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    code: "UP",
    region: "Central & Northern India",
    mwInstalled: "32.7 MW",
    activeProjectsCount: 13,
    discom: "UPPCL / UPNEDA / DGVCL",
    summary: "Sarhat's core operational footprint for utility-scale solar parks, 132kV DISCOM substation bays, and high-voltage power evacuation corridors across Bundelkhand and Purvanchal.",
    mapCoords: { top: "37%", left: "47%" },
    keyHubs: ["Bundelkhand", "Noida / Greater Noida", "Gorakhpur", "Jhansi"],
    projects: [
      {
        id: "up-proj-1",
        title: "75 MW Bundelkhand Utility Solar Park",
        location: "Jhansi District",
        district: "Jhansi",
        capacity: "75 MWp",
        vertical: "Solar EPC",
        discom: "UPPCL",
        status: "Commissioned",
        completionYear: "2025",
        image: "/images/hero-solar.jpg",
        summary: "Turnkey utility solar PV plant with tracker MMS structure and central inverter stations connected to 132kV grid bay.",
        keyHighlights: [
          "Bifacial N-Type PV Modules",
          "132kV Double Circuit Transmission Line",
          "Zero-Harm Safety Record across 450,000 Safe Hours",
        ],
      },
      {
        id: "up-proj-2",
        title: "132kV GIS Grid Evacuation Substation",
        location: "Greater Noida Industrial Zone",
        district: "Gautam Buddha Nagar",
        capacity: "132/33 kV (100 MVA)",
        vertical: "Substation",
        discom: "PVVNL",
        status: "Commissioned",
        completionYear: "2024",
        image: "/images/substation-project.jpg",
        summary: "High-voltage Gas Insulated Switchgear (GIS) substation for industrial C&I power evacuation and grid stability.",
        keyHighlights: [
          "Compact Footprint GIS Bay",
          "SCADA Remote Control & Fiber Optics Telemetry",
          "100 MVA Transformer Commissioning",
        ],
      },
      {
        id: "up-proj-3",
        title: "PM-KUSUM Component-C Feeder Solarization",
        location: "Gorakhpur Region",
        district: "Gorakhpur",
        capacity: "15 MWp",
        vertical: "Agrivoltaics",
        discom: "Purvanchal VVNL",
        status: "In Execution",
        completionYear: "2026",
        image: "/images/agrivoltaics-project.jpg",
        summary: "Agricultural feeder solarization delivering daylight power supply to 4,500+ regional tube-well farmers.",
        keyHighlights: [
          "Dedicated Agricultural Grid Feeder",
          "Ground Mount High-Clearance Structure",
          "UPNEDA Grid Wheeling Compliance",
        ],
      },
    ],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    code: "RJ",
    region: "Western India",
    mwInstalled: "45.0 MW",
    activeProjectsCount: 9,
    discom: "RRECL / JVVNL / AVVNL",
    summary: "High-irradiance solar installations, utility storage arrays, and open-access C&I power plants in the Thar desert solar corridor.",
    mapCoords: { top: "37%", left: "26%" },
    keyHubs: ["Jodhpur", "Bhadla Corridor", "Bikaner", "Jaipur"],
    projects: [
      {
        id: "rj-proj-1",
        title: "50 MW Desert Solar Park & BESS Hub",
        location: "Bhadla Solar Zone",
        district: "Jodhpur",
        capacity: "50 MW PV + 20 MWh BESS",
        vertical: "BESS Storage",
        discom: "RRECL",
        status: "Commissioned",
        completionYear: "2025",
        image: "/images/bess-substation.jpg",
        summary: "Integrated solar generation and containerized lithium-ion battery energy storage system for peak shaving.",
        keyHighlights: [
          "High Irradiance Bifacial Array",
          "20 MWh Containerized BESS Battery Reserve",
          "Instantaneous Frequency Regulation Control",
        ],
      },
      {
        id: "rj-proj-2",
        title: "220kV Grid Switchyard & Transmission Line",
        location: "Bikaner Clean Corridor",
        district: "Bikaner",
        capacity: "220/33 kV",
        vertical: "Substation",
        discom: "RVPNL",
        status: "In Execution",
        completionYear: "2026",
        image: "/images/substation-project.jpg",
        summary: "Extra High Voltage (EHV) substation bay and 28 km transmission corridor connecting regional RE generators.",
        keyHighlights: [
          "Double-Circuit EHV Line Towers",
          "Automated Protection Relays",
          "ISTS Grid Synchronization",
        ],
      },
    ],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    code: "GJ",
    region: "Western India",
    mwInstalled: "28.5 MW",
    activeProjectsCount: 7,
    discom: "GETCO / DGVCL / MGVCL",
    summary: "C&I open-access solar installations, coastal substation engineering, and industrial battery storage units across Gujarat industrial belts.",
    mapCoords: { top: "48%", left: "22%" },
    keyHubs: ["Kutch", "Surat", "Bharuch", "Ahmedabad"],
    projects: [
      {
        id: "gj-proj-1",
        title: "Kutch Hybrid Solar & BESS Corridor",
        location: "Kutch Renewable Hub",
        district: "Kutch",
        capacity: "35 MW PV + 15 MWh BESS",
        vertical: "BESS Storage",
        discom: "GETCO",
        status: "Commissioned",
        completionYear: "2024",
        image: "/images/bess-substation.jpg",
        summary: "Turnkey EPC execution for hybrid solar generation with coastal corrosion-resistant mounting structures.",
        keyHighlights: [
          "C5-M Coastal Anti-Corrosion MMS Structural Coating",
          "GETCO Bay Interconnection Approval",
          "High Output Double Glass Modules",
        ],
      },
      {
        id: "gj-proj-2",
        title: "Industrial C&I Open Access Solar Facility",
        location: "Bharuch Chemical Belt",
        district: "Bharuch",
        capacity: "18 MWp",
        vertical: "Solar EPC",
        discom: "DGVCL",
        status: "Commissioned",
        completionYear: "2025",
        image: "/images/hero-solar.jpg",
        summary: "Open-access group captive solar plant supplying clean power to continuous chemical manufacturing plants.",
        keyHighlights: [
          "100% Captive PPA Offtake",
          "Real-time Generation Telemetry",
          "Discom ABT Metering Compliance",
        ],
      },
    ],
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    code: "MP",
    region: "Central India",
    mwInstalled: "22.4 MW",
    activeProjectsCount: 6,
    discom: "MPMKVVCL / MPPMCL",
    summary: "Central India utility solar installations, PM-KUSUM feeder projects, and substation bay interconnections.",
    mapCoords: { top: "52%", left: "37%" },
    keyHubs: ["Bhopal", "Rewa Belt", "Indore", "Gwalior"],
    projects: [
      {
        id: "mp-proj-1",
        title: "Agrivoltaics & Dual-Use Farm Solar Project",
        location: "Bhopal Agricultural Belt",
        district: "Bhopal",
        capacity: "12 MWp",
        vertical: "Agrivoltaics",
        discom: "MPMKVVCL",
        status: "Commissioned",
        completionYear: "2025",
        image: "/images/agrivoltaics-project.jpg",
        summary: "Elevated PV structure allowing tractor cultivation underneath while supplying clean grid power.",
        keyHighlights: [
          "3.5m Elevated Structure Height",
          "Crop Yield & Solar Irrigation Dual Benefit",
          "PM-KUSUM Scheme Subsidy Compliance",
        ],
      },
    ],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    code: "KA",
    region: "Southern India",
    mwInstalled: "20.0 MW",
    activeProjectsCount: 5,
    discom: "KPTCL / BESCOM",
    summary: "Commercial & Industrial rooftop systems, high-density substation automation, and solar park engineering.",
    mapCoords: { top: "70%", left: "32%" },
    keyHubs: ["Bengaluru Tech Belt", "Tumakuru", "Hubballi"],
    projects: [
      {
        id: "ka-proj-1",
        title: "C&I Rooftop & Substation Integration",
        location: "Bengaluru Industrial Park",
        district: "Bengaluru Urban",
        capacity: "10 MWp Rooftop + 33kV Substation",
        vertical: "Solar EPC",
        discom: "BESCOM",
        status: "Commissioned",
        completionYear: "2024",
        image: "/images/hero-solar.jpg",
        summary: "High-density factory rooftop solar installation linked to dedicated 33kV step-up transformer bay.",
        keyHighlights: [
          "Zero Land Footprint Rooftop Setup",
          "Net-Metering & Banking Clearance",
          "Thermal Imaging Safety Audit",
        ],
      },
    ],
  },
];
