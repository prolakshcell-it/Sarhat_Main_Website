"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import indiaMap from "@svg-maps/india";

export interface StateMeta {
  id: string;
  slug: string;
  name: string;
  code: string;
  path: string;
  isOperating: boolean;
  cardPos: { x: number; y: number };
  capacityText: string;
  commissioned: number;
  ongoing: number;
}

// Map SVG Location IDs to website state slugs
const SVG_ID_TO_SLUG: Record<string, string> = {
  rj: "rajasthan",
  up: "uttar-pradesh",
  hr: "haryana",
  br: "bihar",
  mp: "madhya-pradesh",
  ar: "arunachal-pradesh",
  gj: "gujarat",
  mh: "maharashtra",
  ka: "karnataka",
  tn: "tamil-nadu",
  tg: "telangana",
  ap: "andhra-pradesh",
  or: "odisha",
  wb: "west-bengal",
  ct: "chhattisgarh",
  jh: "jharkhand",
  pb: "punjab",
  hp: "himachal-pradesh",
  ut: "uttarakhand",
  jk: "jammu-kashmir",
  as: "assam",
};

// Sarhat Operating Portfolio Stats for key states
const OPERATING_METRICS: Record<
  string,
  {
    name: string;
    code: string;
    capacityText: string;
    commissioned: number;
    ongoing: number;
    cardPos: { x: number; y: number };
  }
> = {
  rj: {
    name: "Rajasthan",
    code: "RJ",
    capacityText: "25.03 MW Portfolio Capacity",
    commissioned: 6,
    ongoing: 4,
    cardPos: { x: 119, y: 257 },
  },
  up: {
    name: "Uttar Pradesh",
    code: "UP",
    capacityText: "9.12 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 5,
    cardPos: { x: 265, y: 245 },
  },
  hr: {
    name: "Haryana",
    code: "HR",
    capacityText: "9.00 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 4,
    cardPos: { x: 164, y: 195 },
  },
  br: {
    name: "Bihar",
    code: "BR",
    capacityText: "4.07 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 3,
    cardPos: { x: 369, y: 275 },
  },
  mp: {
    name: "Madhya Pradesh",
    code: "MP",
    capacityText: "1.20 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 1,
    cardPos: { x: 214, y: 319 },
  },
  ar: {
    name: "Arunachal Pradesh",
    code: "AR",
    capacityText: "0.80 MW Portfolio Capacity",
    commissioned: 1,
    ongoing: 0,
    cardPos: { x: 550, y: 224 },
  },
};

// Center positions for card placement on 612x696 viewBox
const STATE_BBOX_CENTERS: Record<string, { x: number; y: number }> = {
  an: { x: 521, y: 609 },
  ap: { x: 263, y: 500 },
  ar: { x: 550, y: 224 },
  as: { x: 516, y: 271 },
  br: { x: 369, y: 275 },
  ch: { x: 179, y: 160 },
  ct: { x: 296, y: 388 },
  dn: { x: 102, y: 405 },
  dd: { x: 54, y: 391 },
  dl: { x: 186, y: 210 },
  ga: { x: 122, y: 512 },
  gj: { x: 66, y: 355 },
  hr: { x: 164, y: 195 },
  hp: { x: 191, y: 133 },
  jk: { x: 173, y: 61 },
  jh: { x: 366, y: 327 },
  ka: { x: 171, y: 519 },
  kl: { x: 166, y: 615 },
  ld: { x: 99, y: 627 },
  mp: { x: 214, y: 319 },
  mh: { x: 180, y: 435 },
  mn: { x: 537, y: 301 },
  ml: { x: 484, y: 283 },
  mz: { x: 516, y: 337 },
  nl: { x: 546, y: 270 },
  or: { x: 340, y: 405 },
  py: { x: 268, y: 546 },
  pb: { x: 151, y: 152 },
  rj: { x: 119, y: 257 },
  sk: { x: 425, y: 235 },
  tn: { x: 211, y: 609 },
  tg: { x: 237, y: 457 },
  tr: { x: 493, y: 325 },
  up: { x: 265, y: 245 },
  ut: { x: 232, y: 175 },
  wb: { x: 412, y: 310 },
};

