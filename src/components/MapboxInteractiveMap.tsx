"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Plus, Minus } from "lucide-react";
import L from "leaflet";

export interface ProjectSite {
  id: string;
  name: string;
  state: string;
  code: string;
  lat: number;
  lng: number;
  mwInstalled: string;
  activeProjects: number;
  highlightVertical: string;
  discom: string;
  description: string;
  deliverables: string[];
}

export const projectSites: ProjectSite[] = [
  {
    id: "up-ghaziabad",
    name: "Purvanchal & Western UP",
    state: "Uttar Pradesh",
    code: "UP",
    lat: 26.8467,
    lng: 80.9462,
    mwInstalled: "32.7 MW",
    activeProjects: 13,
    highlightVertical: "Solar EPC & 132kV Substation",
    discom: "UPPCL / UPNEDA",
    description: "Core operating footprint for utility solar EPC, DISCOM substations, and Purvanchal feeder solarization.",
    deliverables: ["132kV Substation Bay", "Solar Park Stringing", "UPNEDA Grid Clearances"],
  },
  {
    id: "up-ncr",
    name: "NCR Infrastructure Hub",
    state: "Uttar Pradesh",
    code: "UP-NCR",
    lat: 28.6692,
    lng: 77.4538,
    mwInstalled: "12.0 MW",
    activeProjects: 4,
    highlightVertical: "C&I Rooftop & Substation SLD",
    discom: "PVVNL / UPPCL",
    description: "Corporate EPC engineering headquarters & industrial solar installations.",
    deliverables: ["C&I Rooftop Arrays", "HT/LT Distribution", "Grid Synchronization"],
  },
  {
    id: "up-bdk",
    name: "Bundelkhand Feeder Solar",
    state: "Uttar Pradesh",
    code: "UP-BDK",
    lat: 25.4484,
    lng: 78.5685,
    mwInstalled: "10.5 MW",
    activeProjects: 3,
    highlightVertical: "PM-KUSUM Feeder Solarization",
    discom: "MVVNL",
    description: "High-temperature resilient solar tracking arrays & agricultural feeder solarization.",
    deliverables: ["Feeder Solarization", "Ground Mount Solar", "CEIG Clearance"],
  },
  {
    id: "rj-bhadla",
    name: "Thar Desert Solar Park",
    state: "Rajasthan",
    code: "RJ",
    lat: 27.5330,
    lng: 71.9167,
    mwInstalled: "16.0 MW",
    activeProjects: 6,
    highlightVertical: "Utility Solar & BESS Storage",
    discom: "RRECL / JVVNL",
    description: "High-irradiance solar parks and containerized BESS storage arrays in Thar desert corridor.",
    deliverables: ["High-Irradiance Arrays", "Containerized BESS", "Open Access PPA"],
  },
  {
    id: "rj-jaipur",
    name: "Jaipur Grid Substation Corridor",
    state: "Rajasthan",
    code: "RJ-JPR",
    lat: 26.9124,
    lng: 75.7873,
    mwInstalled: "8.2 MW",
    activeProjects: 3,
    highlightVertical: "33kV Bay Interconnection",
    discom: "JVVNL",
    description: "Utility grid evacuation corridors and AIS substation transformer bays.",
    deliverables: ["33kV Substation Bay", "Relay Protection Panel", "SCADA Integration"],
  },
  {
    id: "gj-hazira",
    name: "Coastal GETCO Substation",
    state: "Gujarat",
    code: "GJ",
    lat: 21.1702,
    lng: 72.8311,
    mwInstalled: "12.5 MW",
    activeProjects: 5,
    highlightVertical: "Coastal Substation & C&I Open Access",
    discom: "GETCO / DGVCL",
    description: "Coastal anti-corrosion solar mounting structures and GETCO industrial grid evacuation.",
    deliverables: ["GETCO Bay Clearance", "C5-M Structural Coating", "C&I Group Captive PPA"],
  },
  {
    id: "mh-mumbai",
    name: "Thane Industrial Solar Corridor",
    state: "Maharashtra",
    code: "MH",
    lat: 19.1860,
    lng: 72.9754,
    mwInstalled: "9.4 MW",
    activeProjects: 4,
    highlightVertical: "C&I Group Captive & HT Lines",
    discom: "MSEDCL",
    description: "High-voltage C&I group captive solar arrays and HT evacuation line corridors.",
    deliverables: ["MSEDCL Open Access", "HT Evacuation Line", "Transformer Bay"],
  },
  {
    id: "mp-indore",
    name: "Central Agrivoltaics Corridor",
    state: "Madhya Pradesh",
    code: "MP",
    lat: 22.7196,
    lng: 75.8577,
    mwInstalled: "12.4 MW",
    activeProjects: 5,
    highlightVertical: "Agrivoltaics & Grid Evacuation",
    discom: "MPMKVVCL / MPPMCL",
    description: "Central India utility solar installations and substation corridors.",
    deliverables: ["Substation Corridor", "PM-KUSUM Feeder", "Ground Mount Solar"],
  },
  {
    id: "tg-hyd",
    name: "Deccan Substation Corridor",
    state: "Telangana",
    code: "TG",
    lat: 17.3850,
    lng: 78.4867,
    mwInstalled: "7.8 MW",
    activeProjects: 3,
    highlightVertical: "Utility Substation & Protection",
    discom: "TSSPDCL",
    description: "High-voltage GIS switchgear and grid interconnect bays.",
    deliverables: ["GIS Switchgear", "TSSPDCL Clearance", "Protection Relays"],
  },
  {
    id: "ka-blr",
    name: "Tumakuru Solar Park Hub",
    state: "Karnataka",
    code: "KA",
    lat: 13.3400,
    lng: 77.1000,
    mwInstalled: "14.2 MW",
    activeProjects: 5,
    highlightVertical: "Utility Solar & Substation Automation",
    discom: "KPTCL / BESCOM",
    description: "Utility scale solar park stringing and KPTCL grid bay clearances.",
    deliverables: ["KPTCL Substation Bay", "Utility Solar Arrays", "SCADA Monitoring"],
  },
  {
    id: "tn-chennai",
    name: "Coastal Wind-Solar Hybrid",
    state: "Tamil Nadu",
    code: "TN",
    lat: 13.0827,
    lng: 80.2707,
    mwInstalled: "11.6 MW",
    activeProjects: 4,
    highlightVertical: "Wind-Solar Hybrid & BESS",
    discom: "TANGEDCO",
    description: "Hybrid clean energy generation and containerized peak load storage.",
    deliverables: ["Hybrid Evacuation", "TANGEDCO Grid PPA", "BESS Peak Storage"],
  },
  {
    id: "br-patna",
    name: "Purvanchal Feeder Solar",
    state: "Bihar",
    code: "BR",
    lat: 25.5941,
    lng: 85.1376,
    mwInstalled: "8.5 MW",
    activeProjects: 4,
    highlightVertical: "PM-KUSUM & Civil Infrastructure",
    discom: "NBPDCL / BREDA",
    description: "Feeder solarization and mountain access civil engineering.",
    deliverables: ["Feeder Solarization", "Access Infrastructure", "BREDA Approvals"],
  },
  {
    id: "skm-gangtok",
    name: "Sikkim Mountain Terrain",
    state: "Sikkim",
    code: "SKM",
    lat: 27.3389,
    lng: 88.6065,
    mwInstalled: "3.5 MW",
    activeProjects: 2,
    highlightVertical: "Mountain Access Civil Engineering",
    discom: "Sikkim Power Dept",
    description: "Slope stabilization and high-altitude weather resistant MMS foundations.",
    deliverables: ["Slope MMS Foundations", "Micro-Grid Inverters", "State Power Approval"],
  },
  {
    id: "ar-itanagar",
    name: "Frontier Grid Substation",
    state: "Arunachal Pradesh",
    code: "AR",
    lat: 27.0844,
    lng: 93.6053,
    mwInstalled: "6.2 MW",
    activeProjects: 3,
    highlightVertical: "Frontier Solar & Substation",
    discom: "APDCL / APEDA",
    description: "Specialized terrain civil engineering and power evacuation.",
    deliverables: ["Terrain MMS Foundations", "Substation Evacuation", "APEDA Clearances"],
  },
];

