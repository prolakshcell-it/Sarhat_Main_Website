"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { animate, motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Building2,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import AnimatedPillBadge from "./AnimatedPillBadge";
import { ProjectSite, projectSites, SubProject } from "./MapboxInteractiveMap";

// Dynamically import MapboxInteractiveMap with SSR disabled to prevent Leaflet window SSR errors
const MapboxInteractiveMap = dynamic(() => import("./MapboxInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[460px] lg:h-[560px] bg-slate-200/80 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs">
      Loading Interactive Mapbox Map...
    </div>
  ),
});

interface FootprintMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
}

const siteIdToSlugMap: Record<string, string> = {
  rj: "rajasthan",
  up: "uttar-pradesh",
  gj: "gujarat",
  mp: "madhya-pradesh",
  ka: "karnataka",
};

const slugToSiteIdMap: Record<string, string> = {
  rajasthan: "rj",
  "uttar-pradesh": "up",
  gujarat: "gj",
  "madhya-pradesh": "mp",
  karnataka: "ka",
};

/** Counts up to a value like "25.03 MW" / "5 Sites" when it changes (not on every render). */
function AnimatedValue({ value, reduce }: { value: string; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if (!el || !m || reduce) return;
    const decimals = (m[1].split(".")[1] || "").length;
    const controls = animate(0, parseFloat(m[1]), {
      duration: 0.6,
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

export default function FootprintMap({ selectedStateSlug, onSelectState }: FootprintMapProps) {
  const initialSiteId = selectedStateSlug ? slugToSiteIdMap[selectedStateSlug] || "up" : "up";
  const [selectedSite, setSelectedSite] = useState<ProjectSite | null>(
    projectSites.find((s) => s.id === initialSiteId) || projectSites[0]
  );
  const [statusFilter] = useState<string>("all");
  const reduce = !!useReducedMotion();
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedStateSlug) {
      const siteId = slugToSiteIdMap[selectedStateSlug];
      const match = projectSites.find((s) => s.id === siteId);
      if (match) {
        setSelectedSite(match);
      }
    }
  }, [selectedStateSlug]);

  const handleStateClick = (site: ProjectSite) => {
    setSelectedSite(site);
    const targetSlug = siteIdToSlugMap[site.id.toLowerCase()] || site.id.toLowerCase();
    if (onSelectState) {
      onSelectState(targetSlug);
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status: SubProject["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> COMPLETED
          </span>
        );
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <Clock className="w-3 h-3 text-sky-600 animate-spin" /> ONGOING
          </span>
        );
      case "Not Started":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3 h-3 text-amber-600" /> PLANNED
          </span>
        );
      case "Active":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-lime-100 text-lime-900 border border-lime-300">
            <Zap className="w-3 h-3 text-lime-700" /> ACTIVE
          </span>
        );
    }
  };

  const filteredSubProjects = selectedSite?.subProjects.filter((sp) => {
    if (statusFilter === "all") return true;
    return sp.status.toLowerCase() === statusFilter.toLowerCase();
  });

  // Keep the selected chip in view inside the (mobile) horizontal filter strip
  useEffect(() => {
    const strip = chipsRef.current;
    const chip = strip?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!strip || !chip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({
      left: chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [selectedSite?.id, reduce]);

  const group = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6, ease: "easeOut" as const } },
  };

  const scrollToMap = () =>
    document.getElementById("footprint-map")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });

  return (
    <section
      id="footprint"
      className="relative z-10 overflow-hidden border-b border-slate-200/80 bg-[#F8FAF8] py-[clamp(60px,8vw,110px)] font-sans-ui text-[#0F172A]"
    >
      {/* Very soft glow behind heading / map */}
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
        <div className="mx-auto mb-8 max-w-[920px] text-center sm:mb-10">
          <motion.div variants={item}>
            <AnimatedPillBadge className="mb-5">PAN-INDIA OPERATIONAL FOOTPRINT</AnimatedPillBadge>
          </motion.div>

          <motion.h2
            variants={item}
            className="mb-5 font-serif-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-slate-900"
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

          <motion.p variants={item} className="mx-auto max-w-[820px] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-slate-600">
            Explore Sarhat&apos;s active solar EPC projects, PM-KUSUM feeder installations, DISCOM substation corridors, and renewable infrastructure across operating states.
          </motion.p>
        </div>

        {/* State filters */}
        <motion.div variants={item} className="relative mb-5">
          <div
            ref={chipsRef}
            role="group"
            aria-label="Filter by state"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {projectSites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <button
                  key={site.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleStateClick(site)}
                  className={`flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2.5 rounded-2xl border px-4 py-2.5 font-mono text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                      : "border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-px hover:border-[#6DAD45] hover:shadow-md"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-[#D4E012]" : "bg-slate-300"}`} />
                  <span>{site.state}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${isSelected ? "bg-[#D4E012] text-black" : "bg-slate-100 text-slate-600"}`}>
                    {site.mwInstalled}
                  </span>
                </button>
              );
            })}
          </div>
          {/* right-edge fade hints horizontal scroll on mobile */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-16px] w-10 bg-gradient-to-l from-[#F8FAF8] to-transparent sm:hidden" />
        </motion.div>

        {/* Map + selected-location summary + facility list: one connected surface */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.985 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0.2 : 0.7, ease: "easeOut" } },
          }}
          className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] sm:rounded-3xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
            <span className={`${LABEL} flex items-center gap-2 text-[#707B00]`}>
              <MapPin className="h-3.5 w-3.5" /> PAN-INDIA OPERATIONAL LOCATIONS (INTERACTIVE MAP)
            </span>
            <span className="font-mono text-[10px] font-semibold text-slate-500">CLICK ANY STATE MARKER OR TAB TO FILTER</span>
          </div>

          <div id="footprint-map" className="scroll-mt-28">
            <MapboxInteractiveMap
              selectedSiteId={selectedSite?.id}
              onSelectSite={(site) => {
                if (site) setSelectedSite(site);
              }}
            />
          </div>

          {selectedSite && (
            <div id="footprint-roster-table" className="scroll-mt-28 border-t border-slate-200">
              <motion.div
                key={selectedSite.id}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Summary */}
                <div className="flex flex-col gap-6 bg-gradient-to-b from-[#F8FAF8] to-white p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:p-8">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="rounded-full border border-[#D4E012]/60 bg-[#D4E012]/25 px-3 py-1 font-mono text-xs font-bold text-slate-900">
                        {selectedSite.code} • {selectedSite.state.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-500">
                        DISCOM: <strong className="text-slate-800">{selectedSite.discom}</strong>
                      </span>
                    </div>
                    <h3 className="font-serif-display text-[clamp(1.6rem,3vw,2.25rem)] font-medium leading-tight tracking-tight text-slate-900">
                      {selectedSite.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-slate-600 sm:text-base">{selectedSite.description}</p>
                  </div>

                  <div className="grid shrink-0 grid-cols-2 gap-3 sm:min-w-[340px]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white shadow-lg">
                      <span className={`${LABEL} block text-slate-400`}>TOTAL CAPACITY</span>
                      <span className="mt-2 block font-mono text-2xl font-bold text-[#D4E012] sm:text-[1.75rem]">
                        <AnimatedValue value={selectedSite.mwInstalled} reduce={reduce} />
                      </span>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm">
                      <span className={`${LABEL} block text-slate-500`}>FACILITIES</span>
                      <span className="mt-2 block font-mono text-2xl font-bold sm:text-[1.75rem]">
                        <AnimatedValue value={`${selectedSite.subProjects.length} Sites`} reduce={reduce} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Facility list */}
                <div className="border-t border-slate-200 p-5 sm:p-7 lg:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <span className={`${LABEL} flex items-center gap-2 text-[#707B00]`}>
                      <CheckCircle2 className="h-4 w-4 text-[#6DAD45]" />
                      ALL OPERATIONAL FACILITIES & CLIENT RECORDS ({selectedSite.subProjects.length})
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500">
                      Showing All {selectedSite.subProjects.length} Facilities
                    </span>
                  </div>

                  {filteredSubProjects && filteredSubProjects.length > 0 ? (
                    <>
                      {/* Desktop table */}
                      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
                        <table className="w-full border-collapse text-left">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                              <th className="px-5 py-3.5 font-bold">Location / District</th>
                              <th className="px-4 py-3.5 font-bold">Project Scheme</th>
                              <th className="px-4 py-3.5 font-bold">Capacity (MW)</th>
                              <th className="px-4 py-3.5 font-bold">Status</th>
                              <th className="px-4 py-3.5 font-bold">Client Enterprise & Registered Address</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white text-sm">
                            {filteredSubProjects.map((project, idx) => (
                              <tr key={project.id} className="group transition-colors duration-150 hover:bg-[#6DAD45]/[0.06]">
                                <td className="relative px-5 py-4 align-top font-bold text-slate-900">
                                  <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[#6DAD45] transition-transform duration-150 group-hover:scale-y-100" />
                                  <div className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-[10px] font-bold text-slate-600 transition-colors group-hover:bg-[#6DAD45] group-hover:text-white">
                                      {idx + 1}
                                    </span>
                                    <span>{project.location}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-4 align-top font-mono font-medium text-slate-700">
                                  <span className="whitespace-nowrap rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-800">{project.scheme}</span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 align-top font-mono text-sm font-extrabold text-slate-900">{project.capacityMW}</td>
                                <td className="px-4 py-4 align-top">{getStatusBadge(project.status)}</td>
                                <td className="max-w-lg px-4 py-4 align-top">
                                  <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                                    <Building2 className="h-4 w-4 shrink-0 text-[#707B00]" />
                                    <span>{project.client}</span>
                                  </div>
                                  {project.clientAddress && (
                                    <div className="mt-1.5 break-words rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 text-[11px] font-normal leading-relaxed text-slate-600">
                                      <span className="mb-0.5 block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                        Registered Address / Location:
                                      </span>
                                      {project.clientAddress}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile / tablet cards */}
                      <ul className="grid gap-3 sm:grid-cols-2 lg:hidden">
                        {filteredSubProjects.map((project, idx) => (
                          <li key={project.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2 font-bold text-slate-900">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-[11px] text-slate-600">{idx + 1}</span>
                                <span>{project.location}</span>
                              </div>
                              {getStatusBadge(project.status)}
                            </div>
                            <span className="w-fit rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-800">{project.scheme}</span>
                            <div>
                              <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                                <Building2 className="h-4 w-4 shrink-0 text-[#707B00]" />
                                <span>{project.client}</span>
                              </div>
                              {project.clientAddress && (
                                <p className="mt-1.5 break-words text-xs leading-relaxed text-slate-600">
                                  <span className="mb-0.5 block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">Registered Address / Location:</span>
                                  {project.clientAddress}
                                </p>
                              )}
                            </div>
                            <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                              <div>
                                <span className={`${LABEL} block text-slate-400`}>Capacity</span>
                                <span className="font-mono text-lg font-extrabold text-slate-900">{project.capacityMW}</span>
                              </div>
                              <button
                                type="button"
                                onClick={scrollToMap}
                                className="group/v inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#707B00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45]"
                              >
                                View on map
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/v:translate-x-1" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="py-8 text-center font-mono text-xs text-slate-500">No facilities found matching status filter.</p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
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
