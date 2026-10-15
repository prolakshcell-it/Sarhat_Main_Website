"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import indiaMap from "@svg-maps/india";

export interface StateMeta {
  id: string;
  slug: string;
  name: string;
  code: string;
  path: string;
  isOperating: boolean;
  pinPos: { x: number; y: number };
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

// Strategic card anchor placement in empty perimeter zones so neighbouring states are NEVER blocked
const OPERATING_METRICS: Record<
  string,
  {
    name: string;
    code: string;
    capacityText: string;
    commissioned: number;
    ongoing: number;
    pinPos: { x: number; y: number };
    cardPos: { x: number; y: number };
  }
> = {
  rj: {
    name: "Rajasthan",
    code: "RJ",
    capacityText: "25.03 MW Portfolio Capacity",
    commissioned: 6,
    ongoing: 4,
    pinPos: { x: 119, y: 257 },
    cardPos: { x: 120, y: 220 }, // West over desert border — leaves Haryana, UP, MP, Gujarat 100% uncovered
  },
  up: {
    name: "Uttar Pradesh",
    code: "UP",
    capacityText: "9.12 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 5,
    pinPos: { x: 265, y: 245 },
    cardPos: { x: 345, y: 175 }, // Northeast over Nepal border — leaves Haryana, Punjab, Rajasthan, MP, Bihar 100% uncovered
  },
  hr: {
    name: "Haryana",
    code: "HR",
    capacityText: "9.00 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 4,
    pinPos: { x: 164, y: 195 },
    cardPos: { x: 135, y: 145 }, // Northwest over Punjab/border — leaves UP, Rajasthan, MP 100% uncovered
  },
  br: {
    name: "Bihar",
    code: "BR",
    capacityText: "4.07 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 3,
    pinPos: { x: 369, y: 275 },
    cardPos: { x: 410, y: 195 }, // North over Nepal border — leaves UP, MP, Bengal 100% uncovered
  },
  mp: {
    name: "Madhya Pradesh",
    code: "MP",
    capacityText: "1.20 MW Portfolio Capacity",
    commissioned: 0,
    ongoing: 1,
    pinPos: { x: 214, y: 319 },
    cardPos: { x: 260, y: 385 }, // Southeast — leaves Rajasthan, UP, Gujarat, Maharashtra 100% uncovered
  },
  ar: {
    name: "Arunachal Pradesh",
    code: "AR",
    capacityText: "0.80 MW Portfolio Capacity",
    commissioned: 1,
    ongoing: 0,
    pinPos: { x: 550, y: 224 },
    cardPos: { x: 485, y: 195 }, // West over Assam corridor
  },
  gj: {
    name: "Gujarat",
    code: "GJ",
    capacityText: "Strategic Expansion Corridor",
    commissioned: 0,
    ongoing: 1,
    pinPos: { x: 66, y: 355 },
    cardPos: { x: 80, y: 405 }, // Southwest into Arabian Sea — leaves Rajasthan, MP 100% uncovered
  },
  ka: {
    name: "Karnataka",
    code: "KA",
    capacityText: "Technical Consulting Hub",
    commissioned: 0,
    ongoing: 1,
    pinPos: { x: 171, y: 519 },
    cardPos: { x: 130, y: 530 }, // West into Arabian Sea — leaves Maharashtra, Andhra, Tamil Nadu 100% uncovered
  },
};

// Fallback positions for remaining Indian states
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
  if (!slug || slug === "all") return "";
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
  return "";
}

interface SlnkoStyleIndiaMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
  onViewDetails?: (slug: string) => void;
}

