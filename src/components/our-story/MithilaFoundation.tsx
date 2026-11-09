"use client";

import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, type MotionValue, type TargetAndTransition, type Transition } from "framer-motion";
import {
  Draw,
  EASE,
  Fade,
  GREEN,
  INK,
  LIME,
  LOTUS,
  OCHRE,
  OLIVE,
  SUN,
  VERMILION,
  borderBand,
  circle,
  petalRing,
  sunRays,
} from "./motifs";

export interface Pillar {
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/* Journey: Mithila roots → India → Global, drawn as Madhubani medallions */
/* Lazy-mounted, one layout at a time, loops run only while on screen.   */
/* ------------------------------------------------------------------ */

const BLUE = "#2E4A7D";
const R0 = 98; // medallion radius in local units (petal ring tips)

type Pt = { x: number; y: number };
interface Layout {
  viewBox: string;
  vertical: boolean;
  scale: number;
  m: Pt;
  i: Pt;
  g: Pt;
  labelDx: number;
  labelDy: number;
  anchor: "middle" | "start";
}

const DESK: Layout = { viewBox: "0 0 1200 320", vertical: false, scale: 1, m: { x: 170, y: 150 }, i: { x: 600, y: 150 }, g: { x: 1030, y: 150 }, labelDx: 0, labelDy: 132, anchor: "middle" };
const MOB: Layout = { viewBox: "0 0 360 990", vertical: true, scale: 0.78, m: { x: 180, y: 96 }, i: { x: 180, y: 470 }, g: { x: 180, y: 844 }, labelDx: 0, labelDy: 108, anchor: "middle" };

const bez = (a: Pt, b: Pt, v: boolean, t: number): Pt => {
  const c1 = v ? { x: a.x, y: (a.y + b.y) / 2 } : { x: (a.x + b.x) / 2, y: a.y };
  const c2 = v ? { x: b.x, y: (a.y + b.y) / 2 } : { x: (a.x + b.x) / 2, y: b.y };
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
    y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
  };
};

/** a → w → b as two smooth S-curves, with root hairs hanging off it. */
function rootPath(a: Pt, w: Pt, b: Pt, v: boolean) {
  const s = (p: Pt, q: Pt) =>
    v
      ? ` C${p.x} ${(p.y + q.y) / 2} ${q.x} ${(p.y + q.y) / 2} ${q.x} ${q.y}`
      : ` C${(p.x + q.x) / 2} ${p.y} ${(p.x + q.x) / 2} ${q.y} ${q.x} ${q.y}`;
  const d = `M${a.x} ${a.y}` + s(a, w) + s(w, b);
  let hairs = "";
  const side = v ? [1, -1] : [1, 1];
  [[a, w], [w, b]].forEach(([p, q], seg) => {
    for (let k = 1; k <= 6; k++) {
      const t = k / 7;
      const o = bez(p, q, v, t);
      const dir = side[(k + seg) % 2] * (k % 3 === 0 ? 1.4 : 1);
      const len = 22 + ((k * 7 + seg * 3) % 3) * 8;
      hairs += v
        ? `M${o.x.toFixed(1)} ${o.y.toFixed(1)} q${(len * dir * 0.6).toFixed(1)} ${(len * 0.3).toFixed(1)} ${(len * dir).toFixed(1)} ${(len * 0.8).toFixed(1)} `
        : `M${o.x.toFixed(1)} ${o.y.toFixed(1)} q${(len * 0.3).toFixed(1)} ${(len * 0.6).toFixed(1)} ${(len * 0.1 * dir).toFixed(1)} ${len.toFixed(1)} `;
    }
  });
  return { d, hairs: hairs.trim() };
}

/** Simplified India silhouette in a 100 × 110 box. */
const INDIA = "M30 10 L44 2 L54 10 L60 22 L72 28 L86 32 L98 38 L92 46 L82 44 L76 52 L68 56 L66 66 L60 72 L56 86 L50 100 L44 86 L38 72 L30 62 L20 56 L10 52 L14 44 L22 38 L24 28 L20 20 Z";
const INDIA_HATCH = Array.from({ length: 22 }, (_, k) => `M${-10 + k * 7} 112 L${50 + k * 7} 0`).join(" ");
const BIHAR = { x: 66, y: 46 };

