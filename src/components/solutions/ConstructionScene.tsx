"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * A side view of a solar plant that assembles itself, one layer per
 * construction stage. Pure CSS opacity/transform transitions, so scrolling
 * back up simply un-builds it. `stage` is the index of the active stage
 * (0-5); every layer at or below it is shown.
 */

const LIME = "#D4E012";
const GREEN = "#6DAD45";
const STEEL = "#94A3B8";
const GROUND_Y = 210;

const TABLE_X = [100, 180, 260, 340];
const PILE_X = TABLE_X;

function Layer({ show, delay = 0, children }: { show: boolean; delay?: number; children: ReactNode }) {
  const style: CSSProperties = {
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(10px)",
    transitionDelay: show ? `${delay}ms` : "0ms",
  };
  return (
    <g style={style} className="transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none">
      {children}
    </g>
  );
}

export default function ConstructionScene({ stage }: { stage: number }) {
  const on = (n: number) => stage >= n;
  const energised = stage >= 5;

  return (
    <svg viewBox="0 0 480 300" role="img" aria-label="A solar plant being built, stage by stage, from site set-up to energisation" className="block h-full w-full">
      <defs>
        <radialGradient id="cs-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.55" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky brightens when the plant is energised */}
      <rect width="480" height="300" fill="#0B1220" />
      <rect
        width="480" height="300" fill="#1E3A5F"
        className="transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: energised ? 0.55 : 0 }}
      />
      <circle cx="240" cy="70" r="90" fill="url(#cs-sun)" className="transition-opacity duration-700 motion-reduce:transition-none" style={{ opacity: energised ? 1 : 0 }} />

      {/* ground (always present) */}
      <rect x="0" y={GROUND_Y} width="480" height="90" fill="#1E293B" />
      <line x1="0" y1={GROUND_Y} x2="480" y2={GROUND_Y} stroke="#334155" />

      {/* 01 / pre-construction: site office, survey stakes, boundary */}
      <Layer show={on(0)}>
        <rect x="12" y="184" width="42" height="26" fill="#CBD5E1" />
        <path d="M8 184 L33 170 L58 184Z" fill="#64748B" />
        <rect x="20" y="192" width="9" height="18" fill="#475569" />
        <rect x="35" y="192" width="12" height="9" fill="#0B1220" />
        {[80, 160, 240, 320, 400].map((x) => (
          <g key={x}>
            <line x1={x} y1={GROUND_Y} x2={x} y2="190" stroke={STEEL} strokeWidth="2" />
            <path d={`M${x} 190 L${x + 10} 194 L${x} 198Z`} fill={LIME} />
          </g>
        ))}
        <line x1="70" y1="207" x2="410" y2="207" stroke={LIME} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7" />
      </Layer>

      {/* 02 / civil works: road, trench, piles and pads */}
      <Layer show={on(1)}>
        <rect x="0" y="246" width="480" height="14" fill="#334155" />
        <line x1="0" y1="253" x2="480" y2="253" stroke="#64748B" strokeDasharray="12 10" />
        <rect x="90" y="216" width="300" height="5" fill="#0F172A" />
        {PILE_X.map((x, i) => (
          <g key={x} style={{ transitionDelay: `${i * 60}ms` }}>
            <rect x={x - 3} y="202" width="6" height="40" fill={STEEL} />
            <rect x={x - 9} y="206" width="18" height="4" fill="#64748B" />
          </g>
        ))}
        <rect x="372" y="206" width="36" height="6" fill="#64748B" />
        <rect x="414" y="206" width="30" height="6" fill="#64748B" />
      </Layer>

      {/* 03 / mechanical erection: structures and modules */}
      {TABLE_X.map((x, i) => (
        <Layer key={x} show={on(2)} delay={i * 110}>
          <line x1={x} y1="206" x2={x} y2="158" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
          <line x1={x - 8} y1="196" x2={x} y2="180" stroke={STEEL} strokeWidth="2" />
          <g transform={`rotate(-18 ${x} 154)`}>
            <rect x={x - 36} y="148" width="72" height="9" rx="2" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1" />
            {[-18, 0, 18].map((d) => (
              <line key={d} x1={x + d} y1="148" x2={x + d} y2="157" stroke="#60A5FA" strokeWidth="0.8" />
            ))}
            <rect
              x={x - 36} y="148" width="72" height="9" rx="2" fill={LIME}
              className="transition-opacity duration-700 motion-reduce:transition-none"
              style={{ opacity: energised ? 0.35 : 0 }}
            />
          </g>
        </Layer>
      ))}

      {/* 04 / electrical erection: cables, inverter, transformer, pole */}
      <Layer show={on(3)}>
        <path d="M100 218 H380" stroke={LIME} strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
        <rect x="380" y="184" width="24" height="26" rx="3" fill="#0F172A" stroke={LIME} strokeWidth="1.5" />
        <text x="392" y="201" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill={LIME}>INV</text>
        <rect x="416" y="180" width="26" height="30" rx="3" fill="#334155" stroke={STEEL} strokeWidth="1.5" />
        {[422, 429, 436].map((x) => (
          <line key={x} x1={x} y1="184" x2={x} y2="206" stroke="#64748B" />
        ))}
        <line x1="404" y1="197" x2="416" y2="197" stroke={LIME} strokeWidth="1.6" />
        <line x1="462" y1="210" x2="462" y2="126" stroke="#64748B" strokeWidth="4" />
        <line x1="450" y1="134" x2="474" y2="134" stroke="#64748B" strokeWidth="4" />
        <path d="M442 192 Q452 180 462 134" stroke={LIME} strokeWidth="1.6" fill="none" />
      </Layer>

      {/* 05 / quality & safety: inspection ticks and a safety badge */}
      <Layer show={on(4)}>
        {TABLE_X.map((x, i) => (
          <g key={x} style={{ transitionDelay: `${i * 90}ms` }}>
            <circle cx={x} cy="124" r="9" fill={GREEN} />
            <path d={`M${x - 4} 124 L${x - 1} 127 L${x + 5} 120`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        <path d="M33 104 l14 5 v10 c0 8 -6 12 -14 15 c-8 -3 -14 -7 -14 -15 v-10z" fill="#0F172A" stroke={LIME} strokeWidth="1.5" />
        <path d="M27 118 l5 5 l9 -10" stroke={LIME} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Layer>

      {/* 06 / handover & commissioning: pole lamp energised */}
      <Layer show={on(5)}>
        <circle cx="462" cy="120" r="14" fill="url(#cs-sun)" />
        <circle cx="462" cy="120" r="5.5" fill={LIME} />
      </Layer>
    </svg>
  );
}
