"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
    icon: MapPin,
  },
  {
    num: "02",
    title: "Civil & Structural Engineering",
    description: "High-grade concrete pile casting, hot-dip galvanized steel mounting structures (MMS), and storm-water drainage corridors.",
    icon: Building2,
  },
  {
    num: "03",
    title: "Electrical & EHV Grid Erection",
    description: "33kV/132kV outdoor switchyards, step-up power transformers, VCB protection panels, and underground transmission cabling.",
    icon: Zap,
  },
  {
    num: "04",
    title: "SCADA & Statutory Grid Sync",
    description: "CEIG statutory approvals, DISCOM NOC compliance, real-time telemetry SCADA integration, and commercial grid synchronization.",
    icon: ShieldCheck,
  },
];

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
          <section id="overview" className="scroll-mt-36 py-20 bg-[#F8FAF8] border-b border-slate-200/80">
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
                  Real-time breakdown of Sarhat&apos;s verified solar infrastructure projects across operating states, showing commissioned capacity and active ongoing developments separately.
                </p>
              </motion.div>

              {/* Verified Figures Highlight Grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {/* Total Capacity Card */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between group cursor-default"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4E012]/25 via-[#6DAD45]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4E012]">Total Tracked Portfolio</span>
                      <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#D4E012]">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="font-mono text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">{formatMW(totalMW)}</div>
                    <p className="text-xs text-slate-300 font-mono">Across {PROJECTS.length} verified project locations nationwide</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Single-point turnkey EPC</span>
                    <span className="text-[#D4E012] font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 100% DISCOM Compliant
                    </span>
                  </div>
                </motion.div>

                {/* Commissioned Capacity Card */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white border border-emerald-200/90 rounded-3xl p-8 shadow-xl shadow-emerald-500/5 relative overflow-hidden flex flex-col justify-between group cursor-default"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Commissioned
                      </span>
                    </div>
                    <div className="font-mono text-4xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">{formatMW(commissionedMW)}</div>
                    <p className="text-xs text-slate-600 font-mono font-medium">{commissionedProjects.length} sites fully synchronized to state DISCOM grids</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Commercial Operation (COD)</span>
                    <span className="text-emerald-700 font-bold">Verified Operating</span>
                  </div>
                </motion.div>

                {/* Ongoing Capacity Card */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white border border-sky-200/90 rounded-3xl p-8 shadow-xl shadow-sky-500/5 relative overflow-hidden flex flex-col justify-between group cursor-default"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-100/90 px-3 py-1 rounded-full border border-sky-300 shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-sky-600" /> Ongoing Execution
                      </span>
                    </div>
                    <div className="font-mono text-4xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">{formatMW(ongoingMW)}</div>
                    <p className="text-xs text-slate-600 font-mono font-medium">{ongoingProjects.length} active sites under engineering, civil foundation, &amp; EHV erection</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Target Synchronisation</span>
                    <span className="text-sky-700 font-bold">Active Construction</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Verified Breakdown Bar & State Distribution */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-slate-900">Portfolio Status Split</h3>
                    <p className="text-xs text-slate-500 font-mono">Verified MW distribution across operating statuses</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span>Commissioned ({formatMW(commissionedMW)})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-sky-500" />
                      <span>Ongoing ({formatMW(ongoingMW)})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <span>Pipeline ({formatMW(totalMW - commissionedMW - ongoingMW)})</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar with Motion */}
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-slate-200 mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(commissionedMW / totalMW) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-l-full shadow-sm"
                    title={`Commissioned: ${formatMW(commissionedMW)}`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(ongoingMW / totalMW) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-sky-500 shadow-sm"
                    title={`Ongoing: ${formatMW(ongoingMW)}`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((totalMW - commissionedMW - ongoingMW) / totalMW) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="h-full bg-slate-300 rounded-r-full"
                    title={`Pipeline: ${formatMW(totalMW - commissionedMW - ongoingMW)}`}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-2">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Operating States</div>
                    <div className="font-mono text-xl font-bold text-slate-900 mt-1">6 States</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">KUSUM Solar Sites</div>
                    <div className="font-mono text-xl font-bold text-[#707B00] mt-1">20 Projects</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Govt. Utility Sites</div>
                    <div className="font-mono text-xl font-bold text-slate-900 mt-1">4 Projects</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Grid Substation Sync</div>
                    <div className="font-mono text-xl font-bold text-emerald-700 mt-1">100% Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =========================================================
              SECTION 2: PROJECT HIGHLIGHTS (Featured Large Stories)
             ========================================================= */}
          <section id="highlights" className="scroll-mt-36 py-24 bg-white border-b border-slate-200/80">
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
          <section id="explore" className="scroll-mt-36 py-24 bg-[#F8FAF8] border-b border-slate-200/80">
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
          <section id="execution-impact" className="scroll-mt-36 py-24 bg-white border-b border-slate-200/80">
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

              {/* Turnkey Scope 4-Step Cards Grid with Stagger Motion */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
              >
                {EPC_SCOPE_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.num}
                      variants={fadeInUp}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="bg-[#F8FAF8] border border-slate-200 rounded-3xl p-7 flex flex-col justify-between hover:border-[#6DAD45] hover:shadow-xl transition-all shadow-md group cursor-default"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="font-mono text-2xl font-extrabold text-[#707B00] group-hover:scale-110 transition-transform">{step.num}</span>
                          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#6DAD45] group-hover:text-white group-hover:border-[#6DAD45] transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <h3 className="font-serif-display text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 group-hover:text-[#707B00] transition-colors">
                        <span>Sarhat Standard</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Measurable Impact Numbers Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800"
              >
                <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-3xl mb-10 relative z-10">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4E012] block mb-2">ENVIRONMENTAL &amp; GRID OUTCOMES</span>
                  <h3 className="font-serif-display text-2xl sm:text-4xl font-medium text-white">
                    Delivering Clean Energy &amp; Social Impact Across Regional Grids
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-white/10 pt-8 relative z-10">
                  <div className="group">
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-[#D4E012] group-hover:scale-105 transition-transform origin-left">78,000+</div>
                    <div className="text-xs font-mono text-slate-300 mt-1 uppercase font-bold">MT CO2 Offset / Year</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Equivalent to planting 3.2 Million trees annually.</p>
                  </div>
                  <div className="group">
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-white group-hover:scale-105 transition-transform origin-left">100%</div>
                    <div className="text-xs font-mono text-slate-300 mt-1 uppercase font-bold">DISCOM NOC Record</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Zero statutory delays in CEIG and grid NOCs.</p>
                  </div>
                  <div className="group">
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-[#5EE72D] group-hover:scale-105 transition-transform origin-left">24,000+</div>
                    <div className="text-xs font-mono text-slate-300 mt-1 uppercase font-bold">Farmers Empowered</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Reliable daytime solar feeder power for agriculture.</p>
                  </div>
                  <div className="group">
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-white group-hover:scale-105 transition-transform origin-left">0</div>
                    <div className="text-xs font-mono text-slate-300 mt-1 uppercase font-bold">LTI Incidents</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Strict adherence to high-voltage safety standards.</p>
                  </div>
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
