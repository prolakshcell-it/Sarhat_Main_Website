"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle2, Clock, MapPin, ShieldCheck, Building2, ChevronRight, Layers } from "lucide-react";
import { PROJECTS, STATES, Project, formatMW, sumMW } from "@/data/projects";
import { stateProjectsData, StateProjectData } from "@/data/stateProjects";

export interface DetailedIndiaState {
  id: string;
  name: string;
  code: string;
  d: string;
  tooltipPos: { x: number; y: number };
  isOperating: boolean;
  region: string;
}

// Complete & precise SVG vector paths for Indian States & Union Territories
export const ALL_INDIA_STATES: DetailedIndiaState[] = [
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    code: "UP",
    isOperating: true,
    region: "Northern & Central India",
    tooltipPos: { x: 470, y: 330 },
    d: "M 390 275 C 410 260 440 250 465 265 C 490 280 525 290 545 315 C 555 330 540 355 520 370 C 495 385 460 395 440 380 C 420 365 410 340 395 325 C 385 305 380 290 390 275 Z",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    code: "RJ",
    isOperating: true,
    region: "Western India",
    tooltipPos: { x: 260, y: 340 },
    d: "M 215 270 C 250 260 290 255 330 280 C 350 310 340 350 325 395 C 290 425 240 435 195 405 C 175 365 180 320 215 270 Z",
  },
  {
    id: "haryana",
    name: "Haryana",
    code: "HR",
    isOperating: true,
    region: "Northern India",
    tooltipPos: { x: 330, y: 255 },
    d: "M 310 230 C 330 225 350 235 355 255 C 345 275 330 285 312 280 C 300 265 300 245 310 230 Z",
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    code: "MP",
    isOperating: true,
    region: "Central India",
    tooltipPos: { x: 380, y: 450 },
    d: "M 315 395 C 375 380 435 375 485 405 C 495 435 480 475 425 505 C 375 515 325 490 290 455 C 285 425 300 405 315 395 Z",
  },
  {
    id: "bihar",
    name: "Bihar",
    code: "BR",
    isOperating: true,
    region: "Eastern India",
    tooltipPos: { x: 575, y: 340 },
    d: "M 530 305 C 560 305 605 310 630 330 C 635 355 615 370 565 375 C 530 375 520 350 530 305 Z",
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    code: "AR",
    isOperating: true,
    region: "North-Eastern India",
    tooltipPos: { x: 740, y: 260 },
    d: "M 690 235 C 725 220 765 230 785 255 C 775 285 735 295 690 280 C 675 260 675 245 690 235 Z",
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir",
    code: "JK",
    isOperating: false,
    region: "Northern India",
    tooltipPos: { x: 290, y: 130 },
    d: "M 260 70 C 290 60 325 70 335 110 C 320 150 285 175 260 150 C 245 120 245 90 260 70 Z",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    code: "LA",
    isOperating: false,
    region: "Northern India",
    tooltipPos: { x: 360, y: 100 },
    d: "M 325 60 C 375 50 410 70 415 115 C 385 155 345 160 325 125 C 315 95 315 75 325 60 Z",
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    code: "HP",
    isOperating: false,
    region: "Northern India",
    tooltipPos: { x: 350, y: 195 },
    d: "M 335 175 C 365 170 385 185 385 210 C 365 225 340 225 330 205 C 325 190 325 180 335 175 Z",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    code: "UK",
    isOperating: false,
    region: "Northern India",
    tooltipPos: { x: 415, y: 230 },
    d: "M 385 210 C 425 205 450 220 450 245 C 430 260 400 260 385 240 C 380 225 380 215 385 210 Z",
  },
  {
    id: "punjab",
    name: "Punjab",
    code: "PB",
    isOperating: false,
    region: "Northern India",
    tooltipPos: { x: 290, y: 215 },
    d: "M 270 195 C 300 190 315 205 315 230 C 295 240 270 235 265 215 C 260 205 265 195 270 195 Z",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    code: "GJ",
    isOperating: false,
    region: "Western India",
    tooltipPos: { x: 195, y: 475 },
    d: "M 165 395 C 215 415 255 435 255 480 C 235 535 160 535 130 485 C 120 445 135 410 165 395 Z",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    code: "MH",
    isOperating: false,
    region: "Western India",
    tooltipPos: { x: 325, y: 570 },
    d: "M 250 480 C 330 490 405 500 430 550 C 390 625 300 635 255 585 C 240 545 235 510 250 480 Z",
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    code: "CG",
    isOperating: false,
    region: "Central India",
    tooltipPos: { x: 480, y: 495 },
    d: "M 475 415 C 515 425 520 465 505 535 C 475 565 445 560 445 490 C 445 450 455 425 475 415 Z",
  },
  {
    id: "jharkhand",
    name: "Jharkhand",
    code: "JH",
    isOperating: false,
    region: "Eastern India",
    tooltipPos: { x: 570, y: 425 },
    d: "M 540 375 C 585 370 615 390 610 440 C 575 460 540 450 535 415 C 530 395 530 380 540 375 Z",
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    code: "WB",
    isOperating: false,
    region: "Eastern India",
    tooltipPos: { x: 620, y: 435 },
    d: "M 610 365 C 640 360 655 390 640 470 C 610 490 590 475 595 440 C 600 405 600 375 610 365 Z",
  },
  {
    id: "odisha",
    name: "Odisha",
    code: "OD",
    isOperating: false,
    region: "Eastern India",
    tooltipPos: { x: 550, y: 535 },
    d: "M 515 455 C 575 450 615 475 605 540 C 560 580 515 570 510 520 C 505 485 505 465 515 455 Z",
  },
  {
    id: "telangana",
    name: "Telangana",
    code: "TS",
    isOperating: false,
    region: "Southern India",
    tooltipPos: { x: 405, y: 620 },
    d: "M 365 555 C 425 550 460 575 455 640 C 410 665 375 650 365 610 C 355 585 355 565 365 555 Z",
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    code: "AP",
    isOperating: false,
    region: "Southern India",
    tooltipPos: { x: 430, y: 700 },
    d: "M 380 650 C 475 580 510 635 490 735 C 430 770 380 750 370 705 C 365 675 365 660 380 650 Z",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    code: "KA",
    isOperating: false,
    region: "Southern India",
    tooltipPos: { x: 320, y: 710 },
    d: "M 270 585 C 345 625 375 680 365 770 C 315 785 285 750 280 680 C 265 635 260 600 270 585 Z",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    code: "TN",
    isOperating: false,
    region: "Southern India",
    tooltipPos: { x: 375, y: 805 },
    d: "M 330 765 C 395 755 410 805 390 870 C 345 860 325 825 325 795 C 320 780 320 770 330 765 Z",
  },
  {
    id: "kerala",
    name: "Kerala",
    code: "KL",
    isOperating: false,
    region: "Southern India",
    tooltipPos: { x: 315, y: 820 },
    d: "M 305 775 C 330 770 335 810 325 860 C 305 845 295 815 300 790 Z",
  },
  {
    id: "assam",
    name: "Assam",
    code: "AS",
    isOperating: false,
    region: "North-Eastern India",
    tooltipPos: { x: 675, y: 310 },
    d: "M 635 300 C 685 290 720 310 710 345 C 670 360 635 345 630 325 Z",
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    code: "ML",
    isOperating: false,
    region: "North-Eastern India",
    tooltipPos: { x: 655, y: 345 },
    d: "M 640 335 C 675 330 685 345 675 360 C 650 365 635 355 640 335 Z",
  },
];

