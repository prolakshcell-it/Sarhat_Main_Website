"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Cpu,
  Truck,
  HardHat,
  Zap,
  Activity,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { ServiceStage } from "./data";

export interface HorizontalServiceRoadmapProps {
  stages: ServiceStage[];
  onOpenQuote: () => void;
}

const STAGE_ICONS: LucideIcon[] = [Search, Cpu, Truck, HardHat, Zap, Activity];

// Exact SVG Wavy Dashed Path aligned mathematically to 6 CSS Grid columns with gap-4
const WAVY_DASHED_PATH =
  "M 0 200 C 35 250, 58.3 276, 93.3 276 C 194.7 276, 194.7 24, 296.0 24 C 397.3 24, 397.3 276, 498.7 276 C 600.0 276, 600.0 24, 701.3 24 C 802.7 24, 802.7 276, 904.0 276 C 1005.3 276, 1005.3 24, 1106.7 24 C 1141.7 24, 1165.0 55, 1200 100";

export function HorizontalServiceRoadmap({
  stages,
  onOpenQuote,
}: HorizontalServiceRoadmapProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = stages[activeStageIndex] || stages[0];

  return (
        <div className="w-full font-sans-ui select-none text-slate-800">
          {/* ------------------------------------------------------------- */}
          {/* 01 / DESKTOP CURVED STEP TIMELINE (EXACT PARTNERS WAVY DESIGN) */}
          {/* ------------------------------------------------------------- */}
          <div className="relative py-4 hidden lg:block">
            {/* SVG Curved Dashed Green Connecting Line passing through each circle */}
            <svg
              className="absolute inset-0 w-full h-[300px] pointer-events-none z-0"
              viewBox="0 0 1200 300"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true">
              <path
                d={WAVY_DASHED_PATH}
                stroke="#6DAD45"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                fill="none" />
            </svg>

                {/* 6 Step Columns Alternating Top & Bottom with perfect circle alignment */ }
                <div className="grid grid-cols-6 gap-4 relative z-10 h-[300px]">
                  {stages.map((item, idx) => {
                    const Icon = STAGE_ICONS[idx % STAGE_ICONS.length] || Activity;
                    const isTop = idx % 2 === 0;
                    const isActive = idx === activeStageIndex;

            return (
                      <div
                        key={item.id}
                        className="flex flex-col items-center justify-between h-[300px] text-center cursor-pointer group"
                        onClick={() => setActiveStageIndex(idx)}>
                        {isTop ? (
                  <>
                    {/* Top Card */}
                    <div
                      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-300 w-full h-[180px] flex flex-col justify-center text-center ${
                        isActive
                          ? "border-[#6DAD45] shadow-xl shadow-[#6DAD45]/20 ring-2 ring-[#6DAD45]/30 -translate-y-1"
                          : "border-slate-200 shadow-md hover:border-[#6DAD45] hover:shadow-lg hover:-translate-y-0.5"
                      }`}>
                      <div
                        className={`text-xs font-mono font-bold mb-1 transition-colors ${
                          isActive ? "text-[#6DAD45]" : "text-[#707B00]"
                        }`}>
                        STAGE {item.num}
                      </div>
                      <h4 className="text-sm font-serif-display font-semibold text-slate-900 mb-1 leading-snug line-clamp-2">
                        {item.headline}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Circle Node at Bottom on Wavy Dashed Line */ }
                    <div
                      className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shrink-0 z-20 transition-all duration-300 ${isActive
                          ? "bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] scale-125 shadow-xl shadow-[#6DAD45]/40 ring-4 ring-[#6DAD45]/20"
                          : "bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] shadow-lg group-hover:scale-115"
                        }`}
                      aria-label={`Select Stage ${item.num}: ${item.name}`}
                      role="button"
                      tabIndex={0}>
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                  </>
                ) : (
              <>
                {/* Circle Node at Top on Wavy Dashed Line */}
                <div
                  className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shrink-0 z-20 transition-all duration-300 ${isActive
                      ? "bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] scale-125 shadow-xl shadow-[#6DAD45]/40 ring-4 ring-[#6DAD45]/20"
                      : "bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] shadow-lg group-hover:scale-115"
                    }`}
                  aria-label={`Select Stage ${item.num}: ${item.name}`}
                  role="button"
                  tabIndex={0}>
                  <Icon className="w-5 h-5 text-black" />
                </div>

                    {/* Bottom Card */}
                    <div
                      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-300 w-full h-[180px] flex flex-col justify-center text-center ${isActive
                          ? "border-[#6DAD45] shadow-xl shadow-[#6DAD45]/20 ring-2 ring-[#6DAD45]/30 translate-y-1"
                          : "border-slate-200 shadow-md hover:border-[#6DAD45] hover:shadow-lg hover:translate-y-0.5"
                        }`}>
              <div
                className={`text-xs font-mono font-bold mb-1 transition-colors ${isActive ? "text-[#6DAD45]" : "text-[#707B00]"
                  }`}>
                STAGE {item.num}
              </div>
              <h4 className="text-sm font-serif-display font-semibold text-slate-900 mb-1 leading-snug line-clamp-2">
                {item.headline}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui line-clamp-3">
                {item.description}
              </p>
            </div>
          </>
                )}
        </div>
        );
          })}
    </div>
      </div>

      {/* ------------------------------------------------------------- */ }
      {/* 02 / MOBILE & TABLET RESPONSIVE GRID LAYOUT */ }
      {/* ------------------------------------------------------------- */ }
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mb-8">
        {stages.map((item, idx) => {
          const Icon = STAGE_ICONS[idx % STAGE_ICONS.length] || Activity;
          const isActive = idx === activeStageIndex;

          return (
            <div
              key={item.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`bg-white rounded-2xl p-5 border transition-all duration-300 flex items-start gap-4 cursor-pointer ${isActive
                  ? "border-[#6DAD45] shadow-lg shadow-[#6DAD45]/15 ring-2 ring-[#6DAD45]/30"
                  : "border-slate-200 shadow-sm hover:border-slate-300"
                }`}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] border-2 border-white shadow-md flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono font-bold text-[#707B00] mb-0.5">
                  STAGE {item.num}
                </div>
                <h4 className="text-base font-serif-display font-semibold text-slate-900 mb-1 leading-snug">
                  {item.headline}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans-ui line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 03 / ACTIVE STAGE DEEP-DIVE INSPECTION CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden mt-8">
          {/* Subtle Ambient Radial Green Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6DAD45]/8 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                <div className="max-w-3xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-[0.16em] block">
                      STAGE {activeStage.num} PIPELINE DETAILS
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-xs text-slate-500 uppercase font-bold">
                      {activeStage.name}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug">
                    {activeStage.headline}
                  </h3>

                <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed pt-1">
                  {activeStage.description}
                </p>
              </div>

    {/* Discuss Stage CTA Button */}
    <div className="shrink-0 flex items-center">
      <button
        type="button"
        onClick={onOpenQuote}
        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-mono font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-full shadow-lg shadow-[#6DAD45]/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
        <span>DISCUSS STAGE {activeStage.num}</span>
        <ArrowRight className="w-4 h-4 text-black" />
      </button>
    </div>
  </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default HorizontalServiceRoadmap;
