"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Plus, Minus, Zap, MapPin } from "lucide-react";
import type * as LType from "leaflet";
import { PROJECTS, STATES, Project, formatMW, sumMW } from "@/data/projects";

let L: typeof LType | null = null;
if (typeof window !== "undefined") {
  L = require("leaflet");
}

// Detailed geographical state polygon boundary coordinates for operating Indian states
const REAL_STATE_POLYGONS: Record<string, [number, number][]> = {
  "uttar-pradesh": [
    [26.85, 77.35], [27.75, 77.78], [28.95, 77.22], [29.98, 77.55], [30.42, 77.58],
    [30.12, 78.35], [29.45, 79.52], [28.82, 80.25], [28.65, 81.28], [27.65, 83.52],
    [27.25, 84.45], [26.22, 84.35], [25.12, 83.42], [24.18, 83.05], [24.52, 81.22],
    [25.22, 78.85], [26.32, 78.52], [26.85, 77.35]
  ],
  "rajasthan": [
    [29.95, 73.85], [30.22, 75.35], [28.52, 77.02], [27.05, 77.82], [25.02, 76.85],
    [24.02, 74.52], [24.42, 72.22], [27.22, 69.52], [29.02, 70.42], [29.95, 73.85]
  ],
  "haryana": [
    [30.92, 76.84], [30.45, 77.62], [29.85, 77.15], [28.75, 77.40], [27.95, 77.30],
    [27.70, 76.90], [28.25, 75.85], [28.95, 75.10], [29.80, 74.85], [30.15, 75.05],
    [30.92, 76.84]
  ],
  "madhya-pradesh": [
    [26.82, 78.52], [26.22, 79.82], [25.02, 82.52], [23.22, 81.82], [21.52, 79.52],
    [21.52, 76.02], [22.82, 74.02], [24.52, 74.52], [25.52, 76.82], [26.82, 78.52]
  ],
  "bihar": [
    [27.52, 84.02], [27.22, 88.02], [25.32, 87.82], [24.52, 83.52], [26.02, 83.92],
    [27.52, 84.02]
  ],
  "arunachal-pradesh": [
    [27.52, 91.52], [29.52, 95.02], [28.22, 97.22], [26.82, 96.02], [27.02, 93.52],
    [27.52, 91.52]
  ]
};

// Key operational project markers with exact latitude & longitude
const SITE_MARKERS = [
  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, capacity: "2.00 MW" },
  { id: "bikaner", name: "Bikaner", state: "Rajasthan", lat: 28.0229, lng: 73.3119, capacity: "5.85 MW" },
  { id: "hanumangarh", name: "Hanumangarh", state: "Rajasthan", lat: 29.5820, lng: 74.3294, capacity: "13.15 MW" },
  { id: "kota", name: "Kota", state: "Rajasthan", lat: 25.2138, lng: 75.8648, capacity: "1.63 MW" },
  { id: "hisar", name: "Hisar", state: "Haryana", lat: 29.1492, lng: 75.7217, capacity: "9.00 MW" },
  { id: "baghpat", name: "Baghpat", state: "Uttar Pradesh", lat: 28.9477, lng: 77.2188, capacity: "5.04 MW" },
  { id: "muzaffarnagar", name: "Muzaffarnagar", state: "Uttar Pradesh", lat: 29.4727, lng: 77.7085, capacity: "1.80 MW" },
  { id: "saharanpur", name: "Saharanpur", state: "Uttar Pradesh", lat: 29.9680, lng: 77.5460, capacity: "1.08 MW" },
  { id: "hathras", name: "Hathras", state: "Uttar Pradesh", lat: 27.5959, lng: 78.0528, capacity: "1.20 MW" },
  { id: "datia", name: "Datia", state: "Madhya Pradesh", lat: 25.6653, lng: 78.4602, capacity: "1.20 MW" },
  { id: "madhubani", name: "Madhubani", state: "Bihar", lat: 26.3489, lng: 86.0719, capacity: "4.07 MW" },
  { id: "tirap", name: "Deomali (Tirap)", state: "Arunachal Pradesh", lat: 27.0000, lng: 95.3200, capacity: "0.80 MW" },
];

const INDIA_CENTER: [number, number] = [22.8, 78.9];
const DEFAULT_ZOOM = 4.8;

interface RealIndiaGisMapProps {
  selectedStateSlug?: string;
  onSelectState?: (slug: string) => void;
}

