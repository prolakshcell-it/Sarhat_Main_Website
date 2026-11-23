"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "./motifs";

interface EnergyTomorrowProps {
  onOpenQuote: () => void;
}

/**
 * 05 — The Road Ahead Closing CTA
 * "Building across India. Looking beyond borders."
 */
export default function EnergyTomorrow({ onOpenQuote }: EnergyTomorrowProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF6EF] py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] border border-emerald-950/40 bg-gradient-to-b from-[#091C12] via-[#071810] to-[#040E0A] p-8 text-center text-white shadow-2xl sm:p-14 md:p-16">
          
          {/* Subtle Decorative Floral/Vine Motifs in Corners */}
          <svg
            viewBox="0 0 120 120"
            className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 text-[#6DAD45]/20 sm:h-36 sm:w-36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden>
            <path d="M 10 10 Q 60 20 100 80 Q 80 40 10 10 Z" />
            <path d="M 20 20 Q 50 70 80 110" />
            <circle cx="60" cy="50" r="8" fill="currentColor" fillOpacity="0.3" />
            <circle cx="85" cy="85" r="6" fill="currentColor" fillOpacity="0.3" />
          </svg>

          <svg
            viewBox="0 0 120 120"
            className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 rotate-180 text-[#6DAD45]/20 sm:h-36 sm:w-36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden>
            <path d="M 10 10 Q 60 20 100 80 Q 80 40 10 10 Z" />
            <path d="M 20 20 Q 50 70 80 110" />
            <circle cx="60" cy="50" r="8" fill="currentColor" fillOpacity="0.3" />
            <circle cx="85" cy="85" r="6" fill="currentColor" fillOpacity="0.3" />
          </svg>

          {/* Eyebrow */}
          <div className="relative z-10 mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#D4E012]/60" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#D4E012]">
              THE ROAD AHEAD
            </p>
            <span className="h-px w-6 bg-[#D4E012]/60" />
          </div>

          {/* Heading */}
          <h2 className="relative z-10 mb-6 font-serif-display text-3xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl [text-wrap:balance]">
            Building across India. <br />
            <span className="font-normal italic text-[#D4E012] relative inline-block">
              Looking beyond borders.
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
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

          {/* Subtitle */}
          <p className="relative z-10 mx-auto mb-10 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg [text-wrap:balance]">
            From our roots in Mithila and our head office in Ghaziabad (NCR), India, we&apos;re growing our energy and infrastructure work across India and exploring opportunities to work with partners overseas.
          </p>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/projects"
              className="inline-flex min-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D4E012] px-8 py-3.5 text-base font-bold text-slate-950 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#c2ce10]">
              Explore our projects →
            </Link>
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex min-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-3.5 text-base font-medium text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/15">
              Discuss your project →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
