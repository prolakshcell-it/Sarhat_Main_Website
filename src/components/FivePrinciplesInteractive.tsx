"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  MousePointerClick,
  Bot,
  BarChart3,
  Wrench,
  Globe,
  CheckCircle2,
} from "lucide-react";
import AnimatedPillBadge from "./AnimatedPillBadge";

export interface PrincipleStage {
  id: string;
  step: string;
  name: string;
  tagline: string;
  description: string;
  keyOutcomes: string[];
  icon: React.ElementType;
}

export const PRINCIPLES: PrincipleStage[] = [
  {
    id: "ground",
    step: "01",
    name: "Understand the ground",
    tagline: "Site Analysis & Geotechnical Feasibility",
    description:
      "We don't design from distance. Every project begins with exhaustive geotechnical, solar irradiation, soil resistivity, LIDAR topography, and DISCOM grid capacity analysis to identify and eliminate hidden site risks early.",
    keyOutcomes: [
      "Topographical & LIDAR drone mapping",
      "Geotechnical load-bearing & soil resistivity",
      "11kV/765kV DISCOM grid evacuation clearance",
      "Environmental & ROW land readiness",
    ],
    icon: Compass,
  },
  {
    id: "engineering",
    step: "02",
    name: "Engineering for the project",
    tagline: "Tailored Technical Rigor & SLD Design",
    description:
      "No generic templates. We engineer every solar plant, BESS system, and grid bay specifically to localized terrain constraints, string configurations, component tolerances, and grid compliance standards.",
    keyOutcomes: [
      "Optimized Single-Line Diagram (SLD) layout",
      "PVSyst yield modeling with P50/P90 guarantees",
      "SCADA & protection scheme customization",
      "Tier-1 vendor BOM technical auditing",
    ],
    icon: Cpu,
  },
  {
    id: "handoff",
    step: "03",
    name: "Own Every Handoff",
    tagline: "Seamless Phase Transitions & Single Accountability",
    description:
      "Handoffs are where traditional infrastructure projects stall. We maintain single-point direct accountability from civil groundwork to electrical erection, ensuring smooth, friction-free stage gates.",
    keyOutcomes: [
      "On-site resident project management 24/7",
      "Unified EPC digital tracking dashboard",
      "Integrated vendor & logistics synchronization",
      "Direct DISCOM & CEIG inspection clearance",
    ],
    icon: Layers,
  },
  {
    id: "safety-quality",
    step: "04",
    name: "Build safely. Prove quality.",
    tagline: "Zero-Harm Construction & Factory Verification",
    description:
      "Safety and quality are non-negotiable. We enforce strict ISO-aligned EHS standards, String EL module flash tests, transformer factory audits, and zero-accident safety protocols across all field personnel.",
    keyOutcomes: [
      "Factory Acceptance Testing (FAT) for transformers",
      "Zero-harm safety policy & daily site briefings",
      "String-level EL testing & thermography",
      "Cold & hot electrical commissioning",
    ],
    icon: ShieldCheck,
  },
  {
    id: "learn-improve",
    step: "05",
    name: "Learn and improve",
    tagline: "Telemetry Analytics & Continuous Optimization",
    description:
      "Completion is just the starting point. We feed operational telemetry, post-commissioning audits, and SCADA analytics back into our engineering feedback loops to continuously refine efficiency on future builds.",
    keyOutcomes: [
      "Post-commissioning performance audits",
      "Real-time SCADA telemetry & loss analysis",
      "Predictive O&M & solar cleaning schedules",
      "Long-term asset health & degradation tracking",
    ],
    icon: TrendingUp,
  },
];

interface FivePrinciplesInteractiveProps {
  onOpenQuote?: () => void;
}

