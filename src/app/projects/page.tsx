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
  Search,
  ChevronRight,
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

export default function MainProjectsPage() {
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>("all");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<string>("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);
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
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
              >
                <div>
                  <AnimatedPillBadge className="mb-3">FEATURED EXECUTION STORIES</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900">
                    Project <span className="text-[#6DAD45] italic font-bold">Highlights</span>
                  </h2>
                </div>
                <p className="text-slate-600 text-sm max-w-md">
                  In-depth spotlight on 4 key utility solar installations delivered by Sarhat with site photos, technical specifications, and grid outcome stories.
                </p>
              </motion.div>

              {/* Story Tab Switcher with Layout Motion */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
                {HIGHLIGHT_PROJECTS.map((hp, idx) => {
                  const sel = activeHighlightIndex === idx;
                  return (
                    <button
                      key={hp.id}
                      onClick={() => setActiveHighlightIndex(idx)}
                      className={`relative px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        sel ? "text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {sel && (
                        <motion.div
                          layoutId="activeHighlightPill"
                          className="absolute inset-0 bg-slate-900 rounded-2xl shadow-md z-0"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">
                        <span className="text-[#D4E012] mr-1.5">0{idx + 1}.</span>
                        <span>{hp.location.split(" ")[0]}</span>
                        <span className="ml-2 text-[10px] opacity-75 font-normal">({hp.capacity})</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Featured Project Display Card with AnimatePresence */}
              <AnimatePresence mode="wait">
                {(() => {
                  const hp = HIGHLIGHT_PROJECTS[activeHighlightIndex];
                  return (
                    <motion.div
                      key={hp.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="bg-[#F8FAF8] border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <div className="grid lg:grid-cols-12 gap-0">
                        {/* Large Site Photo Column */}
                        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-full overflow-hidden bg-slate-950 group">
                          <Image
                            src={hp.image}
                            alt={hp.title}
                            fill
                            priority
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="bg-slate-900/90 border border-white/20 text-[#D4E012] font-mono font-bold text-xs px-3 py-1 rounded-full uppercase shadow-md backdrop-blur-md">
                              {hp.scheme}
                            </span>
                            <span
                              className={`font-mono font-bold text-xs px-3 py-1 rounded-full uppercase shadow-md ${
                                hp.status === "Commissioned"
                                  ? "bg-emerald-500 text-slate-950"
                                  : "bg-sky-400 text-slate-950"
                              }`}
                            >
                              {hp.status}
                            </span>
                          </div>

                          {/* Bottom Overlay Info */}
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4E012] mb-1">
                              <MapPin className="w-4 h-4 text-[#D4E012]" />
                              <span>{hp.location}</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white drop-shadow-md">
                              {hp.title}
                            </h3>
                          </div>
                        </div>

                        {/* Content & Story Details Column */}
                        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                          <div>
                            <div className="font-mono text-xs text-[#707B00] font-bold uppercase tracking-wider mb-2">
                              DEVELOPER / CLIENT: {hp.client}
                            </div>

                            <p className="text-slate-700 text-sm leading-relaxed mb-6">
                              {hp.story}
                            </p>

                            {/* Technical Highlights Checklist */}
                            <div className="mb-6 space-y-2.5 border-t border-slate-200/80 pt-5">
                              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                Execution Benchmarks
                              </div>
                              {hp.highlights.map((hl, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div>
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl border border-slate-200 mb-6 text-center shadow-sm">
                              {hp.keyMetrics.map((m, i) => (
                                <div key={i} className="px-1">
                                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold truncate">{m.label}</div>
                                  <div className="font-mono text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">{m.val}</div>
                                </div>
                              ))}
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setQuoteModalOpen(true)}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                              <span>Discuss Similar Project Scope</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
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
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
              >
                <div>
                  <AnimatedPillBadge className="mb-3">FILTERABLE DATABASE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900">
                    Explore <span className="text-[#6DAD45] italic font-bold">Projects</span>
                  </h2>
                </div>
                <div className="font-mono text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-full w-fit shadow-sm">
                  Showing {exploreFilteredProjects.length} of {PROJECTS.length} Projects
                </div>
              </motion.div>

              {/* Filter Controls Bar */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 mb-10 shadow-lg space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Search Input */}
                  <div className="md:col-span-4 relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search location, state, or client..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6DAD45] font-sans-ui transition-all"
                    />
                  </div>

                  {/* Scheme Filters */}
                  <div className="md:col-span-5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {["All", "Component A", "Component C", "Govt. Scheme"].map((scheme) => {
                      const sel = selectedScheme === scheme;
                      return (
                        <button
                          key={scheme}
                          onClick={() => setSelectedScheme(scheme)}
                          className={`relative px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                            sel ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {scheme}
                        </button>
                      );
                    })}
                  </div>

                  {/* Status Filters */}
                  <div className="md:col-span-3 flex items-center justify-end gap-1.5">
                    {["All", "Commissioned", "Ongoing"].map((st) => {
                      const sel = selectedStatusFilter === st;
                      return (
                        <button
                          key={st}
                          onClick={() => setSelectedStatusFilter(st)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                            sel ? "bg-[#6DAD45] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
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
                    {exploreFilteredProjects.map((p) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        key={p.id}
                        whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                        className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:border-[#6DAD45] transition-colors duration-300 flex flex-col justify-between group cursor-pointer shadow-md hover:shadow-xl"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.state}</span>
                              <h3 className="font-serif-display text-xl font-bold text-slate-900 leading-snug">{p.location}</h3>
                            </div>
                            <span
                              className={`font-mono font-bold text-[10px] uppercase px-2.5 py-1 rounded-full whitespace-nowrap border shadow-sm ${
                                p.status === "Commissioned"
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                  : p.status === "Ongoing"
                                  ? "bg-sky-100 text-sky-800 border-sky-300"
                                  : "bg-amber-100 text-amber-800 border-amber-300"
                              }`}
                            >
                              {p.status}
                            </span>
                          </div>

                          <div className="mb-4">
                            <span className="inline-block bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs px-2.5 py-1 rounded-lg">
                              {p.scheme}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-b border-slate-100 py-3 my-4">
                            <span className="font-mono text-xs text-slate-500 font-bold uppercase">Solar Capacity</span>
                            <span className="font-mono text-base font-extrabold text-[#707B00]">{formatMW(p.capacityMW)}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setQuoteModalOpen(true)}
                          className="w-full mt-2 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-900 font-mono font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:border-slate-900 shadow-sm"
                        >
                          <span>Discuss Project Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
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