interface MapboxInteractiveMapProps {
  onSelectSite?: (site: ProjectSite | null) => void;
  selectedSiteId?: string | null;
}

export default function MapboxInteractiveMap({ onSelectSite, selectedSiteId }: MapboxInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const [activeSite, setActiveSite] = useState<ProjectSite | null>(null);

  // Default Map center over India in 2D View
  const INDIA_CENTER: [number, number] = [22.5937, 78.9629];
  const MAP_ZOOM = 4.8;

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet Map instance with 2D Flat view, grab cursor & touchpad zoom enabled
    const map = L.map(mapContainerRef.current, {
      center: INDIA_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: false,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    mapInstanceRef.current = map;

    // High-Resolution Esri World Topo Map Tiles (100% Free - Zero Web Worker & Zero API Key Errors)
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; Mapbox &copy; OpenStreetMap &copy; Esri',
      maxZoom: 18,
    }).addTo(map);

    // Add glowing Mapbox yellow solar sun markers
    projectSites.forEach((site) => {
      const markerHtml = `
        <div class="mapbox-solar-marker group relative cursor-pointer" data-site-id="${site.id}">
          <div class="absolute -inset-2.5 rounded-full bg-[#EAB308]/40 animate-ping opacity-75 pointer-events-none"></div>
          <div class="relative w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-[#EAB308] via-[#FACC15] to-[#FEF08A] border-2 border-white shadow-2xl flex items-center justify-center transition-transform transform group-hover:scale-130">
            <svg class="w-4.5 h-4.5 text-slate-900 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="4" fill="#000000" fill-opacity="0.15"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 10H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636"/>
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: "custom-mapbox-marker-container",
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const popupHtml = `
        <div class="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 min-w-[260px] max-w-[290px] font-sans text-left">
          <div class="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
            <span class="text-[10px] font-mono font-bold text-[#D4E012] uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#D4E012] animate-ping inline-block"></span>
              ${site.code} • ${site.state}
            </span>
            <span class="bg-[#D4E012] text-black font-mono font-extrabold text-[10px] px-2 py-0.5 rounded shadow-sm">
              ${site.mwInstalled}
            </span>
          </div>

          <h4 class="text-sm font-bold text-white mb-1 leading-snug">
            ${site.name}
          </h4>

          <p class="text-[11px] text-slate-300 leading-snug mb-3">
            ${site.description}
          </p>

          <div class="space-y-1.5 pt-2 border-t border-slate-800 text-[10px] font-mono">
            <div class="flex justify-between">
              <span class="text-slate-400">ACTIVE SITES:</span>
              <span class="text-white font-bold">${site.activeProjects} Facilities</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">DISCOM UTILITY:</span>
              <span class="text-[#D4E012] font-bold">${site.discom}</span>
            </div>
          </div>

          <div class="mt-3 pt-2 border-t border-slate-800 space-y-1">
            <div class="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-bold">Key Infrastructure Delivered:</div>
            ${site.deliverables.map(d => `<div class="flex items-center gap-1.5 text-[10px] text-slate-200"><span class="text-[#5EE72D] font-bold">✓</span><span>${d}</span></div>`).join('')}
          </div>
        </div>
      `;

      const marker = L.marker([site.lat, site.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(popupHtml, {
        offset: [0, -12],
        closeButton: true,
      });

      marker.on("click", () => {
        handleSiteSelect(site);
      });

      markersRef.current.set(site.id, marker);
    });

    // Invalidate map size after mount and resize to guarantee perfect full canvas rendering
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle selecting site - fly smoothly to site location in 2D View and open point popup
  const handleSiteSelect = (site: ProjectSite) => {
    setActiveSite(site);
    if (onSelectSite) onSelectSite(site);

    const map = mapInstanceRef.current;
    const marker = markersRef.current.get(site.id);

    if (map) {
      map.flyTo([site.lat, site.lng], 7, {
        duration: 1.2,
      });
    }

    if (marker) {
      marker.openPopup();
    }
  };

  // Reset view button handler - returns to 2D India View
  const handleResetView = () => {
    setActiveSite(null);
    if (onSelectSite) onSelectSite(null);

    const map = mapInstanceRef.current;
    if (map) {
      map.closePopup();
      map.flyTo(INDIA_CENTER, MAP_ZOOM, {
        duration: 1.2,
      });
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/90 bg-[#E5E9EC] shadow-2xl font-sans-ui select-none">
      {/* Top Mapbox Controls Bar */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2">
        {/* Reset View Button matching Mapbox UI in screenshot */}
        <button
          onClick={handleResetView}
          className="bg-white/95 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-300 shadow-md flex items-center gap-1.5 hover:bg-white transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
          <span>Reset View</span>
        </button>
      </div>

      {/* Top Right Zoom Controls matching Mapbox UI in screenshot */}
      <div className="absolute top-4 right-4 z-[400] bg-white/95 border border-slate-300 rounded-xl shadow-md flex flex-col divide-y divide-slate-200 overflow-hidden backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          className="w-8.5 h-8.5 flex items-center justify-center text-slate-800 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8.5 h-8.5 flex items-center justify-center text-slate-800 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Map Canvas Window with Grab Hand Cursor */}
      <div
        ref={mapContainerRef}
        className="w-full h-[580px] sm:h-[680px] lg:h-[750px] z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Left Mapbox Brand Logo matching screenshot */}
      <div className="absolute bottom-3 left-3 z-[400] flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-300/80 shadow-sm pointer-events-none">
        <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="text-xs font-black text-slate-900 tracking-tight font-sans">
          mapbox
        </span>
      </div>

      {/* Bottom Right Mapbox Attribution matching screenshot */}
      <div className="absolute bottom-3 right-3 z-[400] text-[9px] font-mono text-slate-600 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded border border-slate-300/60 shadow-sm pointer-events-none">
        &copy; Mapbox &copy; OpenStreetMap Improve this map
      </div>
    </div>
  );
}