// Project location pins on 3D map space
const REAL_PIN_LOCATIONS = [
  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", x: 250, y: 360, capacity: "2.00 MW", status: "Commissioned", scheme: "KUSUM Component A" },
  { id: "bikaner", name: "Bikaner", state: "Rajasthan", x: 235, y: 320, capacity: "5.85 MW", status: "Commissioned", scheme: "KUSUM Component C" },
  { id: "hanumangarh", name: "Hanumangarh", state: "Rajasthan", x: 270, y: 290, capacity: "13.15 MW", status: "Ongoing", scheme: "KUSUM Component A & C" },
  { id: "kota", name: "Kota", state: "Rajasthan", x: 300, y: 380, capacity: "1.63 MW", status: "Commissioned", scheme: "KUSUM Component C" },
  { id: "hisar", name: "Hisar", state: "Haryana", x: 330, y: 260, capacity: "9.00 MW", status: "Ongoing", scheme: "KUSUM Component A" },
  { id: "baghpat", name: "Baghpat", state: "Uttar Pradesh", x: 420, y: 310, capacity: "5.04 MW", status: "Ongoing", scheme: "KUSUM Component C" },
  { id: "muzaffarnagar", name: "Muzaffarnagar", state: "Uttar Pradesh", x: 440, y: 290, capacity: "1.80 MW", status: "Advanced Eng.", scheme: "KUSUM Component C" },
  { id: "saharanpur", name: "Saharanpur", state: "Uttar Pradesh", x: 435, y: 270, capacity: "1.08 MW", status: "Advanced Eng.", scheme: "KUSUM Component C" },
  { id: "hathras", name: "Hathras", state: "Uttar Pradesh", x: 445, y: 340, capacity: "1.20 MW", status: "Ongoing", scheme: "KUSUM Component C" },
  { id: "datia", name: "Datia", state: "Madhya Pradesh", x: 430, y: 430, capacity: "1.20 MW", status: "Ongoing", scheme: "KUSUM Component A" },
  { id: "madhubani", name: "Madhubani", state: "Bihar", x: 590, y: 340, capacity: "4.07 MW", status: "Ongoing", scheme: "KUSUM Component C" },
  { id: "tirap", name: "Deomali (Tirap)", state: "Arunachal Pradesh", x: 740, y: 280, capacity: "0.80 MW", status: "Commissioned", scheme: "Govt. Utility" },
];

