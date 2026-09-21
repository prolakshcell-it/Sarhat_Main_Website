"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, Zap, ArrowRight, ShieldCheck, ExternalLink, Building2 } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { stateProjectsData, StateProjectData } from "@/data/stateProjects";

export default function FootprintMap() {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState<string>("uttar-pradesh");
  const [hoveredState, setHoveredState] = useState<StateProjectData | null>(null);

  const activeState = stateProjectsData.find((s) => s.slug === selectedSlug) || stateProjectsData[0];

  const handleStateClick = (slug: string) => {
    setSelectedSlug(slug);
    // Smooth redirect to state page when requested or view details directly
    router.push(`/projects/${slug}`);
  };

  return (
    <section
      id="footprint"
      className="py-24 sm:py-28 bg-[#030908] relative z-10 border-b border-white/10 select-none overflow-hidden font-sans-ui"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-[11px] font-bold text-[#5EE72D] uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
              PAN-INDIA FOOTPRINT & REGIONAL PROJECTS
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-white leading-tight mb-4">
              Built Across India. <br />
              <span className="text-[#5EE72D] italic font-serif-display font-medium">
                State-by-State Execution Hubs.
              </span>
            </h2>

            <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
              Click any state marker on the map to explore regional solar parks, grid substations, BESS storage reserves, and state DISCOM interconnections.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Interactive Map & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: Tactical Vector India Map Container */}
          <div className="lg:col-span-7 relative">
            <div className="bg-[#060D0B] border border-[#5EE72D]/30 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
              {/* Map Sub-Header */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5EE72D]">
                  <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-pulse"></span>
                  <span className="font-bold uppercase tracking-wider">GEOGRAPHICAL SITE RADAR</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  CLICK STATE TO OPEN PORTFOLIO
                </span>
              </div>

              {/* Vector Map Canvas Container */}
              <div className="relative w-full aspect-[4/3.8] max-h-[540px] rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
                {/* Background India Map Base Graphic */}
                <Image
                  src="/images/india-map-tactical.jpg"
                  alt="Sarhat Pan-India Execution Footprint Map"
                  fill
                  priority
                  className="object-contain opacity-75 group-hover:scale-[1.01] transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                {/* Pulsing Interconnection Network SVG Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 800" preserveAspectRatio="none">
                  {/* Glowing SVG Connection Arcs Between Hubs */}
                  <path d="M 470 370 L 260 370 L 220 480 L 370 520 L 470 370" fill="none" stroke="#5EE72D" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
                  <path d="M 470 370 L 320 700" fill="none" stroke="#5EE72D" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
                </svg>

                {/* Interactive State Pin Markers */}
                {stateProjectsData.map((st) => {
                  const isSelected = st.slug === selectedSlug;
                  const isHovered = hoveredState?.slug === st.slug;

                  return (
                    <div
                      key={st.slug}
                      style={{ top: st.mapCoords.top, left: st.mapCoords.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group/pin"
                      onClick={() => handleStateClick(st.slug)}
                      onMouseEnter={() => setHoveredState(st)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      {/* Pulse Ring */}
                      <div className={`absolute -inset-3 rounded-full transition-all duration-300 ${isSelected ? "bg-[#5EE72D]/30 animate-ping" : "bg-[#5EE72D]/10 group-hover/pin:scale-125"}`}></div>

                      {/* Pin Node */}
                      <div className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-xl ${
                        isSelected
                          ? "bg-[#5EE72D] text-black border-[#5EE72D] font-extrabold scale-110 shadow-[0_0_20px_rgba(94,231,45,0.8)]"
                          : "bg-black/90 text-white border-[#5EE72D]/60 hover:border-[#5EE72D] hover:bg-black"
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-[#5EE72D]"}`} />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                          {st.code} ({st.mwInstalled})
                        </span>
                      </div>

                      {/* Tooltip on Hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black/95 border border-[#5EE72D]/50 rounded-xl p-3 shadow-2xl backdrop-blur-xl z-50 pointer-events-none"
                          >
                            <div className="text-xs font-bold text-white uppercase font-mono">{st.name}</div>
                            <div className="text-[10px] text-[#5EE72D] font-mono font-semibold mt-0.5">{st.mwInstalled} • {st.projects.length} Projects</div>
                            <div className="text-[9px] text-zinc-400 mt-1 line-clamp-2">{st.discom}</div>
                            <div className="text-[8px] text-zinc-500 font-mono mt-1 text-right">Click to view portfolio →</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Selected State Portfolio Detail Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A0E0A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-[#5EE72D] uppercase tracking-widest font-bold">
                  SELECTED REGIONAL FOOTPRINT
                </span>
                <span className="text-xs font-mono text-zinc-400 font-bold bg-white/5 px-2.5 py-1 rounded-full">
                  {activeState.code}
                </span>
              </div>

              <h3 className="text-3xl font-serif-display font-medium text-white mb-2">
                {activeState.name}
              </h3>
              <p className="text-xs text-[#5EE72D] font-mono mb-4 font-semibold">
                📍 {activeState.region}
              </p>
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-6">
                {activeState.summary}
              </p>

              {/* State Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5">
                  <div className="text-xl font-mono font-extrabold text-[#5EE72D]">
                    {activeState.mwInstalled}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">
                    Installed Solar & Storage
                  </div>
                </div>

                <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5">
                  <div className="text-xl font-mono font-extrabold text-white">
                    {activeState.projects.length} Projects
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">
                    Delivered & Active
                  </div>
                </div>
              </div>

              {/* Discom Info */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  Nodal DISCOM & Grid Corridors:
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  {activeState.discom}
                </div>
              </div>

              {/* Deliverable Projects Preview */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Regional Project Deliverables:
                </span>
                {activeState.projects.slice(0, 2).map((p) => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{p.title}</div>
                      <div className="text-[10px] text-zinc-400">{p.location} • {p.capacity}</div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#5EE72D] bg-[#5EE72D]/10 px-2 py-0.5 rounded-full">
                      {p.vertical}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Redirect Button to State Page */}
              <button
                onClick={() => router.push(`/projects/${activeState.slug}`)}
                className="w-full bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-2xl transition-all shadow-xl shadow-[#5EE72D]/20 flex items-center justify-center gap-2 group"
              >
                <span>View Full {activeState.name} Portfolio Page</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* State Selection Button Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-mono text-zinc-400 uppercase">Select State:</span>
          {stateProjectsData.map((st) => (
            <button
              key={st.slug}
              onClick={() => setSelectedSlug(st.slug)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedSlug === st.slug
                  ? "bg-[#5EE72D] text-black border-[#5EE72D] font-extrabold"
                  : "bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30"
              }`}
            >
              {st.name} ({st.code})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
