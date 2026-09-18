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
  cx: number;
  cy: number;
}

export default function SolutionsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const capabilities: Capability[] = [
    {
      id: "renewable-energy",
      tag: "RENEWABLE ENERGY",
      title: "Renewable Energy",
      headline: "Solar Parks, Rooftop & Wind",
      description: "Solar Parks, Rooftop, C&I, O&M, Wind Farms",
      fullDetails: "Complete execution and engineering for solar parks, commercial & industrial rooftop installations, utility-scale wind farms, and long-term O&M management.",
      specs: ["Solar Parks", "Rooftop & C&I", "Comprehensive O&M", "Wind Farms"],
      icon: Sun,
      image: "/images/hero-solar.jpg",
      accentColor: "#6DAD45",
    },
    {
      id: "grid-substations",
      tag: "GRID & SUBSTATIONS",
      title: "Grid & Substations",
      headline: "Substations & Connectivity",
      description: "HT/LT systems, Substations, Evacuation lines, Protection, Grid connectivity.",
      fullDetails: "High-voltage and low-voltage electrical systems, AIS/GIS substations, power evacuation line corridors, relay protection, and seamless DISCOM grid connectivity.",
      specs: ["HT/LT Systems", "Substations (GIS/AIS)", "Evacuation Lines", "Protection & SCADA", "Grid Connectivity"],
      icon: Zap,
      image: "/images/bess-substation.jpg",
      accentColor: "#6DAD45",
    },
    {
      id: "civil-infrastructure",
      tag: "CIVIL INFRASTRUCTURE",
      title: "Civil Infrastructure",
      headline: "Industrial Civil & Works",
      description: "Roads, Buildings, Foundations, Industrial civil works, Project Infrastructure.",
      fullDetails: "Heavy-payload access roads, control room buildings, structural equipment foundations, industrial civil works, and comprehensive project site infrastructure.",
      specs: ["Access Roads", "Buildings & Control Rooms", "Equipment Foundations", "Industrial Civil Works", "Project Infrastructure"],
      icon: Building2,
      image: "/images/india-map-tactical.jpg",
      accentColor: "#6DAD45",
    },
    {
      id: "agrivoltaics",
      tag: "AGRIVOLTAICS",
      title: "Agrivoltaics",
      headline: "Solar + Agriculture",
      description: "Solar with agriculture, Land optimization, Farmer-linked models.",
      fullDetails: "Dual-use land solutions integrating solar power generation with active farming, optimizing land revenue density and implementing farmer-linked PM-KUSUM models.",
      specs: ["Solar with Agriculture", "Land Optimization", "Farmer-Linked PM-KUSUM Models"],
      icon: Sprout,
      image: "/images/hero-solar.jpg",
      accentColor: "#6DAD45",
    },
    {
      id: "bess",
      tag: "BESS",
      title: "BESS",
      headline: "Energy Storage Solutions",
      description: "BESS, Solar + Storage, Backup and Peak-load solutions.",
      fullDetails: "Utility-scale containerized Battery Energy Storage Systems (BESS), solar + storage integration, emergency backup power, and peak-load shaving.",
      specs: ["Containerized BESS", "Solar + Storage Hybrids", "Backup Power", "Peak-Load Shaving"],
      icon: Battery,
      image: "/images/bess-substation.jpg",
      accentColor: "#6DAD45",
    },
    {
      id: "project-delivery",
      tag: "PROJECT DELIVERY",
      title: "Project Delivery",
      headline: "Turnkey EPC & PMC",
      description: "EPC, PMC, EPCM, Turnkey",
      fullDetails: "Full-scope turnkey EPC execution, Project Management Consultancy (PMC), EPCM contracting, and owner engineering services.",
      specs: ["Turnkey EPC", "PMC Consultancy", "EPCM Contracting", "Full Lifecycle Delivery"],
      icon: Route,
      image: "/images/hero-solar.jpg",
      accentColor: "#6DAD45",
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
              SOLUTIONS CAPABILITIES
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

          {/* 6 Capabilities Cards Grid (Exact UI matching reference images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => setSelectedCapability(item)}
                  className="group relative rounded-[28px] bg-[#0A0E0A] border border-white/10 hover:border-[#5EE72D]/50 p-8 sm:p-9 flex flex-col justify-between min-h-[290px] cursor-pointer overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#5EE72D]/10"
                >
                  {/* Subtle Radial Green Glow in Bottom Right on Hover */}
                  <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-[#5EE72D]/5 rounded-full blur-2xl group-hover:bg-[#5EE72D]/20 transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Top Tag */}
                    <div className="text-[11px] font-mono tracking-widest text-[#5EE72D] uppercase mb-8 font-semibold">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-3 group-hover:text-[#5EE72D] transition-colors leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Bar with Arrow & Icon */}
                  <div className="pt-8 flex items-center justify-between z-10 relative">
                    <ArrowUpRight className="w-5 h-5 text-[#5EE72D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <IconComp className="w-5 h-5 text-zinc-600 group-hover:text-[#5EE72D] transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SERVICE ROADMAP - LIGHT CONTRAST SECTION (IMAGE 2) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 bg-[#f2f4f2] text-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                  SERVICE ROADMAP
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
                  className="bg-[#5EE72D] text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#4ed423] transition-colors flex items-center gap-2"
                >
                  DISCUSS {selectedCapability.title.toUpperCase()} PROJECT
                  <ArrowUpRight className="w-4 h-4 text-black" />
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
