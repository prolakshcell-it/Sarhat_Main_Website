export interface CaseStudyMetric {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudyStep {
  phase: string;
  title: string;
  desc: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  clientSector: string;
  category: "Utility Solar" | "BESS & Storage" | "Substations & Grid" | "C&I Rooftops";
  location: string;
  capacity: string;
  completionYear: string;
  image: string;
  featured?: boolean;
  summary: string;
  metrics: CaseStudyMetric[];
  challenge: {
    title: string;
    paragraphs: string[];
    keyPoints: string[];
  };
  solution: {
    title: string;
    paragraphs: string[];
    technicalSpecs: Array<{ label: string; value: string }>;
  };
  implementation: {
    title: string;
    steps: CaseStudyStep[];
  };
  results: {
    title: string;
    paragraphs: string[];
    outcomes: string[];
  };
}

export const CASE_STUDY_CATEGORIES = [
  "All",
  "Utility Solar",
  "BESS & Storage",
  "Substations & Grid",
  "C&I Rooftops",
] as const;

export const caseStudies: CaseStudyItem[] = [
  {
    id: "50mw-utility-scale-solar-park-rajasthan",
    slug: "50mw-utility-scale-solar-park-rajasthan",
    title: "50 MW Utility Solar Park with Automated Robotic Cleaning in High-Dust Desert Terrain",
    clientSector: "Independent Power Producer (IPP)",
    category: "Utility Solar",
    location: "Bikaner District, Rajasthan",
    capacity: "50 MWp (DC) / 40 MW (AC)",
    completionYear: "2025",
    image: "/images/hero-solar.jpg",
    featured: true,
    summary:
      "Engineered and constructed across 210 acres of undulating desert terrain, delivering 99.4% plant availability with automated waterless robotic soiling mitigation and 132kV dedicated substation interconnection.",
    metrics: [
      { label: "Plant Availability", value: "99.4%", detail: "Consistent uptime recorded across 18 operational months" },
      { label: "Execution Speed", value: "38 Days", detail: "Synchronized ahead of strict contractual COD deadline" },
      { label: "Annual Generation", value: "84.2 GWh", detail: "Powering equivalent of 45,000 regional households" },
      { label: "Water Savings", value: "1.8M Ltr/Yr", detail: "Achieved via waterless automated robotic cleaning systems" },
    ],
    challenge: {
      title: "Harsh Desert Soil Mechanics, High Wind Loads & Extreme Ambient Heat",
      paragraphs: [
        "The project site presented severe geotechnical challenges characterized by shifting sand dunes, localized loose silt layers, and seasonal desert dust storms producing rapid soiling loss up to 18% per week.",
        "Traditional pile driving threatened structural foundation displacement under seasonal 140 km/h wind gusts. Additionally, scarce local groundwater meant conventional water-based module cleaning was environmentally and financially non-viable.",
        "The client required complete delivery, cold testing, and 132kV grid synchronization within 11 calendar months to satisfy PPA tariff validity.",
      ],
      keyPoints: [
        "Unstable sandy desert topography requiring specialized structural pile foundation testing.",
        "Severe module soiling rates leading to rapid generation degradation without sustainable cleaning.",
        "Stringent 132kV grid connection parameters with zero-tolerance harmonics requirements.",
      ],
    },
    solution: {
      title: "Cast-in-Situ Reinforced Piling, 1P Single-Axis Trackers & Waterless Robotics",
      paragraphs: [
        "Sarhat Energy's engineering team deployed customized bored cast-in-situ reinforced concrete friction piles, designed to withstand intense upward uplift forces during high-velocity desert wind events.",
        "We integrated 1P single-axis tracking systems programmed with backtracking algorithms, paired with high-efficiency bifacial N-type TOPCon solar modules to harvest high reflected ground albedo.",
        "To conquer the dust challenge without precious groundwater, Sarhat commissioned self-powered, autonomous waterless robotic cleaning shuttles operating daily across every string line before sunrise.",
      ],
      technicalSpecs: [
        { label: "PV Modules", value: "Bifacial N-Type TOPCon 580Wp" },
        { label: "Tracking System", value: "1P Horizontal Single-Axis Trackers" },
        { label: "Inverters", value: "Central Inverter Stations (3.125 MVA blocks)" },
        { label: "Substation", value: "132/33 kV Air-Insulated Switchyard" },
        { label: "Cleaning Tech", value: "Autonomous Waterless Dry-Wipe Robotics" },
        { label: "Telemetry", value: "Fibre-Optic SCADA with Cloud Analytics" },
      ],
    },
    implementation: {
      title: "Fast-Track Modular Delivery in 4 Phased Stages",
      steps: [
        {
          phase: "Phase 1: Civil & Geotech",
          title: "Precision Topographical Grading & Pile Load Pull Tests",
          desc: "Completed 3D contour drone mapping and over 120 pull-out and lateral pile load tests to finalize foundation embedment depth.",
        },
        {
          phase: "Phase 2: MMS & Module Installation",
          title: "Tracker Assembly & Rapid Bifacial Stringing",
          desc: "Assembled 14,000+ tracker bays and interconnected 86,000+ modules using automated torque verification protocols.",
        },
        {
          phase: "Phase 3: Substation & Evacuation",
          title: "132kV Pooling Switchyard & Bay Erection",
          desc: "Turnkey construction of the 132/33 kV pooling substation, transformer placement, and relay protection panel wiring.",
        },
        {
          phase: "Phase 4: Commissioning & COD",
          title: "Hot Testing, CEIG Clearance & Full Grid Sync",
          desc: "Executed comprehensive cold/hot trials and secured Chief Electrical Inspector approval with zero non-conformity marks.",
        },
      ],
    },
    results: {
      title: "Industry-Benchmark Performance and Long-Term Value",
      paragraphs: [
        "The 50 MW plant was successfully synchronized 38 days ahead of contractual COD. Performance Ratio (PR) audits conducted by independent technical advisors verified a stellar 82.6% benchmark.",
        "The automated waterless robotic cleaning system preserved generation yield while conserving over 1.8 million liters of scarce desert groundwater every single operational year.",
        "Sarhat Energy continues to maintain full operational responsibility under a 5-year comprehensive O&M contract, ensuring sustained uptime above 99.4%.",
      ],
      outcomes: [
        "84.2 GWh of clean energy delivered annually into the state transmission utility.",
        "Over 68,000 metric tons of CO2 greenhouse emissions offset each year.",
        "Demonstrated the viability of high-efficiency utility solar in arid water-stressed zones.",
      ],
    },
  },
  {
    id: "15mw-30mwh-standalone-bess-gujarat",
    slug: "15mw-30mwh-standalone-bess-gujarat",
    title: "15 MW / 30 MWh Standalone Battery Storage for Grid Frequency Stabilization",
    clientSector: "State Transmission Utility & Grid Operator",
    category: "BESS & Storage",
    location: "Kutch Corridor, Gujarat",
    capacity: "15 MW / 30 MWh LFP Storage",
    completionYear: "2026",
    image: "/images/bess-substation.jpg",
    featured: true,
    summary:
      "A utility-scale standalone battery storage system deployed to dampen high-frequency renewable intermittency, providing sub-20ms spinning reserve and dynamic reactive power support.",
    metrics: [
      { label: "Response Time", value: "<18 ms", detail: "Rapid automated frequency response to grid frequency deviations" },
      { label: "Round-Trip Efficiency", value: "88.6%", detail: "High AC-to-AC round-trip efficiency recorded at pooling bus" },
      { label: "Storage Capacity", value: "30 MWh", detail: "Provides 2 full hours of firm 15 MW continuous discharge" },
      { label: "Grid Fault Dampening", value: "99.8%", detail: "Zero tripping during regional high-wind generation surges" },
    ],
    challenge: {
      title: "Renewable Surges, Voltage Sag & Strict Deviation Settlement Penalties",
      paragraphs: [
        "High concentrations of wind and solar capacity feeding into the regional 66kV substation led to extreme frequency fluctuations ranging between 49.5 Hz and 50.4 Hz during gusting events.",
        "The utility faced substantial Deviation Settlement Mechanism (DSM) penalties due to grid over-injection and sudden solar ramping drop-offs during cloud transients.",
        "The system required sub-second automated dispatch, high thermal safety in a coastal saline atmosphere, and seamless interface with the state load dispatch center (SLDC).",
      ],
      keyPoints: [
        "Severe transmission frequency swings caused by co-located multi-GW renewable farms.",
        "Harsh coastal saline environment demanding C5-M anti-corrosion container enclosures.",
        "Stringent SLDC cybersecurity and SCADA telemetry protocols.",
      ],
    },
    solution: {
      title: "Liquid-Cooled LFP Enclosures, Bi-Directional Inverters & AI-EMS",
      paragraphs: [
        "Sarhat Energy engineered an advanced 15 MW / 30 MWh energy storage facility utilizing Tier-1 Lithium Iron Phosphate (LFP) chemistry housed in IP55 liquid-cooled outdoor enclosures.",
        "We incorporated four-quadrant bi-directional power conversion systems (PCS) capable of instantaneous real and reactive power (P-Q) control to dampen voltage flicker.",
        "The plant is governed by an intelligent Energy Management System (EMS) programmed with automatic generation control (AGC) algorithms responding in under 18 milliseconds.",
      ],
      technicalSpecs: [
        { label: "Battery Chemistry", value: "Lithium Iron Phosphate (LFP) 280Ah" },
        { label: "Thermal System", value: "Active Liquid Chiller Loops" },
        { label: "PCS Rating", value: "4 x 3.75 MVA Bi-Directional Inverters" },
        { label: "Fire Safety", value: "NFPA 855 Compliant Aerosol & Deflagration Vents" },
        { label: "Corrosion Rating", value: "ISO 12944 C5-M Coastal Protective Paint" },
        { label: "Grid Interconnection", value: "66/33 kV Step-Up Substation" },
      ],
    },
    implementation: {
      title: "Precision Modular Installation & Safety Commissioning",
      steps: [
        {
          phase: "Phase 1: Civil Plinths & Fire Separation",
          title: "Reinforced Concrete Pads with NFPA Spacing",
          desc: "Cast heavy reinforced plinths with built-in drainage sumps and 3-meter thermal blast walls.",
        },
        {
          phase: "Phase 2: Enclosure Cranage & Interconnect",
          title: "Container Placement & High-Voltage Bus Bar Ducting",
          desc: "Positioned ten 3 MWh container blocks with precision cranes and torqued copper busway connections.",
        },
        {
          phase: "Phase 3: Liquid Chiller Integration",
          title: "Glycol Coolant Loop Pressure Testing & Bleeding",
          desc: "Charged and pressure-tested closed-loop liquid thermal systems to guarantee uniform cell delta-T < 2°C.",
        },
        {
          phase: "Phase 4: SLDC Dispatch Trials",
          title: "Black-Start, Frequency Droop & Peak Shaving Verification",
          desc: "Conducted 120-hour continuous automated dispatch runs under direct supervision of state grid controllers.",
        },
      ],
    },
    results: {
      title: "Complete Grid Reliability and Penalty Elimination",
      paragraphs: [
        "Since full operational handover, the BESS has suppressed 100% of critical frequency deviation events across the local substation node.",
        "The transmission utility has eliminated DSM penalties while unlocking 30 MWh of peak evening capacity daily to serve high-tariff industrial consumers.",
        "The installation stands as one of India's premier operational utility-scale standalone storage references.",
      ],
      outcomes: [
        "Sub-20 millisecond automated response time verified across thousands of dispatch cycles.",
        "Over 18 million units of otherwise curtailed renewable energy captured and monetized annually.",
        "Zero environmental or safety incidents recorded under 24/7 automated monitoring.",
      ],
    },
  },
  {
    id: "220kv-ehv-substation-transmission-corridor-up",
    slug: "220kv-ehv-substation-transmission-corridor-up",
    title: "220/33 kV Air-Insulated Substation & 18 km Transmission Line Infrastructure",
    clientSector: "Renewable Energy Park Developer",
    category: "Substations & Grid",
    location: "Bundelkhand Renewable Zone, Uttar Pradesh",
    capacity: "220/33 kV, 2 x 100 MVA",
    completionYear: "2025",
    image: "/images/substation-project.jpg",
    featured: false,
    summary:
      "Turnkey civil construction, electrical equipment erection, and CEIG synchronization of a 220/33 kV central pooling substation connecting 300 MW of solar capacity to the state grid.",
    metrics: [
      { label: "Transformation Capacity", value: "200 MVA", detail: "Dual 100 MVA 220/33 kV power transformers installed" },
      { label: "Transmission Length", value: "18.4 km", detail: "Double-circuit lattice tower line traversing river crossings" },
      { label: "Clearance Milestone", value: "Zero Defect", detail: "Unconditional CEIG clearance granted on inaugural inspection" },
      { label: "Project Duration", value: "10.5 Mos", detail: "Commissioned within aggressive state developer timeline" },
    ],
    challenge: {
      title: "Rugged Rocky Stratum, River Span Crossing & High Soil Resistivity",
      paragraphs: [
        "The 18.4 km transmission alignment spanned dense rocky terrain with high soil electrical resistivity, posing severe grounding and tower foundation excavation challenges.",
        "The line included a 520-meter river span crossing requiring tall specialized anchor river-crossing towers engineered to handle monsoon flood flow and mechanical conductor tension.",
        "Fast-track delivery was mandatory: 300 MW of regional solar generation was ready for commissioning and facing severe revenue loss without transmission connectivity.",
      ],
      keyPoints: [
        "High soil resistivity exceeding 650 ohm-meters requiring specialized deep earthing chemical treatment.",
        "520-meter critical river crossing requiring bespoke tower structural calculations and CEIG clearance.",
        "Complex coordination with railway line clearances and state highway crossings.",
      ],
    },
    solution: {
      title: "Deep Rock Anchoring, Chemical Soil Treatment & Remote SCADA Synchronization",
      paragraphs: [
        "Sarhat Energy deployed pneumatic rock drills to install chemical anchor pile foundations directly into bedrock, guaranteeing absolute mechanical stability for all 68 transmission towers.",
        "To achieve target substation earth resistance below 0.5 ohms, we engineered an extensive buried counterpoise copper earthing mesh coupled with electrolytic chemical grounding electrodes.",
        "The 220kV switchyard features SF6 circuit breakers, numerical distance protection relays, dual-redundant DC battery banks, and fiber-optic OPGW communication for real-time telemetry.",
      ],
      technicalSpecs: [
        { label: "Power Transformers", value: "2 x 100 MVA, 220/33 kV (BHEL Specification)" },
        { label: "Switchgear Tech", value: "Outdoor Air-Insulated Switchyard (AIS)" },
        { label: "Circuit Breakers", value: "220kV SF6 Live-Tank Circuit Breakers" },
        { label: "Conductor", value: "Bersimis ACSR on River Crossing; Zebra on Main Line" },
        { label: "Earth Mesh", value: "Electrolytic Copper Grounding with < 0.38 Ohm Resistance" },
        { label: "Protection System", value: "Dual Distance & Differential Relays (IEC 61850)" },
      ],
    },
    implementation: {
      title: "Concurrent Tower Erection & Switchyard Civil Execution",
      steps: [
        {
          phase: "Phase 1: Civil Works & Plinths",
          title: "Switchyard Grading & Transformer Foundations",
          desc: "Poured heavy reinforced foundation plinths designed to support 120-metric-ton transformer weights.",
        },
        {
          phase: "Phase 2: Tower Stringing & River Crossing",
          title: "Tension Stringing across 68 Tower Positions",
          desc: "Utilized hydraulic tensioners to string conductor and OPGW fiber lines without touching ground vegetation.",
        },
        {
          phase: "Phase 3: Control Building & Relay Racks",
          title: "Pre-Engineered Building & DC Battery Systems",
          desc: "Constructed climate-controlled control building and wired secondary protection relay marshalling boxes.",
        },
        {
          phase: "Phase 4: CEIG Inspection & Charging",
          title: "Zero-Defect Safety Clearance & 220kV Charging",
          desc: "Executed comprehensive high-voltage insulation tests and charged the substation smoothly on schedule.",
        },
      ],
    },
    results: {
      title: "Unlocking 300 MW Clean Energy Evacuation for the State",
      paragraphs: [
        "The 220kV substation was energized smoothly, establishing an unshakeable connection between regional solar parks and the state grid backbone.",
        "The transmission infrastructure is built to a 35-year design horizon, engineered to handle future capacity expansion up to 400 MVA.",
        "Zero transmission line trip events have occurred across its entire operational timeline.",
      ],
      outcomes: [
        "Over 300 MW of solar power successfully evacuated into the state utility network.",
        "Earthing resistance achieved at 0.38 ohms, well within state electrical safety limits.",
        "Set an execution speed benchmark for greenfield 220kV infrastructure in Central India.",
      ],
    },
  },
  {
    id: "4-8mwp-industrial-rooftop-group-captive-pune",
    slug: "4-8mwp-industrial-rooftop-group-captive-pune",
    title: "4.8 MWp Multi-Facility Industrial Rooftop Solar for Heavy Automotive Manufacturing",
    clientSector: "Automotive Component Manufacturer",
    category: "C&I Rooftops",
    location: "Chakan Industrial Zone, Pune, Maharashtra",
    capacity: "4.8 MWp Rooftop PV",
    completionYear: "2025",
    image: "/images/hero-solar.jpg",
    featured: false,
    summary:
      "A non-penetrative industrial rooftop installation spanning 6 plant roofs, providing 38% electricity cost reduction while operating under strict zero-downtime manufacturing protocols.",
    metrics: [
      { label: "Electricity Cost Reduction", value: "38%", detail: "Saves client over ₹4.2 Crore in industrial power bills annually" },
      { label: "Roof Penetrations", value: "Zero", detail: "Custom engineered non-penetrating seam clamps preserving roof warranty" },
      { label: "Safety Record", value: "100%", detail: "Executed directly above active assembly lines without a single stoppage" },
      { label: "CO2 Offset", value: "5,800 MT", detail: "Annual carbon reduction supporting client net-zero supply chain goals" },
    ],
    challenge: {
      title: "Zero Manufacturing Stoppage, Pre-Engineered Roofs & Strict Fire Protocols",
      paragraphs: [
        "The manufacturing campus operates 24/7 precision robotic machining and paint shops where any roof leak or electrical disruption would result in catastrophic production loss.",
        "The standing-seam metal roofs were under manufacturer warranty, strictly prohibiting structural drilling or mechanical penetrations.",
        "The facility required integration with multiple 11kV factory sub-stations, smart export limiting controllers, and rapid-shutdown fire safety systems.",
      ],
      keyPoints: [
        "Strict prohibition on metal roof penetrations to maintain manufacturer water-tightness warranties.",
        "Continuous 24/7 manufacturing operations requiring zero disruption to active plant floors.",
        "Stringent fire safety and arc-fault detection compliance for insurance standards.",
      ],
    },
    solution: {
      title: "Lightweight Seam Clamping, Module-Level Rapid Shutdown & Smart Export Control",
      paragraphs: [
        "Sarhat Energy designed custom anodized aluminum seam-lock clamps with high wind uplift resistance, attaching securely to roof ribs without penetrating sheet metal.",
        "We incorporated decentralized string inverters equipped with built-in DC arc-fault circuit interrupters (AFCI) and intelligent export power managers preventing reverse grid feed.",
        "All civil cabling utilized zero-halogen low-smoke (ZHLS) fire-retardant conduit, routed along perimeter walkways to ensure ease of ongoing maintenance.",
      ],
      technicalSpecs: [
        { label: "Modules", value: "High-Efficiency Mono-PERC 545Wp" },
        { label: "Mounting Tech", value: "Non-Penetrating Anodized Seam Clamps" },
        { label: "Inverters", value: "100kW Distributed String Inverters" },
        { label: "Safety Feature", value: "Integrated Rapid Shutdown & Arc-Fault Detection" },
        { label: "Monitoring", value: "Plant-Wide IoT Dashboard with String-Level Analytics" },
        { label: "Grid Interface", value: "11kV HT Yard with Automated Export Limiting" },
      ],
    },
    implementation: {
      title: "Staged Installation During Scheduled Facility Shifts",
      steps: [
        {
          phase: "Phase 1: Structural Audit",
          title: "Structural Purlin Load Modeling & Seam Pull Testing",
          desc: "Validated roof structural reserve capacity with FEA stress analysis under maximum monsoon wind loads.",
        },
        {
          phase: "Phase 2: Safety Lifelines & Cranage",
          title: "Engineered Horizontal Lifelines & Crane Lifting",
          desc: "Installed fall-arrest safety lines across all 6 roof sheds prior to material lifting.",
        },
        {
          phase: "Phase 3: Module Clamping & Inverter Hookup",
          title: "Seam-Clamp Assembly & Cable Tray Management",
          desc: "Affixed 8,800+ modules and routed DC cabling through heavy-duty galvanized cable trays.",
        },
        {
          phase: "Phase 4: HT Interconnection & Commissioning",
          title: "Net-Metering Synchronization & CEIG Inspection",
          desc: "Interconnected into the factory's 11kV bus during a single scheduled 4-hour maintenance window.",
        },
      ],
    },
    results: {
      title: "Immediate Financial Payback and Clean Energy Leadership",
      paragraphs: [
        "The 4.8 MWp rooftop solar installation produces over 7.1 million units of clean electricity every year, providing immediate double-digit operational expenditure savings.",
        "The project has achieved simple financial payback within 3.4 years, while establishing the factory as an automotive benchmark for green supplier compliance.",
        "Zero roof leaks or structural concerns have occurred through multiple severe monsoon seasons.",
      ],
      outcomes: [
        "38% reduction in grid electricity consumption across all 6 manufacturing sheds.",
        "Projected cumulative savings of ₹105 Crore across the 25-year system design life.",
        "Over 5,800 metric tons of carbon emissions eliminated annually.",
      ],
    },
  },
  {
    id: "25mw-canal-top-solar-infrastructure-gujarat",
    slug: "25mw-canal-top-solar-infrastructure-gujarat",
    title: "25 MW Canal-Top Solar Infrastructure: Energy Generation Without Land Acquisition",
    clientSector: "State Irrigation & Water Resources Department",
    category: "Utility Solar",
    location: "Narmada Canal Network, Gujarat",
    capacity: "25 MWp Canal-Top PV",
    completionYear: "2024",
    image: "/images/agrivoltaics-project.jpg",
    featured: false,
    summary:
      "A dual-benefit engineering achievement utilizing canal banks to generate 40 GWh of clean energy annually while drastically curtailing water evaporation from agricultural irrigation channels.",
    metrics: [
      { label: "Land Acquired", value: "0 Acres", detail: "Constructed entirely across existing state canal embankments" },
      { label: "Water Evaporation Saved", value: "22M Ltr/Yr", detail: "Direct shade prevents critical agricultural water loss" },
      { label: "Efficiency Boost", value: "+3.2%", detail: "Water cooling micro-climate increases PV module electrical efficiency" },
      { label: "Canal Length Covered", value: "16 km", detail: "Continuous clean energy generation corridor over running water" },
    ],
    challenge: {
      title: "Corrosive Humidity, Vibration from Flowing Water & Bank Structural Limitations",
      paragraphs: [
        "Constructing over running canal waters meant zero disruption to seasonal irrigation water supply for downstream agricultural communities.",
        "High relative humidity, water turbulence, and micro-vibrations required specialized structural steel trusses with high corrosion resistance ratings.",
        "Cantilever and span engineering demanded precise load balancing to ensure zero stress concentration on canal concrete linings.",
      ],
      keyPoints: [
        "Zero disruption permitted to agricultural irrigation water flows during construction.",
        "Severe humidity and corrosive micro-environment requiring specialized galvanization.",
        "Complex structural truss spans extending across 16-meter canal widths.",
      ],
    },
    solution: {
      title: "High-Span Hot-Dip Galvanized Trusses & Marine-Grade Electrical Assemblies",
      paragraphs: [
        "Sarhat Energy engineered modular structural steel trusses that span the full 16-meter canal width, anchored to reinforced concrete pile caps situated outside the water canal lining.",
        "All steelwork was treated with 120-micron hot-dip galvanization to guarantee a 30-year design life against continuous water vapor exposure.",
        "The ambient water cooling effect beneath the panels lowers module operating temperature by 6°C, yielding a 3.2% boost in electrical energy output compared to terrestrial solar parks.",
      ],
      technicalSpecs: [
        { label: "Truss Span", value: "16-Meter Pre-Engineered Galvanized Trusses" },
        { label: "Galvanization", value: "120 Micron Hot-Dip Galvanized Structural Steel" },
        { label: "PV Modules", value: "Glass-Glass Bifacial Solar Modules" },
        { label: "Cabling", value: "UV-Resistant Submersible Grade DC Cabling" },
        { label: "Monitoring", value: "Vibration Sensors & Remote SCADA Telemetry" },
        { label: "Substation", value: "33kV Intertie Substation on Canal Bank" },
      ],
    },
    implementation: {
      title: "Dry-Season Foundation Pouring & Overhead Modular Placement",
      steps: [
        {
          phase: "Phase 1: Embankment Piling",
          title: "Perimeter Pile Caps Outside Canal Linings",
          desc: "Drilled vertical reinforced pile foundations into canal bank embankments without compromising water channels.",
        },
        {
          phase: "Phase 2: Span Truss Craning",
          title: "Modular Truss Assembly & Overhead Lifting",
          desc: "Pre-assembled 16-meter steel spans off-site and lifted them into position during night work windows.",
        },
        {
          phase: "Phase 3: Module Placement",
          title: "Glass-Glass Bifacial Module Mounting",
          desc: "Mounted modules using stainless steel hardware with vibration-dampening rubber grommets.",
        },
        {
          phase: "Phase 4: 33kV Intertie Sync",
          title: "Substation Charging & SCADA Commissioning",
          desc: "Energized the 33kV evacuation corridor, synchronizing with the regional state feeder.",
        },
      ],
    },
    results: {
      title: "The Gold Standard for Dual-Use Clean Infrastructure",
      paragraphs: [
        "The 25 MW canal-top installation demonstrates how renewable energy can be scaled without utilizing a single square meter of agricultural or fertile commercial land.",
        "By shading the water surface, the solar canopy saves an estimated 22 million liters of precious water from evaporating into the arid atmosphere each year.",
        "The client has praised the initiative as a model for public-private clean infrastructure collaboration in India.",
      ],
      outcomes: [
        "40 GWh of clean energy injected into the regional agricultural distribution grid annually.",
        "Over 32,000 metric tons of carbon emissions eliminated each year.",
        "Zero land acquisition delays or community resettlement costs incurred.",
      ],
    },
  },
  {
    id: "10mwp-agrovoltaics-dual-use-solar-farming",
    slug: "10mwp-agrovoltaics-dual-use-solar-farming",
    title: "10 MWp Agrivoltaics Infrastructure: Simultaneous Solar Generation and Crop Cultivation",
    clientSector: "Agricultural Development Corporation",
    category: "Utility Solar",
    location: "Malwa Agricultural Plains, Madhya Pradesh",
    capacity: "10 MWp Elevated Agri-PV",
    completionYear: "2025",
    image: "/images/timeline-2025.jpg",
    featured: false,
    summary:
      "Elevated solar mounting structures engineered with 3.2-meter vertical ground clearances, allowing commercial tractors and agricultural machinery to cultivate cash crops beneath solar arrays.",
    metrics: [
      { label: "Ground Clearance", value: "3.2 Meters", detail: "Full clearance for standard 55-HP agricultural tractors and harvesters" },
      { label: "Farmer Revenue", value: "+45%", detail: "Dual revenue from solar lease payments and continued crop harvests" },
      { label: "Crop Water Efficiency", value: "+28%", detail: "Partial shading reduces soil moisture evapotranspiration" },
      { label: "Land Dual-Use", value: "100%", detail: "All 38 acres maintained for ongoing horticultural cultivation" },
    ],
    challenge: {
      title: "Structural Torsion Under Heavy Agricultural Machinery & Light Transmission",
      paragraphs: [
        "Conventional solar structures sit 0.5 to 1 meter off the ground, completely sterilizing land for farming and triggering intense local community resistance.",
        "Elevating arrays to 3.2 meters increases structural wind moment forces exponentially, demanding deep foundation stability against gale-force gusts.",
        "Crop selection required precise computational photosynthetically active radiation (PAR) modeling to ensure panels do not starve crops of necessary sunlight.",
      ],
      keyPoints: [
        "Requirement for 3.2-meter minimum ground clearance for continuous tractor mobility.",
        "Need to balance optical sunlight penetration with maximum electrical energy harvest.",
        "High mechanical wind torsion forces acting on elevated structural steel frames.",
      ],
    },
    solution: {
      title: "Elevated Torispherical Foundations, Semi-Transparent Panels & Micro-Irrigation",
      paragraphs: [
        "Sarhat Energy deployed high-tensile structural steel pylons with deep-embedment concrete foundations designed to absorb high wind drag at elevated heights.",
        "We spaced panel strings at 7-meter inter-row intervals, allowing uniform sunlight penetration across the crop canopy while shading the soil during midday heat spikes.",
        "The project integrated drip-irrigation piping mounted directly along structural purlins, using module runoff rainwater harvesting to irrigate shade-tolerant legumes and turmeric.",
      ],
      technicalSpecs: [
        { label: "Clearance Height", value: "3.2 Meters Under-Purlin Clearance" },
        { label: "Row Pitch", value: "7.0-Meter Generous Agricultural Spacing" },
        { label: "Modules", value: "Semi-Transparent Bifacial Glass-Glass 550Wp" },
        { label: "Irrigation", value: "Integrated Gravity-Fed Drip Irrigation Network" },
        { label: "Crops Cultivated", value: "Turmeric, Ginger, Legumes, Leafy Greens" },
        { label: "Grid Intertie", value: "33kV Line Direct to Regional Agricultural Feeder" },
      ],
    },
    implementation: {
      title: "Seasonal Planting Coordination & Elevated MMS Assembly",
      steps: [
        {
          phase: "Phase 1: Agronomic Modeling",
          title: "Micro-Climate & Photosynthesis Simulation",
          desc: "Modeled optical PAR light distribution across 4 seasonal crop rotation cycles with agricultural university scientists.",
        },
        {
          phase: "Phase 2: High-Pylon Piling",
          title: "Heavy Structural Steel Column Installation",
          desc: "Installed high-tensile hot-dip galvanized columns with reinforced concrete footings to counter wind moment loads.",
        },
        {
          phase: "Phase 3: Module Stringing & Drip Lines",
          title: "Overhead Array Assembly & Irrigation Plumbing",
          desc: "Assembled bifacial modules and clipped water-efficient drip lines along underside structural beams.",
        },
        {
          phase: "Phase 4: First Harvest & Grid Sync",
          title: "Commercial Operation & Successful Crop Reaping",
          desc: "Commissioned the electrical export system simultaneously with the inaugural bumper crop harvest.",
        },
      ],
    },
    results: {
      title: "Proof of Concept for India's Clean Energy & Food Security Future",
      paragraphs: [
        "The 10 MWp agrivoltaic park produces 16.5 million units of clean electricity every year while generating record harvests of high-value shade-loving cash crops.",
        "Soil moisture retention improved by 28%, significantly lowering irrigation groundwater pumping requirements.",
        "The model is being replicated across multiple state agricultural zones to harmonize national renewable targets with rural livelihoods.",
      ],
      outcomes: [
        "100% agricultural land preservation achieved with dual energy and food production.",
        "Farmers secured reliable lease payments alongside a 45% increase in total land revenue.",
        "Established a scalable standard for future agrivoltaic expansion in India.",
      ],
    },
  },
];

