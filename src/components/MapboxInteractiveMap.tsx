"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Plus, Minus } from "lucide-react";
import type * as LType from "leaflet";

let L: typeof LType | null = null;
if (typeof window !== "undefined") {
  L = require("leaflet");
}

export interface SubProject {
  id: string;
  location: string;
  scheme: string;
  capacityMW: string;
  status: "Completed" | "Ongoing" | "Not Started" | "Active";
  client: string;
  clientAddress?: string;
}

export interface ProjectSite {
  id: string;
  name: string;
  state: string;
  code: string;
  lat: number;
  lng: number;
  mwInstalled: string;
  activeProjects: number;
  completedMW?: string;
  ongoingMW?: string;
  highlightVertical: string;
  discom: string;
  description: string;
  deliverables: string[];
  subProjects: SubProject[];
}

export const projectSites: ProjectSite[] = [
  {
    id: "rj",
    name: "Rajasthan Solar Infrastructure Hub",
    state: "Rajasthan",
    code: "RJ",
    lat: 26.9124,
    lng: 74.7873,
    mwInstalled: "25.03 MW",
    activeProjects: 10,
    completedMW: "15.03 MW (6 Sites)",
    ongoingMW: "7.40 MW (3 Sites)",
    highlightVertical: "PM-KUSUM Component A & C Feeder Solarization",
    discom: "JVVNL / AVVNL / RRECL",
    description: "Comprehensive operational solar footprint across Jodhpur, Bikaner, Hanumangarh & Kota districts.",
    deliverables: ["132kV Substation Evacuation", "PM-KUSUM Component A & C", "High-Irradiance Solar Stringing"],
    subProjects: [
      {
        id: "rj-1",
        location: "Jodhpur",
        scheme: "KUSUM Component A",
        capacityMW: "2.00 MW",
        status: "Completed",
        client: "Solar Suncity",
        clientAddress: "Gori Shankar House, Plot No. 61, Ward No. 24, Bhawani Mandi, Jhalawar, Raj.",
      },
      {
        id: "rj-2",
        location: "Fatehgarh (Hanumangarh)",
        scheme: "KUSUM Component C",
        capacityMW: "3.15 MW",
        status: "Completed",
        client: "Anil Plastic",
        clientAddress: "Gali No-4, Near Deenar Cinema, Hanumangarh Town (Raj.)",
      },
      {
        id: "rj-3",
        location: "Kharbara (Bikaner)",
        scheme: "KUSUM Component C",
        capacityMW: "3.25 MW",
        status: "Completed",
        client: "Suntik New Energy Two Pvt. Ltd.",
        clientAddress: "Khadriya Pass, Ganpat Jewellers, Hanumangarh Town (Raj.)",
      },
      {
        id: "rj-4",
        location: "Genta (Kota)",
        scheme: "KUSUM Component C",
        capacityMW: "1.63 MW",
        status: "Completed",
        client: "Coherence Energy Pvt. Ltd.",
        clientAddress: "Kota, Rajasthan 325004",
      },
      {
        id: "rj-5",
        location: "Karanpura (Hanumangarh)",
        scheme: "KUSUM Component A",
        capacityMW: "2.40 MW",
        status: "Completed",
        client: "Armaan Parisa Solar India Pvt. Ltd.",
        clientAddress: "Village Kutia Kheri, Ghursal, Hisar",
      },
      {
        id: "rj-6",
        location: "Kapoorisar (Bikaner)",
        scheme: "KUSUM Component A",
        capacityMW: "2.60 MW",
        status: "Completed",
        client: "Sunraj Energy Pvt. Ltd.",
        clientAddress: "Ward No.18, Soni Market, Hanumangarh Town",
      },
      {
        id: "rj-7",
        location: "Udasar Chhota (Hanumangarh)",
        scheme: "KUSUM Component A",
        capacityMW: "2.60 MW",
        status: "Ongoing",
        client: "Raj Energy",
        clientAddress: "Ward No.18, Soni Market, Hanumangarh Town",
      },
      {
        id: "rj-8",
        location: "1 NGM (Hanumangarh)",
        scheme: "KUSUM Component A",
        capacityMW: "2.60 MW",
        status: "Not Started",
        client: "Raj Energy",
        clientAddress: "Ward No.18, Soni Market, Hanumangarh Town",
      },
      {
        id: "rj-9",
        location: "Shivdanpura (Hanumangarh)",
        scheme: "KUSUM Component A",
        capacityMW: "2.40 MW",
        status: "Ongoing",
        client: "Shivdanpura Green Energy Power Pvt. Ltd.",
        clientAddress: "Ward No.4, Shivdanpura, Bhadra",
      },
      {
        id: "rj-10",
        location: "Bhirani (Hanumangarh)",
        scheme: "KUSUM Component A",
        capacityMW: "2.40 MW",
        status: "Ongoing",
        client: "Signix Green Power Energy Pvt. Ltd.",
        clientAddress: "Village-Ber, Jhansal",
      },
    ],
  },
  {
    id: "up",
    name: "Uttar Pradesh Feeder & Substation Hub",
    state: "Uttar Pradesh",
    code: "UP",
    lat: 28.6692,
    lng: 77.4538,
    mwInstalled: "9.12 MW",
    activeProjects: 5,
    completedMW: "1.80 MW (1 Site)",
    ongoingMW: "4.68 MW (2 Sites)",
    highlightVertical: "PM-KUSUM Component C Feeder Solarization",
    discom: "PVVNL / UPPCL / UPNEDA",
    description: "Feeder solarization and HT distribution corridor across Baghpat, Muzaffarnagar, Saharanpur & Hathras.",
    deliverables: ["Feeder Solarization", "HT/LT Distribution", "UPPCL Grid Interconnection"],
    subProjects: [
      {
        id: "up-1",
        location: "Budhera (Baghpat)",
        scheme: "KUSUM Component C",
        capacityMW: "3.48 MW",
        status: "Ongoing",
        client: "Kasana Green Energy Pvt. Ltd.",
        clientAddress: "Indraprastha Colony, Loni, Ghaziabad",
      },
      {
        id: "up-2",
        location: "Sarai Rasoolpur (Muzaffarnagar)",
        scheme: "KUSUM Component C",
        capacityMW: "1.80 MW",
        status: "Active",
        client: "Adhana Green Energy Pvt. Ltd.",
        clientAddress: "Indraprastha Colony, Loni, Ghaziabad",
      },
      {
        id: "up-3",
        location: "Raipur (Saharanpur)",
        scheme: "KUSUM Component C",
        capacityMW: "1.08 MW",
        status: "Active",
        client: "Syscon Power Projects Pvt. Ltd.",
        clientAddress: "Kalkaji, New Delhi",
      },
      {
        id: "up-4",
        location: "Mukari (Baghpat)",
        scheme: "KUSUM Component C",
        capacityMW: "1.56 MW",
        status: "Not Started",
        client: "Kasana Green Energy Pvt. Ltd.",
        clientAddress: "Indraprastha Colony, Loni, Ghaziabad",
      },
      {
        id: "up-5",
        location: "Vahanpur (Hathras)",
        scheme: "KUSUM Component C",
        capacityMW: "1.20 MW",
        status: "Ongoing",
        client: "Tarun Kumar Singh",
        clientAddress: "Chandanpura, Thulai, Uttar Pradesh",
      },
    ],
  },
  {
    id: "hr",
    name: "Haryana Feeder Solar Corridor",
    state: "Haryana",
    code: "HR",
    lat: 29.1492,
    lng: 75.7217,
    mwInstalled: "9.00 MW",
    activeProjects: 4,
    completedMW: "4.20 MW (2 Sites)",
    ongoingMW: "4.80 MW (2 Sites)",
    highlightVertical: "PM-KUSUM Component A Solar Projects",
    discom: "DHBVN / HAREDA",
    description: "Feeder solarization projects across Sadalpur and Jandli Khurd in Hisar district.",
    deliverables: ["Substation Corridor", "PM-KUSUM Component A", "DHBVN Grid Evacuation"],
    subProjects: [
      {
        id: "hr-1",
        location: "Sadalpur (Hisar)",
        scheme: "KUSUM Component A",
        capacityMW: "2.40 MW",
        status: "Active",
        client: "Verma Auto Electric Works",
        clientAddress: "College Road, Mandi Adampur, Hisar, Haryana",
      },
      {
        id: "hr-2",
        location: "Jandli Khurd (Hisar)",
        scheme: "KUSUM Component A",
        capacityMW: "2.40 MW",
        status: "Active",
        client: "Verma Auto Electric Works",
        clientAddress: "College Road, Mandi Adampur, Hisar, Haryana",
      },
      {
        id: "hr-3",
        location: "Sadalpur (Hisar)",
        scheme: "KUSUM Component A",
        capacityMW: "1.80 MW",
        status: "Active",
        client: "VAEW Energies Pvt. Ltd.",
        clientAddress: "1st Floor, Verma Auto Electric Works, Mandi Adampur, Hisar",
      },
      {
        id: "hr-4",
        location: "Jandli Khurd (Hisar)",
        scheme: "KUSUM Component A",
        capacityMW: "2.40 MW",
        status: "Active",
        client: "VAEW Energies Pvt. Ltd.",
        clientAddress: "1st Floor, Verma Auto Electric Works, Mandi Adampur, Hisar",
      },
    ],
  },
  {
    id: "br",
    name: "Bihar Agricultural Solar Corridor",
    state: "Bihar",
    code: "BR",
    lat: 26.3533,
    lng: 86.0718,
    mwInstalled: "4.07 MW",
    activeProjects: 3,
    completedMW: "1.05 MW (1 Site)",
    ongoingMW: "1.77 MW (1 Site)",
    highlightVertical: "PM-KUSUM Component C Feeder Solarization",
    discom: "NBPDCL / BREDA",
    description: "PM-KUSUM Component C solar feeder projects across Rahika and Khajauli in Madhubani district.",
    deliverables: ["Feeder Solarization", "BREDA Approvals", "NBPDCL Grid Interconnection"],
    subProjects: [
      {
        id: "br-1",
        location: "Rahika (Madhubani)",
        scheme: "KUSUM Component C",
        capacityMW: "1.05 MW",
        status: "Ongoing",
        client: "Rahul Singh",
        clientAddress: "Mithouli, Jagatpur, Madhubani, Bihar-847213",
      },
      {
        id: "br-2",
        location: "Khajauli (Madhubani)",
        scheme: "KUSUM Component C",
        capacityMW: "1.77 MW",
        status: "Ongoing",
        client: "Aaryan Solar",
        clientAddress: "Khajauli, Madhubani, Bihar",
      },
      {
        id: "br-3",
        location: "Rahika / Khajauli",
        scheme: "KUSUM Component C",
        capacityMW: "1.25 MW",
        status: "Not Started",
        client: "Aaryan Solar",
        clientAddress: "Madhubani, Bihar",
      },
    ],
  },
  {
    id: "mp",
    name: "Madhya Pradesh Solar Hub",
    state: "Madhya Pradesh",
    code: "MP",
    lat: 25.6711,
    lng: 78.4608,
    mwInstalled: "1.20 MW",
    activeProjects: 1,
    completedMW: "1.20 MW (1 Site)",
    ongoingMW: "1.20 MW (1 Site)",
    highlightVertical: "PM-KUSUM Component A",
    discom: "MPMKVVCL / MPPMCL",
    description: "PM-KUSUM Component A solar installation in Udganwa, Datia district.",
    deliverables: ["PM-KUSUM Component A", "Grid Evacuation Bay", "MPMKVVCL Approvals"],
    subProjects: [
      {
        id: "mp-1",
        location: "Udganwa (Datia)",
        scheme: "KUSUM Component A",
        capacityMW: "1.20 MW",
        status: "Ongoing",
        client: "Sarita Agrawal",
        clientAddress: "Datia, Madhya Pradesh",
      },
    ],
  },
  {
    id: "ar",
    name: "Arunachal Hydro-Solar Infrastructure",
    state: "Arunachal Pradesh",
    code: "AR",
    lat: 27.0844,
    lng: 95.5000,
    mwInstalled: "0.80 MW",
    activeProjects: 1,
    completedMW: "0.80 MW (1 Site)",
    ongoingMW: "0.00 MW",
    highlightVertical: "Govt. Scheme – Utility Solar",
    discom: "APDCL / APEDA",
    description: "Government utility scheme solar power installation in Deomali, Tirap district.",
    deliverables: ["Frontier Solar Array", "Utility Substation Interconnection", "APEDA Approvals"],
    subProjects: [
      {
        id: "ar-1",
        location: "Deomali (Tirap)",
        scheme: "Govt. Scheme – Utility",
        capacityMW: "0.80 MW",
        status: "Completed",
        client: "Kashyap & Co",
        clientAddress: "Arjun Tower, Chirwapatty Road, Tinsukia-786125",
      },
    ],
  },
  {
    id: "gj",
    name: "Gujarat Industrial & Utility Hub",
    state: "Gujarat",
    code: "GJ",
    lat: 21.1702,
    lng: 72.8311,
    mwInstalled: "12.50 MW",
    activeProjects: 3,
    highlightVertical: "Coastal Substation & C&I Open Access",
    discom: "GETCO / DGVCL",
    description: "Coastal anti-corrosion solar mounting structures and GETCO industrial grid evacuation.",
    deliverables: ["GETCO Bay Clearance", "C5-M Structural Coating", "C&I Group Captive PPA"],
    subProjects: [
      {
        id: "gj-1",
        location: "Hazira (Surat)",
        scheme: "C&I Open Access",
        capacityMW: "5.00 MW",
        status: "Completed",
        client: "Industrial Group Captive",
        clientAddress: "Hazira Industrial Belt, Surat",
      },
      {
        id: "gj-2",
        location: "Vapi Industrial Zone",
        scheme: "GETCO Interconnection",
        capacityMW: "4.50 MW",
        status: "Completed",
        client: "Commercial Enterprise",
        clientAddress: "GIDC Industrial Estate, Vapi",
      },
      {
        id: "gj-3",
        location: "Ankleshwar",
        scheme: "Solar Rooftop Array",
        capacityMW: "3.00 MW",
        status: "Ongoing",
        client: "Chemical Corp Ltd.",
        clientAddress: "Ankleshwar, Gujarat",
      },
    ],
  },
  {
    id: "mh",
    name: "Maharashtra C&I Solar Corridor",
    state: "Maharashtra",
    code: "MH",
    lat: 19.1860,
    lng: 72.9754,
    mwInstalled: "9.40 MW",
    activeProjects: 3,
    highlightVertical: "C&I Group Captive & HT Lines",
    discom: "MSEDCL",
    description: "High-voltage C&I group captive solar arrays and HT evacuation line corridors.",
    deliverables: ["MSEDCL Open Access", "HT Evacuation Line", "Transformer Bay"],
    subProjects: [
      {
        id: "mh-1",
        location: "Thane Industrial Corridor",
        scheme: "C&I Group Captive",
        capacityMW: "4.20 MW",
        status: "Completed",
        client: "Logistics & Industrial Park",
        clientAddress: "Thane West, Maharashtra",
      },
      {
        id: "mh-2",
        location: "Chakan (Pune)",
        scheme: "HT Substation Line",
        capacityMW: "3.00 MW",
        status: "Ongoing",
        client: "Auto Components India",
        clientAddress: "Chakan Industrial Zone, Pune",
      },
      {
        id: "mh-3",
        location: "Nagpur SEZ",
        scheme: "Commercial Rooftop",
        capacityMW: "2.20 MW",
        status: "Completed",
        client: "Warehouse Hub Ltd.",
        clientAddress: "MIHAN SEZ, Nagpur",
      },
    ],
  },
  {
    id: "ka",
    name: "Karnataka Solar Park Hub",
    state: "Karnataka",
    code: "KA",
    lat: 13.3400,
    lng: 77.1000,
    mwInstalled: "14.20 MW",
    activeProjects: 3,
    highlightVertical: "Utility Solar & Substation Automation",
    discom: "KPTCL / BESCOM",
    description: "Utility scale solar park stringing and KPTCL grid bay clearances.",
    deliverables: ["KPTCL Substation Bay", "Utility Solar Arrays", "SCADA Monitoring"],
    subProjects: [
      {
        id: "ka-1",
        location: "Tumakuru Solar Park",
        scheme: "Utility Solar Park",
        capacityMW: "8.00 MW",
        status: "Completed",
        client: "IPP Clean Energy Developer",
        clientAddress: "Pavagada Region, Tumakuru",
      },
      {
        id: "ka-2",
        location: "Bengaluru Rural",
        scheme: "Commercial Rooftop",
        capacityMW: "3.20 MW",
        status: "Completed",
        client: "Technology Park Corp",
        clientAddress: "Electronic City, Bengaluru",
      },
      {
        id: "ka-3",
        location: "Chitradurga",
        scheme: "Feeder Solarization",
        capacityMW: "3.00 MW",
        status: "Ongoing",
        client: "Agri Feeder Co-op",
        clientAddress: "Chitradurga, Karnataka",
      },
    ],
  },
  {
    id: "tn",
    name: "Tamil Nadu Hybrid Infrastructure",
    state: "Tamil Nadu",
    code: "TN",
    lat: 13.0827,
    lng: 80.2707,
    mwInstalled: "11.60 MW",
    activeProjects: 3,
    highlightVertical: "Wind-Solar Hybrid & BESS",
    discom: "TANGEDCO",
    description: "Hybrid clean energy generation and containerized peak load storage.",
    deliverables: ["Hybrid Evacuation", "TANGEDCO Grid PPA", "BESS Peak Storage"],
    subProjects: [
      {
        id: "tn-1",
        location: "Coimbatore Industrial Park",
        scheme: "Industrial Solar EPC",
        capacityMW: "5.00 MW",
        status: "Completed",
        client: "Textile Mill Enterprise",
        clientAddress: "Coimbatore Industrial Area",
      },
      {
        id: "tn-2",
        location: "Tirunelveli",
        scheme: "Wind-Solar Hybrid",
        capacityMW: "4.20 MW",
        status: "Ongoing",
        client: "Clean Energy IPP",
        clientAddress: "Tirunelveli District",
      },
      {
        id: "tn-3",
        location: "Chennai Port Terminal",
        scheme: "C&I Solar Microgrid",
        capacityMW: "2.40 MW",
        status: "Completed",
        client: "Port Logistics Infrastructure",
        clientAddress: "Chennai Port Zone",
      },
    ],
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
    if (!L || !mapContainerRef.current || mapInstanceRef.current) return;

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
        <div class="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 min-w-[280px] max-w-[320px] font-sans text-left">
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

          <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800">
            <span>DISCOM: <strong class="text-white">${site.discom}</strong></span>
            <span>${site.activeProjects} Facilities</span>
          </div>

          <div class="mt-2 pt-2 border-t border-slate-800 text-center">
            <p class="text-[10px] font-mono text-slate-300 font-medium mb-2">
              ${site.subProjects.length} Facilities & Solar Parks in ${site.state}
            </p>
            <button
              onclick="const el = document.getElementById('footprint-roster-table'); if(el) el.scrollIntoView({behavior:'smooth'});"
              class="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-mono font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <span>View More (${site.subProjects.length} Facilities)</span>
              <span>&rarr;</span>
            </button>
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