function getSvgLocationId(slug?: string): string {
  if (!slug) return "rj";
  const s = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (s.includes("rajasthan") || s === "rj") return "rj";
  if (s.includes("uttar") || s === "up") return "up";
  if (s.includes("haryana") || s === "hr") return "hr";
  if (s.includes("bihar") || s === "br") return "br";
  if (s.includes("madhya") || s === "mp") return "mp";
  if (s.includes("arunachal") || s === "ar") return "ar";
  if (s.includes("gujarat") || s === "gj") return "gj";
  if (s.includes("maharashtra") || s === "mh") return "mh";
  if (s.includes("karnataka") || s === "ka") return "ka";
  if (s.includes("tamil") || s === "tn") return "tn";
  if (s.includes("telangana") || s === "tg") return "tg";
  if (s.includes("andhra") || s === "ap") return "ap";
  if (s.includes("odisha") || s === "or") return "or";
  if (s.includes("bengal") || s === "wb") return "wb";
  if (s.includes("chhattisgarh") || s === "ct") return "ct";
  if (s.includes("jharkhand") || s === "jh") return "jh";
  if (s.includes("punjab") || s === "pb") return "pb";
  return "rj";
}

interface SlnkoStyleIndiaMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
  onViewDetails?: (slug: string) => void;
}

