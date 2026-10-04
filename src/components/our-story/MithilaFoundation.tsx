"use client";

import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import {
  Draw,
  EASE,
  Fade,
  FishMedallion,
  GREEN,
  INK,
  LIME,
  LOTUS,
  OCHRE,
  OLIVE,
  VERMILION,
  borderBand,
  circle,
} from "./motifs";

export interface Pillar {
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/* Journey geometry: Mithila roots → Foundation → Sarhat → India → Global */
/* ------------------------------------------------------------------ */

type Pt = { x: number; y: number };
type JourneyNode = Pt & { label: string; sub: string; anchor: "start" | "middle" | "end"; lx: number; ly: number };

interface Layout {
  viewBox: string;
  origin: Pt & { scale: number; lx: number; ly: number };
  start: Pt;
  nodes: JourneyNode[]; // Foundation, Sarhat, India, Global
  vertical: boolean;
  /** outward points of the network around the Global node */
  reach: Pt[];
  /** index pairs into `reach` that are linked to each other */
  mesh: [number, number][];
}

/** Smooth S-curve between two points with tangents along the travel axis (midpoint is exactly halfway). */
const seg = (a: Pt, b: Pt, vertical: boolean) =>
  vertical
    ? ` C${a.x} ${(a.y + b.y) / 2} ${b.x} ${(a.y + b.y) / 2} ${b.x} ${b.y}`
    : ` C${(a.x + b.x) / 2} ${a.y} ${(a.x + b.x) / 2} ${b.y} ${b.x} ${b.y}`;
const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

const NODE_TEXT = [
  { label: "Foundation", sub: "Values" },
  { label: "Sarhat", sub: "Engineering · Execution" },
  { label: "India", sub: "Rooted in India" },
  { label: "Global", sub: "Global Ambition" },
];

const DESKTOP: Layout = {
  viewBox: "0 50 1200 360",
  vertical: false,
  origin: { x: 150, y: 210, scale: 1, lx: 150, ly: 352 },
  start: { x: 262, y: 210 },
  nodes: [
    { x: 440, y: 280, anchor: "middle" as const, lx: 440, ly: 320 },
    { x: 640, y: 190, anchor: "middle" as const, lx: 640, ly: 150 },
    { x: 840, y: 262, anchor: "middle" as const, lx: 840, ly: 302 },
    { x: 1040, y: 205, anchor: "end" as const, lx: 1022, ly: 150 },
  ].map((p, i) => ({ ...p, ...NODE_TEXT[i] })),
  reach: [
    { x: 1112, y: 92 },
    { x: 1168, y: 158 },
    { x: 1182, y: 246 },
    { x: 1140, y: 332 },
    { x: 1068, y: 378 },
    { x: 1052, y: 62 },
  ],
  mesh: [[0, 1], [1, 2], [2, 3], [3, 4], [5, 0]],
};

const MOBILE: Layout = {
  viewBox: "0 0 360 960",
  vertical: true,
  origin: { x: 180, y: 118, scale: 0.86, lx: 180, ly: 232 },
  start: { x: 180, y: 262 },
  nodes: [
    { x: 96, y: 390, anchor: "start" as const },
    { x: 264, y: 540, anchor: "end" as const },
    { x: 96, y: 690, anchor: "start" as const },
    { x: 180, y: 850, anchor: "middle" as const },
  ].map((p, i) => ({
    ...p,
    ...NODE_TEXT[i],
    lx: p.anchor === "start" ? p.x + 26 : p.anchor === "end" ? p.x - 26 : p.x,
    ly: p.anchor === "middle" ? p.y + 66 : p.y - 2,
  })),
  reach: [
    { x: 68, y: 790 },
    { x: 120, y: 740 },
    { x: 250, y: 744 },
    { x: 306, y: 800 },
    { x: 318, y: 900 },
    { x: 46, y: 900 },
  ],
  mesh: [[0, 1], [2, 3], [3, 4], [5, 0]],
};

/* Scroll budget: medallion → heritage line → modern line → global network */
const R = {
  medallion: [0, 0.3] as [number, number],
  heritage: [0.24, 0.52] as [number, number],
  modern: [0.5, 0.76] as [number, number],
  network: [0.74, 0.98] as [number, number],
};
const NODE_AT = [0.4, 0.52, 0.64, 0.76];

const LEAF = "M0 -9 C-5 -4 -5 4 0 9 C5 4 5 -4 0 -9 Z M0 -6 V6";
const PYLON = "M0 -16 L-7 12 M0 -16 L7 12 M-4.6 3 H4.6 M-2.6 -5 H2.6 M-10 -10 H10 M-10 -10 V-7 M10 -10 V-7";

function JourneyArt({ layout, progress, className }: { layout: Layout; progress: MotionValue<number>; className: string }) {
  const { origin, start, nodes, vertical, reach, mesh } = layout;
  const [F, S, I, G] = nodes;
  const heritage = `M${start.x} ${start.y}` + seg(start, F, vertical) + seg(F, S, vertical);
  const modern = `M${S.x} ${S.y}` + seg(S, I, vertical) + seg(I, G, vertical);
  // the hand-drawn second stroke of a Madhubani double outline
  const offset = vertical ? "translate(6 0)" : "translate(0 6)";
  const gradId = vertical ? "journey-grad-v" : "journey-grad-h";

  return (
    <svg viewBox={layout.viewBox} className={className} role="img" aria-labelledby={`${gradId}-title`}>
      <title id={`${gradId}-title`}>
        From Mithila roots to foundation, to Sarhat, to India, to a global network
      </title>
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1={S.x}
          y1={S.y}
          x2={vertical ? S.x : G.x}
          y2={vertical ? G.y : S.y}
        >
          <stop offset="0" stopColor={OLIVE} />
          <stop offset="1" stopColor={GREEN} />
        </linearGradient>
      </defs>

      {/* Origin: paired fish medallion */}
      <g transform={`translate(${origin.x} ${origin.y}) scale(${origin.scale})`}>
        <FishMedallion progress={progress} range={R.medallion} />
      </g>
      <Fade progress={progress} range={[0.18, 0.28]}>
        <text x={origin.lx} y={origin.ly} textAnchor="middle" className="fill-[#2B2118] font-mono text-[13px] font-bold uppercase tracking-[0.2em]">
          Mithila Roots
        </text>
        <text x={origin.lx} y={origin.ly + 18} textAnchor="middle" className="fill-[#7A6A58] text-[12px]">
          Origin
        </text>
      </Fade>

      {/* Heritage line: double, ink + vermilion, with leaf marks */}
      <g strokeLinecap="round">
        <Draw progress={progress} range={R.heritage} d={heritage} stroke={INK} strokeWidth={1.8} />
        <Draw progress={progress} range={[R.heritage[0] + 0.02, R.heritage[1] + 0.02]} d={heritage} stroke={VERMILION} strokeWidth={1.1} transform={offset} />
      </g>
      {[mid(start, F), mid(F, S)].map((p, i) => (
        <Fade key={i} progress={progress} range={[0.32 + i * 0.1, 0.4 + i * 0.1]}>
          <path d={LEAF} transform={`translate(${p.x + (vertical ? 18 : 0)} ${p.y - (vertical ? 0 : 20)})`} fill="none" stroke={OCHRE} strokeWidth={1.2} />
        </Fade>
      ))}

      {/* Modern line: one clean conductor, a quieter parallel, pylons */}
      <Draw progress={progress} range={R.modern} d={modern} stroke={`url(#${gradId})`} strokeWidth={2.4} strokeLinecap="round" />
      <Fade progress={progress} range={[0.6, 0.76]}>
        <path d={modern} transform={offset} fill="none" stroke={GREEN} strokeOpacity={0.45} strokeWidth={1} strokeDasharray="2 7" strokeLinecap="round" />
      </Fade>
      {[mid(S, I), mid(I, G)].map((p, i) => (
        <Fade key={i} progress={progress} range={[0.58 + i * 0.1, 0.66 + i * 0.1]}>
          <path d={PYLON} transform={`translate(${p.x + (vertical ? 22 : 0)} ${p.y - (vertical ? 0 : 24)})`} fill="none" stroke={OLIVE} strokeWidth={1.2} strokeLinecap="round" />
        </Fade>
      ))}

      {/* Global field: the network opens outward from the last node */}
      <Fade progress={progress} range={[0.8, 0.98]}>
        <path d={circle(vertical ? 110 : 120, G.x, G.y)} fill="none" stroke={GREEN} strokeOpacity={0.25} strokeDasharray="1 6" strokeLinecap="round" />
        <path d={circle(vertical ? 160 : 180, G.x, G.y)} fill="none" stroke={GREEN} strokeOpacity={0.15} strokeDasharray="1 8" strokeLinecap="round" />
      </Fade>
      {reach.map((p, i) => (
        <Draw
          key={`r${i}`}
          progress={progress}
          range={[R.network[0] + i * 0.02, R.network[0] + 0.12 + i * 0.02]}
          d={`M${G.x} ${G.y} L${p.x} ${p.y}`}
          stroke={GREEN}
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      ))}
      {mesh.map(([a, b], i) => (
        <Draw
          key={`m${i}`}
          progress={progress}
          range={[R.network[0] + 0.1 + i * 0.015, R.network[1]]}
          d={`M${reach[a].x} ${reach[a].y} L${reach[b].x} ${reach[b].y}`}
          stroke={GREEN}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
      ))}
      {reach.map((p, i) => (
        <Fade key={`n${i}`} progress={progress} range={[R.network[0] + 0.1 + i * 0.02, R.network[0] + 0.16 + i * 0.02]}>
          <circle cx={p.x} cy={p.y} r={4} fill={LIME} stroke={OLIVE} strokeWidth={1} />
        </Fade>
      ))}

      {/* Journey nodes + labels */}
      {nodes.map((n, i) => {
        const modernNode = i >= 1;
        return (
          <Fade key={n.label} progress={progress} range={[NODE_AT[i] - 0.04, NODE_AT[i]]}>
            <circle cx={n.x} cy={n.y} r={i === 3 ? 10 : 8} fill={modernNode ? "#0F172A" : "#F5EFE3"} stroke={modernNode ? GREEN : INK} strokeWidth={2} />
            <circle cx={n.x} cy={n.y} r={3} fill={modernNode ? LIME : VERMILION} />
            <text x={n.lx} y={n.ly} textAnchor={n.anchor} className="fill-[#2B2118] font-mono text-[13px] font-bold uppercase tracking-[0.2em]">
              {n.label}
            </text>
            <text x={n.lx} y={n.ly + 18} textAnchor={n.anchor} className="fill-[#7A6A58] text-[12px]">
              {n.sub}
            </text>
          </Fade>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pillars: rise from a drawn foundation band, one after another        */
/* ------------------------------------------------------------------ */

const BAND_W = 1200;
const band = borderBand(BAND_W);
const wideBand = borderBand(1600);

function Pillars({ pillars }: { pillars: Pillar[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const draw = {
    initial: { pathLength: reduce ? 1 : 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : undefined,
    transition: { duration: reduce ? 0.2 : 1.1, ease: EASE },
  };

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? (reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0 0 0)" }) : undefined}
            transition={{ duration: 0.9, delay: reduce ? 0 : 0.7 + i * 0.22, ease: EASE }}
            className="relative flex flex-col rounded-2xl border border-[#2B2118]/10 bg-white/85 p-7 shadow-[0_20px_40px_-24px_rgba(43,33,24,0.35)] backdrop-blur-sm sm:p-8"
          >
            <span aria-hidden className="absolute inset-x-7 top-0 h-0.5 bg-gradient-to-r from-[#D4E012] to-[#6DAD45] sm:inset-x-8" />
            <span className="mb-10 font-mono text-xs font-bold text-[#707B00]">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mb-3 font-serif-display text-2xl font-medium text-[#1E1812] sm:text-3xl">{p.title}</h3>
            <p className="text-sm leading-relaxed text-[#5B5146] sm:text-base">{p.description}</p>
          </motion.article>
        ))}
      </div>

      {/* the foundation the pillars stand on */}
      <div className="mt-5 flex items-center gap-4 md:mt-6">
        <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#9A3B22]">Foundation</span>
        <svg viewBox={`0 0 ${BAND_W} 32`} preserveAspectRatio="xMinYMid slice" className="h-5 min-w-0 flex-1 sm:h-6" aria-hidden>
          {band.rules.map((d) => (
            <motion.path key={d} {...draw} d={d} fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={1} />
          ))}
          <motion.path {...draw} d={band.zig} fill="none" stroke={VERMILION} strokeWidth={1.2} strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

/** 07 — What Guides Us / Our Foundation & Pillars, told as Mithila roots growing into a global network. */
export default function MithilaFoundation({ pillars }: { pillars: Pillar[] }) {
  const reduce = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: artRef, offset: ["start 90%", "center 45%"] });
  const complete = useMotionValue(1);
  const progress = reduce ? complete : scrollYProgress;

  return (
    <section className="relative overflow-hidden bg-[#F5EFE3] py-16 sm:py-24">
      {/* Madhubani borders frame the chapter, quietly */}
      <svg viewBox="0 0 1600 32" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 h-6 w-full opacity-25" aria-hidden>
        {wideBand.rules.map((d) => <path key={d} d={d} fill="none" stroke={INK} strokeWidth={1} />)}
        <path d={wideBand.zig} fill="none" stroke={VERMILION} strokeWidth={1.2} />
      </svg>
      {/* a lotus held faintly behind the pillars */}
      <svg viewBox="-60 -60 120 90" className="pointer-events-none absolute -right-24 bottom-10 hidden w-[420px] opacity-[0.07] md:block" aria-hidden>
        {LOTUS.petals.map((p) => (
          <g key={p.deg} transform={`rotate(${p.deg})`} fill="none" stroke={INK} strokeWidth={1.2}>
            <path d={p.outer} />
            <path d={p.inner} />
          </g>
        ))}
        <path d={LOTUS.base} fill="none" stroke={INK} strokeWidth={1.2} />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <AnimatedPillBadge className="mb-6">What Guides Us</AnimatedPillBadge>
          <h2 className="mb-6 font-serif-display text-3xl font-medium leading-tight tracking-tight text-[#1E1812] sm:text-5xl">
            Our Foundation &amp; <span className="italic text-[#707B00]">Pillars</span>
          </h2>
          <p className="text-base leading-relaxed text-[#5B5146] sm:text-lg">
            Our foundation began in the Mithila region. These are our roots &mdash; and from these roots, we are building toward the world.
          </p>
        </motion.div>

        <div ref={artRef} className="mx-auto my-12 max-w-md sm:my-16 md:max-w-none">
          <JourneyArt layout={DESKTOP} progress={progress} className="hidden h-auto w-full md:block" />
          <JourneyArt layout={MOBILE} progress={progress} className="h-auto w-full md:hidden" />
        </div>

        <Pillars pillars={pillars} />
      </div>
    </section>
  );
}
