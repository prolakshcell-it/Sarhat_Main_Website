/**
 * Single source of truth for the Core Operating Footprint section.
 * Rows are transcribed 1:1 from the Sarhat project sheet
 * (Status | State | Location | Project Type / Scheme | Capacity (MW) | Client Details).
 * Everything shown in the UI (state chips, totals, counts, markers, cards) is derived from PROJECT_ROWS.
 */

export interface ProjectRow {
  status: string;
  state: string;
  location: string;
  scheme: string;
  capacityMW: number;
  clientDetails: string;
}

export const PROJECT_ROWS: ProjectRow[] = [
  { status: "Completed", state: "Rajasthan", location: "Jodhpur", scheme: "KUSUM Component A", capacityMW: 2, clientDetails: "Solar Suncity | Address: GORI SHANKAR HOUSE, PLOT NO. 61, WARD NO. 24, TAGAR MOHALLA, BHAWANI MANDI, DIST JHALAWAR, RAJASTHAN-326502" },
  { status: "Completed", state: "Arunachal Pradesh", location: "Deomali (Tirap)", scheme: "Govt. Scheme – Utility", capacityMW: 0.8, clientDetails: "KASHYAP & CO | 2nd Floor, Arjun Tower, Above HDFC Bank, Chirwapatty Road, Tinsukia-786125" },
  { status: "Completed", state: "Rajasthan", location: "Fatehgarh (Hanumangarh)", scheme: "KUSUM – Component C", capacityMW: 3.15, clientDetails: "Anil Plastic | Gali No-4, Near Deenar Cinema, Hanumangarh Town (Raj.)" },
  { status: "Completed", state: "Rajasthan", location: "Kharbara (Bikaner)", scheme: "KUSUM – Component C", capacityMW: 3.25, clientDetails: "SUNTIK NEW ENERGY TWO PRIVATE LIMITED | C/O Anil Kumar, Khadriya Pass, Ganpat Jewellers, Hanumangarh Town (Raj.)" },
  { status: "Completed", state: "Rajasthan", location: "Genta (Kota)", scheme: "KUSUM Component C", capacityMW: 1.63, clientDetails: "COHERENCE ENERGY PRIVATE LIMITED | Kota, Rajasthan 325004" },
  { status: "Completed", state: "Rajasthan", location: "Karanpura (Hanumangarh)", scheme: "KUSUM Component A", capacityMW: 2.4, clientDetails: "ARMAAN PARISA SOLAR INDIA PVT. LTD. | C/O Rajender Singh, Village Kutia Kheri, Ghursal, Hisar-125052" },
  { status: "NA", state: "Haryana", location: "Sadalpur (Hisar)", scheme: "KUSUM Component A", capacityMW: 2.4, clientDetails: "VERMA AUTO ELECTRIC WORKS | College Road, Mandi Adampur, Hisar, Haryana" },
  { status: "NA", state: "Haryana", location: "Jandli Khurd (Hisar)", scheme: "KUSUM – Component A", capacityMW: 2.4, clientDetails: "VERMA AUTO ELECTRIC WORKS | College Road, Mandi Adampur, Hisar, Haryana" },
  { status: "NA", state: "Haryana", location: "Sadalpur (Hisar)", scheme: "KUSUM – Component A", capacityMW: 1.8, clientDetails: "VAEW ENERGIES PVT. LTD. | 1st Floor, Verma Auto Electric Works, Near Kranti Chowk, Mandi Adampur, Hisar" },
  { status: "NA", state: "Haryana", location: "Jandli Khurd (Hisar)", scheme: "KUSUM – Component A", capacityMW: 2.4, clientDetails: "VAEW ENERGIES PVT. LTD. | 1st Floor, Verma Auto Electric Works, Near Kranti Chowk, Mandi Adampur, Hisar" },
  { status: "Completed", state: "Rajasthan", location: "Kapoorisar (Bikaner)", scheme: "KUSUM Component A", capacityMW: 2.6, clientDetails: "SUNRAJ ENERGY PVT. LTD. | Second Floor, Ward No.18, Soni Market, Hanumangarh Town" },
  { status: "Ongoing", state: "Rajasthan", location: "Udasar Chhota (Hanumangarh)", scheme: "KUSUM Component A", capacityMW: 2.6, clientDetails: "RAJ ENERGY | First Floor, Ward No.18, Soni Market, Hanumangarh Town" },
  { status: "Not Started", state: "Rajasthan", location: "1 NGM (Hanumangarh)", scheme: "KUSUM Component A", capacityMW: 2.6, clientDetails: "RAJ ENERGY | First Floor, Ward No.18, Soni Market, Hanumangarh Town" },
  { status: "Ongoing", state: "Rajasthan", location: "SHIVDANPURA (Hanumangarh)", scheme: "KUSUM Component A", capacityMW: 2.4, clientDetails: "SHIVDANPURA GREEN ENERGY POWER PVT. LTD. | Ward No.4, Shivdanpura, Bhadra" },
  { status: "Ongoing", state: "Rajasthan", location: "BHIRANI (Hanumangarh)", scheme: "KUSUM Component A", capacityMW: 2.4, clientDetails: "SIGNIX GREEN POWER ENERGY PVT. LTD. | Village-Ber, Jhansal" },
  { status: "Ongoing", state: "Uttar Pradesh", location: "Budhera (Baghpat)", scheme: "KUSUM Component C", capacityMW: 3.48, clientDetails: "KASANA GREEN ENERGY PVT. LTD. | Indraprastha Colony, Loni, Ghaziabad" },
  { status: "NA", state: "Uttar Pradesh", location: "Sarai Rasoolpur (Muzaffarnagar)", scheme: "KUSUM Component C", capacityMW: 1.8, clientDetails: "ADHANA GREEN ENERGY PVT. LTD. | Indraprastha Colony, Loni, Ghaziabad" },
  { status: "NA", state: "Uttar Pradesh", location: "Raipur (Saharanpur)", scheme: "KUSUM Component C", capacityMW: 1.08, clientDetails: "SYSCON POWER PROJECTS PVT. LTD. | Kalkaji, New Delhi" },
  { status: "Not Started", state: "Uttar Pradesh", location: "Mukari (Baghpat)", scheme: "KUSUM Component C", capacityMW: 1.56, clientDetails: "KASANA GREEN ENERGY PVT. LTD. | Indraprastha Colony, Loni, Ghaziabad" },
  { status: "Ongoing", state: "Uttar Pradesh", location: "Vahanpur (Hathras)", scheme: "KUSUM Component C", capacityMW: 1.2, clientDetails: "Tarun Kumar Singh | Chandanpura, Thulai, Uttar Pradesh-" },
  { status: "Ongoing", state: "Madhya Pradesh", location: "UDGANWA (Datia)", scheme: "KUSUM Component A", capacityMW: 1.2, clientDetails: "Sarita Agrawal | Datia, Madhya Pradesh" },
  { status: "Ongoing", state: "Bihar", location: "Rahika (Madhubani)", scheme: "KUSUM Component C", capacityMW: 1.05, clientDetails: "Rahul Singh | Mithouli, Jagatpur, Madhubani, Bihar-847213" },
  { status: "Not Started", state: "Bihar", location: "", scheme: "KUSUM Component C", capacityMW: 1.25, clientDetails: "Aaryan Solar" },
  { status: "Ongoing", state: "Bihar", location: "Khajauli", scheme: "KUSUM Component C", capacityMW: 1.77, clientDetails: "Aaryan Solar" },
];