const GLOBE_NODES: Pt[] = [{ x: -22, y: -30 }, { x: 18, y: -34 }, { x: 36, y: -4 }, { x: 14, y: 28 }, { x: -26, y: 22 }, { x: -38, y: -6 }];
const GLOBE_MESH = GLOBE_NODES.map((_, k) => `M${GLOBE_NODES[k].x} ${GLOBE_NODES[k].y} L${GLOBE_NODES[(k + 1) % 6].x} ${GLOBE_NODES[(k + 1) % 6].y}`).join(" ") + " M-22 -30 L14 28 M18 -34 L-26 22 M36 -4 L-38 -6";

const WINDOWS = {
  M: [0, 0.2] as [number, number],
  p1: [0.16, 0.44] as [number, number],
  I: [0.4, 0.6] as [number, number],
  p2: [0.54, 0.8] as [number, number],
  G: [0.72, 0.96] as [number, number],
};

function Ring({ progress, range, color, count = 24, extra }: { progress: MotionValue<number>; range: [number, number]; color: string; count?: number; extra?: string }) {
  const t = (f: number): [number, number] => [range[0] + (range[1] - range[0]) * f, range[0] + (range[1] - range[0]) * (f + 0.5)];
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Draw progress={progress} range={t(0)} d={circle(80)} stroke={INK} strokeWidth={1.8} />
      <Draw progress={progress} range={t(0.1)} d={circle(74)} stroke={INK} strokeWidth={1} />
      <Draw progress={progress} range={t(0.3)} d={petalRing(84, count, 9)} stroke={color} strokeWidth={1.3} />
      {extra && <Draw progress={progress} range={t(0.45)} d={extra} stroke={OCHRE} strokeWidth={1} />}
    </g>
  );
}

function Medallion({ at, scale, children }: { at: Pt; scale: number; children: React.ReactNode }) {
  return <g transform={`translate(${at.x} ${at.y}) scale(${scale})`}>{children}</g>;
}