export default function SlnkoStyleIndiaMap({ selectedStateSlug, onSelectState, onViewDetails }: SlnkoStyleIndiaMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Map all locations from official GitHub @svg-maps/india
  const stateItems: StateMeta[] = useMemo(() => {
    return indiaMap.locations.map((loc: { id: string; name: string; path: string }) => {
      const metrics = OPERATING_METRICS[loc.id];
      const bboxCenter = STATE_BBOX_CENTERS[loc.id] || { x: 300, y: 350 };
      const slug = SVG_ID_TO_SLUG[loc.id] || loc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      return {
        id: loc.id,
        slug,
        name: metrics?.name || loc.name,
        code: metrics?.code || loc.id.toUpperCase(),
        path: loc.path,
        isOperating: !!metrics,
        cardPos: metrics?.cardPos || bboxCenter,
        capacityText: metrics?.capacityText || "EPC Partnering State",
        commissioned: metrics?.commissioned || 0,
        ongoing: metrics?.ongoing || 0,
      };
    });
  }, []);

  // Determine active highlighted state
  const activeState = useMemo(() => {
    if (hoveredId) {
      const match = stateItems.find((s) => s.id === hoveredId);
      if (match) return match;
    }
    if (selectedStateSlug && selectedStateSlug !== "all") {
      const targetId = getSvgLocationId(selectedStateSlug);
      const match = stateItems.find((s) => s.id === targetId);
      if (match) return match;
    }
    return stateItems.find((s) => s.id === "rj") || stateItems[0];
  }, [selectedStateSlug, hoveredId, stateItems]);

  const handleStateClick = useCallback(
    (state: StateMeta) => {
      onSelectState?.(state.slug);
    },
    [onSelectState]
  );

  return (
    <div
      onMouseLeave={() => setHoveredId(null)}
      className="relative w-full overflow-hidden rounded-[28px] bg-[#071325] border border-slate-800/80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-12 cursor-default select-none"
    >
      {/* Sarhat Ambient Radial Light Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_30%,rgba(109,173,69,0.18),rgba(7,19,37,0))]" />

      {/* SVG Official GitHub Map of India */}
      <div className="relative mx-auto flex items-center justify-center min-h-[500px] sm:min-h-[640px] lg:min-h-[700px]">
        <svg
          viewBox={indiaMap.viewBox || "0 0 612 696"}
          className="w-full max-w-[720px] h-auto select-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* Inactive Slate State Gradient */}
            <linearGradient id="slateStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="60%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Non-active Operating State Gradient (Sarhat Eco Dark Green) */}
            <linearGradient id="sarhatOperatingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B7A4C" />
              <stop offset="100%" stopColor="#1F472B" />
            </linearGradient>

            {/* Active Selected State Gradient (Sarhat Solar Green & Lime) */}
            <linearGradient id="sarhatActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="50%" stopColor="#6DAD45" />
              <stop offset="100%" stopColor="#4D8B2C" />
            </linearGradient>

            {/* Glowing filter for Sarhat Active Green */}
            <filter id="sarhatGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* 3D Slab Shadow Filter */}
            <filter id="github3DShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#000" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* 3D Extrusion Shadow Layer */}
          <g transform="translate(0, 10)" opacity="0.5" filter="url(#github3DShadow)">
            {stateItems.map((state) => (
              <path key={`shadow-${state.id}`} d={state.path} fill="#060D1A" stroke="#020617" strokeWidth="1.5" />
            ))}
          </g>

          {/* Authentic GitHub State Vector Layers */}
          <g className="transition-all duration-300">
            {stateItems.map((state) => {
              const isActive = activeState.id === state.id;
              const isOperating = state.isOperating;

              let fillUrl = "url(#slateStateGrad)";
              let strokeColor = "#475569";
              let strokeWidth = "0.8";

              if (isActive) {
                fillUrl = "url(#sarhatActiveGrad)";
                strokeColor = "#D4E012";
                strokeWidth = "2.8";
              } else if (isOperating) {
                fillUrl = "url(#sarhatOperatingGrad)";
                strokeColor = "#6DAD45";
                strokeWidth = "1.2";
              }

              return (
                <path
                  key={state.id}
                  d={state.path}
                  onClick={() => handleStateClick(state)}
                  onMouseEnter={() => setHoveredId(state.id)}
                  className="cursor-pointer transition-colors duration-200 ease-out hover:opacity-95"
                  fill={fillUrl}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={isActive ? 1 : isOperating ? 0.9 : 0.5}
                  style={{
                    filter: isActive
                      ? "url(#sarhatGlow) drop-shadow(0 10px 22px rgba(109, 173, 69, 0.85))"
                      : "none",
                  }}
                />
              );
            })}
          </g>

          {/* Solar Location Marker Dots on Operating States */}
          <g className="pointer-events-none">
            {stateItems
              .filter((s) => s.isOperating)
              .map((s) => {
                const isActive = activeState.id === s.id;
                return (
                  <g key={`pin-${s.id}`} transform={`translate(${s.cardPos.x}, ${s.cardPos.y})`}>
                    {isActive && (
                      <circle r="10" fill="#D4E012" opacity="0.35" className="animate-ping" />
                    )}
                    <circle r="4" fill={isActive ? "#D4E012" : "#6DAD45"} stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                );
              })}
          </g>
        </svg>

        {/* Floating Dark Glassmorphic Card Overlay (Sarhat Brand Theme - Stable Pointer Events) */}
        <AnimatePresence>
          {activeState && (
            <motion.div
              key={activeState.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute z-30 pointer-events-auto"
              onMouseEnter={() => setHoveredId(activeState.id)}
              style={{
                top: `${Math.min(Math.max(activeState.cardPos.y / 6.96, 22), 68)}%`,
                left: `${Math.min(Math.max(activeState.cardPos.x / 6.12, 28), 68)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-[240px] sm:w-[270px] rounded-xl bg-[#091526]/95 backdrop-blur-xl border border-[#6DAD45]/40 p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.92)] shadow-[#6DAD45]/10 text-white">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4E012]">
                  {activeState.name}
                </span>

                <h4 className="mt-1 font-sans text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
                  {activeState.capacityText}
                </h4>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800/90 pt-2.5 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-sm font-bold text-[#6DAD45]">
                      {activeState.commissioned}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">Commissioned</span>
                  </div>

                  <div className="h-3.5 w-[1px] bg-slate-700/80" />

                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-sm font-bold text-[#D4E012]">
                      {activeState.ongoing}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">Ongoing</span>
                  </div>
                </div>

                {/* View Details Action Button - Navigates to dedicated /projects/[stateSlug] route */}
                <Link
                  href={`/projects/${activeState.slug}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectState?.(activeState.slug);
                    onViewDetails?.(activeState.slug);
                  }}
                  className="mt-3 flex w-full items-center justify-between rounded-lg bg-[#6DAD45]/20 hover:bg-[#6DAD45]/35 border border-[#6DAD45]/50 px-3 py-2 text-[11px] font-bold font-sans text-[#D4E012] transition-all duration-200 group cursor-pointer"
                >
                  <span className="truncate">View {activeState.name} Projects ({activeState.commissioned + activeState.ongoing})</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#D4E012] transition-transform duration-200 group-hover:translate-x-1 ml-1" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
