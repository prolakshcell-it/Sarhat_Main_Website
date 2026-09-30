"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sun,
  Battery,
  Zap,
  Building2,
  X,
  CheckCircle2,
  ArrowRight,
  MousePointerClick,
  Layers,
  Activity,
  BarChart3,
  ShieldCheck,
  Wrench,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import FinalCTA from "@/components/FinalCTA";

interface Capability {
  id: string;
  tag: string;
  title: string;
  headline?: string;
  description: string;
  fullDetails: string;
  specs: string[];
  icon: any;
  image?: string;
  accentColor?: string;
}

interface ServiceStage {
  id: string;
  num: string;
  name: string;
  headline: string;
  description: string;
}

export default function SolutionsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking for Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const bgDim = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.85]);

  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-60px"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(10px)"]);

  // 4 Main Core Solutions
  const capabilities: Capability[] = [
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

  // In-Depth Solution Details Breakdown (Matching reference Images 1 & 2 format)
  const detailedSolutions = [
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

  // Animated Service Stages Roadmap
  const serviceStages: ServiceStage[] = [
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

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = serviceStages[activeStageIndex];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Soft Ambient Background Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />

        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / FULL-SCREEN HERO SECTION (Matching Insights & About page layout) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none"
          >
            {/* Background Image Layer */}
            <motion.div
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Solutions Hero"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-85"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
              {/* Dark Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            </motion.div>

            {/* Main Centered Content */}
            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
                filter: contentFilter,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-28 flex flex-col items-center text-center will-change-transform"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="max-w-4xl flex flex-col items-center text-center"
              >
                {/* Serif H1 Heading matching site standard */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-5xl drop-shadow-lg"
                >
                  Built on Solar.
                  <span className="italic font-normal text-white">
                    Growing into <span className="text-[#D4E012]">infrastructure.</span>
                  </span>
                </motion.h1>

                {/* Subtitle Description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="text-base sm:text-lg text-slate-100 font-normal max-w-5xl text-center leading-relaxed drop-shadow-md"
                >
                  From the ground beneath a solar plant to the grid that carries its power, Sarhat brings engineering, civil works and on-site execution together under one connected model.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MAIN SLIDING CONTENT OVERLAY */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">



          {/* ------------------------------------------------------------- */}
          {/* 03 / PER-SOLUTION DEPTH BREAKDOWN (Matching Images 1 & 2 format) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-white text-[#0F172A] relative border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
              {detailedSolutions.map((sol, index) => (
                <ScrollReveal key={sol.id}>
                  <div id={sol.id} className="space-y-10 scroll-mt-32">
                    {/* Top Section Badge & Header */}
                    <AnimatedPillBadge className="mb-4">
                      {sol.badge}
                    </AnimatedPillBadge>

                    {/* Editorial Description Block (Image 1 & 2 Style) */}
                    <div className="max-w-4xl space-y-4">
                      <h3 className="text-2xl sm:text-4xl font-serif-display font-medium text-[#0F172A] leading-tight">
                        {sol.headline}
                      </h3>
                      <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed">
                        {sol.description}
                      </p>
                    </div>

                    {/* Split Image & Bullet Breakdown Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Image Showcase (Left or Right based on index) */}
                      <div
                        className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                          }`}
                      >
                        <div className="relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                          <Image
                            src={sol.image}
                            alt={sol.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <span className="text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                              {sol.title} Asset Showcase
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bulleted Breakdown Cards (Right or Left) */}
                      <div
                        className={`lg:col-span-7 space-y-4 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                          }`}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {sol.breakdownItems.map((item) => (
                            <div
                              key={item.name}
                              className="bg-[#F8FAF8] border border-slate-200/90 p-5 rounded-2xl hover:border-[#6DAD45] hover:shadow-md transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#6DAD45]" />
                                    {item.name}
                                  </h4>
                                  <span className="text-[10px] font-mono text-[#6DAD45] bg-[#6DAD45]/10 px-2 py-0.5 rounded font-semibold">
                                    {item.metric}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-light">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Fully Clickable Action Button */}
                        <div className="pt-4">
                          <button
                            onClick={() => setQuoteModalOpen(true)}
                            className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-lg shadow-[#D4E012]/30 hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                          >
                            <span>{sol.buttonText}</span>
                            <ArrowRight className="w-4 h-4 text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* 04 / SERVICE ROADMAP - ANIMATED STAGE PIPELINE */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-[#09120B] text-white relative z-10 border-b border-slate-800/90 select-none overflow-hidden">
            {/* Ambient Green Radial Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#D4E012]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                  <div>
                    <AnimatedPillBadge darkBg className="mb-3">
                      THE SERVICE ROADMAP
                    </AnimatedPillBadge>
                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
                      The same road. <br />
                      <span className="text-[#D4E012] italic">A smarter project.</span>
                    </h2>
                  </div>
                  <p className="text-slate-300 font-light text-base max-w-md leading-relaxed">
                    From site feasibility to 24/7 O&M, every phase connects seamlessly into the next stage gate. Click or tap any stage to inspect the execution pipeline.
                  </p>
                </div>
              </ScrollReveal>

              {/* Animated Interactive Pipeline Grid */}
              <ScrollReveal delay={0.2}>
                <div className="bg-[#06140b] border border-[#163a23] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
                  {/* Pipeline Horizontal Progress Line */}
                  <div className="relative w-full h-1.5 bg-[#123320] rounded-full my-8">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#6DAD45] via-[#5EE72D] to-[#D4E012] rounded-full shadow-[0_0_12px_#D4E012]"
                      animate={{
                        width: `${((activeStageIndex + 1) / serviceStages.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>

                  {/* Stage Node Selection Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
                    {serviceStages.map((st, idx) => {
                      const isActive = idx === activeStageIndex;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setActiveStageIndex(idx)}
                          className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border ${isActive
                            ? "bg-gradient-to-br from-[#D4E012] to-[#5EE72D] text-black font-bold border-[#D4E012] shadow-lg shadow-[#D4E012]/20 scale-105"
                            : "bg-[#0b1f13] text-slate-300 border-[#1a422a] hover:border-slate-300 hover:text-white"
                            }`}
                        >
                          <span
                            className={`font-mono text-xs font-bold block mb-1 ${isActive ? "text-black" : "text-[#D4E012]"
                              }`}
                          >
                            STAGE {st.num}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold leading-snug">
                            {st.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Service Stage Details Container */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="bg-[#0e2518]/90 border border-[#1e4d30] rounded-2xl p-6 sm:p-8 backdrop-blur-md relative"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#D4E012] block mb-1">
                            STAGE {activeStage.num} PIPELINE DETAILS
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-2">
                            {activeStage.headline}
                          </h3>
                          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
                            {activeStage.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setQuoteModalOpen(true)}
                          className="shrink-0 bg-[#D4E012] hover:bg-[#b8c40e] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer w-fit"
                        >
                          <span>DISCUSS STAGE {activeStage.num}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-black" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* 05 / SITE-WIDE FINAL CTA COMPONENT */}
          {/* ------------------------------------------------------------- */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />

          <Footer />
        </div>

        {/* Capability Modal Drawer */}
        <AnimatePresence>
          {selectedCapability && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedCapability(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0D0D0D] border border-white/20 rounded-3xl p-8 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden text-white"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none" />

                <button
                  onClick={() => setSelectedCapability(null)}
                  className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-xs font-mono text-[#D4E012] uppercase tracking-widest block mb-2">
                  {selectedCapability.tag}
                </span>
                <h3 className="text-3xl font-serif-display font-medium text-white mb-4">
                  {selectedCapability.title}
                </h3>
                <p className="text-zinc-300 font-light text-base leading-relaxed mb-6">
                  {selectedCapability.fullDetails}
                </p>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                    CORE SPECIFICATIONS & CAPABILITIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCapability.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1.5 bg-[#D4E012]/15 border border-[#D4E012]/30 text-[#D4E012] text-xs font-mono rounded-lg"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedCapability(null);
                      setQuoteModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full hover:scale-105 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>DISCUSS {selectedCapability.title.toUpperCase()} PROJECT</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote Modal */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
