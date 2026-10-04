"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { animate, motion, useReducedMotion } from "framer-motion";
import { MapPin, Building2, ArrowRight, Zap, CheckCircle2, Clock, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import AnimatedPillBadge from "./AnimatedPillBadge";
import { PROJECTS, STATES, Project, buildMarkers, formatMW, sumMW } from "@/data/projects";

import SlnkoStyleIndiaMap from "./SlnkoStyleIndiaMap";

interface FootprintMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
}

const ALL = "all";

export default function FootprintMap({ selectedStateSlug, onSelectState }: FootprintMapProps) {
  const router = useRouter();
  const [stateSlug, setStateSlug] = useState<string>(
    STATES.some((s) => s.slug === selectedStateSlug) ? (selectedStateSlug as string) : ALL
  );
  const reduce = !!useReducedMotion();
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedStateSlug && STATES.some((s) => s.slug === selectedStateSlug)) {
      setStateSlug(selectedStateSlug);
    }
  }, [selectedStateSlug]);

  const selectState = (slug: string) => {
    setStateSlug(slug);
    if (slug !== ALL) onSelectState?.(slug);
  };

  const handleViewDetails = (slug: string) => {
    if (slug === ALL || !slug) {
      router.push("/projects");
    } else {
      router.push(`/projects/${slug}`);
    }
  };

  // Keep the selected chip in view inside the (mobile) horizontal filter strip
  useEffect(() => {
    const strip = chipsRef.current;
    const chip = strip?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!strip || !chip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [stateSlug, reduce]);

  const group = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6, ease: "easeOut" as const } },
  };

  const chip = (slug: string, label: string, mw: number) => {
    const sel = stateSlug === slug;
    return (
      <button
        key={slug}
        type="button"
        aria-pressed={sel}
        onClick={() => selectState(slug)}
        className={`flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 rounded-full border py-1.5 pl-3.5 pr-1.5 font-mono text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45] focus-visible:ring-offset-2 ${
          sel
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:border-[#6DAD45]/60 hover:bg-[#6DAD45]/[0.05]"
        }`}
      >
        <span>{label}</span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors duration-200 ${sel ? "bg-white/15 text-[#D4E012]" : "bg-slate-100 text-slate-500"}`}>
          {formatMW(mw)}
        </span>
      </button>
    );
  };

  return (
    <section
      id="footprint"
      className="relative z-10 overflow-hidden border-b border-slate-200/80 bg-[#F8FAF8] py-[clamp(44px,6vw,80px)] font-sans-ui text-[#0F172A]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(circle at 50% 22%, rgba(109,173,69,0.10), transparent 55%)" }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        variants={group}
        className="relative z-10 mx-auto"
        style={{ width: "min(100% - 32px, 1360px)" }}
      >
        {/* Section Header */}
        <div className="mx-auto mb-6 max-w-[820px] text-center sm:mb-8">
          <motion.div variants={item}>
            <AnimatedPillBadge className="mb-4">PAN-INDIA OPERATIONAL FOOTPRINT</AnimatedPillBadge>
          </motion.div>

          <motion.h2
            variants={item}
            className="mb-4 font-serif-display text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.08] text-balance tracking-tight text-slate-900"
          >
            Built across India. <br />
            <span className="relative inline-block italic text-[#6DAD45]">
              Core Operating Footprint.
              <svg className="absolute -bottom-2 left-0 h-3 w-full text-[#6DAD45]" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M0 15 Q 50 0 100 15"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="transparent"
                  vectorEffect="non-scaling-stroke"
                  variants={{ hidden: { pathLength: reduce ? 1 : 0 }, visible: { pathLength: 1, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } } }}
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p variants={item} className="mx-auto max-w-[720px] text-[clamp(14px,1.2vw,17px)] leading-relaxed text-slate-600">
            Explore Sarhat&apos;s active solar EPC projects, PM-KUSUM feeder installations, DISCOM substation corridors, and renewable infrastructure across operating states.
          </motion.p>
        </div>

        {/* State filters (generated from the dataset) */}
        <motion.div variants={item} className="relative mb-5 sm:mb-6">
          <div
            ref={chipsRef}
            role="group"
            aria-label="Filter by state"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1.5 pt-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 lg:gap-1.5 [&::-webkit-scrollbar]:hidden"
          >
            {chip(ALL, "All States", sumMW(PROJECTS))}
            {STATES.map((s) => chip(s.slug, s.state, s.capacityMW))}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-16px] w-10 bg-gradient-to-l from-[#F8FAF8] to-transparent sm:hidden" />
        </motion.div>

        {/* 3D India Map Showcase */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 20 },
            visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: "easeOut" } },
          }}
          className="overflow-hidden rounded-[24px] border border-slate-800 bg-[#071325] shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
        >
          <SlnkoStyleIndiaMap
            selectedStateSlug={stateSlug}
            onSelectState={(slug: string) => selectState(slug)}
            onViewDetails={(slug: string) => handleViewDetails(slug)}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
