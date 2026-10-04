"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Draw, EASE, borderBand, useDrawOnView } from "./motifs";
import styles from "./EnergyTomorrow.module.css";

const W = 1600;
const band = borderBand(W);
// Conductors strung between towers at 0 / 800 / 1600: the border's straight rules become transmission lines
const ARMS = [120, 154, 188];
const SPANS = ARMS.map((y) => `M0 ${y} Q400 ${y + 46} 800 ${y} Q1200 ${y + 46} 1600 ${y}`);
const TOWER_X = [0, 800, 1600];
// legs, three cross-arms (one per conductor, local y = arm - 96) and light bracing
const TOWER = "M0 -14 L-24 190 M0 -14 L24 190 M-34 24 H34 M-30 58 H30 M-26 92 H26 M-12 92 L9 58 M12 92 L-9 58 M-17 150 L13 92 M17 150 L-13 92";

/** 08 — Energy today. More possibilities tomorrow. The existing Road Ahead block as the closing chapter. */
export default function EnergyTomorrow({ onOpenQuote }: { onOpenQuote: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const draw = useDrawOnView(ref, { duration: 2.4, amount: 0.25 });
  // the current only starts flowing once the conductors exist
  const live = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#0B120C] via-[#0A160C] to-[#070D08] py-20 text-white sm:py-28">
      {/* roots → energy: the Madhubani band fades out as the conductors take over */}
      <svg
        viewBox={`0 0 ${W} 300`}
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] w-full sm:h-[300px]"
        aria-hidden
      >
        <defs>
          <linearGradient id="energy-fade" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="energy-roots">
            <rect width={W} height="300" fill="url(#energy-fade)" />
          </mask>
          <linearGradient id="energy-line" x1="0" x2="1">
            <stop offset="0" stopColor="#C8902E" stopOpacity="0.5" />
            <stop offset="0.4" stopColor="#6DAD45" stopOpacity="0.6" />
            <stop offset="1" stopColor="#D4E012" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <g mask="url(#energy-roots)" transform="translate(0 40)" opacity={0.35}>
          {band.rules.map((d) => (
            <Draw key={d} progress={draw} range={[0, 0.5]} d={d} stroke="#C8902E" strokeWidth={1} />
          ))}
          <Draw progress={draw} range={[0, 0.5]} d={band.zig} stroke="#B5462B" strokeWidth={1.2} strokeLinejoin="round" />
        </g>

        <g fill="none" stroke="#6DAD45" strokeOpacity={0.35} strokeWidth={1.2} strokeLinecap="round">
          {TOWER_X.map((x) => (
            <motion.path
              key={x}
              d={TOWER}
              transform={`translate(${x} 96)`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: reduce ? 0 : 1.2 }}
            />
          ))}
        </g>
        {SPANS.map((d, i) => (
          <g key={d}>
            <Draw progress={draw} range={[0.2 + i * 0.08, 0.85 + i * 0.05]} d={d} stroke="url(#energy-line)" strokeWidth={1.4} strokeLinecap="round" />
            {/* a single slow pulse of current along each conductor */}
            {live && !reduce && (
              <path
                d={d}
                fill="none"
                stroke="#D4E012"
                strokeWidth={2}
                strokeLinecap="round"
                pathLength={1}
                className={styles.current}
                style={{ animationDelay: `${2.6 + i * 1.3}s` }}
              />
            )}
          </g>
        ))}
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 pt-40 sm:px-6 sm:pt-48 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4E012]"
        >
          <span className="h-px w-8 bg-[#D4E012]" aria-hidden />
          The Road Ahead
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: reduce ? 0 : 0.18 }}
          className="mb-8 max-w-4xl font-serif-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          {["Energy today.", "More possibilities tomorrow."].map((line, i) => (
            <motion.span
              key={line}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 18 },
                shown: reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 },
              }}
              transition={{ duration: 0.9, ease: EASE }}
              className={`block pb-1 ${i === 1 ? "text-[#D4E012]" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.35, ease: EASE }}
          className="grid grid-cols-1 gap-10 border-t border-white/10 pt-8 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <p className="mb-4 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Born from Indian roots, shaped by values and execution, strengthened through experience, and built with the ambition to earn trust globally.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-slate-400">
              Hospitality is planned as a future vertical and will be developed separately under its own brand and website.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:flex-col md:items-end md:justify-end lg:flex-row">
            <button
              type="button"
              onClick={onOpenQuote}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4E012] px-7 py-3.5 text-sm font-bold text-slate-950 transition-colors duration-300 hover:bg-[#6DAD45] hover:text-white"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#D4E012] hover:bg-white/5"
            >
              See our projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
