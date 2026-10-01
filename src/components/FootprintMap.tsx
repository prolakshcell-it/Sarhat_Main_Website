"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { animate, motion, useReducedMotion } from "framer-motion";
import { MapPin, Building2, ArrowRight, Zap, CheckCircle2, Clock, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import AnimatedPillBadge from "./AnimatedPillBadge";
import { PROJECTS, STATES, Project, buildMarkers, formatMW, sumMW } from "@/data/projects";

// Leaflet touches `window`, so the map is client-only
const MapboxInteractiveMap = dynamic(() => import("./MapboxInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[340px] sm:h-[440px] lg:h-[540px] bg-slate-200/80 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs">
      Loading map...
    </div>
  ),
});

interface FootprintMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
}

const ALL = "all";

/** Counts up to a value like "25.03 MW" / "5 Sites" when it changes (not on every render). */
function AnimatedValue({ value, reduce }: { value: string; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if (!el || !m || reduce) return;
    const decimals = (m[1].split(".")[1] || "").length;
    const controls = animate(0, parseFloat(m[1]), {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${v.toFixed(decimals)}${m[2]}`;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
    return () => {
      controls.stop();
      el.textContent = value;
    };
  }, [value, reduce]);
  return <span ref={ref}>{value}</span>;
}

const LABEL = "font-mono text-[11px] font-bold uppercase tracking-[0.16em]";

function StatusBadge({ status }: { status: string }) {
  const base = "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase";
  switch (status) {
    case "Completed":
      return <span className={`${base} border-emerald-300 bg-emerald-100 text-emerald-800`}><CheckCircle2 className="h-3 w-3" />Completed</span>;
    case "Ongoing":
      return <span className={`${base} border-sky-300 bg-sky-100 text-sky-800`}><Clock className="h-3 w-3" />Ongoing</span>;
    case "Not Started":
      return <span className={`${base} border-amber-300 bg-amber-100 text-amber-800`}><AlertCircle className="h-3 w-3" />Not Started</span>;
    default:
      return <span className={`${base} border-slate-300 bg-slate-100 text-slate-600`}><Zap className="h-3 w-3" />Status {status}</span>;
  }
}

export default function FootprintMap({ selectedStateSlug, onSelectState }: FootprintMapProps) {
  const [stateSlug, setStateSlug] = useState<string>(
    STATES.some((s) => s.slug === selectedStateSlug) ? (selectedStateSlug as string) : ALL
  );
  const [markerKey, setMarkerKey] = useState<string | null>(null);
  const reduce = !!useReducedMotion();
  const chipsRef = useRef<HTMLDivElement>(null);

  // Follow state chosen elsewhere on the page (projects page tabs), when it exists in the dataset
  useEffect(() => {
    if (selectedStateSlug && STATES.some((s) => s.slug === selectedStateSlug)) {
      setStateSlug(selectedStateSlug);
      setMarkerKey(null);
    }
  }, [selectedStateSlug]);

  const selectState = (slug: string) => {
    setStateSlug(slug);
    setMarkerKey(null);
    if (slug !== ALL) onSelectState?.(slug);
  };

  const stateProjects: Project[] = useMemo(
    () => (stateSlug === ALL ? PROJECTS : PROJECTS.filter((p) => STATES.find((s) => s.slug === stateSlug)?.state === p.state)),
    [stateSlug]
  );
  const markers = useMemo(() => buildMarkers(stateProjects), [stateProjects]);
  const activeMarker = markers.find((m) => m.key === markerKey) ?? null;
  const visible = activeMarker ? activeMarker.projects : stateProjects;
  const activeState = STATES.find((s) => s.slug === stateSlug);
  const totalMW = sumMW(visible);

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
            ? "border-slate-900 bg-slate-900 text-white shadow-md"
            : "border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-[#6DAD45] hover:shadow-md"
        }`}
      >
        <span className={`h-2 w-2 rounded-full transition-colors ${sel ? "bg-[#D4E012]" : "bg-slate-300"}`} />
        <span>{label}</span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold transition-colors duration-200 ${sel ? "bg-[#D4E012] text-black" : "bg-slate-100 text-slate-600"}`}>
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
        viewport={{ once: true, amount: 0.12 }}
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

        {/* Map + project information */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 20 },
            visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: "easeOut" } },
          }}
          className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)] sm:rounded-[24px]"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-slate-200 px-4 py-3 sm:px-6">
                <span className={`${LABEL} flex items-center gap-2 text-[#707B00]`}>
                  <MapPin className="h-3.5 w-3.5" /> Project locations
                </span>
                <span className="font-mono text-[10px] font-semibold text-slate-500">SELECT A MARKER OR STATE TO FILTER</span>
              </div>
              <div id="footprint-map" className="scroll-mt-28">
                <MapboxInteractiveMap markers={markers} selectedKey={markerKey} onSelectMarker={setMarkerKey} />
              </div>
            </div>

            {/* State / metrics / project information */}
            <div className="relative min-w-0 border-t border-slate-200 bg-gradient-to-b from-[#F8FAF8] to-white lg:border-l lg:border-t-0">
              <div className="flex flex-col p-4 sm:p-6 lg:absolute lg:inset-0 lg:overflow-y-auto lg:overscroll-contain">
                <motion.div
                  key={`head-${stateSlug}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <span className={`${LABEL} text-[#707B00]`}>State</span>
                  <h3 className="mt-1 font-serif-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-medium leading-tight tracking-tight text-slate-900">
                    {activeState ? activeState.state : "All Operating States"}
                  </h3>
                </motion.div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="rounded-2xl bg-slate-900 p-3.5 text-white sm:p-4">
                    <span className={`${LABEL} block text-[10px] text-slate-400`}>Total capacity</span>
                    <span className="mt-1.5 block font-mono text-xl font-bold text-[#D4E012] sm:text-2xl">
                      <AnimatedValue value={formatMW(totalMW)} reduce={reduce} />
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4">
                    <span className={`${LABEL} block text-[10px] text-slate-500`}>Projects</span>
                    <span className="mt-1.5 block font-mono text-xl font-bold text-slate-900 sm:text-2xl">
                      <AnimatedValue value={`${visible.length} ${visible.length === 1 ? "Site" : "Sites"}`} reduce={reduce} />
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {markers.length} mapped {markers.length === 1 ? "location" : "locations"} across{" "}
                  {activeState ? activeState.state : `${STATES.length} states`}. Select a location to see its project and client details.
                </p>

                <div className="my-4 h-px bg-slate-200" />

                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className={`${LABEL} text-[#707B00]`}>Locations</span>
                  {activeMarker && (
                    <button
                      type="button"
                      onClick={() => setMarkerKey(null)}
                      className="inline-flex min-h-[32px] cursor-pointer items-center gap-1 font-mono text-[10px] font-bold uppercase text-slate-500 transition-colors duration-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45]"
                    >
                      <X className="h-3 w-3" /> Clear
                    </button>
                  )}
                </div>

                <ul className="space-y-1.5">
                  {markers.map((m) => {
                    const sel = m.key === markerKey;
                    return (
                      <li key={m.key}>
                        <button
                          type="button"
                          aria-pressed={sel}
                          onClick={() => setMarkerKey(sel ? null : m.key)}
                          className={`group flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 py-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45] ${
                            sel ? "border-[#6DAD45] bg-[#6DAD45]/10" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-[#6DAD45]/60 hover:bg-[#6DAD45]/[0.05]"
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-slate-900">{m.district}</span>
                            <span className="block font-mono text-[10px] text-slate-500">
                              {stateSlug === ALL ? `${m.state} • ` : ""}
                              {m.projects.length} {m.projects.length === 1 ? "site" : "sites"} • {formatMW(m.capacityMW)}
                            </span>
                          </span>
                          <ArrowRight className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[3px] ${sel ? "text-[#6DAD45]" : "text-slate-400"}`} />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {activeMarker && (
                  <motion.div
                    key={`sel-${markerKey}`}
                    initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mt-4 space-y-2.5 border-t border-slate-200 pt-4"
                  >
                    <span className={`${LABEL} text-[#707B00]`}>Selected location — {activeMarker.district}</span>
                    {activeMarker.projects.map((p) => (
                      <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-900">{p.location}</div>
                            <div className="font-mono text-[10px] text-slate-500">{p.scheme}</div>
                          </div>
                          <StatusBadge status={p.status} />
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                          <Building2 className="h-4 w-4 shrink-0 text-[#707B00]" />
                          <span className="min-w-0 break-words">{p.clientName}</span>
                        </div>
                        {p.clientAddress && <p className="mt-1 break-words text-xs leading-relaxed text-slate-600">{p.clientAddress}</p>}
                        <div className="mt-2 border-t border-slate-100 pt-2 font-mono text-sm font-extrabold text-slate-900">{formatMW(p.capacityMW)}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Records */}
        <motion.div variants={item} className="mt-6 sm:mt-8">
          {/* Project / client records */}
          <div id="footprint-roster-table" className="scroll-mt-28 rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[24px] sm:p-6 lg:p-7">
            <motion.div
              key={`list-${stateSlug}-${markerKey}`}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <span className={`${LABEL} flex items-center gap-2 text-[#707B00]`}>
                  <CheckCircle2 className="h-4 w-4 text-[#6DAD45]" />
                  Project &amp; client records ({visible.length})
                </span>
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-3.5 font-bold">State / Location</th>
                      <th className="px-4 py-3.5 font-bold">Project Type / Scheme</th>
                      <th className="px-4 py-3.5 font-bold">Capacity</th>
                      <th className="px-4 py-3.5 font-bold">Status</th>
                      <th className="px-4 py-3.5 font-bold">Client Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-sm">
                    {visible.map((p) => (
                      <tr key={p.id} className="group transition-colors duration-150 hover:bg-[#6DAD45]/[0.06]">
                        <td className="px-5 py-4 align-top">
                          <div className="font-bold text-slate-900">{p.location || "—"}</div>
                          <div className="font-mono text-[11px] text-slate-500">{p.state}</div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span className="whitespace-nowrap rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-800">{p.scheme}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-top font-mono text-sm font-extrabold text-slate-900">{formatMW(p.capacityMW)}</td>
                        <td className="px-4 py-4 align-top"><StatusBadge status={p.status} /></td>
                        <td className="max-w-md px-4 py-4 align-top">
                          <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                            <Building2 className="h-4 w-4 shrink-0 text-[#707B00]" />
                            <span>{p.clientName}</span>
                          </div>
                          {p.clientAddress && <div className="mt-1.5 break-words text-[11px] leading-relaxed text-slate-600">{p.clientAddress}</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / tablet cards */}
              <ul className="grid gap-3 sm:grid-cols-2 lg:hidden">
                {visible.map((p) => (
                  <li key={p.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-[#F8FAF8] p-4 transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900">{p.location || "—"}</div>
                        <div className="font-mono text-[11px] text-slate-500">{p.state}</div>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <span className="w-fit rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-800">{p.scheme}</span>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                        <Building2 className="h-4 w-4 shrink-0 text-[#707B00]" />
                        <span className="min-w-0 break-words">{p.clientName}</span>
                      </div>
                      {p.clientAddress && <p className="mt-1.5 break-words text-xs leading-relaxed text-slate-600">{p.clientAddress}</p>}
                    </div>
                    <div className="mt-auto border-t border-slate-100 pt-3">
                      <span className={`${LABEL} block text-slate-400`}>Capacity</span>
                      <span className="font-mono text-lg font-extrabold text-slate-900">{formatMW(p.capacityMW)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Section CTA Button */}
        <motion.div variants={item} className="mt-10 text-center sm:mt-12">
          <Link
            href="/projects#footprint"
            className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-black shadow-xl shadow-[#D4E012]/20 transition-all duration-300 hover:-translate-y-1 hover:from-[#c2ce0d] hover:to-[#4ed423]"
          >
            <span>Explore Regional Hubs & Footprints</span>
            <ArrowRight className="h-4 w-4 text-black transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
