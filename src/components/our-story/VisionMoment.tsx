"use client";

import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Draw, EASE, SUN, useDrawOnView } from "./motifs";

const STATEMENT =
  "Sarhat aspires to be an India-rooted energy and infrastructure company trusted globally for safe, reliable execution.";

/** 05 — Vision: the existing Vision Statement, given room as the pause in the story. */
export default function VisionMoment() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const draw = useDrawOnView(ref, { duration: 1.8, amount: 0.5 });
  const words = STATEMENT.split(" ");

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* a sun rising over a single horizon line */}
        <div ref={ref} className="mx-auto mb-8 w-full max-w-md" aria-hidden>
          <svg viewBox="-200 -50 400 56" className="h-auto w-full overflow-visible">
            <defs>
              <clipPath id="vision-horizon">
                <rect x="-60" y="-60" width="120" height="60" />
              </clipPath>
            </defs>
            <g clipPath="url(#vision-horizon)" strokeLinecap="round" strokeLinejoin="round">
              <Draw progress={draw} range={[0.2, 0.7]} d={SUN.rings[0]} stroke="#C8902E" strokeWidth={1.6} />
              <Draw progress={draw} range={[0.25, 0.75]} d={SUN.rings[1]} stroke="#C8902E" strokeWidth={1} />
              <Draw progress={draw} range={[0.45, 1]} d={SUN.rays} stroke="#B5462B" strokeWidth={1.3} />
            </g>
            <Draw progress={draw} range={[0, 0.6]} d="M-200 0 H200" stroke="#0F172A" strokeOpacity={0.25} strokeWidth={1} />
          </svg>
        </div>

        <AnimatedPillBadge className="mb-8">Vision</AnimatedPillBadge>

        <motion.h2
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: reduce ? 0 : 0.045, delayChildren: 0.2 }}
          className="mx-auto max-w-4xl font-serif-display text-3xl font-medium leading-[1.2] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          <span className="sr-only">{STATEMENT}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0, y: reduce ? 0 : 14 }, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: EASE }}
                className={`inline-block ${w.startsWith("India-rooted") || w.startsWith("globally") ? "italic text-[#707B00]" : ""}`}
              >
                {w}
                {i < words.length - 1 && " "}
              </motion.span>
            ))}
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.3, ease: EASE }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 border-t border-slate-200 pt-10 text-left sm:mt-20 md:grid-cols-2 md:gap-12"
        >
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Building on our solar EPC foundations, we will develop connected capabilities in renewable energy, storage, grid systems and civil infrastructure. We will invest in our people, strengthen our engineering and learn from every project we deliver.
          </p>
          <p className="text-base font-medium leading-relaxed text-slate-900 sm:text-lg">
            We will measure our progress by the trust we earn, the capability we build and the lasting value our projects create for customers, partners, communities and the environment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
