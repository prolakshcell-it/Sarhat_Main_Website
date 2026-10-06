"use client";

import { useState, useRef, useEffect, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion, animate } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Sun,
  Zap,
  Battery,
  Sprout,
  Filter,
  Clock,
  AlertCircle,
  LayoutDashboard,
  Sparkles,
  Grid,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Globe2,
  Award,
  Layers,
  Check,
  ExternalLink,
  SlidersHorizontal,
  Leaf,
  Workflow,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FootprintMap from "@/components/FootprintMap";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { PROJECTS, sumMW, formatMW } from "@/data/projects";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Annual CO2 avoided per MW, derived from Budhera (3.48 MW -> 5,100 MT / year)
const CO2_TONNES_PER_MW_YEAR = 1465;

// Book-cover reveal: the cover swings open on its left "spine" once the card
// enters view. Only transform/opacity animate (GPU composited), and the cover
// is set to visibility:hidden afterwards so it costs nothing once open.
const bookCoverVariants = {
  hidden: { rotateY: 0, opacity: 1, visibility: "visible" as const },
  visible: {
    rotateY: -110,
    opacity: 0,
    transition: {
      rotateY: { duration: 0.9, delay: 0.2, ease: [0.65, 0, 0.35, 1] as const },
      opacity: { duration: 0.3, delay: 0.75 },
    },
    transitionEnd: { visibility: "hidden" as const },
  },
};

type BookCardProps = {
  className?: string;
  coverIndex: string;
  coverLabel: string;
  children: ReactNode;
};

