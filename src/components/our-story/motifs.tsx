"use client";

import { useEffect, type ComponentProps, type RefObject } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Palette: earth (Mithila ink & pigments) evolving into energy greens  */
/* ------------------------------------------------------------------ */

export const INK = "#2B2118";
export const VERMILION = "#B5462B";
export const OCHRE = "#C8902E";
export const PAPER = "#F5EFE3";
export const OLIVE = "#707B00";
export const GREEN = "#6DAD45";
export const LIME = "#D4E012";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Drawing primitives                                                   */
/* ------------------------------------------------------------------ */

/** A 0 → 1 motion value that plays once when `ref` enters the viewport (instantly 1 with reduced motion). */
export function useDrawOnView(
  ref: RefObject<Element | null>,
  { duration = 1.6, delay = 0, amount = 0.3 }: { duration?: number; delay?: number; amount?: number } = {},
) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount });
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration, delay, ease: "easeInOut" });
    return () => controls.stop();
  }, [inView, reduce, duration, delay, progress]);
  return progress;
}

type PathProps = Omit<ComponentProps<typeof motion.path>, "style" | "pathLength">;

/** A stroke that draws itself while `progress` moves through `range`. */
export function Draw({ progress, range = [0, 1], ...rest }: PathProps & { progress: MotionValue<number>; range?: [number, number] }) {
  const pathLength = useTransform(progress, range, [0, 1], { clamp: true });
  // hide the round-cap dot that a zero-length stroke would otherwise leave behind
  const opacity = useTransform(progress, [range[0], range[0] + 0.002], [0, 1], { clamp: true });
  return <motion.path fill="none" {...rest} style={{ pathLength, opacity }} />;
}

/** A group that fades (and settles 6px) while `progress` moves through `range`. */
export function Fade({
  progress,
  range,
  children,
  ...rest
}: Omit<ComponentProps<typeof motion.g>, "style"> & { progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0, 1], { clamp: true });
  const y = useTransform(progress, range, [6, 0], { clamp: true });
  return (
    <motion.g {...rest} style={{ opacity, y }}>
      {children}
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/* Mithila / Madhubani-inspired motifs (double outlines, line hatching) */
/* All coordinates are local, centred on 0,0.                           */
/* ------------------------------------------------------------------ */

/** A single fish facing right — the matsya, Mithila's sign of good fortune. ~150 × 80. */
export const FISH = {
  outline: [
    "M-62 0 C-38 -30 18 -32 48 0 C18 32 -38 30 -62 0 Z",
    "M-62 0 L-84 -20 Q-76 0 -84 20 Z",
  ],
  detail: [
    "M-52 0 C-32 -22 14 -24 38 0 C14 24 -32 22 -52 0 Z",
    "M20 -20 Q10 0 20 20",
    "M-14 -26 L-2 -40 L8 -28",
    "M-14 26 L-2 40 L8 28",
    "M-36 -12 Q-30 0 -36 12",
    "M-24 -17 Q-17 0 -24 17",
    "M-12 -19 Q-4 0 -12 19",
    "M0 -19 Q8 0 0 19",
    "M34.5 -5 A4.5 4.5 0 1 1 25.5 -5 A4.5 4.5 0 1 1 34.5 -5",
  ],
};

const circle = (r: number, cx = 0, cy = 0) => `M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy}`;

/** Petal ring between two radii — the scalloped band that frames a Madhubani medallion. */
export function petalRing(r: number, count: number, len = 10) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const b = ((i + 0.5) / count) * Math.PI * 2;
    const c = ((i + 1) / count) * Math.PI * 2;
    const p = (ang: number, rad: number) => `${(Math.cos(ang) * rad).toFixed(1)} ${(Math.sin(ang) * rad).toFixed(1)}`;
    d += `M${p(a, r)} Q${p(b, r + len * 1.6)} ${p(c, r)} `;
  }
  return d.trim();
}

/** Triangular sun rays between r1 and r2. */
export function sunRays(r1: number, r2: number, count: number) {
  let d = "";
  const half = Math.PI / count / 1.4;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    const p = (ang: number, rad: number) => `${(Math.cos(ang) * rad).toFixed(1)} ${(Math.sin(ang) * rad).toFixed(1)}`;
    d += `M${p(a - half, r1)} L${p(a, r2)} L${p(a + half, r1)} `;
  }
  return d.trim();
}

export const SUN = {
  rings: [circle(26), circle(20)],
  rays: sunRays(31, 46, 16),
};

/** Lotus: five double-outlined petals over a shallow base. ~110 × 60. */
export const LOTUS = {
  petals: [-64, -32, 0, 32, 64].map(
    (deg) => ({ deg, outer: "M0 0 C-14 -18 -12 -40 0 -54 C12 -40 14 -18 0 0 Z", inner: "M0 -9 C-7 -20 -6 -33 0 -43 C6 -33 7 -20 0 -9" }),
  ),
  base: "M-50 6 Q0 26 50 6",
};

/** Horizontal Madhubani border band of width `w`: double rules, a triangle frieze and dotted fills. Height 32. */
export function borderBand(w: number, step = 16) {
  const n = Math.floor(w / step);
  let zig = `M0 26`;
  let dots = "";
  for (let i = 0; i < n; i++) {
    const x = i * step;
    zig += ` L${x + step / 2} 6 L${x + step} 26`;
    dots += `${circle(1.6, x + step / 2, 19)} `;
  }
  return {
    rules: [0, 3.5, 28.5, 32].map((y) => `M0 ${y} H${w}`),
    zig,
    dots: dots.trim(),
  };
}

export { circle };

/** Paired fish inside a double ring with a petal band — the origin medallion. Radius ≈ 108. */
export function FishMedallion({
  progress,
  range = [0, 1],
  ink = INK,
  accent = VERMILION,
}: {
  progress: MotionValue<number>;
  range?: [number, number];
  ink?: string;
  accent?: string;
}) {
  const [a, b] = range;
  const t = (f: number) => a + (b - a) * f;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Draw progress={progress} range={[t(0), t(0.35)]} d={circle(100)} stroke={ink} strokeWidth={1.6} />
      <Draw progress={progress} range={[t(0.05), t(0.4)]} d={circle(94)} stroke={ink} strokeWidth={1} />
      <Draw progress={progress} range={[t(0.2), t(0.6)]} d={petalRing(100, 36, 5)} stroke={accent} strokeWidth={1.2} />
      {[
        { tf: "translate(4 -30)", key: "up" },
        { tf: "translate(-4 30) rotate(180)", key: "down" },
      ].map(({ tf, key }) => (
        <g key={key} transform={tf}>
          {FISH.outline.map((d, i) => (
            <Draw key={i} progress={progress} range={[t(0.3), t(0.75)]} d={d} stroke={ink} strokeWidth={1.8} />
          ))}
          {FISH.detail.map((d, i) => (
            <Draw key={i} progress={progress} range={[t(0.5 + i * 0.03), t(0.8 + i * 0.02)]} d={d} stroke={i < 4 ? accent : ink} strokeWidth={1.1} />
          ))}
        </g>
      ))}
    </g>
  );
}
