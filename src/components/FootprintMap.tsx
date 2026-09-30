"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Building2,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ChevronRight,
  Filter,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";
import { ProjectSite, projectSites, SubProject } from "./MapboxInteractiveMap";

// Dynamically import MapboxInteractiveMap with SSR disabled to prevent Leaflet window SSR errors
const MapboxInteractiveMap = dynamic(() => import("./MapboxInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[550px] sm:h-[620px] rounded-3xl bg-slate-200/80 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs">
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

export default function FootprintMap({ selectedStateSlug, onSelectState }: FootprintMapProps) {
  const initialSiteId = selectedStateSlug ? slugToSiteIdMap[selectedStateSlug] || "up" : "up";
  const [selectedSite, setSelectedSite] = useState<ProjectSite | null>(
    projectSites.find((s) => s.id === initialSiteId) || projectSites[0]
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  return (
    <section
      id="footprint"
      className="py-20 sm:py-28 bg-[#F8FAF8] text-[#0F172A] relative z-10 border-b border-slate-200/80 select-none overflow-hidden font-sans-ui"
    >
      {/* Soft Ambient Porcelain Flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <AnimatedPillBadge className="mb-6">
              PAN-INDIA OPERATIONAL FOOTPRINT
            </AnimatedPillBadge>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-slate-900 leading-tight mb-6">
              Built across India. <br />
              <span className="text-[#6DAD45] italic relative inline-block whitespace-nowrap">
                Core Operating Footprint.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
              Explore Sarhat&apos;s active solar EPC projects, PM-KUSUM feeder installations, DISCOM substation corridors, and renewable infrastructure across operating states.
            </p>
          </div>
        </ScrollReveal>

        {/* State Selection Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x">
            {projectSites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => handleStateClick(site)}
                  className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-300 border ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                      : "bg-white text-slate-700 border-slate-300/90 hover:border-slate-400 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-[#D4E012] animate-ping" : "bg-slate-400"
                    }`}
                  ></span>
                  <span>{site.state}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isSelected
                        ? "bg-[#D4E012] text-black"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {site.mwInstalled}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Mapbox Map Container */}
        <ScrollReveal direction="up" distance={45} delay={0.15}>
          <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
            {/* Sub-header status bar */}
            <div className="w-full flex items-center justify-between mb-3 px-3">
              <span className="text-[11px] font-mono text-[#707B00] uppercase tracking-widest font-bold flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#707B00]" /> PAN-INDIA OPERATIONAL LOCATIONS (INTERACTIVE MAP)
              </span>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#707B00] animate-ping" />
                CLICK ANY STATE MARKER OR TAB TO FILTER
              </span>
            </div>

            {/* Mapbox Map */}
            <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 mb-8">
              <MapboxInteractiveMap
                selectedSiteId={selectedSite?.id}
                onSelectSite={(site) => {
                  if (site) setSelectedSite(site);
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================================= */}
        {/* STATE OPERATIONAL ROSTER DRAWER / LEDGER PANEL */}
        {/* ============================================================= */}
        {selectedSite && (
          <ScrollReveal direction="up" distance={35} delay={0.2}>
            <div id="footprint-roster-table" className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 relative overflow-hidden scroll-mt-24">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4E012]/20 text-slate-900 border border-[#D4E012]/50">
                      {selectedSite.code} • {selectedSite.state.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      DISCOM: <strong className="text-slate-800">{selectedSite.discom}</strong>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                    {selectedSite.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light mt-1 max-w-2xl">
                    {selectedSite.description}
                  </p>
                </div>

                {/* State Capacity Summary Cards */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-lg text-center min-w-[130px]">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                      TOTAL CAPACITY
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[#D4E012]">
                      {selectedSite.mwInstalled}
                    </span>
                  </div>

                  <div className="bg-slate-50 text-slate-900 p-4 rounded-2xl border border-slate-200 text-center min-w-[120px]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                      FACILITIES
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                      {selectedSite.subProjects.length} Sites
                    </span>
                  </div>
                </div>
              </div>

              {/* Table Header Bar Showing All Facilities */}
              <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-extrabold text-[#707B00] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6DAD45]" />
                  ALL OPERATIONAL FACILITIES & CLIENT RECORDS ({selectedSite.subProjects.length})
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Showing All {selectedSite.subProjects.length} Facilities
                </span>
              </div>

              {/* Detailed Projects Roster Table */}
              <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px] font-mono uppercase tracking-wider border-b border-slate-800">
                      <th className="py-3.5 px-4 font-bold">Location / District</th>
                      <th className="py-3.5 px-4 font-bold">Project Scheme</th>
                      <th className="py-3.5 px-4 font-bold">Capacity (MW)</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold">Client Enterprise & Registered Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm bg-white">
                    {selectedSite.subProjects && selectedSite.subProjects.length > 0 ? (
                      selectedSite.subProjects.map((project, idx) => (
                        <tr
                          key={project.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-4 px-4 font-bold text-slate-900 align-top">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono flex items-center justify-center font-bold shrink-0">
                                {idx + 1}
                              </span>
                              <span>{project.location}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-mono font-medium text-slate-700 align-top">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs whitespace-nowrap">
                              {project.scheme}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-extrabold text-slate-900 text-sm align-top whitespace-nowrap">
                            {project.capacityMW}
                          </td>
                          <td className="py-4 px-4 align-top">
                            {getStatusBadge(project.status)}
                          </td>
                          <td className="py-4 px-4 align-top max-w-sm sm:max-w-md lg:max-w-lg">
                            <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-xs sm:text-sm">
                              <Building2 className="w-4 h-4 text-[#707B00] shrink-0" />
                              <span>{project.client}</span>
                            </div>
                            {project.clientAddress && (
                              <div className="mt-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 font-normal leading-relaxed whitespace-normal break-words shadow-2xs">
                                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-slate-400 block mb-0.5">
                                  Registered Address / Location:
                                </span>
                                {project.clientAddress}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-slate-500 font-mono text-xs"
                        >
                          No facilities found matching status filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Section CTA Button */}
        <ScrollReveal direction="up" distance={30} delay={0.25}>
          <div className="mt-12 text-center">
            <Link
              href="/projects#footprint"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
            >
              <span>Explore Regional Hubs & Footprints</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}