function BookCard({ className = "", coverIndex, coverLabel, children }: BookCardProps) {
  return (
    <motion.div variants={fadeInUp} className={`relative ${className}`}>
      {children}
      <motion.div
        aria-hidden
        variants={bookCoverVariants}
        style={{ transformOrigin: "left center", transformPerspective: 1400, backfaceVisibility: "hidden", willChange: "transform, opacity" }}
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden bg-slate-900 text-white flex flex-col justify-between p-7 shadow-2xl motion-reduce:hidden"
      >
        <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <span>Sarhat · Portfolio</span>
          <span>{coverIndex} / 05</span>
        </div>
        <div>
          <div className="h-px w-10 bg-[#D4E012] mb-4" />
          <div className="font-serif-display text-2xl sm:text-3xl font-medium leading-tight">{coverLabel}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

type FigureCardProps = {
  label: string;
  dotClass: string;
  barClass: string;
  value: string;
  unit: string;
  description: string;
  share?: number;
  shareLabel: string;
  footerValue?: string;
};

function FigureCard({ label, dotClass, barClass, value, unit, description, share, shareLabel, footerValue }: FigureCardProps) {
  return (
    <div className="h-full bg-white border border-slate-200/80 rounded-2xl p-7 flex flex-col justify-between shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-[#6DAD45] hover:shadow-[0_12px_32px_-16px_rgba(109,173,69,0.35)] transition-[border-color,box-shadow] duration-300">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-mono text-4xl font-semibold text-slate-900 tracking-tight tabular-nums">{value}</span>
          <span className="font-mono text-sm font-medium text-slate-400">{unit}</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
      <div className="mt-7">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>{shareLabel}</span>
          <span className="text-slate-800 font-semibold tabular-nums">
            {footerValue ?? `${Math.round((share ?? 0) * 100)}%`}
          </span>
        </div>
        {share !== undefined && (
          <div className="h-1 mt-2 rounded-full bg-slate-100 overflow-hidden">
            <div className={`h-full rounded-full ${barClass}`} style={{ width: `${share * 100}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.05)" },
  hover: {
    y: -8,
    scale: 1.01,
    boxShadow: "0 20px 40px -15px rgba(109,173,69,0.2)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

// Featured Project Stories for Highlights Section
const HIGHLIGHT_PROJECTS = [
  {
    id: "kapoorisar-bikaner",
    title: "Kapoorisar 2.60 MW Ground-Mounted Solar Park",
    location: "Kapoorisar (Bikaner, Rajasthan)",
    scheme: "PM-KUSUM Component A",
    capacity: "2.60 MW",
    status: "Commissioned",
    image: "/images/agrivoltaics-project.jpg",
    client: "Sunraj Energy Pvt. Ltd.",
    story:
      "Engineered and commissioned ahead of schedule in desert terrain. Sarhat delivered full turnkey civil leveling, hot-dip galvanized mounting structures, 33kV switchyard erection, and DISCOM grid synchronization.",
    keyMetrics: [
      { label: "Annual Yield", val: "3.85 Million kWh" },
      { label: "Evacuation Voltage", val: "33 kV Corridor" },
      { label: "Execution Speed", val: "14 Days Ahead of COD" },
    ],
    highlights: [
      "Heavy-duty pile foundations rated for 160 km/h wind shear forces.",
      "SCADA tele-metering integrated directly with Rajasthan DISCOM control room.",
      "Energizing 2,200+ local agricultural tube-well pumps with daytime solar power.",
    ],
  },
  {
    id: "budhera-baghpat",
    title: "Budhera 3.48 MW Feeder Solarization Corridor",
    location: "Budhera (Baghpat, Uttar Pradesh)",
    scheme: "PM-KUSUM Component C",
    capacity: "3.48 MW",
    status: "Ongoing",
    image: "/images/hero-solar.jpg",
    client: "Kasana Green Energy Pvt. Ltd.",
    story:
      "A flagship utility solarization project in the agricultural belt of Baghpat, UP. Designed to solarize dedicated rural agricultural feeders directly from PVVNL 33/11kV substations with maximum energy yield.",
    keyMetrics: [
      { label: "Annual Yield", val: "5.10 Million kWh" },
      { label: "DISCOM Partner", val: "PVVNL Uttar Pradesh" },
      { label: "CO2 Offset", val: "5,100 MT / Year" },
    ],
    highlights: [
      "Tier-1 Mono-PERC bifacial solar modules with tracker-tilt racking.",
      "Custom outdoor EHV transformer switchyard & lightning protection system.",
      "Direct power delivery to 3,500+ rural farming households.",
    ],
  },
  {
    id: "fatehgarh-hanumangarh",
    title: "Fatehgarh 3.15 MW Agrivoltaic Feeder Project",
    location: "Fatehgarh (Hanumangarh, Rajasthan)",
    scheme: "PM-KUSUM Component C",
    capacity: "3.15 MW",
    status: "Commissioned",
    image: "/images/timeline-2025.jpg",
    client: "Anil Plastic",
    story:
      "High-yield solar infrastructure combining agricultural land utility with clean energy generation. Features zero land sterilization, custom high-clearance mounting, and automated string monitoring.",
    keyMetrics: [
      { label: "Annual Yield", val: "4.65 Million kWh" },
      { label: "Plant Rating", val: "3.15 MW DC" },
      { label: "Grid Uptime", val: "99.8% Synchronized" },
    ],
    highlights: [
      "Dual-use land design allowing continuous farming underneath solar tables.",
      "Anti-reflective hydrophobic coating to combat desert dust deposition.",
      "Zero lost-time safety incidents during construction & erection.",
    ],
  },
  {
    id: "deomali-tirap",
    title: "Deomali 0.80 MW Hilly Utility Solar Corridor",
    location: "Deomali (Tirap, Arunachal Pradesh)",
    scheme: "Govt. Scheme – Utility",
    capacity: "0.80 MW",
    status: "Commissioned",
    image: "/images/substation-project.jpg",
    client: "Kashyap & Co",
    story:
      "Overcoming complex mountainous logistics in North-Eastern frontier grid zones, Sarhat executed civil terrace grading, seismic structural reinforcements, and EHV line extension for remote grid resilience.",
    keyMetrics: [
      { label: "Terrain", val: "Hilly Himalayan Slope" },
      { label: "Grid Type", val: "State Utility Grid" },
      { label: "Impact", val: "Remote Community Power" },
    ],
    highlights: [
      "Specialized slope-anchored pile foundation engineering.",
      "All-weather heavy machinery deployment in mountain terrain.",
      "Turnkey civil, electrical, & transmission line commissioning.",
    ],
  },
];

// Scope of Work Items for Execution & Impact
const EPC_SCOPE_STEPS = [
  {
    num: "01",
    title: "Land Acquisition & Geo-Survey",
    description: "Micro-siting analysis, soil resistivity testing, topographical mapping, and shadow modeling for maximum lifetime MW yield.",
  },
  {
    num: "02",
    title: "Civil & Structural Engineering",
    description: "High-grade concrete pile casting, hot-dip galvanized steel mounting structures (MMS), and storm-water drainage corridors.",
  },
  {
    num: "03",
    title: "Electrical & EHV Grid Erection",
    description: "11kV/765kV outdoor switchyards, step-up power transformers, VCB protection panels, and underground transmission cabling.",
  },
  {
    num: "04",
    title: "SCADA & Statutory Grid Sync",
    description: "CEIG statutory approvals, DISCOM NOC compliance, real-time telemetry SCADA integration, and commercial grid synchronization.",
  },
];

// Explore Projects: pick a site photo by scheme and vary the crop so cards don't look identical.
const getProjectImage = (scheme: string) => {
  const s = scheme.toLowerCase();
  if (s.includes("component a")) return "/images/hero-solar.jpg";
  if (s.includes("component c")) return "/images/substation-project.jpg";
  return "/images/agrivoltaics-project.jpg";
};
const IMAGE_FOCUS = ["50% 50%", "20% 60%", "80% 40%", "40% 30%", "70% 70%"];

// Impact figures are derived from the verified portfolio, not hard-coded.
// Assumptions (documented here so they are easy to revise):
//  - CO2: CO2_TONNES_PER_MW_YEAR (from the Budhera 3.48 MW / 5,100 MT project)
//  - Tree equivalence: ~22 kg CO2 absorbed per tree per year
//  - Households: ~1,000 farm households per MW (Budhera: 3,500+ households on 3.48 MW)
const KG_CO2_PER_TREE_YEAR = 22;
const HOUSEHOLDS_PER_MW = 1000;

function getImpactStats(totalMW: number) {
  const co2 = Math.round(totalMW * CO2_TONNES_PER_MW_YEAR);
  const trees = (co2 * 1000) / KG_CO2_PER_TREE_YEAR;
  const households = Math.round((totalMW * HOUSEHOLDS_PER_MW) / 100) * 100;
  return [
    { to: co2, suffix: "", label: "MT CO2 Offset / Year", note: `Full portfolio. Equivalent to planting ${(trees / 1e6).toFixed(1)} Million trees annually.`, accent: "text-[#D4E012]" },
    { to: 100, suffix: "%", label: "DISCOM NOC Record", note: "Zero statutory delays in CEIG and grid NOCs.", accent: "text-white" },
    { to: households, suffix: "", label: "Farm Households Served", note: "Estimated reliable daytime solar feeder power for agriculture.", accent: "text-[#5EE72D]" },
    { to: 0, suffix: "", label: "LTI Incidents", note: "Strict adherence to high-voltage safety standards.", accent: "text-white" },
  ];
}

function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v).toLocaleString("en-IN")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix]);

  // Final value is the server/initial render so no-JS and reduced-motion users see real numbers.
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {to.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

type HighlightProject = (typeof HIGHLIGHT_PROJECTS)[number];

const HIGHLIGHT_AUTOPLAY_MS = 6000;
const HIGHLIGHT_SWIPE_PX = 50;

// Centered card slider. Adding a project only needs a new HIGHLIGHT_PROJECTS entry.
//  - Only opacity/transform are animated (CSS transitions), so it stays smooth in Chrome and Safari.
//  - Autoplay is a single setTimeout per slide, cleaned up on every change, hover/tap or unmount.
//  - Images mount only for the active and next slide (the rest never load until needed).
//  - The "View Description" button opens the story panel (Close/Escape dismiss it) and pauses autoplay. Swipe changes slides.
function HighlightsSlider({ projects, onDiscuss }: { projects: HighlightProject[]; onDiscuss: () => void }) {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1 % total]));
  const reduceMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);
  const autoplay = !revealed && !reduceMotion && total > 1;

  // Mount the active slide and the next one only (derived during render, no effect needed).
  const nextIndex = (index + 1) % total;
  if (!seen.has(index) || !seen.has(nextIndex)) {
    setSeen(new Set(seen).add(index).add(nextIndex));
  }

  // Clean autoplay timer: restarts on slide change, pauses while the story is open.
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % total), HIGHLIGHT_AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, autoplay, total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Escape") setRevealed(false);
  };

  return (
    <div
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 text-white select-none touch-pan-y outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured execution stories"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > HIGHLIGHT_SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Slides: stacked, crossfade + small translate */}
      {projects.map((hp, i) => {
        const active = i === index;
        return (
          <div
            key={hp.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              active ? "opacity-100 translate-y-0 z-[1]" : "opacity-0 translate-y-3 pointer-events-none"
            }`}
          >
            {seen.has(i) && (
              <Image
                src={hp.image}
                alt={hp.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${
                  active ? "scale-100" : "scale-[1.06]"
                }`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/50" />

            {/* Caption: title, location, capacity (always visible on the image) */}
            <div
              className={`absolute inset-x-0 bottom-16 sm:bottom-20 transition-opacity duration-300 motion-reduce:transition-none ${
                active && revealed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="px-5 sm:px-8 lg:px-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono font-bold text-[#D4E012] mb-3">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{hp.location}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white whitespace-nowrap">{hp.capacity}</span>
                </div>
                <h3 className="font-serif-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-3xl drop-shadow-md">
                  {hp.title}
                </h3>
                <button
                  onClick={() => setRevealed(true)}
                  tabIndex={active && !revealed ? 0 : -1}
                  aria-expanded={active && revealed}
                  className="mt-5 inline-flex items-center gap-2 bg-white/10 hover:bg-[#D4E012] hover:text-slate-950 border border-white/30 hover:border-[#D4E012] text-white font-mono font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4E012]"
                >
                  View Description <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Story: dark veil + description rising from the bottom to the centre */}
            <div
              className={`absolute inset-0 bg-slate-950/85 transition-opacity duration-500 motion-reduce:transition-none ${
                active && revealed ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="h-full overflow-y-auto px-14 sm:px-20 lg:px-28 pt-16 pb-14 flex scrollbar-none">
                <div
                  className={`m-auto w-full max-w-3xl transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                    active && revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  }`}
                >
                  <div className="font-mono text-[11px] text-[#D4E012] font-bold uppercase tracking-[0.2em] mb-2 text-center">
                    {hp.location} · {hp.capacity} · {hp.client}
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-center mb-5">{hp.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-200 sm:text-justify mb-6 pb-6 border-b border-white/15">{hp.story}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                    {hp.keyMetrics.map((m) => (
                      <div key={m.label} className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">{m.label}</div>
                        <div className="font-mono text-sm font-bold text-white mt-1">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={onDiscuss}
                      tabIndex={active && revealed ? 0 : -1}
                      className="inline-flex items-center gap-2 bg-[#D4E012] hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
                    >
                      Discuss Similar Project Scope <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRevealed(false)}
                      tabIndex={active && revealed ? 0 : -1}
                      className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-slate-950 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Top bar: status, scheme and counter stay above the story veil */}
      <div className="absolute inset-x-0 top-0 z-10 pt-5 sm:pt-7 pointer-events-none">
        <div className="px-5 sm:px-8 lg:px-10 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-900/80 border border-white/20 text-[#D4E012] font-mono font-bold text-[11px] px-3 py-1 rounded-full uppercase">
              {projects[index].scheme}
            </span>
            <span
              className={`font-mono font-bold text-[11px] px-3 py-1 rounded-full uppercase ${
                projects[index].status === "Commissioned" ? "bg-emerald-400 text-slate-950" : "bg-sky-400 text-slate-950"
              }`}
            >
              {projects[index].status}
            </span>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {(
        [
          { dir: -1 as const, Icon: ChevronLeft, label: "Previous project", pos: "left-2 sm:left-5" },
          { dir: 1 as const, Icon: ChevronRight, label: "Next project", pos: "right-2 sm:right-5" },
        ]
      ).map(({ dir, Icon, label, pos }) => (
        <button
          key={label}
          onClick={() => go(dir)}
          aria-label={label}
          className={`absolute top-1/2 -translate-y-1/2 ${pos} z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/60 hover:bg-[#6DAD45] border border-white/20 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4E012]`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}

      {/* Subtle bottom progress: the active fill restarts with each autoplay timer */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8">
        <div className="px-5 sm:px-8 lg:px-10 flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${p.location}`}
              aria-current={i === index}
              className="flex-1 py-2 cursor-pointer"
            >
              <span className="relative block h-[2px] rounded-full bg-white/25 overflow-hidden">
                {i < index && <span className="absolute inset-0 bg-white/80" />}
                {i === index && (
                  <span
                    key={`${index}-${autoplay}`}
                    className={`absolute inset-0 bg-[#D4E012] ${autoplay ? "highlight-progress-fill" : "scale-x-100"}`}
                    style={autoplay ? { animationDuration: `${HIGHLIGHT_AUTOPLAY_MS}ms` } : undefined}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MainProjectsPage() {
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>("all");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<string>("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const containerRef = useRef<HTMLElement>(null);

  // Calculate verified statistics directly from PROJECTS single source of truth
  const commissionedProjects = PROJECTS.filter((p) => p.status === "Commissioned");
  const ongoingProjects = PROJECTS.filter((p) => p.status === "Ongoing");
  const pipelineProjects = PROJECTS.filter((p) => p.status === "Not Started" || p.status === "NA");

  const commissionedMW = sumMW(commissionedProjects);
  const ongoingMW = sumMW(ongoingProjects);
  const totalMW = sumMW(PROJECTS);
  const pipelineMW = sumMW(pipelineProjects);
  const impactStats = getImpactStats(totalMW);
  const stateCount = new Set(PROJECTS.map((p) => p.state)).size;
  const co2AvoidedTonnes = Math.round(commissionedMW * CO2_TONNES_PER_MW_YEAR);
  const co2PortfolioTonnes = Math.round(totalMW * CO2_TONNES_PER_MW_YEAR);

  // Parallax & Scroll Fade-out Tracking for Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const bgDim = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.85]);

  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-60px"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(10px)"]);

  // Filtered list of projects for Explore Projects section
  const exploreFilteredProjects = PROJECTS.filter((p) => {
    const matchesScheme = selectedScheme === "All" || p.scheme.toLowerCase().includes(selectedScheme.toLowerCase());
    const matchesStatus = selectedStatusFilter === "All" || p.status === selectedStatusFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scheme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesScheme && matchesStatus && matchesSearch;
  });

  // Track active section for top sticky bar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "highlights", "explore", "footprint", "execution-impact"];
      const scrollPos = window.scrollY + 220;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "highlights", label: "Project Highlights", icon: Sparkles },
    { id: "explore", label: "Explore Projects", icon: Grid },
    { id: "footprint", label: "Across India", icon: MapPin },
    { id: "execution-impact", label: "Execution & Impact", icon: ShieldCheck },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black font-sans-ui relative overflow-x-clip">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#D4E012]/20 via-[#6DAD45]/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* Hero Section */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={containerRef} className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black select-none">
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Solar EPC Execution Infrastructure"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl flex flex-col items-center text-center mb-8"
              >
                <h1 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight drop-shadow-lg text-center mb-4">
                  Our Execution <span className="text-[#D4E012] italic font-normal">Portfolio</span>
                </h1>
                <p className="text-slate-200 font-normal text-base sm:text-lg max-w-3xl text-center leading-relaxed drop-shadow-md mb-6">
                  Verified solar power plants, feeder solarization, extra high voltage grid substations, and utility renewable energy assets delivered across India.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all shadow-xl shadow-[#D4E012]/30 cursor-pointer"
                  >
                    Discuss a Project
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => scrollToSection("overview")}
                    className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all backdrop-blur-md cursor-pointer"
                  >
                    Explore Figures &amp; Portfolio
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Main Content Sections Layer */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* =========================================================
              SECTION 1: OVERVIEW (Verified Figures)
             ========================================================= */}
          <section id="overview" className="scroll-mt-36 py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="text-center max-w-3xl mx-auto mb-14"
              >
                <AnimatedPillBadge className="mb-3">PORTFOLIO OVERVIEW</AnimatedPillBadge>
                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 mb-4">
                  Verified <span className="text-[#6DAD45] italic font-bold">Portfolio Figures</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Real-time breakdown of Sarhat&apos;s verified solar infrastructure projects across operating states, showing commissioned, ongoing and pipeline capacity alongside estimated carbon impact.
                </p>
              </motion.div>

              {/* Verified Figures: hero total + 2x2 breakdown */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5 mb-12"
              >
                {/* Total Capacity (hero) */}
                <BookCard className="md:col-span-2 lg:col-span-1 lg:row-span-2" coverIndex="01" coverLabel="Total Tracked Portfolio">
                  <div className="h-full bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between hover:border-[#6DAD45] hover:shadow-[0_12px_32px_-16px_rgba(109,173,69,0.35)] transition-[border-color,box-shadow] duration-300">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-8">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4E012]">Total Tracked Portfolio</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-mono text-5xl sm:text-6xl font-semibold tracking-tight tabular-nums">{totalMW.toFixed(2)}</span>
                        <span className="font-mono text-base text-slate-400">MW</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Verified capacity across commissioned, ongoing and pipeline projects, delivered under single-point turnkey EPC.
                      </p>
                    </div>

                    <div className="relative mt-10">
                      <dl className="grid grid-cols-2 gap-6 font-mono">
                        <div>
                          <dt className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">Locations</dt>
                          <dd className="text-2xl font-semibold tabular-nums">{PROJECTS.length}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">States</dt>
                          <dd className="text-2xl font-semibold tabular-nums">{stateCount}</dd>
                        </div>
                      </dl>
                      <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#D4E012]">
                        <Check className="w-3.5 h-3.5" /> 100% DISCOM Compliant
                      </div>
                    </div>
                  </div>
                </BookCard>

                <BookCard coverIndex="02" coverLabel="Commissioned">
                  <FigureCard
                    label="Commissioned"
                    dotClass="bg-emerald-500"
                    barClass="bg-emerald-500"
                    value={commissionedMW.toFixed(2)}
                    unit="MW"
                    description={`${commissionedProjects.length} sites synchronised to state DISCOM grids and in commercial operation.`}
                    share={commissionedMW / totalMW}
                    shareLabel="Share of portfolio"
                  />
                </BookCard>

                <BookCard coverIndex="03" coverLabel="Ongoing Execution">
                  <FigureCard
                    label="Ongoing Execution"
                    dotClass="bg-sky-500"
                    barClass="bg-sky-500"
                    value={ongoingMW.toFixed(2)}
                    unit="MW"
                    description={`${ongoingProjects.length} active sites under engineering, civil foundation & EHV erection.`}
                    share={ongoingMW / totalMW}
                    shareLabel="Share of portfolio"
                  />
                </BookCard>

                <BookCard coverIndex="04" coverLabel="CO₂ Avoided">
                  <FigureCard
                    label="CO₂ Avoided"
                    dotClass="bg-[#6DAD45]"
                    barClass="bg-[#6DAD45]"
                    value={co2AvoidedTonnes.toLocaleString("en-IN")}
                    unit="t / yr"
                    description="Estimated annual emissions avoided by commissioned capacity."
                    shareLabel="At full portfolio"
                    footerValue={`${co2PortfolioTonnes.toLocaleString("en-IN")} t / yr`}
                  />
                </BookCard>

                <BookCard coverIndex="05" coverLabel="Pipeline">
                  <FigureCard
                    label="Pipeline"
                    dotClass="bg-amber-500"
                    barClass="bg-amber-500"
                    value={pipelineMW.toFixed(2)}
                    unit="MW"
                    description={`${pipelineProjects.length} sanctioned sites awaiting mobilisation & statutory approvals.`}
                    share={pipelineMW / totalMW}
                    shareLabel="Share of portfolio"
                  />
                </BookCard>
              </motion.div>
            </div>
          </section>

          {/* =========================================================
              SECTION 2: PROJECT HIGHLIGHTS (Featured Large Stories)
             ========================================================= */}
          <section id="highlights" className="scroll-mt-36 py-10 sm:py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="text-center max-w-3xl mx-auto mb-10"
              >
                <AnimatedPillBadge className="mb-3">FEATURED EXECUTION STORIES</AnimatedPillBadge>
                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 mb-4">
                  Project <span className="text-[#6DAD45] italic font-bold">Highlights</span>
                </h2>
             <p className="text-slate-600 text-base leading-relaxed">
  Step into the projects behind Sarhat’s journey — where ideas become engineered,
  delivered and brought to life in the field.
</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
              >
                <HighlightsSlider projects={HIGHLIGHT_PROJECTS} onDiscuss={() => setQuoteModalOpen(true)} />
              </motion.div>
            </div>
          </section>

          {/* =========================================================
              SECTION 3: EXPLORE PROJECTS (Filterable Project Cards)
             ========================================================= */}
          <section id="explore" className="scroll-mt-36 py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="text-center max-w-3xl mx-auto mb-10"
              >
                <AnimatedPillBadge className="mb-3">Our Impact</AnimatedPillBadge>
                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 mb-4">
                  Explore <span className="text-[#6DAD45] italic font-bold">Projects</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Browse Sarhat&apos;s solar sites across India, filtered by government scheme and delivery status.
                </p>
              </motion.div>

              {/* Filter Controls: two centred segmented controls */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:divide-x divide-slate-200 mb-10"
              >
                {[
                  {
                    id: "scheme",
                    label: "Scheme",
                    options: ["All", "Component A", "Component C", "Govt. Scheme"],
                    value: selectedScheme,
                    onChange: setSelectedScheme,
                    activeBg: "bg-slate-900",
                  },
                  {
                    id: "status",
                    label: "Status",
                    options: ["All", "Commissioned", "Ongoing"],
                    value: selectedStatusFilter,
                    onChange: setSelectedStatusFilter,
                    activeBg: "bg-[#6DAD45]",
                  },
                ].map((group) => (
                  <div key={group.id} className="flex flex-col items-center gap-2.5 md:px-10 max-w-full">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{group.label}</span>
                    <div
                      role="radiogroup"
                      aria-label={`Filter by ${group.label.toLowerCase()}`}
                      className="flex max-w-full overflow-x-auto scrollbar-none bg-white border border-slate-200 rounded-full p-1 shadow-sm"
                    >
                      {group.options.map((opt) => {
                        const sel = group.value === opt;
                        return (
                          <button
                            key={opt}
                            role="radio"
                            aria-checked={sel}
                            onClick={() => group.onChange(opt)}
                            className={`relative shrink-0 px-2.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#6DAD45] ${
                              sel ? "text-white" : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            {sel && (
                              <motion.span
                                layoutId={`explore-filter-${group.id}`}
                                className={`absolute inset-0 rounded-full ${group.activeBg}`}
                                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                              />
                            )}
                            <span className="relative z-10">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Projects Cards Grid with AnimatePresence & Motion Layout */}
              <AnimatePresence mode="popLayout">
                {exploreFilteredProjects.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-md"
                  >
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <div className="font-serif-display text-lg font-bold text-slate-900">No projects match your current filters</div>
                    <p className="text-xs text-slate-500 mt-1">Try resetting search terms or status filters.</p>
                    <button
                      onClick={() => {
                        setSelectedScheme("All");
                        setSelectedStatusFilter("All");
                        setSearchQuery("");
                      }}
                      className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                ) : (
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exploreFilteredProjects.map((p, i) => (
                      <motion.article
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.45, delay: Math.min(i % 3, 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        key={p.id}
                        className="group relative flex flex-col bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-[#6DAD45] hover:shadow-[0_22px_44px_-20px_rgba(109,173,69,0.45)] focus-within:border-[#6DAD45]"
                      >
                        {/* Site photo */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                          <Image
                            src={getProjectImage(p.scheme)}
                            alt={`${p.scheme} solar project at ${p.location || p.state}`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.07]"
                            style={{ objectPosition: IMAGE_FOCUS[i % IMAGE_FOCUS.length] }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/20" />

                          <span
                            className={`absolute top-4 left-4 font-mono font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md ${
                              p.status === "Commissioned"
                                ? "bg-emerald-400 text-slate-950"
                                : p.status === "Ongoing"
                                ? "bg-sky-400 text-slate-950"
                                : "bg-amber-400 text-slate-950"
                            }`}
                          >
                            {p.status}
                          </span>

                          <div className="absolute bottom-4 left-5 right-5 text-white">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4E012]">{p.state}</span>
                            <h3 className="font-serif-display text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">{p.location || p.state}</h3>
                          </div>
                        </div>

                        {/* Existing content */}
                        <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-6">
                          <span
                            aria-hidden
                            className="absolute top-0 left-0 h-0.5 w-full bg-[#6DAD45] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                          />
                          <div>
                            <span className="inline-block bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs px-2.5 py-1 rounded-lg">
                              {p.scheme}
                            </span>

                            <div className="flex items-end justify-between border-t border-slate-100 mt-4 pt-4">
                              <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">Solar Capacity</span>
                              <span className="font-mono text-xl font-extrabold text-[#707B00] tabular-nums">{formatMW(p.capacityMW)}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setQuoteModalOpen(true)}
                            className="mt-5 w-full flex items-center justify-between bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-900 font-mono font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-slate-200 group-hover:border-slate-900 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6DAD45]"
                          >
                            <span>Discuss Project Details</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* =========================================================
              SECTION 4: ACROSS INDIA (Pan-India Interactive Map)
             ========================================================= */}
          <div id="footprint" className="scroll-mt-24">
            <FootprintMap
              selectedStateSlug={selectedStateSlug}
              onSelectState={(slug) => setSelectedStateSlug(slug)}
            />
          </div>

          {/* =========================================================
              SECTION 5: EXECUTION & IMPACT (Scope, Work & Outcomes)
             ========================================================= */}
          <section id="execution-impact" className="scroll-mt-36 py-10 sm:py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <AnimatedPillBadge className="mb-3">TURNKEY SCOPE &amp; OUTCOMES</AnimatedPillBadge>
                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 mb-4">
                  Execution &amp; <span className="text-[#6DAD45] italic font-bold">Impact</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Sarhat provides single-point turnkey accountability across civil engineering, electrical substation construction, SCADA integration, and environmental impact.
                </p>
              </motion.div>

              {/* Turnkey scope: connected 4-step timeline */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 lg:pt-8"
              >
                {/* Progress line (desktop): draws left to right on enter */}
                <div className="hidden lg:block absolute top-[3px] left-0 right-0 h-px bg-slate-200" aria-hidden>
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0 },
                      visible: { scaleX: 1, transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 } },
                    }}
                    style={{ transformOrigin: "left center" }}
                    className="h-full bg-[#6DAD45]"
                  />
                </div>

                {EPC_SCOPE_STEPS.map((step) => (
                  <motion.div
                    key={step.num}
                    variants={fadeInUp}
                    className="relative group cursor-default"
                  >
                    <span
                      aria-hidden
                      className="hidden lg:block absolute -top-8 left-0 w-[7px] h-[7px] ml-[4px] rounded-full bg-white border-2 border-[#6DAD45] group-hover:bg-[#6DAD45] transition-colors"
                    />
                    <div className="h-full bg-[#F8FAF8] border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col relative overflow-hidden transition-[border-color,box-shadow,transform] duration-300 group-hover:border-[#6DAD45] group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_-18px_rgba(109,173,69,0.4)]">
                      <span
                        aria-hidden
                        className="absolute top-0 left-0 h-0.5 w-full bg-[#6DAD45] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      />
                      <span className="font-mono text-5xl font-semibold leading-none text-slate-200 group-hover:text-[#6DAD45]/40 transition-colors duration-300 tabular-nums mb-5">
                        {step.num}
                      </span>
                      <h3 className="font-serif-display text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Measurable Impact Numbers Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-slate-800"
              >
                <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-3xl mb-8 sm:mb-10 relative z-10">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4E012] block mb-2">ENVIRONMENTAL &amp; GRID OUTCOMES</span>
                  <h3 className="font-serif-display text-2xl sm:text-4xl font-medium text-white">
                    Delivering Clean Energy &amp; Social Impact Across Regional Grids
                  </h3>
                </div>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 relative z-10">
                  {impactStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative pt-5"
                    >
                      <span className="absolute top-0 left-0 right-0 h-px bg-white/10" aria-hidden />
                      <span
                        aria-hidden
                        className="absolute top-0 left-0 h-px w-full bg-[#6DAD45] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      />
                      <CountUp to={stat.to} suffix={stat.suffix} className={`block font-mono text-4xl sm:text-5xl font-semibold tracking-tight ${stat.accent}`} />
                      <div className="text-xs font-mono text-slate-300 mt-2 uppercase font-bold tracking-wide">{stat.label}</div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-snug">{stat.note}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        <Footer />
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
