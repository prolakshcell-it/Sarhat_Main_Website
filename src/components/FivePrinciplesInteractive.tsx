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
  CheckCircle2,
} from "lucide-react";

export interface PrincipleStage {
  id: string;
  step: string;
  position: "top" | "bottom";
  name: string;
  tagline: string;
  actionText: string;
  description: string;
  keyOutcomes: string[];
  whatThisTellsYou: string;
  icon: React.ElementType;
}

export const PRINCIPLES: PrincipleStage[] = [
  {
    id: "ground",
    step: "01",
    position: "top",
    name: "Understand the ground",
    tagline: "Site, land and grid feasibility",
    actionText: "Discuss site feasibility",
    description:
      "Check terrain, drainage, ground conditions and the route to grid before fixing the layout.",
    keyOutcomes: [
      "Site survey and constraints map",
      "Ground and earthing assessment",
      "Grid connection review",
      "Land and right-of-way review",
    ],
    whatThisTellsYou:
      "Whether the site is ready for concept design and what needs further investigation.",
    icon: Compass,
  },
  {
    id: "engineering",
    step: "02",
    position: "bottom",
    name: "Engineer for the project",
    tagline: "DESIGN AND ENGINEERING",
    actionText: "DISCUSS ENGINEERING SCOPE",
    description:
      "Design around the site, performance requirements and how the asset will be operated.",
    keyOutcomes: [
      "Design basis",
      "Engineering drawings",
      "Bill of materials",
      "Design review record",
    ],
    whatThisTellsYou:
      "What the design is based on and what needs approval before procurement or construction.",
    icon: Cpu,
  },
  {
    id: "handoff",
    step: "03",
    position: "top",
    name: "Own every handoff",
    tagline: "RESPONSIBILITIES AND COORDINATION",
    actionText: "DISCUSS PROJECT COORDINATION",
    description:
      "Define who owns each decision, what must be passed on and who accepts the handover.",
    keyOutcomes: [
      "Responsibility matrix",
      "Interface register",
      "Decision log",
      "Handover checklist",
    ],
    whatThisTellsYou:
      "Who owns each decision and what the next team needs to proceed.",
    icon: Layers,
  },
  {
    id: "safety-quality",
    step: "04",
    position: "bottom",
    name: "Build safely. Prove quality.",
    tagline: "SITE SAFETY AND QUALITY",
    actionText: "DISCUSS SITE EXECUTION",
    description:
      "Plan safe work, check workmanship and verify that corrective actions are closed.",
    keyOutcomes: [
      "Site safety plan",
      "Inspection and test plan",
      "Inspection records",
      "Corrective action log",
    ],
    whatThisTellsYou:
      "What was checked, what was accepted and which items still need action.",
    icon: ShieldCheck,
  },
  {
    id: "learn-improve",
    step: "05",
    position: "top",
    name: "Learn and improve",
    tagline: "PERFORMANCE AND LESSONS LEARNED",
    actionText: "DISCUSS ASSET PERFORMANCE",
    description:
      "Review commissioning and operating data to improve the asset and inform future projects.",
    keyOutcomes: [
      "Commissioning review",
      "Performance baseline",
      "Lessons learned",
      "Improvement action plan",
    ],
    whatThisTellsYou:
      "How to track performance and prioritise improvements after handover.",
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

  return (
    <div className="w-full max-w-7xl mx-auto py-4 font-sans-ui">
      {/* ------------------------------------------------------------- */}
      {/* Section Header */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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
          Select a principle to explore its deliverables and outcomes.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Desktop Curved Wavy Step Timeline (5 Steps on Wavy Path)      */}
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
                    className={`bg-white rounded-2xl p-5 border transition-all duration-300 w-full mb-12 relative group min-h-[175px] flex flex-col justify-between cursor-pointer text-left ${
                      isActive
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
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isActive
                            ? "translate-x-0.5 text-[#427124]"
                            : "text-slate-400 group-hover:translate-x-0.5"
                        }`} />
                    </div>
                  </div>
                )}

                {/* Circle Node on Wavy Path */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Select stage ${principle.step}: ${principle.name}`}
                  className={`w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center shrink-0 z-20 my-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] scale-125 ring-4 ring-[#6DAD45]/30 shadow-emerald-500/25"
                      : "bg-white text-slate-700 hover:bg-gradient-to-tr hover:from-[#D4E012] hover:to-[#6DAD45] hover:text-black hover:scale-110"
                  }`}>
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "text-slate-950 scale-110" : "text-[#427124]"
                    }`} />
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
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isActive
                            ? "translate-x-0.5 text-[#427124]"
                            : "text-slate-400 group-hover:translate-x-0.5"
                        }`} />
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
              className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-sm ${
                isActive
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
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full bg-[#EAF5E4] text-[#427124] font-mono font-bold text-xs uppercase tracking-wider">
                  PRINCIPLE {activePrinciple.step} · {activePrinciple.tagline}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight">
                {activePrinciple.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all w-fit cursor-pointer shadow-xs">
              <span>{activePrinciple.actionText}</span>
              <span className="text-sm font-bold">→</span>
            </button>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed my-6 font-normal max-w-4xl">
            {activePrinciple.description}
          </p>

          {/* 4 Deliverable Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            {activePrinciple.keyOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-[#FAFDF9] border border-slate-200/80 hover:border-[#6DAD45]/60 hover:bg-white p-4 rounded-2xl text-xs sm:text-sm text-slate-800 transition-all shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#509E2F] shrink-0" />
                <span className="font-medium leading-snug">{outcome}</span>
              </div>
            ))}
          </div>

          {/* "WHAT THIS TELLS YOU" Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF7EB] border border-[#6DAD45]/20 flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm">
            <span className="font-mono font-bold text-[#509E2F] uppercase tracking-wider shrink-0 text-xs">
              WHAT THIS TELLS YOU
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-slate-700 font-normal">
              {activePrinciple.whatThisTellsYou}
            </span>
          </div>

          {/* "Find the right delivery scope" Bottom Action Strip */}
          <div className="mt-6 bg-[#FAFDF9] border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-900 mb-0.5">
                Find the right delivery scope
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Full EPC, EPCM or support for selected phases.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full sm:w-auto shrink-0 bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2">
              <span>Start the conversation</span>
              <span className="text-sm font-bold">→</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
