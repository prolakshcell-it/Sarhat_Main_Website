"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import AnimatedPillBadge from "./AnimatedPillBadge";

export interface PrincipleStage {
  id: string;
  step: string;
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
  // Tuple storing [currentIndex, direction] to handle slide direction animations
  const [[activeIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const shouldReduceMotion = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const activePrinciple = PRINCIPLES[activeIndex];

  // Percentage position for the timeline progress line fill
  const progressPercent = (activeIndex / (PRINCIPLES.length - 1)) * 100;

  const handleStageSelect = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    const dir = nextIndex> activeIndex ? 1 : -1;
    setPage([nextIndex, dir]);
  };

  // Keyboard navigation for tablist accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;
    if (e.key=== "ArrowRight" || e.key=== "ArrowDown") {
      e.preventDefault();
      targetIndex = (index + 1) % PRINCIPLES.length;
    } else if (e.key=== "ArrowLeft" || e.key=== "ArrowUp") {
      e.preventDefault();
      targetIndex = (index - 1 + PRINCIPLES.length) % PRINCIPLES.length;
    } else if (e.key=== "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key=== "End") {
      e.preventDefault();
      targetIndex = PRINCIPLES.length - 1;
    }

    if (targetIndex !== -1) {
      handleStageSelect(targetIndex);
      tabsRef.current[targetIndex]?.focus();
    }
  };