/**
 * Map coordinates for the districts named in the sheet. The sheet carries no
 * coordinates, so markers are placed at the district centre; sites in the same
 * district share one marker. Rows whose district is not named get no marker.
 */
const DISTRICT_COORDS: Record<string, [number, number]> = {
  Jodhpur: [26.2389, 73.0243],
  Tirap: [27.0, 95.32],
  Hanumangarh: [29.582, 74.3294],
  Bikaner: [28.0229, 73.3119],
  Kota: [25.2138, 75.8648],
  Hisar: [29.1492, 75.7217],
  Baghpat: [28.9477, 77.2188],
  Muzaffarnagar: [29.4727, 77.7085],
  Saharanpur: [29.968, 77.546],
  Hathras: [27.5959, 78.0528],
  Datia: [25.6653, 78.4602],
  Madhubani: [26.3489, 86.0719],
};

export interface Project {
  id: string;
  status: string;
  state: string;
  location: string;
  district: string | null;
  scheme: string;
  capacityMW: number;
  clientName: string;
  clientAddress: string;
}

export interface MapMarker {
  key: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  capacityMW: number;
  projects: Project[];
}

export interface StateSummary {
  state: string;
  slug: string;
  capacityMW: number;
  projects: Project[];
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const formatMW = (n: number) => `${n.toFixed(2)} MW`;
export const sumMW = (list: { capacityMW: number }[]) => list.reduce((t, p) => t + p.capacityMW, 0);

const districtOf = (location: string): string | null => {
  const paren = location.match(/\(([^)]+)\)\s*$/);
  const name = (paren ? paren[1] : location).trim();
  return name in DISTRICT_COORDS ? name : null;
};

export const PROJECTS: Project[] = PROJECT_ROWS.map((r, i) => {
  const [name, ...rest] = r.clientDetails.split(" | ");
  return {
    id: `p-${i + 1}`,
    status: r.status,
    state: r.state,
    location: r.location,
    district: districtOf(r.location),
    scheme: r.scheme,
    capacityMW: r.capacityMW,
    clientName: name.trim(),
    clientAddress: rest.join(" | ").replace(/^Address:\s*/i, "").trim(),
  };
});

/** States in order of total capacity (largest first). */
export const STATES: StateSummary[] = Array.from(new Set(PROJECTS.map((p) => p.state)))
  .map((state) => {
    const projects = PROJECTS.filter((p) => p.state === state);
    return { state, slug: slugify(state), capacityMW: sumMW(projects), projects };
  })
  .sort((a, b) => b.capacityMW - a.capacityMW);

export function buildMarkers(projects: Project[]): MapMarker[] {
  const map = new Map<string, MapMarker>();
  for (const p of projects) {
    if (!p.district) continue;
    const key = `${p.state}:${p.district}`;
    const [lat, lng] = DISTRICT_COORDS[p.district];
    const m = map.get(key) ?? { key, district: p.district, state: p.state, lat, lng, capacityMW: 0, projects: [] };
    m.capacityMW += p.capacityMW;
    m.projects.push(p);
    map.set(key, m);
  }
  return Array.from(map.values());
}
