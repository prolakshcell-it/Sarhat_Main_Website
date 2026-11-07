export interface ArticleSection {
  id: string;
  heading: string;
  content: string[];
  callout?: {
    quote: string;
    author?: string;
  };
  bulletList?: string[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: "Solar Engineering" | "Energy Storage" | "Grid & Substations" | "Policy & Finance" | "Execution & O&M";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  excerpt: string;
  tableOfContents: Array<{ id: string; title: string }>;
  sections: ArticleSection[];
}

export const ARTICLE_CATEGORIES = [
  "All",
  "Solar Engineering",
  "Energy Storage",
  "Grid & Substations",
  "Policy & Finance",
  "Execution & O&M",
] as const;

export const editorialArticles: ArticleItem[] = [
  {
    id: "bess-integration-at-scale-architecting-battery-storage-utility-grids",
    slug: "bess-integration-at-scale-architecting-battery-storage-utility-grids",
    title: "BESS Integration at Scale: Architecting Utility Battery Storage for Grid Stability and Peak Dispatch",
    category: "Energy Storage",
    author: {
      name: "Dr. K. R. Raghavan",
      role: "Head of Electrical & Storage Engineering",
    },
    date: "October 16, 2026",
    readTime: "7 min read",
    image: "/images/bess-substation.jpg",
    featured: true,
    excerpt:
      "A deep technical examination into how containerized lithium iron phosphate (LFP) energy storage systems solve renewable intermittency, frequency regulation, and transmission congestion across regional utility grids.",
    tableOfContents: [
      { id: "the-storage-imperative", title: "The Storage Imperative in Modern Grids" },
      { id: "battery-chemistry-thermal", title: "Chemistry Selection & Liquid Thermal Loops" },
      { id: "inverter-topologies-control", title: "Four-Quadrant PCS & Sub-Second P-Q Control" },
      { id: "fire-safety-nfpa855", title: "Deflagration Safety & NFPA 855 Compliance" },
      { id: "economic-dispatch-models", title: "Commercial Dispatch & Revenue Stacking" },
    ],
    sections: [
      {
        id: "the-storage-imperative",
        heading: "The Storage Imperative in Modern Grids",
        content: [
          "As regional renewable energy penetration crosses 25% of instantaneous peak demand, state electrical transmission grids encounter unprecedented dynamic stresses. The rapid withdrawal of synchronous rotational inertia—historically provided by coal and gas turbogenerators—leaves the grid susceptible to violent frequency excursion spikes during cloud transients or unexpected line trips.",
          "Battery Energy Storage Systems (BESS) are no longer discretionary green add-ons; they are essential structural assets that serve as the primary stabilizer for utility grid frequency, reactive power regulation, and spinning reserve margins.",
        ],
        callout: {
          quote:
            "A BESS system is not merely an energy accumulator; it is a four-quadrant dynamic power plant that operates in milliseconds where thermal plants require minutes.",
          author: "Sarhat Grid Advisory Council",
        },
      },
      {
        id: "battery-chemistry-thermal",
        heading: "Chemistry Selection & Liquid Thermal Loops",
        content: [
          "For utility and heavy industrial installations in India, Lithium Iron Phosphate (LFP) has emerged as the unchallenged chemistry of choice. Beyond its inherently stable olivine crystal structure that resists thermal runaway up to 270°C, modern LFP cells provide over 6,000 to 8,000 full equivalent cycles at 80% Depth-of-Discharge (DoD).",
          "However, cell lifespan in high-ambient tropical environments is strictly dictated by thermal uniformity. Traditional air-cooled enclosures suffer from severe localized thermal gradients exceeding 6°C across the rack height, accelerating cell capacity fade in upper modules.",
        ],
        bulletList: [
          "Closed-loop active liquid coolingplates maintaining inter-cell temperature variance below 2.0°C.",
          "Glycol-water coolant mixtures preventing internal corrosion and scaling inside micro-channels.",
          "Variable-speed compressor chillers modulating parasitic auxiliary power consumption dynamically.",
        ],
      },
      {
        id: "inverter-topologies-control",
        heading: "Four-Quadrant PCS & Sub-Second P-Q Control",
        content: [
          "The heart of any utility storage facility is the bidirectional Power Conversion System (PCS). Modern installations require four-quadrant operation capable of independent real power (P) and reactive power (Q) synthesis in all four operating quadrants.",
          "When localized transmission lines experience voltage sags due to heavy inductive industrial startup loads, the BESS can immediately inject reactive power (kVAR) to prop up bus voltage without discharging actual battery stored kilowatt-hours.",
          "Our engineering designs implement Grid-Forming (GFM) inverter control algorithms with virtual synchronous generator (VSG) dynamics, injecting synthetic inertia into the transmission node within 15 milliseconds of a frequency anomaly.",
        ],
      },
      {
        id: "fire-safety-nfpa855",
        heading: "Deflagration Safety & NFPA 855 Compliance",
        content: [
          "Ensuring structural and personnel safety across multi-megawatt battery enclosures mandates rigorous adherence to international standards including UL 9540A and NFPA 855.",
          "Sarhat's enclosure specifications demand multi-tier early detection telemetry: off-gas hydrogen and carbon monoxide sensors trigger automated containment protocol seconds before smoke or heat can be detected by optical sensors.",
          "Deflagration panels on container roofs provide directional upward pressure release, while condensed aerosol fire suppression systems chemically extinguish combustion radicals without water flooding.",
        ],
      },
      {
        id: "economic-dispatch-models",
        heading: "Commercial Dispatch & Revenue Stacking",
        content: [
          "The financial viability of a utility BESS relies on revenue stacking—the strategic combination of multiple contractual revenue streams from a single capital asset.",
          "By combining morning peak solar absorption with evening tariff arbitrage, frequency response capability payments from the state transmission utility, and capacity reservation contracts, developers achieve financial internal rates of return (IRR) surpassing 14.5%.",
          "Sarhat Energy assists project owners with advanced dispatch simulation modeling, ensuring battery cycling schedules stay optimized within manufacturer warranty throughput limits.",
        ],
      },
    ],
  },
  {
    id: "high-voltage-substation-synchronization-ceig-clearance-handbook",
    slug: "high-voltage-substation-synchronization-ceig-clearance-handbook",
    title: "High-Voltage Substation Synchronization: The Engineering Handbook for Zero-Defect CEIG Clearances",
    category: "Grid & Substations",
    author: {
      name: "S. N. Joshi",
      role: "VP — Power Systems & High-Voltage Transmission",
    },
    date: "September 28, 2026",
    readTime: "6 min read",
    image: "/images/substation-project.jpg",
    featured: false,
    excerpt:
      "A pragmatic field guide detailing how to design, test, and commission 132kV and 220kV power evacuation switchyards without regulatory delays, safety non-conformities, or DISCOM synchronization hold-ups.",
    tableOfContents: [
      { id: "the-regulatory-bottleneck", title: "The High Cost of Clearance Delays" },
      { id: "earth-mat-design-standards", title: "Earth Mat Engineering & Soil Resistivity" },
      { id: "transformer-testing-protocols", title: "Power Transformer Cold & Hot Benchmarks" },
      { id: "protection-relay-coordination", title: "Numerical Relay Scheme Coordination" },
      { id: "the-ceig-dossier-checklist", title: "The Zero-Defect CEIG Inspection Dossier" },
    ],
    sections: [
      {
        id: "the-regulatory-bottleneck",
        heading: "The High Cost of Clearance Delays",
        content: [
          "For renewable energy developers, the most financially perilous phase of project delivery is the critical window between mechanical completion and commercial operation date (COD). Every day a 100 MW solar plant sits idle waiting for Chief Electrical Inspector to Government (CEIG) clearance represents upwards of ₹12 to ₹15 Lakhs in lost PPA revenue.",
          "The overwhelming majority of clearance delays are completely avoidable. They stem not from equipment manufacturing defects, but from documentation oversights, incomplete earth resistance test sheets, and uncoordinated numerical protection relay curves.",
        ],
      },
      {
        id: "earth-mat-design-standards",
        heading: "Earth Mat Engineering & Soil Resistivity",
        content: [
          "The foundation of electrical safety in high-voltage switchyards is the buried earthing grid. Governed by IEEE 80 standards, the earth mat must maintain step and touch voltages below biological human fibrillation thresholds during maximum phase-to-ground fault current events.",
          "In high-resistivity soils common in rocky terrains, standard mild steel flats fail to deliver acceptable earth resistance below 0.5 ohms. Sarhat Energy utilizes deep chemical borehole earthing with bentonite compound backfills, connected to an electrolytic copper counterpoise mesh.",
        ],
        bulletList: [
          "Four-pin Wenner method soil resistivity surveys taken across 12 seasonal quadrant vectors.",
          "Equipotential mesh spacing designed with maximum 3m x 3m boundary conductor spacing.",
          "Dedicated independent earth pits for lightning arrestors (LA) and neutral grounding resistors (NGR).",
        ],
      },
      {
        id: "transformer-testing-protocols",
        heading: "Power Transformer Cold & Hot Benchmarks",
        content: [
          "Before state utility engineers permit energization, large power transformers must undergo meticulous cold diagnostic screening. Key diagnostic parameters include Sweep Frequency Response Analysis (SFRA) to verify core winding mechanical integrity after road transit.",
          "Transformer insulation resistance (IR), polarization index (PI), and magnetic balance tests must be recorded alongside oil dielectric breakdown voltage (BDV) tests showing minimum 60kV breakdown strength.",
        ],
      },
      {
        id: "protection-relay-coordination",
        heading: "Numerical Relay Scheme Coordination",
        content: [
          "DISCOM grid interties require foolproof protection discrimination. A fault within the developer's solar field must trip the localized string or feeder breaker without tripping the main 220kV interconnecting breaker, preventing regional grid instability.",
          "Sarhat's protection engineers perform comprehensive dynamic relay coordination studies using ETAP software, calibrating distance protection (21), differential relays (87T), overcurrent (50/51), and earth fault (50N/51N) curves with DISCOM substation relays.",
        ],
      },
      {
        id: "the-ceig-dossier-checklist",
        heading: "The Zero-Defect CEIG Inspection Dossier",
        content: [
          "Securing unconditional CEIG clearance requires submitting a comprehensive technical compliance dossier well in advance of the physical site inspection.",
          "Our dedicated regulatory team compiles certified factory test reports (FAT), type test certificates from accredited NABL labs, structural stability approvals, statutory safety clearance drawings, and calibrated secondary injection test records.",
          "By approaching substation delivery with systematic documentation rigor, Sarhat Energy consistently secures zero-defect charging clearances on the very first inspection attempt.",
        ],
      },
    ],
  },
  {
    id: "bifacial-pv-yield-optimization-albedo-pitch-single-axis-trackers",
    slug: "bifacial-pv-yield-optimization-albedo-pitch-single-axis-trackers",
    title: "Bifacial PV Yield Optimization: Computational Modeling of Ground Albedo, Row Pitch, and Tracker Backtracking",
    category: "Solar Engineering",
    author: {
      name: "Harshita Arora",
      role: "Strategic Engineering & Yield Optimization",
    },
    date: "August 22, 2026",
    readTime: "8 min read",
    image: "/images/hero-solar.jpg",
    featured: false,
    excerpt:
      "A technical deep dive into maximizing the rear-side energy gain of bifacial N-type TOPCon modules through albedo enhancement, structural elevation, and smart tracker algorithms.",
    tableOfContents: [
      { id: "bifacial-gain-physics", title: "The Physics of Rear-Side Bifacial Yield" },
      { id: "albedo-ground-reflection", title: "Ground Albedo Dynamics & Reflective Materials" },
      { id: "elevation-and-shading", title: "Structural Height & Torque-Tube Shading Factors" },
      { id: "smart-backtracking-algorithms", title: "Machine-Learning Astronomical Backtracking" },
      { id: "levelized-cost-of-energy", title: "LCOE Sensitivity & Financial Payback" },
    ],
    sections: [
      {
        id: "bifacial-gain-physics",
        heading: "The Physics of Rear-Side Bifacial Yield",
        content: [
          "With the rapid market transition from mono-facial PERC to N-type TOPCon and HJT cells, bifaciality factors have risen from 70% to upwards of 85%. This means the module rear surface converts reflected sunlight into electrical current with 85% of the efficiency of the front glass.",
          "However, harvesting rear-side photons requires careful optical design. Bifacial yield is not a static constant—it is an intricate function of ground surface albedo, structural elevation clearance, pitch-to-width ground coverage ratio (GCR), and structural self-shading.",
        ],
      },
      {
        id: "albedo-ground-reflection",
        heading: "Ground Albedo Dynamics & Reflective Materials",
        content: [
          "Ground albedo measures the fraction of global horizontal solar irradiance reflected by the earth's surface back toward the module rear face. Natural terrain types exhibit drastically differing albedo profiles.",
        ],
        bulletList: [
          "Desert light-colored sand and limestone gravel: 28% to 34% albedo reflection.",
          "Agricultural loamy soil and dry grassland: 16% to 22% albedo reflection.",
          "Artificially enhanced white geotextile fabric overlays: 55% to 70% albedo reflection.",
        ],
      },
      {
        id: "elevation-and-shading",
        heading: "Structural Height & Torque-Tube Shading Factors",
        content: [
          "One of the most common engineering oversights in bifacial tracker deployment is insufficient torque-tube clearance. Mounting bifacial modules directly flush against round or octagonal structural torque tubes creates deep linear shadow bars across the rear cells, causing localized current mismatch and diode bypass activation.",
          "Sarhat's tracker specifications mandate a minimum 120mm air gap between the torque tube and the rear module glass, supported by 1.6-meter minimum torque-tube axis height to maximize diffuse ground light capture.",
        ],
      },
      {
        id: "smart-backtracking-algorithms",
        heading: "Machine-Learning Astronomical Backtracking",
        content: [
          "Conventional astronomical tracking algorithms align panels strictly perpendicular to the calculated solar vector. Early in the morning and late in the afternoon, adjacent tracker rows cast long horizontal shadows onto one another, causing severe module mismatch.",
          "Standard backtracking algorithms rotate panels flatter to prevent front-surface row-to-row shading. However, our smart AI backtracking software models both front direct irradiance and diffuse rear-side reflection simultaneously.",
          "During overcast or high-diffuse days, the software tilts arrays into optimal diffused scatter angles, capturing up to 6.2% more net daily kilowatt-hours than rigid astronomical clocks.",
        ],
      },
      {
        id: "levelized-cost-of-energy",
        heading: "LCOE Sensitivity & Financial Payback",
        content: [
          "While single-axis trackers and bifacial modules introduce a 7% to 10% premium in initial capital expenditure (CAPEX), the resulting 18% to 24% uplift in annual specific generation (kWh/kWp) drives the Levelized Cost of Energy (LCOE) down significantly.",
          "For utility scale IPPs and institutional long-term asset holders, optimized bifacial tracker plants represent the highest internal rate of return (IRR) profile available in the modern solar infrastructure market.",
        ],
      },
    ],
  },
  {
    id: "commercial-industrial-open-access-solar-group-captive-tariff-economics",
    slug: "commercial-industrial-open-access-solar-group-captive-tariff-economics",
    title: "Commercial & Industrial Open Access: The CFO's Guide to Group Captive Solar & Long-Term Tariff Hedging",
    category: "Policy & Finance",
    author: {
      name: "Ajay Singh",
      role: "Chief Financial Officer",
    },
    date: "July 19, 2026",
    readTime: "6 min read",
    image: "/images/timeline-2025.jpg",
    featured: false,
    excerpt:
      "A financial analysis of group captive solar regulations, cross-subsidy surcharge exemptions, wheeling economics, and risk allocation frameworks for industrial power consumers.",
    tableOfContents: [
      { id: "industrial-tariff-inflation", title: "The Industrial Power Tariff Inflation Curve" },
      { id: "group-captive-regulatory-rules", title: "The 26% Equity / 51% Consumption Rule" },
      { id: "wheeling-losses-banking", title: "Wheeling Charges, State Banking & Surcharges" },
      { id: "financial-structuring", title: "Structuring the SPV & Balance Sheet Treatment" },
      { id: "actionable-roadmap", title: "Execution Roadmap for Manufacturing CFOs" },
    ],
    sections: [
      {
        id: "industrial-tariff-inflation",
        heading: "The Industrial Power Tariff Inflation Curve",
        content: [
          "Industrial power tariffs across state electricity distribution companies in India have escalated at a compound annual growth rate (CAGR) of 5.5% to 8% over the past decade. For energy-intensive industries such as steel, chemicals, automotive, and data centers, power represents 25% to 45% of total operating expenditure.",
          "Open-access solar allows commercial consumers to break free from unpredictable grid tariff escalation by securing fixed, long-term clean electricity tariffs for 25 continuous years.",
        ],
      },
      {
        id: "group-captive-regulatory-rules",
        heading: "The 26% Equity / 51% Consumption Rule",
        content: [
          "Under the Indian Electricity Act 2003 and Electricity Rules 2005, group captive projects enjoy a massive statutory incentive: complete exemption from Cross-Subsidy Surcharge (CSS) and Additional Surcharge (AS).",
          "To qualify as a genuine group captive entity, the captive consumers must collectively hold a minimum of 26% of the equity share capital with voting rights in the project Special Purpose Vehicle (SPV), and consume at least 51% of the electricity generated annually in proportion to their shareholding.",
        ],
        callout: {
          quote:
            "Exemption from Cross-Subsidy Surcharge saves industrial off-takers between ₹1.80 and ₹2.60 per unit of electricity, transforming solar economics into an immediate margin driver.",
          author: "Sarhat Corporate Advisory Group",
        },
      },
      {
        id: "wheeling-losses-banking",
        heading: "Wheeling Charges, State Banking & Surcharges",
        content: [
          "While CSS is exempted, off-site solar power delivered via the state transmission network is subject to state transmission utility (STU) wheeling charges and technical transmission losses.",
          "State renewable energy policies differ significantly in their treatment of energy banking—the ability to inject solar energy into the grid during peak daytime generation and withdraw it during evening factory operating shifts.",
          "Sarhat Energy's regulatory advisory team conducts granular state-by-state landed cost audits, calculating exact net delivered tariffs inclusive of open access charges, stamp duties, and metering fees.",
        ],
      },
      {
        id: "financial-structuring",
        heading: "Structuring the SPV & Balance Sheet Treatment",
        content: [
          "In a standard group captive arrangement, the industrial consumer invests only 26% of the project equity (equivalent to roughly 7.5% of total project capital cost in a 70:30 debt-equity capital structure). The developer (Sarhat Energy) brings the remaining 74% equity and arranges project debt financing.",
          "This capital-light structure allows manufacturing CFOs to secure multi-crore annual operational savings without tying up valuable balance sheet debt capacity that is better allocated to core manufacturing expansion.",
        ],
      },
      {
        id: "actionable-roadmap",
        heading: "Execution Roadmap for Manufacturing CFOs",
        content: [
          "Navigating open access requires careful sequencing: contract load audit, state nodal agency registration, connectivity feasibility sanction, land aggregation, PPA finalization, CEIG inspection, and open access operationalization.",
          "Sarhat Energy acts as single-source turnkey partner, managing engineering, procurement, construction, and long-term regulatory compliance under a unified delivery framework.",
        ],
      },
    ],
  },
  {
    id: "predictive-om-ai-thermal-telemetry-reducing-solar-soiling-losses",
    slug: "predictive-om-ai-thermal-telemetry-reducing-solar-soiling-losses",
    title: "Predictive O&M: Utilizing AI Thermal Telemetry and String Analytics to Eliminate Solar Underperformance",
    category: "Execution & O&M",
    author: {
      name: "Rajesh Kumar",
      role: "General Manager — Projects & Asset Operations",
    },
    date: "June 11, 2026",
    readTime: "5 min read",
    image: "/images/agrivoltaics-project.jpg",
    featured: false,
    excerpt:
      "How continuous automated string-level telemetry, drone thermography, and predictive maintenance algorithms maximize multi-gigawatt solar asset revenue and minimize unscheduled downtime.",
    tableOfContents: [
      { id: "the-hidden-losses", title: "The Hidden Losses in Operational Solar" },
      { id: "drone-thermography-hotspots", title: "High-Resolution Drone Thermography & Hotspots" },
      { id: "string-telemetry-algorithms", title: "Real-Time String Current Anomaly Detection" },
      { id: "predictive-soiling-indexes", title: "Predictive Soiling Index & Waterless Cleaning" },
      { id: "asset-longevity", title: "Preserving 25-Year Equipment Warranties" },
    ],
    sections: [
      {
        id: "the-hidden-losses",
        heading: "The Hidden Losses in Operational Solar",
        content: [
          "In utility-scale solar parks, minor faults often go undetected by basic plant-level SCADA systems. A failed bypass diode, micro-cracks from thermal cycling, or localized PID degradation inside a few module strings can silently drag down plant-wide revenue by 3% to 5% annually.",
          "Conventional reactive maintenance—where technicians inspect panels only after inverter failure alarms trigger—costs developers crores in lost generation. Predictive O&M transforms asset operations by identifying degradation signatures before catastrophic failure occurs.",
        ],
      },
      {
        id: "drone-thermography-hotspots",
        heading: "High-Resolution Drone Thermography & Hotspots",
        content: [
          "Sarhat Energy utilizes automated aerial drone thermography equipped with radiometric thermal sensors and RTK GPS positioning. Flights conducted according to IEC 62446-3 standards map thermal anomalies down to sub-centimeter cell precision.",
          "Computer vision models automatically categorize thermal defects into hot spots, bypassed substrings, potential induced degradation (PID), and cracked cell junction boxes, generating geo-tagged work orders for field technicians.",
        ],
      },
      {
        id: "string-telemetry-algorithms",
        heading: "Real-Time String Current Anomaly Detection",
        content: [
          "By monitoring DC current values from every individual PV string across multi-inverter arrays, our AI telemetry engine compares expected physics-modeled performance against real-time measured output.",
          "If string #14 in block 3 drops 8% below neighboring strings under identical irradiance and temperature conditions, the system immediately flags a localized anomaly—whether caused by localized bird drop soiling, blown fuse, or loose MC4 connector.",
        ],
      },
      {
        id: "predictive-soiling-indexes",
        heading: "Predictive Soiling Index & Waterless Cleaning",
        content: [
          "Soiling losses vary dramatically by season, agricultural harvesting activities, and wind direction. Cleaning panels too frequently wastes water and labor; cleaning too infrequently sacrifices kilowatt-hour revenue.",
          "Our software calculates a dynamic Soiling Index by measuring optical transmission losses against clean reference cells. Automated cleaning cycles are dispatched only when the marginal financial value of recovered energy exceeds the operational cost of the cleaning run.",
        ],
      },
      {
        id: "asset-longevity",
        heading: "Preserving 25-Year Equipment Warranties",
        content: [
          "Rigorous predictive O&M is the legal shield that protects equipment warranties with Tier-1 module, inverter, and transformer manufacturers.",
          "Documented thermographic scans, insulation resistance logs, and transformer dissolved gas analysis (DGA) records provide indisputable forensic proof required for warranty claims and insurance audits.",
        ],
      },
    ],
  },
  {
    id: "pm-kusum-agricultural-feeder-solarization-execution-challenges",
    slug: "pm-kusum-agricultural-feeder-solarization-execution-challenges",
    title: "PM-KUSUM Feeder Solarization: Overcoming Land, Interconnection, and Operational Hurdles in Rural EPC",
    category: "Policy & Finance",
    author: {
      name: "Ajit Shah",
      role: "Vice President — Business Development & Liaison",
    },
    date: "May 08, 2026",
    readTime: "5 min read",
    image: "/images/timeline-2025.jpg",
    featured: false,
    excerpt:
      "Practical engineering and liaison lessons from deploying distributed 1 MW to 5 MW solar plants at rural 33/11 kV distribution substations under Component C of the PM-KUSUM scheme.",
    tableOfContents: [
      { id: "the-decentralized-promise", title: "The Promise of Decentralized Rural Solar" },
      { id: "feeder-capacity-audits", title: "33/11 kV Substation Feeder Capacity Audits" },
      { id: "land-aggregation-micro-sites", title: "Micro-Site Land Vetting & Topography" },
      { id: "reverse-power-flow", title: "Mitigating Reverse Power Flow on Weak Feeders" },
      { id: "farmer-cooperatives", title: "Community Partnerships & Sustainable Livelihoods" },
    ],
    sections: [
      {
        id: "the-decentralized-promise",
        heading: "The Promise of Decentralized Rural Solar",
        content: [
          "India's agricultural sector consumes over 20% of national electricity generation, heavily subsidized by state governments and burdened by high transmission and distribution (T&D) losses on rural 11kV lines.",
          "Component C of the PM-KUSUM scheme flips this dynamic on its head by deploying distributed solar plants directly at or near rural 33/11 kV substations. Daytime irrigation power is generated locally, cutting T&D losses and providing farmers with reliable, un-curtailed solar energy.",
        ],
      },
      {
        id: "feeder-capacity-audits",
        heading: "33/11 kV Substation Feeder Capacity Audits",
        content: [
          "Rural substations were frequently constructed decades ago without modern bi-directional protection schemes. Before committing capital to a 2 MW or 3 MW feeder solar plant, comprehensive substation capacity audits are mandatory.",
          "Sarhat's technical teams inspect existing 11kV busbar ratings, transformer MVA capacity, breaker interrupt ratings, and line conductor sizes to prevent thermal overloading during peak midday generation hours.",
        ],
      },
      {
        id: "land-aggregation-micro-sites",
        heading: "Micro-Site Land Vetting & Topography",
        content: [
          "Unlike 500-acre contiguous utility solar parks, PM-KUSUM projects require 4 to 15 acres situated strictly within a 5-kilometer radius of the target distribution substation.",
          "Aggregating smaller agricultural plots demands empathetic farmer engagement, clear revenue-lease contracts, and meticulous title verification to avoid localized property disputes.",
        ],
      },
      {
        id: "reverse-power-flow",
        heading: "Mitigating Reverse Power Flow on Weak Feeders",
        content: [
          "During non-irrigation seasons (such as pre-monsoon fallow periods), agricultural agricultural pump loads drop to near zero. Solar generation on the feeder must reverse-flow through the 33/11 kV transformer back into the 33kV sub-transmission network.",
          "We engineer directional overcurrent and earth fault protection relays paired with smart tap-changing transformer controllers to maintain voltage regulation within statutory +/- 6% limits.",
        ],
      },
      {
        id: "farmer-cooperatives",
        heading: "Community Partnerships & Sustainable Livelihoods",
        content: [
          "The ultimate metric of rural solar success is community trust. Sarhat Energy prioritizes local hiring for site civil grading, mounting structure assembly, and ongoing plant security and maintenance.",
          "By creating dependable localized green jobs and providing lease income to regional landowners, PM-KUSUM projects cultivate long-term shared prosperity across India's agricultural heartlands.",
        ],
      },
    ],
  },
];

