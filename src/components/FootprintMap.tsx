"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Compass, Building2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { ProjectSite } from "./MapboxInteractiveMap";

// Dynamically import MapboxInteractiveMap with SSR disabled to prevent Leaflet window SSR errors
const MapboxInteractiveMap = dynamic(() => import("./MapboxInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[550px] sm:h-[620px] rounded-3xl bg-slate-200/80 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs">
      Loading Interactive Mapbox Map...
    </div>
  ),
});

export default function FootprintMap() {
  const [selectedSite, setSelectedSite] = useState<ProjectSite | null>(null);

  return (
    <section
      id="footprint"
      className="py-24 sm:py-28 bg-[#F8FAF8] text-[#0F172A] relative z-10 border-b border-slate-200/80 select-none overflow-hidden font-sans-ui"
    >
      {/* Soft Ambient Porcelain Flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#707B00]/30 text-[11px] font-bold text-[#707B00] uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#707B00] animate-ping"></span>
              PAN-INDIA OPERATIONAL FOOTPRINT
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-slate-900 leading-tight mb-4">
              Built across India. <br />
              <span className="bg-gradient-to-r from-[#707B00] via-[#5EE72D] to-[#16A34A] bg-clip-text text-transparent italic font-serif-display font-medium">
                Core Operating Footprint.
              </span>
            </h2>

            <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
              Explore Sarhat&apos;s active solar EPC projects, DISCOM substation corridors, and renewable infrastructure across key operating states.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Mapbox Map Container */}
        <ScrollReveal direction="up" distance={45} delay={0.15}>
          <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
            {/* Sub-header status bar */}
            <div className="w-full flex items-center justify-between mb-4 px-3">
              <span className="text-[11px] font-mono text-[#707B00] uppercase tracking-widest font-bold flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#707B00]" /> PAN-INDIA OPERATIONAL LOCATIONS (MAPBOX CANVAS)
              </span>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#707B00] animate-ping" />
                CLICK ANY SOLAR MARKER TO VIEW DETAILS
              </span>
            </div>

            {/* Mapbox Map */}
            <div className="w-full relative">
              <MapboxInteractiveMap
                selectedSiteId={selectedSite?.id}
                onSelectSite={(site) => setSelectedSite(site)}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}