export default function FivePrinciplesInteractive({
  onOpenQuote,
}: FivePrinciplesInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activePrinciple = PRINCIPLES[activeIndex];

  // Percentage position for active line fill
  const progressPercent = (activeIndex / (PRINCIPLES.length - 1)) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto my-4 font-sans-ui">
      {/* Section Sub-Header / Title bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <AnimatedPillBadge darkBg className="mb-3">
            THE 5 DELIVERY PRINCIPLES IN PRACTICE
          </AnimatedPillBadge>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
            Our Delivery <span className="text-[#D4E012] italic">Principles</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#D4E012] bg-[#D4E012]/10 border border-[#D4E012]/30 px-4 py-2 rounded-full w-fit backdrop-blur-md shadow-lg shadow-[#D4E012]/5">
          <MousePointerClick className="w-4 h-4 animate-bounce text-[#D4E012]" />
          <span>Click any stage below to learn more.</span>
        </div>
      </div>

      {/* Main Container Card - Styled with Sarhat Dark Emerald Theme */}
      <div className="relative rounded-3xl bg-[#06140b] border border-[#163a23] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden p-6 sm:p-10">
        {/* Soft Ambient Radial Flares */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5EE72D]/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Subtle Background Grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #D4E012 1px, transparent 1px), linear-gradient(to bottom, #D4E012 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Dynamic Content Display Area */}
        <div className="relative z-10 mb-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePrinciple.id}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0e2518]/90 backdrop-blur-xl border border-[#1e4d30] rounded-2xl p-6 sm:p-8 relative shadow-2xl text-white"
            >
              {/* Left Accent indicator line */}
              <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-gradient-to-b from-[#D4E012] via-[#5EE72D] to-[#6DAD45] rounded-r-full" />

              <div className="pl-4 sm:pl-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-3 py-1 bg-[#D4E012]/20 text-[#D4E012] border border-[#D4E012]/40 rounded-full shadow-sm">
                      STAGE {activePrinciple.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white tracking-tight">
                      {activePrinciple.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400/90 italic bg-[#081a10] px-3 py-1 rounded-md border border-[#163a23]">
                    {activePrinciple.tagline}
                  </span>
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-4xl font-light">
                  {activePrinciple.description}
                </p>

                {/* Key Outcomes / Deliverable Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {activePrinciple.keyOutcomes.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-2.5 bg-[#06140b]/90 border border-[#18452a] p-3 rounded-xl text-xs text-slate-200 shadow-inner"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#5EE72D] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[#18452a] gap-2">
                  <span className="text-xs text-[#5EE72D] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5EE72D]" />
                    Sarhat Execution Guarantee
                  </span>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-[#D4E012] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
                  >
                    <span>Discuss this stage with our engineering team</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Animated Horizontal Timeline with 5 Nodes */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 my-12 px-2 sm:px-6">
          {/* Timeline Background Rail */}
          <div className="relative w-full h-1.5 bg-[#123320] rounded-full">
            {/* Active Highlighted Line Fill */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#6DAD45] via-[#5EE72D] to-[#D4E012] rounded-full shadow-[0_0_12px_#D4E012]"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* 5 Nodes distributed across timeline */}
          <div className="relative -top-4 flex justify-between items-start w-full">
            {PRINCIPLES.map((principle, index) => {
              const isActive = index === activeIndex;
              const isPassed = index <= activeIndex;
              const IconComp = principle.icon;

              return (
                <div
                  key={principle.id}
                  className="flex flex-col items-center cursor-pointer group select-none max-w-[18%]"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Node Circle */}
                  <div className="relative mb-3">
                    {/* Active Pulsing Ring */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute -inset-2.5 rounded-full bg-[#D4E012]/30 border border-[#D4E012]/70 animate-pulse shadow-[0_0_20px_#D4E012]"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}

                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-lg ${
                        isActive
                          ? "bg-gradient-to-br from-[#D4E012] to-[#5EE72D] text-black scale-115 ring-4 ring-[#06140b] shadow-[#D4E012]/40"
                          : isPassed
                          ? "bg-[#143a24] text-[#5EE72D] border border-[#5EE72D]/60 hover:scale-105 hover:border-[#D4E012]"
                          : "bg-[#0b1f13] text-slate-400 border border-[#1a422a] hover:border-slate-300 hover:text-white"
                      }`}
                    >
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Stage Label Text */}
                  <div className="text-center transition-all duration-300">
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold block mb-0.5 ${
                        isActive
                          ? "text-[#D4E012]"
                          : isPassed
                          ? "text-slate-300"
                          : "text-slate-500"
                      }`}
                    >
                      {principle.step}
                    </span>
                    <span
                      className={`text-[11px] sm:text-sm font-medium leading-tight block transition-colors ${
                        isActive
                          ? "text-white font-bold"
                          : isPassed
                          ? "text-slate-200 group-hover:text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {principle.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Feature Badges Row (as in 3rd image) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 pt-6 mt-8 border-t border-[#143a24] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-200 bg-[#0a2315]/80 border border-[#1b4e2f] px-4 py-3 rounded-xl hover:border-[#D4E012]/50 transition-colors">
            <Bot className="w-4 h-4 text-[#5EE72D] shrink-0" />
            <span className="font-semibold">AI-enabled delivery</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-200 bg-[#0a2315]/80 border border-[#1b4e2f] px-4 py-3 rounded-xl hover:border-[#D4E012]/50 transition-colors">
            <BarChart3 className="w-4 h-4 text-[#5EE72D] shrink-0" />
            <span className="font-semibold">Data-centric execution</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-200 bg-[#0a2315]/80 border border-[#1b4e2f] px-4 py-3 rounded-xl hover:border-[#D4E012]/50 transition-colors">
            <Wrench className="w-4 h-4 text-[#5EE72D] shrink-0" />
            <span className="font-semibold">Integrated digital tools</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-200 bg-[#0a2315]/80 border border-[#1b4e2f] px-4 py-3 rounded-xl hover:border-[#D4E012]/50 transition-colors">
            <Globe className="w-4 h-4 text-[#5EE72D] shrink-0" />
            <span className="font-semibold">Globally connected team</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom CTA Banner Box */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 bg-[#0a2315]/90 border border-[#1b4e2f] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-xl">
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl text-center sm:text-left leading-relaxed font-light">
            Whether you need full EPC, EPCM or standalone scopes or portfolio
            management, we&apos;ll work with you to identify the right delivery
            approach.
          </p>
          <button
            onClick={onOpenQuote}
            className="shrink-0 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-lg shadow-[#D4E012]/30 hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <span>Start the conversation</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
