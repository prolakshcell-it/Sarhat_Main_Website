"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

/** prefers-reduced-motion, read after mount so server and client markup match. */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

export type MilestoneStatus = "upcoming" | "current" | "completed";

/* Fixed spread so every burst looks refined and nothing is re-randomised per render.
   [angle jitter (deg), distance (px), size (px), delay (s)] */
const PARTICLES: [number, number, number, number][] = [
  [0, 58, 5, 0],
  [10, 72, 3, 0.04],
  [-8, 50, 4, 0.02],
  [6, 84, 3, 0.07],
  [-12, 64, 6, 0.01],
  [14, 54, 3, 0.05],
  [-4, 78, 4, 0.03],
  [8, 68, 5, 0.06],
  [-10, 90, 3, 0.02],
  [12, 60, 4, 0.08],
  [-6, 74, 3, 0.04],
  [4, 52, 5, 0.01],
];

const BURST_MS = 1200;

function Burst({ id, scale }: { id: number; scale: number }) {
  const rot = (id * 17) % 30;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.span
        className="absolute h-full w-full rounded-full border-2 border-[#6DAD45]"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: 2.4 * scale, opacity: 0 }}
        transition={{
          scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.9, ease: "linear" },
        }}
      />
      <motion.span
        className="absolute h-full w-full rounded-full bg-[#D4E012]/40 blur-xl"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 2 * scale, opacity: 0 }}
        transition={{ duration: 1, ease: "linear" }}
      />
      {PARTICLES.map(([jitter, dist, size, delay], i) => {
        const angle = ((i * 360) / PARTICLES.length + jitter + rot) * (Math.PI / 180);
        return (
          <motion.span
            key={i}
            className={`absolute rounded-full ${
              i % 2 ? "bg-[#6DAD45] shadow-[0_0_8px_rgba(109,173,69,0.8)]" : "bg-[#D4E012] shadow-[0_0_8px_rgba(212,224,18,0.9)]"
            }`}
            style={{ width: size, height: size }}
            initial={{ x: 0, y: 0, opacity: 0.95, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist * scale,
              y: Math.sin(angle) * dist * scale,
              opacity: [0.95, 0.95, 0],
              scale: 0.4,
            }}
            transition={{
              duration: 0.8,
              delay,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.8, delay, times: [0, 0.5, 1], ease: "linear" },
            }}
          />
        );
      })}
    </span>
  );
}

interface MilestoneNodeProps {
  year: string;
  status: MilestoneStatus;
  size: "lg" | "sm";
  /** Content swapped in on hover (existing behaviour). */
  hoverIcon?: React.ReactNode;
}

/** Timeline node: muted when upcoming, expands + bursts once when it becomes active, then settles. */
export function MilestoneNode({ year, status, size, hoverIcon }: MilestoneNodeProps) {
  const reduce = usePrefersReducedMotion();
  const [prevStatus, setPrevStatus] = useState(status);
  const [burstId, setBurstId] = useState(0);
  const [bursting, setBursting] = useState(false);

  if (prevStatus !== status) {
    setPrevStatus(status);
    if (status === "current" && !reduce) {
      setBurstId((n) => n + 1);
      setBursting(true);
    }
  }

  useEffect(() => {
    if (!bursting) return;
    const t = setTimeout(() => setBursting(false), BURST_MS);
    return () => clearTimeout(t);
  }, [bursting, burstId]);

  const scale = status === "current" ? 1.12 : status === "completed" ? 0.9 : 0.82;
  const dims = size === "lg" ? "h-16 w-16 text-sm" : "h-12 w-12 text-xs";

  const tone =
    status === "current"
      ? "border-[#6DAD45] shadow-[0_0_30px_rgba(109,173,69,0.55)]"
      : status === "completed"
        ? "border-[#6DAD45]/70 shadow-[0_0_14px_rgba(109,173,69,0.25)]"
        : "border-slate-400/50 opacity-60 shadow-none";

  return (
    <div className={`relative z-20 shrink-0 ${size === "lg" ? "h-16 w-16" : "h-12 w-12"}`}>
      {bursting && <Burst id={burstId} scale={size === "lg" ? 1 : 0.7} />}
      <motion.div
        animate={{ scale }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 22 }}
        className={`group relative flex items-center justify-center rounded-full border-4 bg-slate-950 font-mono font-extrabold text-[#D4E012] transition-[border-color,box-shadow,opacity] duration-500 ${dims} ${tone} ${hoverIcon ? "cursor-pointer" : ""}`}
      >
        <span className={hoverIcon ? "group-hover:hidden" : ""}>{year}</span>
        {hoverIcon && <span className="hidden group-hover:block">{hoverIcon}</span>}
        {status === "completed" && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-950 bg-[#6DAD45] text-white"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </motion.div>
    </div>
  );
}

/** One-shot reveal: opacity + translate + blur-to-sharp (+ optional mask), then it stays put. */
export function MilestoneReveal({
  children,
  mask = false,
  delay = 0,
}: {
  children: React.ReactNode;
  mask?: boolean;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 30,
              filter: "blur(6px)",
              ...(mask ? { clipPath: "inset(10% round 28px)" } : {}),
            }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ...(mask ? { clipPath: "inset(0% round 28px)" } : {}),
            }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0.3 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-linked, bounded image drift (scale 1.04 → 1.08, ±6px). Wrap the <Image fill />. */
export function ParallaxImage({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, y }}
      className="absolute inset-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}