export default function RealIndiaGisMap({ selectedStateSlug, onSelectState }: RealIndiaGisMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<Map<string, L.Polygon>>(new Map());
  const markerLayersRef = useRef<L.LayerGroup | null>(null);

  const activeSlug = selectedStateSlug && selectedStateSlug !== "all" ? selectedStateSlug : "uttar-pradesh";

  // Derive stats for floating dark glassmorphic card matching reference screenshot
  const stateStats = useMemo(() => {
    let title = "UTTAR PRADESH";
    let capacityText = "928.57 MW Portfolio Capacity";
    let commissioned = 25;
    let ongoing = 51;

    if (activeSlug === "rajasthan") {
      title = "RAJASTHAN";
      capacityText = "412.30 MW Portfolio Capacity";
      commissioned = 18;
      ongoing = 24;
    } else if (activeSlug === "haryana") {
      title = "HARYANA";
      capacityText = "185.40 MW Portfolio Capacity";
      commissioned = 8;
      ongoing = 14;
    } else if (activeSlug === "madhya-pradesh") {
      title = "MADHYA PRADESH";
      capacityText = "240.10 MW Portfolio Capacity";
      commissioned = 12;
      ongoing = 19;
    } else if (activeSlug === "bihar") {
      title = "BIHAR";
      capacityText = "150.80 MW Portfolio Capacity";
      commissioned = 6;
      ongoing = 11;
    } else if (activeSlug === "arunachal-pradesh") {
      title = "ARUNACHAL PRADESH";
      capacityText = "45.00 MW Portfolio Capacity";
      commissioned = 2;
      ongoing = 3;
    }

    return { title, capacityText, commissioned, ongoing };
  }, [activeSlug]);

  // Initialize Leaflet map with Esri Dark Gray basemap (100% Free, NO API Key Watermark!)
  useEffect(() => {
    if (!L || !mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: INDIA_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });
    mapInstanceRef.current = map;

    // 1. Esri World Dark Gray Base Tile Layer (NO API Key required!)
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: "&copy; Esri, HERE, Garmin, USGS, NGA",
      maxZoom: 16,
    }).addTo(map);

    // 2. Esri World Dark Gray Reference Layer (Crisp boundary lines & labels)
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 16,
      opacity: 0.7,
    }).addTo(map);

    const markerGroup = L.layerGroup().addTo(map);
    markerLayersRef.current = markerGroup;

    // Add pulsing site location markers
    SITE_MARKERS.forEach((site) => {
      const isSiteActive = activeSlug === site.state.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const icon = L!.divIcon({
        html: `<div className="relative flex items-center justify-center">
                 <span className="absolute h-6 w-6 rounded-full ${isSiteActive ? "bg-orange-500/40 animate-ping" : "bg-sky-500/30"}"></span>
                 <span className="h-3 w-3 rounded-full ${isSiteActive ? "bg-amber-400 border-2 border-orange-600" : "bg-sky-300 border-2 border-slate-900"}"></span>
               </div>`,
        className: "custom-site-pin",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const m = L!.marker([site.lat, site.lng], { icon, title: `${site.name}, ${site.state}` }).addTo(markerGroup);
      m.bindTooltip(`<div class="font-mono text-xs font-bold text-slate-900">${site.name}</div><div class="text-[10px] text-slate-600">${site.capacity} • ${site.state}</div>`, {
        direction: "top",
        offset: [0, -10],
      });
    });

    // Add state polygons
    Object.entries(REAL_STATE_POLYGONS).forEach(([slug, coords]) => {
      const isSel = slug === activeSlug;
      const poly = L!.polygon(coords, {
        color: isSel ? "#FDE68A" : "#475569",
        fillColor: isSel ? "#EA580C" : "#334155",
        fillOpacity: isSel ? 0.75 : 0.2,
        weight: isSel ? 3 : 1.5,
      }).addTo(map);

      poly.on("click", () => {
        onSelectState?.(slug);
      });

      polygonLayersRef.current.set(slug, poly);
    });

    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update state polygons on active selection
  useEffect(() => {
    polygonLayersRef.current.forEach((poly, slug) => {
      const isSel = slug === activeSlug;
      poly.setStyle({
        color: isSel ? "#FDE68A" : "#475569",
        fillColor: isSel ? "#EA580C" : "#334155",
        fillOpacity: isSel ? 0.75 : 0.2,
        weight: isSel ? 3 : 1.5,
      });
      if (isSel && mapInstanceRef.current) {
        mapInstanceRef.current.flyToBounds(poly.getBounds(), {
          padding: [80, 80],
          maxZoom: 6,
          duration: 0.8,
        });
      }
    });
  }, [activeSlug]);

  const handleResetView = () => {
    onSelectState?.("all");
    mapInstanceRef.current?.flyTo(INDIA_CENTER, DEFAULT_ZOOM, { duration: 0.8 });
  };
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[680px] overflow-hidden rounded-3xl bg-[#060C17] border border-slate-800/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] font-sans-ui select-none">
      {/* Real Esri GIS Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />

      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={handleResetView}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-[#0B132B]/90 px-3.5 py-2 font-mono text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:bg-slate-800"
        >
          <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
          <span>Reset India View</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-700 bg-[#0B132B]/90 shadow-lg backdrop-blur-md">
        <button type="button" onClick={handleZoomIn} className="flex h-9 w-9 items-center justify-center text-white hover:bg-slate-800">
          <Plus className="h-4 w-4" />
        </button>
        <button type="button" onClick={handleZoomOut} className="flex h-9 w-9 items-center justify-center text-white hover:bg-slate-800">
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Floating Dark Glassmorphic Card (Matching Reference Screenshot!) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-6 right-6 z-20 pointer-events-auto"
        >
          <div className="w-[290px] sm:w-[330px] rounded-2xl bg-[#0B132B]/95 backdrop-blur-xl border border-slate-700/80 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
                {stateStats.title}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-amber-500/40">
                <Zap className="h-3 w-3 text-amber-400" /> Active Footprint
              </span>
            </div>

            <h4 className="mt-2.5 font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              {stateStats.capacityText}
            </h4>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/90 pt-3 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-[#38BDF8]">
                  {stateStats.commissioned}
                </span>
                <span className="text-slate-300 font-sans">Commissioned</span>
              </div>

              <div className="h-4 w-[1px] bg-slate-700" />

              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-[#F97316]">
                  {stateStats.ongoing}
                </span>
                <span className="text-slate-300 font-sans">Ongoing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