export default function SlnkoStyleIndiaMap({
  selectedStateSlug,
  onSelectState,
  onViewDetails,
}: SlnkoStyleIndiaMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Derive active ID from props or hover
  const propSelectedId = useMemo(() => {
    if (!selectedStateSlug || selectedStateSlug === "all") return null;
    return getSvgLocationId(selectedStateSlug) || null;
  }, [selectedStateSlug]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

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
        pinPos: metrics?.pinPos || bboxCenter,
        cardPos: metrics?.cardPos || bboxCenter,
        capacityText: metrics?.capacityText || "EPC Partnering State",
        commissioned: metrics?.commissioned || 0,
        ongoing: metrics?.ongoing || 0,
      };
    });
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Grace period so moving cursor diagonally from state path to the card never causes flicker or vanishing
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 280);
  }, [cancelClose]);

  const handleStateMouseEnter = useCallback(
    (stateId: string) => {
      cancelClose();
      setDismissedId(null);
      setHoveredId(stateId);
    },
    [cancelClose]
  );

  const handleStateClick = useCallback(
    (state: StateMeta) => {
      cancelClose();
      setDismissedId(null);
      setHoveredId(state.id);
      onSelectState?.(state.slug);
    },
    [cancelClose, onSelectState]
  );

  // Active target ID: hover takes priority for immediate inspection, then selected prop
  const rawTargetId = hoveredId || propSelectedId;
  const activeTargetId = rawTargetId !== dismissedId ? rawTargetId : null;

  // Highlight state vector on map
  const highlightedStateId = activeTargetId;

  // Active state data
  const activeState = useMemo(() => {
    if (!activeTargetId) return null;
    return stateItems.find((s) => s.id === activeTargetId) || null;
  }, [activeTargetId, stateItems]);

  // Scalable card positioning near the state in its dedicated non-blocking border zone
  const cardStyle = useMemo(() => {
    if (!activeState) return {};
    const anchor = activeState.cardPos;
    const xPct = (anchor.x / 612) * 100;
    const yPct = (anchor.y / 696) * 100;

    // Clamped so it stays inside container boundaries on all screen sizes
    const left = Math.min(Math.max(xPct, 20), 80);
    const top = Math.min(Math.max(yPct, 18), 82);

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: "translate(-50%, -50%)",
    };
  }, [activeState]);

  return (
    <div className="relative w-full select-none cursor-default">
      {/* Ambient Radial Lighting Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_35%,rgba(109,173,69,0.16),rgba(7,19,37,0))]"
      />

      {/* Quick Status Legend Strip */}
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3 px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6DAD45] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#6DAD45]" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-slate-300">
            Active EPC Portfolio &amp; Grid Corridors
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-sans text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#6DAD45]" /> Operating
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#D4E012]" /> Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#334155]" /> Expansion
          </span>
        </div>
      </div>

      {/* Scalable Aspect-Ratio Frame Containing SVG Map and Contextual Floating Card */}
      <div className="relative mx-auto flex w-full max-w-[660px] aspect-[612/696] items-center justify-center">
        <svg
          viewBox={indiaMap.viewBox || "0 0 612 696"}
          className="h-full w-full select-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
          onMouseLeave={scheduleClose}
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

          {/* SVG Background Catcher: gracefully handles mouseout in ocean */}
          <rect
            width="100%"
            height="100%"
            fill="transparent"
            onMouseEnter={scheduleClose}
          />

          {/* 3D Extrusion Shadow Layer */}
          <g transform="translate(0, 10)" opacity="0.5" filter="url(#github3DShadow)">
            {stateItems.map((state) => (
              <path
                key={`shadow-${state.id}`}
                d={state.path}
                fill="#060D1A"
                stroke="#020617"
                strokeWidth="1.5"
              />
            ))}
          </g>

          {/* Authentic GitHub State Vector Layers - 100% Clickable, Never Obstructed */}
          <g className="transition-all duration-300">
            {stateItems.map((state) => {
              const isActive = highlightedStateId === state.id;
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
                  onMouseEnter={() => handleStateMouseEnter(state.id)}
                  onMouseLeave={scheduleClose}
                  className="cursor-pointer transition-colors duration-200 ease-out hover:opacity-95"
                  fill={fillUrl}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={isActive ? 1 : isOperating ? 0.95 : 0.5}
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
                const isActive = highlightedStateId === s.id;
                return (
                  <g key={`pin-${s.id}`} transform={`translate(${s.pinPos.x}, ${s.pinPos.y})`}>
                    {isActive && (
                      <circle r="14" fill="#D4E012" opacity="0.4" className="animate-ping" />
                    )}
                    <circle
                      r="4.5"
                      fill={isActive ? "#D4E012" : "#6DAD45"}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
          </g>
        </svg>

        {/* Floating Contextual State Info Card (Appears near the hovered/selected state without overlapping others) */}
        <AnimatePresence>
          {activeState && (
            <motion.div
              key={activeState.id}
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.94 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute z-30 pointer-events-auto"
              style={cardStyle}
            >
              <div className="w-[240px] sm:w-[265px] rounded-2xl bg-[#091526]/95 backdrop-blur-2xl border border-[#6DAD45]/45 p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] shadow-[#6DAD45]/15 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4E012] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4E012] animate-pulse" />
                    {activeState.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDismissedId(activeState.id);
                      setHoveredId(null);
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close state card"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="mt-1 font-sans text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight">
                  {activeState.capacityText}
                </h4>

                <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/90 pt-2 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#6DAD45] bg-[#6DAD45]/15 px-2 py-0.5 rounded-md border border-[#6DAD45]/30">
                      {activeState.commissioned}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">Commissioned</span>
                  </div>

                  <div className="h-3.5 w-[1px] bg-slate-800" />

                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#D4E012] bg-[#D4E012]/15 px-2 py-0.5 rounded-md border border-[#D4E012]/30">
                      {activeState.ongoing}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">Ongoing</span>
                  </div>
                </div>

                {/* View Details Action Button - Smooth, clickable, professional */}
                <Link
                  href={`/projects/${activeState.slug}`}
                  onClick={() => {
                    onSelectState?.(activeState.slug);
                    onViewDetails?.(activeState.slug);
                  }}
                  className="relative mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl bg-gradient-to-r from-[#6DAD45] to-[#7fbe51] hover:from-[#76ba4b] hover:to-[#8ccd5c] px-3 py-2 text-[11px] sm:text-xs font-bold font-sans text-slate-950 shadow-md shadow-[#6DAD45]/25 hover:shadow-lg hover:shadow-[#6DAD45]/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 group"
                >
                  <span className="truncate font-bold tracking-tight">
                    View {activeState.name} Projects ({activeState.commissioned + activeState.ongoing})
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ml-1" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