function JourneyArt({ layout, progress, live, reduce, className }: { layout: Layout; progress: MotionValue<number>; live: boolean; reduce: boolean | null; className: string }) {
  const { vertical, scale: s, m, i, g } = layout;
  const run = live && !reduce;
  const off = (p: Pt, d: number): Pt => (vertical ? { x: p.x, y: p.y + d * s } : { x: p.x + d * s, y: p.y });
  const w1 = vertical ? { x: m.x - 40, y: (m.y + i.y) / 2 + 40 } : { x: (m.x + i.x) / 2, y: m.y + 34 };
  const w2 = vertical ? { x: m.x + 40, y: (i.y + g.y) / 2 + 40 } : { x: (i.x + g.x) / 2, y: m.y - 34 };
  const gap = vertical ? 76 : 0; // on phones the roots start below each label
  const r1 = rootPath(off(m, R0 + gap), w1, off(i, -R0), vertical);
  const r2 = rootPath(off(i, R0 + gap), w2, off(g, -R0), vertical);
  const clipId = `india-clip-${vertical ? "v" : "h"}`;
  const offset = vertical ? "translate(5 0)" : "translate(0 5)";
  const labels = [
    { p: m, a: "Mithila Roots", b: "Origin", at: 0.14 },
    { p: i, a: "India", b: "Rooted in India", at: 0.5 },
    { p: g, a: "Global", b: "Global Ambition", at: 0.88 },
  ];

  return (
    <svg viewBox={layout.viewBox} className={className} role="img" aria-labelledby={`jt-${clipId}`}>
      <title id={`jt-${clipId}`}>From Mithila roots to India to a global network, drawn in Madhubani style</title>
      <defs>
        <clipPath id={clipId}><path d={INDIA} /></clipPath>
      </defs>

      {/* roots grow from Mithila: double stroke + fine root hairs */}
      <g strokeLinecap="round">
        <Draw progress={progress} range={WINDOWS.p1} d={r1.d} stroke={INK} strokeWidth={2} />
        <Draw progress={progress} range={[WINDOWS.p1[0] + 0.03, WINDOWS.p1[1] + 0.03]} d={r1.d} stroke={VERMILION} strokeWidth={1.2} transform={offset} />
        <Draw progress={progress} range={[WINDOWS.p1[0] + 0.1, WINDOWS.p1[1] + 0.06]} d={r1.hairs} stroke={OCHRE} strokeWidth={1.1} />
        <Draw progress={progress} range={WINDOWS.p2} d={r2.d} stroke={INK} strokeWidth={2} />
        <Draw progress={progress} range={[WINDOWS.p2[0] + 0.03, WINDOWS.p2[1] + 0.03]} d={r2.d} stroke={GREEN} strokeWidth={1.2} transform={offset} />
        <Draw progress={progress} range={[WINDOWS.p2[0] + 0.1, WINDOWS.p2[1] + 0.06]} d={r2.hairs} stroke={OLIVE} strokeWidth={1.1} />
      </g>

      {/* 1 — Mithila: sun and lotus */}
      <Medallion at={m} scale={s}>
        <Ring progress={progress} range={WINDOWS.M} color={VERMILION} extra={petalRing(60, 14, 6)} />
        <Fade progress={progress} range={[WINDOWS.M[0] + 0.04, WINDOWS.M[1]]}>
          <motion.g
            animate={run ? { rotate: 360 } : undefined}
            transition={run ? { duration: 70, repeat: Infinity, ease: "linear" } : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <g transform="translate(0 -10) scale(1.05)">
              <path d={SUN.rays} fill="none" stroke={OCHRE} strokeWidth={1.3} strokeLinejoin="round" />
            </g>
          </motion.g>
          <g transform="translate(0 -10) scale(1.05)">
            {SUN.rings.map((d, k) => <path key={k} d={d} fill={k ? "none" : OCHRE} fillOpacity={0.35} stroke={INK} strokeWidth={1.4} />)}
          </g>
          <g transform="translate(0 36) scale(0.55)" fill="none" stroke={VERMILION} strokeWidth={1.8}>
            {LOTUS.petals.map((p) => (
              <g key={p.deg} transform={`rotate(${p.deg})`}>
                <path d={p.outer} />
                <path d={p.inner} stroke={INK} strokeWidth={1.2} />
              </g>
            ))}
            <path d={LOTUS.base} stroke={INK} />
          </g>
        </Fade>
      </Medallion>

      {/* 2 — India: Madhubani-hatched map, Mithila marked */}
      <Medallion at={i} scale={s}>
        <Ring progress={progress} range={WINDOWS.I} color={OLIVE} />
        <g transform="translate(-57 -63) scale(1.15)">
          <Fade progress={progress} range={[WINDOWS.I[0] + 0.05, WINDOWS.I[1]]}>
            <path d={INDIA} fill={OCHRE} fillOpacity={0.12} />
            <g clipPath={`url(#${clipId})`}>
              <path d={INDIA_HATCH} fill="none" stroke={OCHRE} strokeOpacity={0.7} strokeWidth={0.9} />
            </g>
          </Fade>
          <Draw progress={progress} range={[WINDOWS.I[0], WINDOWS.I[1] - 0.04]} d={INDIA} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
          <Draw progress={progress} range={[WINDOWS.I[0] + 0.03, WINDOWS.I[1]]} d={INDIA} stroke={VERMILION} strokeWidth={0.9} strokeLinejoin="round" transform="translate(1.6 1.6)" />
          <Fade progress={progress} range={[WINDOWS.I[1] - 0.06, WINDOWS.I[1]]}>
            <circle cx={BIHAR.x} cy={BIHAR.y} r={3.2} fill={VERMILION} />
            <motion.circle
              cx={BIHAR.x}
              cy={BIHAR.y}
              r={3}
              fill="none"
              stroke={VERMILION}
              strokeWidth={1}
              animate={run ? { r: [3, 9], opacity: [0.9, 0] } : { opacity: 0 }}
              transition={run ? { duration: 2.2, repeat: Infinity, ease: "easeOut" } : undefined} />
          </Fade>
        </g>
      </Medallion>

      {/* 3 — Global: globe & network */}
      <Medallion at={g} scale={s}>
        <Ring progress={progress} range={WINDOWS.G} color={GREEN} count={28} />
        <Fade progress={progress} range={[WINDOWS.G[0] + 0.06, WINDOWS.G[1]]}>
          <g fill="none" stroke={INK} strokeWidth={1.4}>
            <circle r={52} fill={BLUE} fillOpacity={0.07} />
            <ellipse rx={20} ry={52} stroke={OLIVE} strokeOpacity={0.8} />
            <ellipse rx={38} ry={52} stroke={OLIVE} strokeOpacity={0.5} />
            <path d="M-52 0 H52 M-46 -26 Q0 -34 46 -26 M-46 26 Q0 34 46 26" stroke={OLIVE} strokeOpacity={0.7} />
          </g>
          <path d={GLOBE_MESH} fill="none" stroke={GREEN} strokeWidth={1.1} />
          {GLOBE_NODES.map((n, k) => <circle key={k} cx={n.x} cy={n.y} r={3.6} fill={LIME} stroke={OLIVE} strokeWidth={1} />)}
          <motion.g
            animate={run ? { rotate: 360 } : undefined}
            transition={run ? { duration: 40, repeat: Infinity, ease: "linear" } : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle r={63} fill="none" stroke={VERMILION} strokeWidth={1.2} strokeDasharray="2 7" strokeLinecap="round" />
            <circle cx={63} r={3.4} fill={VERMILION} />
          </motion.g>
        </Fade>
      </Medallion>

      {/* labels */}
      {labels.map((l) => {
        const p = off(l.p, 0);
        return (
          <Fade key={l.a} progress={progress} range={[l.at, l.at + 0.08]}>
            <text x={p.x + layout.labelDx} y={p.y + layout.labelDy} textAnchor="middle" className="fill-[#2B2118] font-mono text-[13px] font-bold uppercase tracking-[0.2em]">
              {l.a}
            </text>
            <text x={p.x + layout.labelDx} y={p.y + layout.labelDy + 18} textAnchor="middle" className="fill-[#7A6A58] text-[12px]">
              {l.b}
            </text>
          </Fade>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Capability tiles: Solar · BESS · Civil · Hybrid in Madhubani line art  */
/* ------------------------------------------------------------------ */

const wavePath = (y: number, x0 = 8, x1 = 152) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += 12) d += ` q6 -5 12 0`;
  return d;
};
const ground = (y = 110) => `M12 ${y} H148`;

type DrawFn = (i: number) => { initial: TargetAndTransition; animate?: TargetAndTransition; transition: Transition };

/** double Madhubani outline: ink line plus an offset vermilion echo */
function Dbl({ d, p, i, accent = VERMILION, fill }: { d: string; p: DrawFn; i: number; accent?: string; fill?: string }) {
  return (
    <>
      {fill && <motion.path d={d} fill={fill} initial={{ opacity: 0 }} animate={p(i).animate ? { opacity: 1 } : undefined} transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }} />}
      <motion.path {...p(i)} d={d} fill="none" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      <motion.path {...p(i + 1)} d={d} fill="none" stroke={accent} strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" transform="translate(2 2)" />
    </>
  );
}

function SolarArt({ p, run }: { p: DrawFn; run: boolean }) {
  return (
    <>
      <motion.g transform="translate(128 28)" animate={run ? { rotate: 360 } : undefined} transition={run ? { duration: 40, repeat: Infinity, ease: "linear" } : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={sunRays(17, 26, 12)} fill="none" stroke={OCHRE} strokeWidth={1.2} />
      </motion.g>
      <g transform="translate(128 28)">
        <circle r={12} fill={OCHRE} fillOpacity={0.4} stroke={INK} strokeWidth={1.4} />
        <circle r={7} fill="none" stroke={VERMILION} strokeWidth={1} />
      </g>
      <Dbl d="M26 58 L112 48 L124 84 L38 96 Z" p={p} i={0} accent={BLUE} fill="rgba(46,74,125,0.14)" />
      <motion.path {...p(3)} d="M47.5 55.5 L59.5 93 M69 53 L81 90 M90.5 50.5 L102.5 87 M30 70.7 L116 60 M34 83.3 L120 72" fill="none" stroke={BLUE} strokeWidth={1.1} />
      <motion.path {...p(4)} d="M62 94 V110 M100 88 V110" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <motion.path {...p(5)} d={ground()} fill="none" stroke={OLIVE} strokeWidth={1.4} />
      <motion.path {...p(6)} d="M16 116 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6" fill="none" stroke={VERMILION} strokeWidth={1} />
    </>
  );
}

function BessArt({ p, run, reduce }: { p: DrawFn; run: boolean; reduce: boolean | null }) {
  return (
    <>
      <motion.path {...p(0)} d="M80 6 L68 28 H78 L72 42 L90 20 H80 Z" fill={LIME} fillOpacity={0.5} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
      <Dbl d="M24 48 H124 V100 H24 Z" p={p} i={1} />
      <motion.path {...p(3)} d="M124 62 H134 V86 H124" fill="none" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
      <motion.path {...p(3)} d="M49 48 V100 M74 48 V100 M99 48 V100" fill="none" stroke={INK} strokeWidth={1.2} />
      {[0, 1, 2, 3].map((k) => (
        <motion.rect
          key={k}
          x={29 + k * 25}
          y={54}
          width={15}
          height={40}
          rx={2}
          fill={k % 2 ? GREEN : LIME}
          initial={{ opacity: 0 }}
          animate={run ? { opacity: [0.15, 0.95, 0.95, 0.15] } : { opacity: reduce ? 0.8 : 0 }}
          transition={run ? { duration: 3.6, repeat: Infinity, delay: k * 0.45, times: [0, 0.35, 0.8, 1] } : { duration: 0.8, delay: 1.2 }} />
      ))}
      <motion.path {...p(5)} d="M32 104 l4 -4 l4 4 M57 104 l4 -4 l4 4 M82 104 l4 -4 l4 4 M107 104 l4 -4 l4 4" fill="none" stroke={VERMILION} strokeWidth={1} />
      <motion.path {...p(6)} d={ground(110)} fill="none" stroke={OLIVE} strokeWidth={1.4} />
    </>
  );
}

function CivilArt({ p, run }: { p: DrawFn; run: boolean }) {
  return (
    <>
      <motion.path {...p(0)} d="M26 12 L16 52 M26 12 L36 52 M18 44 H34 M21 32 H31 M12 22 H40 M16 52 H36" fill="none" stroke={INK} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Dbl d="M52 60 H152" p={p} i={1} />
      <motion.path {...p(3)} d="M60 60 V92 M100 60 V92 M140 60 V92" fill="none" stroke={INK} strokeWidth={1.6} />
      <motion.path {...p(4)} d="M60 92 A20 20 0 0 1 100 92 M100 92 A20 20 0 0 1 140 92 M66 92 A14 14 0 0 1 94 92 M106 92 A14 14 0 0 1 134 92" fill="none" stroke={VERMILION} strokeWidth={1.3} />
      <motion.path {...p(5)} d="M52 68 H152 M52 74 H152" fill="none" stroke={OCHRE} strokeWidth={0.9} strokeDasharray="2 4" />
      <motion.path
        {...p(6)}
        d={wavePath(102, 8, 152) + " " + wavePath(110, 14, 152)}
        fill="none"
        stroke={BLUE}
        strokeWidth={1.2}
        animate={run ? { x: [0, 6, 0] } : p(6).animate}
        transition={run ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : p(6).transition} />
    </>
  );
}

function HybridArt({ p, run }: { p: DrawFn; run: boolean }) {
  return (
    <>
      <motion.path {...p(0)} d="M118 50 V100 M108 100 H128" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <g transform="translate(118 50)">
        <circle r={25} fill="none" stroke={OCHRE} strokeOpacity={0.4} strokeDasharray="2 4" />
        <motion.g animate={run ? { rotate: 360 } : undefined} transition={run ? { duration: 7, repeat: Infinity, ease: "linear" } : undefined}>
          <motion.path {...p(1)} d="M0 0 L0 -24 M0 0 L20.8 12 M0 0 L-20.8 12" fill="none" stroke={VERMILION} strokeWidth={2.4} strokeLinecap="round" />
          <circle r={3.4} fill={INK} />
        </motion.g>
      </g>
      <Dbl d="M12 72 L52 66 L60 88 L20 94 Z" p={p} i={2} accent={BLUE} fill="rgba(46,74,125,0.14)" />
      <motion.path {...p(4)} d="M25 70 L33 92 M38 68 L46 90 M16 83 L56 77" fill="none" stroke={BLUE} strokeWidth={1} />
      <Dbl d="M66 82 H94 V104 H66 Z" p={p} i={5} />
      <motion.rect x={70} y={86} width={20} height={14} rx={2} fill={LIME} initial={{ opacity: 0 }} animate={run ? { opacity: [0.2, 0.9, 0.2] } : { opacity: 0.7 }} transition={run ? { duration: 3, repeat: Infinity } : { delay: 1.2 }} />
      <g transform="translate(30 24)">
        <circle r={8} fill={OCHRE} fillOpacity={0.4} stroke={INK} strokeWidth={1.2} />
        <path d={sunRays(11, 17, 10)} fill="none" stroke={OCHRE} strokeWidth={1.1} />
      </g>
      <motion.path
        {...p(7)}
        d="M12 114 H148"
        fill="none"
        stroke={GREEN}
        strokeWidth={2}
        strokeDasharray="2 8"
        strokeLinecap="round"
        animate={run ? { strokeDashoffset: [0, -20] } : p(7).animate}
        transition={run ? { duration: 1.2, repeat: Infinity, ease: "linear" } : p(7).transition} />
    </>
  );
}

const CAPS = [
  { key: "solar", title: "Solar", text: "Utility, rooftop & floating PV plants" },
  { key: "bess", title: "BESS", text: "Grid-scale battery energy storage" },
  { key: "civil", title: "Civil", text: "Foundations, substations, roads & bridges" },
  { key: "hybrid", title: "Hybrid", text: "Solar, storage & grid working as one" },
] as const;

function CapabilityTiles() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const live = useInView(ref, { amount: 0.1 });
  const run = live && !reduce;
  const p: DrawFn = (i) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: 0 },
    animate: seen ? { pathLength: 1, opacity: 1 } : undefined,
    transition: { duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : 0.15 + i * 0.1, ease: EASE },
  });

  return (
    <div ref={ref} className="mx-auto mb-14 sm:mb-20">
      <p className="mb-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#9A3B22]">What we build on these roots</p>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {CAPS.map((c, idx) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: EASE }}
            className="group relative overflow-hidden rounded-2xl border border-[#2B2118]/12 bg-gradient-to-b from-white to-[#F3ECDA] p-3 shadow-[0_18px_36px_-26px_rgba(43,33,24,0.45)] transition-transform duration-500 hover:-translate-y-1.5 sm:p-4">
            <span aria-hidden className="pointer-events-none absolute inset-1.5 rounded-xl border border-dashed border-[#C8A24E]/50" />
            <svg viewBox="0 0 160 124" className="relative mx-auto block h-auto w-full" role="img" aria-label={`${c.title} illustration`}>
              {c.key === "solar" && <SolarArt p={p} run={run} />}
              {c.key === "bess" && <BessArt p={p} run={run} reduce={reduce} />}
              {c.key === "civil" && <CivilArt p={p} run={run} />}
              {c.key === "hybrid" && <HybridArt p={p} run={run} />}
            </svg>
            <h3 className="mt-1 text-center font-serif-display text-xl font-medium text-[#1E1812] sm:text-2xl">{c.title}</h3>
            <p className="mt-1 px-1 text-center text-[11px] leading-snug text-[#5B5146] sm:text-sm">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
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
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const draw = {
    initial: { pathLength: reduce ? 1 : 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : undefined,
    transition: { duration: reduce ? 0.2 : 1.1, ease: EASE },
  };
  const steps = [
    { inset: "0%", h: "h-3" },
    { inset: "2.5%", h: "h-3" },
    { inset: "5%", h: "h-3.5" },
  ];

  return (
    <div ref={ref} className="relative">
      {/* entablature: the beam the pillars carry */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : -14 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay: reduce ? 0 : 1.9, ease: EASE }}
        className="relative mb-2 flex items-center justify-center gap-3 rounded-xl border border-[#2B2118]/15 bg-gradient-to-b from-white to-[#EDE6D3] px-4 py-3 shadow-sm md:mb-3">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A24E]" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#707B00]">Our Pillars</span>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A24E]" />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? (reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0 0 0)" }) : undefined}
            transition={{ duration: 1, delay: reduce ? 0 : 0.5 + i * 0.28, ease: EASE }}
            className="group relative flex flex-col overflow-hidden rounded-t-[28px] rounded-b-lg border border-[#2B2118]/10 bg-white/90 p-7 pt-9 shadow-[0_20px_40px_-24px_rgba(43,33,24,0.35)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1.5 sm:p-8 sm:pt-10">
            {/* capital */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#D4E012] via-[#6DAD45] to-[#D4E012]" />
            {/* fluted shaft lines */}
            <span aria-hidden className="pointer-events-none absolute inset-y-6 left-3 w-px bg-gradient-to-b from-transparent via-[#C8A24E]/60 to-transparent" />
            <span aria-hidden className="pointer-events-none absolute inset-y-6 right-3 w-px bg-gradient-to-b from-transparent via-[#C8A24E]/60 to-transparent" />
            <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A24E] bg-[#F5EFE3] font-mono text-xs font-bold text-[#707B00] transition-colors duration-500 group-hover:bg-[#D4E012] group-hover:text-slate-950">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-3 font-serif-display text-2xl font-medium text-[#1E1812] sm:text-3xl">{p.title}</h3>
            <p className="text-sm leading-relaxed text-[#5B5146] sm:text-base">{p.description}</p>
            {/* base plinth */}
            <span aria-hidden className="mt-7 block h-1 rounded-full bg-gradient-to-r from-[#C8A24E]/0 via-[#C8A24E]/60 to-[#C8A24E]/0" />
          </motion.article>
        ))}
      </div>

      {/* the foundation the pillars stand on: stepped plinth + Madhubani band */}
      <div className="mt-2 md:mt-3">
        {steps.map((st, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: reduce ? 1 : 0.7 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : undefined}
            transition={{ duration: 0.8, delay: reduce ? 0 : 1.3 + i * 0.18, ease: EASE }}
            style={{ marginInline: st.inset }}
            className={`${st.h} border-x border-b border-[#2B2118]/20 bg-gradient-to-b ${i === 0 ? "from-[#E9E1CB] to-[#DDD3B8]" : i === 1 ? "from-[#DDD3B8] to-[#D2C6A6]" : "from-[#D2C6A6] to-[#C8BA96]"}`} />
        ))}
        <div className="mt-3 flex items-center gap-4">
          <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#9A3B22]">Foundation</span>
          <svg viewBox={`0 0 ${BAND_W} 32`} preserveAspectRatio="xMinYMid slice" className="h-5 min-w-0 flex-1 sm:h-6" aria-hidden>
            {band.rules.map((d) => (
              <motion.path key={d} {...draw} d={d} fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={1} />
            ))}
            <motion.path {...draw} d={band.zig} fill="none" stroke={VERMILION} strokeWidth={1.2} strokeLinejoin="round" />
          </svg>
          <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.25em] text-[#7A6A58] sm:block">Mithila Roots</span>
        </div>
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
  const live = useInView(artRef, { amount: 0.05 });
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
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
          className="mx-auto max-w-3xl text-center">
          <AnimatedPillBadge className="mb-6">What Guides Us</AnimatedPillBadge>
          <h2 className="mb-6 font-serif-display text-3xl font-medium leading-tight tracking-tight text-[#1E1812] sm:text-5xl">
            Our Foundation &amp;{" "}
            <span className="italic text-[#707B00] relative inline-block">
              Pillars.
              <svg
                className="absolute -bottom-2 left-0 w-full h-2.5 text-[#707B00]"
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
          <p className="text-base leading-relaxed text-[#5B5146] sm:text-lg">
            Our foundation began in the Mithila region. These are our roots &mdash; and from these roots, we are building toward the world.
          </p>
        </motion.div>

        <div ref={artRef} className="mx-auto my-12 min-h-[320px] sm:my-16">
          {desktop !== null && (
            <JourneyArt
              layout={desktop ? DESK : MOB}
              progress={progress}
              live={live}
              reduce={reduce}
              className="mx-auto block h-auto w-full max-w-[1100px] md:max-w-none" />
          )}
        </div>

        <CapabilityTiles />

        <Pillars pillars={pillars} />
      </div>
    </section>
  );
}
