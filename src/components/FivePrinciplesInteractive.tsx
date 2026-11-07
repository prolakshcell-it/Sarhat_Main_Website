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
  ChevronRight,
  Bot,
  BarChart3,
  Wrench,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import AnimatedPillBadge from "./AnimatedPillBadge";

export interface PrincipleStage {
  id: string;
  step: string;
  position: "top" | "bottom";
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  keyOutcomes: string[];
  icon: React.ElementType;
}

export const PRINCIPLES: PrincipleStage[] = [
  {
    id: "ground",
    step: "01",
    position: "top",
    name: "Understand the ground",
    shortName: "Ground Feasibility",
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
    position: "bottom",
    name: "Engineering for the project",
    shortName: "Project Rigor",
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
    position: "top",
    name: "Own Every Handoff",
    shortName: "Phase Handoffs",
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
    position: "bottom",
    name: "Build safely. Prove quality.",
    shortName: "Safety & Quality",
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
    position: "top",
    name: "Learn and improve",
    shortName: "Telemetry & Growth",
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

const CAPABILITIES = [
  {
    icon: Bot,
    title: "AI-enabled delivery",
    desc: "Predictive yield modeling & terrain optimization",
  },
  {
    icon: BarChart3,
    title: "Data-centric execution",
    desc: "Real-time telemetry & milestone velocity",
  },
  {
    icon: Wrench,
    title: "Integrated digital tools",
    desc: "Unified BIM, SLD & SCADA engineering stack",
  },
  {
    icon: Globe,
    title: "Globally connected team",
    desc: "Tier-1 global procurement & local on-site EHS",
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

  return (
      <div className="w-full max-w-7xl mx-auto py-4 font-sans-ui">
        {/* ------------------------------------------------------------- */}
        {/* Section Header */}
        {/* ------------------------------------------------------------- */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <AnimatedPillBadge className="mb-4">
                THE 5 DELIVERY PRINCIPLES IN PRACTICE
              </AnimatedPillBadge>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-3">
                  Our Delivery{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Principles.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Click any stage below to explore engineering deliverables and outcomes.
                </p>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Desktop Curved Wavy Step Timeline (Matching 2nd Image)        */}
            {/* ------------------------------------------------------------- */}
              <div className="relative py-8 hidden lg:block my-4">
                {/* SVG Curved Connecting Dashed Line */}
                <svg
                  className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none z-0"
                  viewBox="0 0 1200 120"
                  fill="none"
                  preserveAspectRatio="none">
                  <path
                    d="M 50 60 Q 200 120, 350 60 T 650 60 T 950 60 T 1150 60"
                    stroke="#6DAD45"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    fill="none" />
                </svg>

                {/* 5 Step Cards Alternating Top and Bottom */}
                <div className="grid grid-cols-5 gap-4 relative z-10">
                  {PRINCIPLES.map((principle, index) => {
                    const Icon = principle.icon;
                    const isTop = principle.position === "top";
                    const isActive = activeIndex === index;

                          return (
                          <div key={principle.id} className="flex flex-col items-center text-center">
                            {/* Top Card (for top items) */}
                            {isTop && (
                              <div
                                onClick={() => setActiveIndex(index)}
                                className={`bg-white rounded-2xl p-5 border transition-all duration-300 w-full mb-12 relative group min-h-[175px] flex flex-col justify-between cursor-pointer text-left ${isActive
                                    ? "border-[#6DAD45] shadow-xl ring-2 ring-[#6DAD45]/20 -translate-y-1 bg-gradient-to-b from-white to-emerald-50/20"
                                    : "border-slate-200/90 shadow-md hover:border-[#6DAD45]/70 hover:shadow-lg hover:-translate-y-0.5"
                                  }`}>
                                <div>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-mono font-bold text-[#427124]">
                                      {principle.step}
                                    </span>
                                    {isActive && (
                                      <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-pulse" />
                                    )}
                                  </div>
                                  <h4 className="text-sm font-serif-display font-semibold text-slate-900 group-hover:text-[#427124] transition-colors mb-1.5 leading-snug">
                                    {principle.name}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui line-clamp-3">
                                    {principle.description}
                                  </p>
                                </div>

                                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#427124]">
                                        <span>{principle.keyOutcomes.length} Deliverables</span>
                                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5 text-[#427124]" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                                      </div>
                                    </div>
                )}

                                  {/* Circle Node on Wavy Path */}
                                  <button
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Select stage ${principle.step}: ${principle.name}`}
                                    className={`w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center shrink-0 z-20 my-2 transition-all cursor-pointer ${isActive
                                        ? "bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] scale-125 ring-4 ring-[#6DAD45]/30 shadow-emerald-500/25"
                                        : "bg-white text-slate-700 hover:bg-gradient-to-tr hover:from-[#D4E012] hover:to-[#6DAD45] hover:text-black hover:scale-110"
                                      }`}>
                                    <Icon className={`w-5 h-5 transition-transform ${isActive ? "text-slate-950 scale-110" : "text-[#427124]"}`} />
                                  </button>

                                          {/* Bottom Card (for bottom items) */}
                                          {!isTop && (
                  <div
                    onClick={() => setActiveIndex(index)}
                    className={`bg-white rounded-2xl p-5 border transition-all duration-300 w-full mt-12 relative group min-h-[175px] flex flex-col justify-between cursor-pointer text-left ${
                      isActive
                        ? "border-[#6DAD45] shadow-xl ring-2 ring-[#6DAD45]/20 translate-y-1 bg-gradient-to-b from-white to-emerald-50/20"
                        : "border-slate-200/90 shadow-md hover:border-[#6DAD45]/70 hover:shadow-lg hover:translate-y-0.5"
                    }`}>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-[#427124]">
                          {principle.step}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-pulse" />
                        )}
                      </div>
                      <h4 className="text-sm font-serif-display font-semibold text-slate-900 group-hover:text-[#427124] transition-colors mb-1.5 leading-snug">
                        {principle.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui line-clamp-3">
                        {principle.description}
                      </p>
                    </div>

                                            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#427124]">
                                              <span>{principle.keyOutcomes.length} Deliverables</span>
                                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5 text-[#427124]" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                                            </div>
                                          </div>
                )}
                                        </div>
                                        );
          })}
                                      </div>
      </div>

                                  {/* ------------------------------------------------------------- */}
                                  {/* Mobile Stacked Step Layout (< lg)                             */}
                                  {/* ------------------------------------------------------------- */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden my-6">
                                    {PRINCIPLES.map((principle, index) => {
                                      const Icon = principle.icon;
                                      const isActive = activeIndex === index;

                                      return (
                                        <div
                                          key={principle.id}
                                          onClick={() => setActiveIndex(index)}
                                          className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-sm ${isActive
                                              ? "border-[#6DAD45] ring-2 ring-[#6DAD45]/20 bg-gradient-to-b from-white to-emerald-50/30"
                                              : "border-slate-200 hover:border-[#6DAD45]/60"
                                            }`}>
                                          <div className="flex items-start gap-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] flex items-center justify-center shrink-0 shadow-sm text-slate-950 font-bold">
                                              <Icon className="w-5 h-5 text-slate-950" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="text-[11px] font-mono font-bold text-[#427124] uppercase mb-0.5">
                                                STAGE {principle.step}
                                              </div>
                                              <h4 className="text-base font-serif-display font-bold text-slate-900 mb-1 leading-snug">
                                                {principle.name}
                                              </h4>
                                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                                {principle.description}
                                              </p>
                                            </div>
                                          </div>
                              </div>
                            );
        })}
                          </div>

                              {/* ------------------------------------------------------------- */}
                              {/* Active Stage Detailed Deliverables Panel                      */}
                              {/* ------------------------------------------------------------- */}
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activePrinciple.id}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="relative mt-8 sm:mt-10 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 md:p-10">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                                    <div>
                                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                        <span className="px-3 py-1 rounded-full bg-[#6DAD45]/15 text-[#427124] font-mono font-bold text-xs uppercase tracking-wider">
                                          STAGE {activePrinciple.step}
                                        </span>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
                                          {activePrinciple.tagline}
                                        </span>
                                      </div>
                                      <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                                        {activePrinciple.name}
                                      </h3>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={onOpenQuote}
                                      className="inline-flex items-center gap-2 bg-[#F8FAF8] hover:bg-[#6DAD45]/10 text-[#427124] border border-[#6DAD45]/30 px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all w-fit cursor-pointer shadow-xs">
                                      <span>Discuss this stage</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed my-6 font-light max-w-4xl">
                                        {activePrinciple.description}
                                      </p>

                                      {/* 4 Deliverable Cards */ }
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
                                        {activePrinciple.keyOutcomes.map((outcome, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-start gap-2.5 bg-[#F8FAF8] border border-slate-200/80 hover:border-[#6DAD45]/60 hover:bg-white p-4 rounded-xl text-xs sm:text-sm text-slate-700 transition-all shadow-xs">
                                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                                            <span className="font-medium leading-snug">{outcome}</span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Capabilities Grid */ }
                                      <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                        {CAPABILITIES.map((cap) => {
                                          const CapIcon = cap.icon;
                                          return (
                                                <div
                                                  key={cap.title}
                                                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                                                  <div className="w-8 h-8 rounded-lg bg-[#6DAD45]/15 flex items-center justify-center shrink-0 text-[#427124]">
                                                    <CapIcon className="w-4 h-4" />
                                                  </div>
                                                      <div className="min-w-0">
                                                        <span className="text-xs font-semibold text-slate-900 block truncate">
                                                          {cap.title}
                                                        </span>
                                                          <span className="text-[10px] text-slate-500 block truncate">
                                                            {cap.desc}
                                                          </span>
                                                      </div>
                                                  </div>
                                                  );
            })}
                                                </div>
                                            </motion.div>
      </AnimatePresence>

                                        {/* ------------------------------------------------------------- */}
                                        {/* Clean Bottom Tailored CTA Bar                                 */}
                                        {/* ------------------------------------------------------------- */}
                                        <div className="mt-8 bg-gradient-to-r from-emerald-50/70 via-white to-lime-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                                          <div className="max-w-2xl text-center sm:text-left">
                                            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold text-[#427124] uppercase tracking-wider mb-1.5">
                                              <Sparkles className="w-4 h-4 text-[#6DAD45]" />
                                              <span>TAILORED TURNKEY SOLUTIONS</span>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                              Whether you need full EPC, EPCM or standalone scopes or portfolio
                                              management, we&apos;ll work with you to identify the right delivery approach.
                                            </p>
                                          </div>

                                          <button
                                            type="button"
                                            onClick={onOpenQuote}
                                            className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#D4E012] to-[#6DAD45] hover:opacity-95 text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2">
                                            <span>Start the conversation</span>
                                            <ArrowRight className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
  );
}