  // Stage content transition variants
  const stageVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir> 0 ? 20 : -20,
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.38,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir> 0 ? -20 : 20,
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.25,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-4 font-sans-ui">
      {/* ------------------------------------------------------------- */}
      {/* Section Header */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <AnimatedPillBadge darkBg className="mb-6">
          THE 5 DELIVERY PRINCIPLES IN PRACTICE
        </AnimatedPillBadge>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-4">
          Our Delivery{" "}
          <span className="text-[#D4E012] italic relative inline-block">
            Principles.
            <svg
              className="absolute -bottom-2.5 left-0 w-full h-3 text-[#D4E012]"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              aria-hidden="true">
              <path
                d="M0 15 Q 50 2 100 15"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="transparent" />
            </svg>
          </span>
        </h2>

        {/* Interactive Helper Indicator Pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#D4E012] bg-[#0E2818]/90 border border-[#D4E012]/30 px-4 py-2 rounded-full mx-auto mt-4 backdrop-blur-md shadow-lg shadow-[#D4E012]/5 select-none">
          <MousePointerClick className="w-3.5 h-3.5 text-[#D4E012] animate-bounce" />
          <span>Click any stage below to explore outcomes.</span>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Main Container Card - Refined Enterprise Dark Glass Aesthetic */}
      {/* ------------------------------------------------------------- */}
      <div className="relative rounded-3xl bg-[#06140B] border border-[#173D26] shadow-[0_24px_70px_rgba(0,0,0,0.65)] overflow-hidden p-5 sm:p-8 md:p-10">
        {/* Ambient Radial Floating Meshes (Subtle, purposeful depth) */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-1/4 w-[420px] h-[420px] bg-[#D4E012]/8 rounded-full blur-[140px] pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-1/4 w-[460px] h-[460px] bg-[#5EE72D]/8 rounded-full blur-[150px] pointer-events-none" />

        {/* Technical Blueprint Engineering Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.09] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #5EE72D 1px, transparent 1px), linear-gradient(to bottom, #5EE72D 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }} />

        {/* ------------------------------------------------------------- */}
        {/* Dynamic Content Display Area */}
        {/* ------------------------------------------------------------- */}
        <div
          className="relative z-10 mb-8 sm:mb-12 min-h-[300px] flex flex-col justify-start"
          role="region"
          aria-live="polite">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activePrinciple.id}
              custom={direction}
              variants={stageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              role="tabpanel"
              id={`stage-panel-${activePrinciple.id}`}
              aria-labelledby={`stage-tab-${activePrinciple.id}`}
              className="bg-gradient-to-b from-[#0C2417]/95 to-[#081B11]/95 backdrop-blur-xl border border-[#1F5434] rounded-2xl p-5 sm:p-7 md:p-8 relative shadow-2xl text-white overflow-hidden">
              {/* Left Vertical Glowing Accent Stripe */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-4 bottom-4 w-1.5 bg-gradient-to-b from-[#D4E012] via-[#5EE72D] to-[#369527] rounded-r-full shadow-[0_0_12px_rgba(212,224,18,0.35)]" />

              <div className="pl-3 sm:pl-6">
                {/* Header Row: Stage Pill + Name + Tagline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#173D26]/60">
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                    <span className="font-sans-inter tabular-nums text-xs font-bold px-3 py-1 bg-[#D4E012]/15 text-[#D4E012] border border-[#D4E012]/30 rounded-full shadow-sm tracking-wider">
                      STAGE {activePrinciple.step}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-display font-medium text-white tracking-tight">
                      {activePrinciple.name}
                    </h3>
                  </div>

                  <span className="text-[11px] sm:text-xs font-mono text-emerald-300 bg-[#06150D]/90 border border-[#194729] px-3 py-1.5 rounded-lg w-fit">
                    {activePrinciple.tagline}
                  </span>
                </div>

                {/* Stage Description */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-light max-w-4xl">
                  {activePrinciple.description}
                </p>

                {/* Key Outcomes / Deliverable Cards (4-column grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
                  {activePrinciple.keyOutcomes.map((outcome, idx) => (
                    <motion.div
                      key={outcome}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.08 + idx * 0.06,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="group flex items-start gap-2.5 bg-[#06160E]/85 border border-[#174127] hover:border-[#5EE72D]/50 hover:bg-[#092215] p-3.5 rounded-xl text-xs sm:text-[13px] text-slate-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-default">
                      <div className="w-5 h-5 rounded-full bg-[#5EE72D]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#5EE72D]/20 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5EE72D] transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="leading-snug font-medium text-slate-200 group-hover:text-white transition-colors">
                        {outcome}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Stage Bottom Bar: Guarantee & Engineering Link */}
                <div className="mt-6 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[#173D26] gap-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EE72D] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EE72D]" />
                    </span>
                    <span>Sarhat Execution Guarantee</span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-[#D4E012] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] rounded-md px-1 py-0.5">
                    <span>Discuss this stage with our engineering team</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Interactive Five-Stage Delivery Timeline */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 my-8 sm:my-12 px-2 sm:px-6">
          {/* Timeline Background Rail */}
          <div className="relative w-full h-1 sm:h-1.5 bg-[#102C1B] rounded-full overflow-hidden">
            {/* Active Highlighted Line Fill with Smooth Spring Motion */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#4EAA32] via-[#5EE72D] to-[#D4E012] rounded-full shadow-[0_0_12px_rgba(212,224,18,0.7)]"
              animate={{ width: `${progressPercent}%` }}
              transition={{
                type: "spring",
                stiffness: shouldReduceMotion ? 800 : 220,
                damping: 26,
              }} />
          </div>

          {/* 5 Interactive Stage Nodes */}
          <div
            role="tablist"
            aria-label="Delivery Principles Stages"
            className="relative -top-3.5 sm:-top-5 flex justify-between items-start w-full">
            {PRINCIPLES.map((principle, index) => {
              const isActive = index === activeIndex;
              const isPassed = index <= activeIndex;
              const IconComp = principle.icon;

              return (
                <button
                  key={principle.id}
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`stage-tab-${principle.id}`}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${principle.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleStageSelect(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="flex flex-col items-center cursor-pointer group select-none max-w-[19%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] rounded-xl p-1">
                  {/* Node Circle Wrapper */}
                  <div className="relative mb-2 sm:mb-3">
                    {/* Active Radar Aura Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineAura"
                        className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#D4E012]/25 border border-[#D4E012]/60 shadow-[0_0_22px_rgba(212,224,18,0.6)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 28,
                        }} />
                    )}

                    <div
                      className={`w-7 h-7 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-lg ${
                        isActive
                          ? "bg-gradient-to-br from-[#D4E012] to-[#5EE72D] text-slate-950 scale-110 ring-2 sm:ring-4 ring-[#06140B] shadow-[#D4E012]/40"
                          : isPassed
                          ? "bg-[#0E2C1A] text-[#5EE72D] border border-[#27643D] group-hover:scale-105 group-hover:border-[#5EE72D]"
                          : "bg-[#081C10] text-slate-400 border border-[#153B23] group-hover:border-slate-400 group-hover:text-slate-200"
                      }`}>
                      <IconComp className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Stage Number & Title Label */}
                  <div className="text-center transition-all duration-300">
                    <span
                      className={`text-[10px] sm:text-xs font-sans-inter tabular-nums font-bold block mb-0.5 tracking-wider ${
                        isActive
                          ? "text-[#D4E012]"
                          : isPassed
                          ? "text-emerald-400/90"
                          : "text-slate-500"
                      }`}>
                      {principle.step}
                    </span>

                    {/* Desktop / Tablet Full Title */}
                    <span
                      className={`hidden sm:block text-xs md:text-sm font-medium leading-tight transition-colors line-clamp-2 ${
                        isActive
                          ? "text-white font-bold"
                          : isPassed
                          ? "text-slate-200 group-hover:text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}>
                      {principle.name}
                    </span>

                    {/* Mobile Compact Label */}
                    <span
                      className={`block sm:hidden text-[10px] font-medium leading-tight transition-colors line-clamp-1 ${
                        isActive
                          ? "text-white font-bold"
                          : isPassed
                          ? "text-slate-300"
                          : "text-slate-500"
                      }`}>
                      {principle.shortName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Delivery Capabilities Row (4 Badges) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 pt-6 mt-8 sm:mt-10 border-t border-[#133721] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                className="group flex items-center gap-3 bg-[#081D11]/70 hover:bg-[#0D2A19] border border-[#163D24] hover:border-[#D4E012]/40 px-3.5 sm:px-4 py-3 rounded-xl transition-all duration-200 cursor-default">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#5EE72D]/10 flex items-center justify-center shrink-0 text-[#5EE72D] group-hover:text-[#D4E012] group-hover:bg-[#D4E012]/15 transition-all">
                  <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-200 group-hover:text-white block truncate transition-colors">
                    {cap.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate font-light">
                    {cap.desc}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Professional Bottom CTA Banner */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 sm:mt-8 bg-gradient-to-r from-[#071F12]/95 via-[#0A2617]/95 to-[#071F12]/95 border border-[#1A4B2C] rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 backdrop-blur-md shadow-2xl">
          <div className="max-w-2xl text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-mono text-[#D4E012] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4E012]" />
              <span>Tailored Turnkey Solutions</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Whether you need full EPC, EPCM or standalone scopes or portfolio
              management, we&apos;ll work with you to identify the right delivery
              approach.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={onOpenQuote}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#C4D010] hover:to-[#4FD720] text-slate-950 font-black text-xs sm:text-[13px] uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all shadow-[0_0_24px_rgba(212,224,18,0.25)] hover:shadow-[0_0_35px_rgba(212,224,18,0.45)] cursor-pointer flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4E012]/40">
            <span>Start the conversation</span>
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