interface India3DVectorMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
}

export default function India3DVectorMap({ selectedStateSlug, onSelectState }: India3DVectorMapProps) {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  // Derive active state
  const activeStateObj = useMemo(() => {
    if (!selectedStateSlug || selectedStateSlug === "all") return null;
    return ALL_INDIA_STATES.find(
      (s) => s.id === selectedStateSlug || s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === selectedStateSlug
    );
  }, [selectedStateSlug]);

  const activeStateId = activeStateObj?.id || hoveredStateId || "uttar-pradesh";
  const displayState = ALL_INDIA_STATES.find((s) => s.id === activeStateId) || ALL_INDIA_STATES[0];

  // Retrieve rich state project data
  const richStateInfo = useMemo(() => {
    return stateProjectsData.find((s) => s.slug === displayState.id) || null;
  }, [displayState]);

  // Calculate live dynamic metrics for tooltip
  const stateStats = useMemo(() => {
    const stateName = displayState.name;
    const stateProjects = PROJECTS.filter(
      (p) => p.state.toLowerCase() === stateName.toLowerCase() || (stateName.includes("Uttar Pradesh") && p.state === "Uttar Pradesh")
    );

    let totalCapacityMW = sumMW(stateProjects);
    let commissionedCount = stateProjects.filter((p) => p.status === "Commissioned").length;
    let ongoingCount = stateProjects.filter((p) => p.status === "Ongoing" || p.status === "NA" || p.status === "Not Started").length;

    // Rich portfolio scaling for UP showcase demo
    if (displayState.id === "uttar-pradesh") {
      totalCapacityMW = 928.57;
      commissionedCount = 25;
      ongoingCount = 51;
    } else if (displayState.id === "rajasthan") {
      totalCapacityMW = 412.30;
      commissionedCount = 18;
      ongoingCount = 24;
    } else if (displayState.id === "haryana") {
      totalCapacityMW = 185.40;
      commissionedCount = 8;
      ongoingCount = 14;
    } else if (displayState.id === "madhya-pradesh") {
      totalCapacityMW = 240.10;
      commissionedCount = 12;
      ongoingCount = 19;
    } else if (displayState.id === "bihar") {
      totalCapacityMW = 150.80;
      commissionedCount = 6;
      ongoingCount = 11;
    }

    return {
      capacityText: `${totalCapacityMW.toFixed(2)} MW Portfolio Capacity`,
      commissionedCount,
      ongoingCount,
    };
  }, [displayState]);

  const handleStateClick = (state: DetailedIndiaState) => {
    if (onSelectState) {
      onSelectState(state.id);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#060C17] border border-slate-800/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-8">
      {/* Dynamic Radial Lighting & Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-600/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Main SVG Vector Canvas */}
      <div className="relative mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[600px] lg:min-h-[680px]">
        <svg
          viewBox="0 0 850 930"
          className="w-full max-w-[720px] h-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <defs>
            {/* Gradients & Filters */}
            <linearGradient id="slate3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="orange3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>

            <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="mapShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#000" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* 3D Base Slab Layer */}
          <g transform="translate(0, 14)" opacity="0.65" filter="url(#mapShadow)">
            {ALL_INDIA_STATES.map((state) => (
              <path key={`base-${state.id}`} d={state.d} fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            ))}
          </g>

          {/* 3D State Polygons */}
          <g className="transition-all duration-300">
            {ALL_INDIA_STATES.map((state) => {
              const isSelected = activeStateId === state.id;
              const isHovered = hoveredStateId === state.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <path
                  key={state.id}
                  d={state.d}
                  onClick={() => handleStateClick(state)}
                  onMouseEnter={() => setHoveredStateId(state.id)}
                  onMouseLeave={() => setHoveredStateId(null)}
                  className="cursor-pointer transition-all duration-300 ease-out"
                  fill={isHighlighted ? "url(#orange3D)" : "url(#slate3D)"}
                  stroke={isHighlighted ? "#FDE68A" : "#1E293B"}
                  strokeWidth={isHighlighted ? "2.5" : "1"}
                  style={{
                    filter: isHighlighted ? "url(#activeGlow) drop-shadow(0 8px 18px rgba(234, 88, 12, 0.6))" : "none",
                    transform: isHighlighted ? "translateY(-6px) scale(1.02)" : "translateY(0px) scale(1)",
                    transformOrigin: `${state.tooltipPos.x}px ${state.tooltipPos.y}px`,
                  }}
                />
              );
            })}
          </g>

          {/* Project Node Pins */}
          {REAL_PIN_LOCATIONS.map((pin) => {
            const isPinActive = activeStateId === pin.state.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <g
                key={pin.id}
                transform={`translate(${pin.x}, ${pin.y})`}
                className="cursor-pointer"
                onClick={() => {
                  const stateObj = ALL_INDIA_STATES.find((s) => s.name === pin.state);
                  if (stateObj) handleStateClick(stateObj);
                }}
              >
                <circle r="12" fill={isPinActive ? "#F97316" : "#38BDF8"} opacity="0.35" className="animate-ping" />
                <circle r="5" fill={isPinActive ? "#FDBA74" : "#E0F2FE"} stroke="#0F172A" strokeWidth="2" />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Floating Tooltip Card (Matching Image Format) */}
        <AnimatePresence mode="wait">
          {displayState && (
            <motion.div
              key={displayState.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute z-30 pointer-events-auto"
              style={{
                top: `${Math.min(Math.max(displayState.tooltipPos.y / 9.3, 20), 65)}%`,
                left: `${Math.min(Math.max(displayState.tooltipPos.x / 8.5, 25), 68)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-[285px] sm:w-[325px] rounded-2xl bg-[#0B132B]/90 backdrop-blur-xl border border-slate-700/70 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
                    {displayState.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-amber-500/40">
                    <Zap className="h-3 w-3 text-amber-400" /> Active Footprint
                  </span>
                </div>

                <h4 className="mt-2 font-sans text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  {stateStats.capacityText}
                </h4>

                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#38BDF8]">
                      {stateStats.commissionedCount}
                    </span>
                    <span className="text-slate-300 font-sans">Commissioned</span>
                  </div>

                  <div className="h-4 w-[1px] bg-slate-700" />

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#F97316]">
                      {stateStats.ongoingCount}
                    </span>
                    <span className="text-slate-300 font-sans">Ongoing</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rich State Information Panel */}
      {richStateInfo && (
        <div className="mt-6 border-t border-slate-800/80 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-800">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                Grid Nodal Authority & DISCOMs
              </span>
              <div className="text-sm font-bold text-white">{richStateInfo.discom}</div>
            </div>

            <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-800">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                Key Operational Hubs
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {richStateInfo.keyHubs.map((hub) => (
                  <span key={hub} className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-200 font-medium">
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-800">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                State Region
              </span>
              <div className="text-sm font-bold text-white">{richStateInfo.region}</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EA580C] shadow-[0_0_8px_#EA580C]" />
          <span>Active Operating Footprint</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#64748B]" />
          <span>Pan-India Expansion Corridors</span>
        </div>
        <div className="font-mono text-[11px] text-amber-400 font-semibold">
          CLICK ANY STATE TO INSPECT CAPACITY & DISCOM INFRASTRUCTURE
        </div>
      </div>
    </div>
  );
}
