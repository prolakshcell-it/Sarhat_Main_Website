"use client";

import { useEffect, useRef } from "react";
import { RotateCcw, Plus, Minus } from "lucide-react";
import type * as LType from "leaflet";
import { MapMarker, formatMW } from "@/data/projects";

let L: typeof LType | null = null;
if (typeof window !== "undefined") {
  L = require("leaflet");
}

interface MapboxInteractiveMapProps {
  /** Markers derived from the project dataset (already filtered by the selected state). */
  markers: MapMarker[];
  selectedKey?: string | null;
  onSelectMarker?: (key: string | null) => void;
}

const INDIA_CENTER: [number, number] = [22.5937, 78.9629];
const MAP_ZOOM = 4.8;

export default function MapboxInteractiveMap({ markers, selectedKey, onSelectMarker }: MapboxInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());
  const onSelectRef = useRef(onSelectMarker);
  useEffect(() => {
    onSelectRef.current = onSelectMarker;
  });

  // Create the map once
  useEffect(() => {
    if (!L || !mapContainerRef.current || mapInstanceRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: INDIA_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });
    mapInstanceRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);

    // Light, low-contrast basemap so the markers (not the terrain) carry the eye
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: "&copy; Esri",
      maxZoom: 16,
    }).addTo(map);

    const timer = setTimeout(() => map.invalidateSize(), 200);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      map.remove();
      mapInstanceRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // (Re)build markers whenever the filtered data changes, then frame them
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;
    layer.clearLayers();
    markerRefs.current.clear();

    markers.forEach((m) => {
      const icon = L!.divIcon({
        html: `<div class="sarhat-marker"><span class="sarhat-marker__pulse"></span><span class="sarhat-marker__dot"><span class="sarhat-marker__core"></span></span></div>`,
        className: "custom-mapbox-marker-container",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const marker = L!.marker([m.lat, m.lng], { icon, keyboard: true, title: `${m.district}, ${m.state}` }).addTo(layer);
      const n = m.projects.length;
      marker.bindTooltip(
        `<div class="sarhat-tooltip__state">${m.district}</div>
         <div class="sarhat-tooltip__mw">${formatMW(m.capacityMW)}</div>
         <div class="sarhat-tooltip__sites">${n} ${n === 1 ? "Site" : "Sites"} • ${m.state}</div>`,
        { direction: "top", offset: [0, -14], opacity: 1, className: "sarhat-tooltip" },
      );
      marker.on("click", () => onSelectRef.current?.(m.key));
      markerRefs.current.set(m.key, marker);
    });

    if (markers.length === 1) {
      map.flyTo([markers[0].lat, markers[0].lng], 8, { duration: 0.8 });
    } else if (markers.length > 1) {
      map.flyToBounds(L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number])), {
        padding: [60, 60],
        maxZoom: 8,
        duration: 0.8,
      });
    } else {
      map.flyTo(INDIA_CENTER, MAP_ZOOM, { duration: 0.8 });
    }
  }, [markers]);

  // Selected-state emphasis (single soft pulse)
  useEffect(() => {
    markerRefs.current.forEach((marker, key) => {
      const el = marker.getElement()?.querySelector<HTMLElement>(".sarhat-marker");
      if (!el) return;
      const isSel = key === selectedKey;
      if (isSel && !el.classList.contains("is-selected")) void el.offsetWidth;
      el.classList.toggle("is-selected", isSel);
    });
  }, [selectedKey, markers]);

  const handleResetView = () => {
    onSelectMarker?.(null);
    mapInstanceRef.current?.flyTo(INDIA_CENTER, MAP_ZOOM, { duration: 0.8 });
  };
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  const ctrl =
    "flex cursor-pointer items-center justify-center border border-slate-200 bg-white/95 text-slate-800 shadow-md backdrop-blur-sm transition-all duration-150 hover:border-[#6DAD45] hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45]";

  return (
    <div className="relative w-full overflow-hidden bg-[#F1F4F2] font-sans-ui select-none">
      {/* Top-left: reset */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 sm:top-4 sm:left-4">
        <button
          type="button"
          onClick={handleResetView}
          aria-label="Reset map view"
          className={`${ctrl} h-10 gap-1.5 rounded-xl px-3.5 text-xs font-bold`}
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-600" />
          <span>Reset View</span>
        </button>
      </div>

      {/* Top-right: zoom */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-md backdrop-blur-sm sm:top-4 sm:right-4">
        <button type="button" onClick={handleZoomIn} aria-label="Zoom in" className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-800 transition-colors hover:bg-[#6DAD45]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6DAD45]">
          <Plus className="h-4 w-4" />
        </button>
        <button type="button" onClick={handleZoomOut} aria-label="Zoom out" className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-800 transition-colors hover:bg-[#6DAD45]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6DAD45]">
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Map canvas */}
      <div
        ref={mapContainerRef}
        className="z-10 h-[340px] w-full cursor-grab active:cursor-grabbing sm:h-[440px] lg:h-[540px]"
      />
    </div>
  );
}
