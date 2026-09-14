"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sun, Battery, Sprout, Zap, Route, Building2, X, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";

interface Capability {
  id: string;
  tag: string;
  title: string;
  description: string;
  fullDetails: string;
  specs: string[];
  icon: any;
}

interface ServiceStage {
  id: string;
  num: string;
  name: string;
  headline: string;
  description: string;
  cx: number;
  cy: number;
}

export default function SolutionsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const capabilities: Capability[] = [
    {
      id: "solar-wind",
      tag: "01 / RENEWABLE ENERGY",
      title: "Solar + Wind",
      description: "Utility scale solar EPC, wind energy, hybrid systems and turnkey renewable power plants.",
      fullDetails:
        "Complete EPC execution for utility-scale solar parks, rooftop installations, and wind-solar hybrid projects. We manage land acquisition assistance, micro-siting, solar panel stringing, inverter stations, and full synchronization to state and national grids.",
      specs: ["Utility Scale & C&I", "Tracker Integration", "PPA & Open Access Support"],
      icon: Sun,
    },
    {
      id: "bess",
      tag: "02 / ENERGY STORAGE",
      title: "BESS",
      description: "Battery storage systems for renewable integration, peak shaving, and grid resilience.",
      fullDetails:
        "Containerized utility-scale Battery Energy Storage Systems (BESS) designed for grid stability, peak load management, and frequency regulation. Integration with lithium iron phosphate (LFP) chemistry and advanced EMS software.",
      specs: ["Containerized Systems", "Peak Load Shaving", "Grid Frequency Regulation"],
      icon: Battery,
    },
    {
      id: "agrivoltaics",
      tag: "03 / AGRIVOLTAICS",
      title: "Solar + Agriculture",
      description: "Dual-use land solutions combining high-yield agriculture and solar power generation.",
      fullDetails:
        "Elevated mounting structures and tailored solar panel pitch designed specifically for agricultural farming beneath arrays (PM-KUSUM Component A & C). Maximizes land revenue density while retaining agricultural productivity.",
      specs: ["PM-KUSUM Aligned", "Elevated Clearance", "Soil & Water Preservation"],
      icon: Sprout,
    },
    {
      id: "substations",
      tag: "04 / GRID INFRASTRUCTURE",
      title: "Substations",
      description: "High-voltage substations, transmission lines, power evacuation, and electrical BOP.",
      fullDetails:
        "33kV, 132kV, 220kV, and 400kV substation design, procurement, testing, and commissioning. Turnkey transmission line corridor construction with SCADA automation and state utility approval handling.",
      specs: ["Up to 400kV GIS/AIS", "Transmission Corridors", "SCADA & Protection Systems"],
      icon: Zap,
    },
    {
      id: "infrastructure",
      tag: "05 / CIVIL INFRASTRUCTURE",
      title: "Roads + Bridges + Buildings",
      description: "Access roads, bridges, drainage networks, and civil works executed with EPC discipline.",
      fullDetails:
        "Civil infrastructure required for remote energy project sites including heavy payload access roads, drainage culverts, bridges, boundary walls, and control room buildings built to withstand harsh weather.",
      specs: ["Heavy Load Access Roads", "Pre-cast Reinforced Bridges", "Site Grading & Drainage"],
      icon: Route,
    },
    {
      id: "pmc-epcm",
      tag: "06 / PROJECT SERVICES",
      title: "PMC + EPCM + Turnkey",
      description: "Project management consultancy, EPCM contracts, and full-scope turnkey EPC execution.",
      fullDetails:
        "Full lifecycle project management consultancy, owner engineering services, procurement oversight, and complete turnkey contract execution with guaranteed performance ratios.",
      specs: ["Owner Engineering", "Quality Audit & Testing", "Performance Ratio Guarantees"],
      icon: Building2,
    },
  ];

  const serviceStages: ServiceStage[] = [
    {
      id: "feasibility",
      num: "01",
      name: "Feasibility",
      headline: "Feasibility",
      description: "Understand the site, requirement, constraints and commercial objective.",
      cx: 10,
      cy: 70,
    },
    {
      id: "engineering",
      num: "02",
      name: "Engineering",
      headline: "Detailed Engineering & SLD Layout",
      description: "Topography, shadow analysis, electrical SLD and asset load planning.",
      cx: 26,
      cy: 25,
    },
    {
      id: "procurement",
      num: "03",
      name: "Procurement",
      headline: "Tier-1 Equipment Supply Chain",
      description: "Procurement of modules, inverters, transformers and high-voltage BOP.",
      cx: 42,
      cy: 65,
    },
    {
      id: "construction",
      num: "04",
      name: "Construction",
      headline: "Civil & Electrical Assembly",
      description: "Civil piling, structure erection, string cabling and substation installation.",
      cx: 58,
      cy: 90,
    },
    {
      id: "commissioning",
      num: "05",
      name: "Commissioning",
      headline: "Grid Evacuation & Trial Run",
      description: "Protection relay testing, DISCOM synchronization and COD certification.",
      cx: 74,
      cy: 35,
    },
    {
      id: "oandm",
      num: "06",
      name: "O&M",
      headline: "24/7 Operations & Maintenance",
      description: "Preventive maintenance, performance telemetry and asset lifecycle management.",
      cx: 90,
      cy: 20,
    },
  ];

  const [activeStage, setActiveStage] = useState<ServiceStage>(serviceStages[0]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#6DAD45] selection:text-black relative overflow-x-hidden font-sans-ui">
      {/* Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* ------------------------------------------------------------- */}
      {/* 02 / CAPABILITIES - TOP HERO & 6 CARDS GRID (IMAGE 1) */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-36 pb-28 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Breadcrumb */}
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-6">
              HOME / OUR SOLUTIONS
            </div>

            {/* Tag */}
            <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
              02 / CAPABILITIES
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 max-w-5xl">
              Six capabilities. <br />
              <span className="text-white font-normal">One connected way to build.</span>
            </h1>

            {/* Subheadline with green accent text */}
            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed mb-16">
              From renewable generation and storage to grid and civil infrastructure, our solutions are designed to work together.{" "}
              <span className="text-[#6DAD45] font-semibold">
                Hover a solution to reveal the execution layer.
              </span>
            </p>
          </ScrollReveal>

          {/* 6 Capabilities Cards Grid (Image 1 Exact Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 3) * 0.15,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedCapability(item)}
                  className="card-gradient rounded-3xl p-8 sm:p-10 relative group cursor-pointer overflow-hidden flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:border-[#6DAD45]/60 hover:shadow-2xl hover:shadow-[#6DAD45]/20 backdrop-blur-xl bg-[#0B0F0B]"
                >
                  {/* Top Tag */}
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#6DAD45] uppercase mb-8">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-serif-display font-medium text-white mb-4 group-hover:text-[#6DAD45] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Corner Arrow */}
                  <div className="pt-6 flex items-center justify-between">
                    <ArrowUpRight className="w-5 h-5 text-[#6DAD45] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <IconComp className="w-6 h-6 text-zinc-600 group-hover:text-[#6DAD45] transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 / SERVICE ROADMAP - LIGHT CONTRAST SECTION (IMAGE 2) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 bg-[#f2f4f2] text-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                  03 / SERVICE ROADMAP
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-black tracking-tight leading-tight">
                  The same road. <br />
                  <span className="text-[#6DAD45]">A smarter project.</span>
                </h2>
              </div>
              <p className="text-zinc-600 font-light text-base max-w-md leading-relaxed">
                From feasibility to O&M, each stage is connected. Hover or tap a stage to see the handoff.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Light Mode Curve (Image 2) */}
          <ScrollReveal direction="up" distance={50} delay={0.2}>
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-xl relative overflow-hidden mb-12">
              <div className="relative w-full h-[260px] sm:h-[300px]">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Outer glow stroke */}
                  <path
                    d="M 10 70 C 20 15, 32 15, 42 65 C 50 105, 66 105, 74 35 C 80 5, 85 10, 90 20"
                    fill="none"
                    stroke="rgba(109, 173, 69, 0.3)"
                    strokeWidth="6"
                  />
                  {/* Bright green curve line */}
                  <path
                    d="M 10 70 C 20 15, 32 15, 42 65 C 50 105, 66 105, 74 35 C 80 5, 85 10, 90 20"
                    fill="none"
                    stroke="#6DAD45"
                    strokeWidth="3"
                  />

                  {/* Stage Node Dots */}
                  {serviceStages.map((st) => {
                    const isActive = activeStage.id === st.id;
                    return (
                      <g
                        key={st.id}
                        onClick={() => setActiveStage(st)}
                        className="cursor-pointer group"
                      >
                        {isActive && (
                          <circle
                            cx={st.cx}
                            cy={st.cy}
                            r="7"
                            fill="none"
                            stroke="#6DAD45"
                            strokeWidth="2"
                            className="animate-ping"
                          />
                        )}
                        <circle
                          cx={st.cx}
                          cy={st.cy}
                          r={isActive ? "5" : "4"}
                          fill={isActive ? "#6DAD45" : "#000000"}
                          stroke={isActive ? "#000000" : "#6DAD45"}
                          strokeWidth="2"
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Node Buttons Overlay */}
                {serviceStages.map((st) => {
                  const isActive = activeStage.id === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setActiveStage(st)}
                      style={{
                        left: `${st.cx}%`,
                        top: `${st.cy}%`,
                        transform: "translate(-50%, -150%)",
                      }}
                      className={`absolute font-sans-ui text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap shadow-md ${
                        isActive
                          ? "bg-[#6DAD45] text-black font-bold scale-110 shadow-lg"
                          : "bg-white text-zinc-700 hover:text-black border border-zinc-300 hover:border-[#6DAD45]"
                      }`}
                    >
                      <span className="font-mono opacity-70 mr-1">{st.num}</span>
                      {st.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Active Service Stage Details Box */}
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-2xl mx-auto py-4"
          >
            <h3 className="text-3xl font-serif-display font-medium text-black mb-3">
              {activeStage.headline}
            </h3>
            <p className="text-sm text-zinc-600 font-light leading-relaxed">
              {activeStage.description}
            </p>
          </motion.div>
        </div>
      </section>

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
              className="bg-[#0D0D0D] border border-white/20 rounded-3xl p-8 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none"></div>

              <button
                onClick={() => setSelectedCapability(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
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
                      className="px-3 py-1.5 bg-[#6DAD45]/10 border border-[#6DAD45]/30 text-[#6DAD45] text-xs font-mono rounded-lg"
                    >
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedCapability(null)}
                  className="bg-[#6DAD45] text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#5b9637] transition-colors flex items-center gap-2"
                >
                  REQUEST {selectedCapability.title.toUpperCase()} PROPOSAL
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </main>
  );
}
