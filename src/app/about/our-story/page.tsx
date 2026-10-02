"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { MilestoneNode, MilestoneReveal, ParallaxImage, type MilestoneStatus } from "@/components/MilestoneMotion";
import {
  Sparkles,
  Target,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Calendar,
  CheckCircle2,
  Building2,
  TrendingUp,
  ArrowRight,
  Compass,
  Rocket,
  Layers,
  MapPin,
  Cpu,
  Car,
  BatteryCharging,
} from "lucide-react";

export default function OurStoryPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("ALL");

  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Index (within the filtered list) of the milestone currently centred in the viewport; -1 = not reached yet
  const [activeIndex, setActiveIndex] = useState(-1);

  // Parallax & Scroll Fade-out Tracking for Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll Progress for Timeline Beam
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 80%"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const bgDim = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.85]);

  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-60px"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(10px)"]);

  const beamHeight = useTransform(timelineScrollProgress, [0, 1], ["0%", "100%"]);

  const keyMoments = [
    {
      year: "2024",
      headline: "Sarhat Begins",
      tag: "FOUNDATION & OWNERSHIP",
      subtitle: "ESTABLISHED BY INDUSTRY ENGINEERS",
      description:
        "After more than a decade in the energy industry, two engineers and friends founded Sarhat with a shared belief: when people are trusted to grow and take ownership, they can build projects that make a lasting difference.",
      icon: Target,
      metrics: ["2 Founder Engineers", "Solar EPC Focus", "Zero Safety Incidents"],
      achievements: [
        "Founded with engineering discipline & execution-first culture",
        "Delivered initial commercial rooftop & ground-mount solar installations",
        "Established standardized site safety & quality assurance frameworks",
      ],
      badgeColor: "bg-[#6DAD45]/15 text-[#6DAD45] border-[#6DAD45]/30",
      image: "/images/timeline-2024.jpg",
      imageCaption: "Initial Rooftop Solar & Site Quality Standards",
    },
    {
      year: "2025",
      headline: "Solar & EV Infrastructure",
      tag: "EV MOBILITY & FAST CHARGING",
      subtitle: "SOLAR + EV CHARGING HUBS",
      description:
        "Pioneered integrated solar-assisted EV fast-charging stations and corporate fleet charging hubs, seamlessly connecting solar power generation with electric mobility infrastructure.",
      icon: Car,
      metrics: ["Solar EV Hubs", "DC Fast Chargers", "Smart Fleet Power"],
      achievements: [
        "Deployed solar-assisted EV fast-charging stations for industrial & commercial fleets",
        "Integrated smart load management & grid balancing for electric vehicle hubs",
        "Established automated remote telemetry & real-time charging network O&M",
      ],
      badgeColor: "bg-[#D4E012]/25 text-[#707B00] border-[#D4E012]/60",
      image: "/images/timeline-ev-charging.jpg",
      imageCaption: "Solar-Powered EV Fast Charging Infrastructure",
    },
    {
      year: "2025+",
      headline: "Our Footprint Grows",
      tag: "3 STATES DELIVERED",
      subtitle: "REGIONAL SCALE & MULTI-SITE EXECUTION",
      description:
        "Sarhat installed solar projects across three major industrial states, turning early vision into high-yielding operational clean energy assets on the ground.",
      icon: TrendingUp,
      metrics: ["3 States Active", "15+ Project Sites", "100% On-Time COD"],
      achievements: [
        "Executed commercial, industrial (C&I) & utility solar parks across 3 states",
        "Built dedicated in-house Operations & Maintenance (O&M) service capabilities",
        "Expanded site engineering, procurement & land clearance teams",
      ],
      badgeColor: "bg-[#6DAD45]/20 text-[#6DAD45] border-[#6DAD45]/40",
      image: "/images/timeline-2025.jpg",
      imageCaption: "Multi-State Commercial & Industrial Solar Parks",
    },
    {
      year: "2026",
      headline: "New Capabilities, Wider Reach",
      tag: "7 STATES & MULTI-INFRASTRUCTURE",
      subtitle: "GRID SUBSTATIONS & BESS INTEGRATION",
      description:
        "Sarhat expanded into battery storage (BESS), 33kV/132kV/220kV grid substations, and civil infrastructure, extending delivery across seven states.",
      icon: Globe,
      metrics: ["7 States Presence", "220kV Grid Substations", "Containerized BESS"],
      achievements: [
        "Constructed 33kV / 132kV / 220kV grid substations and SCADA systems",
        "Integrated utility-scale containerized BESS & solar-storage hybrids",
        "Delivered site access roads, piling foundations & drainage infrastructure",
      ],
      badgeColor: "bg-[#5EE72D]/20 text-[#16A34A] border-[#5EE72D]/50",
      image: "/images/timeline-2026.jpg",
      imageCaption: "220kV High-Voltage Substation & BESS Storage",
    },
    {
      year: "2027+",
      headline: "Next-Gen Energy & Global Horizon",
      tag: "FUTURE INFRASTRUCTURE",
      subtitle: "AGROVOLTAICS & GREEN HYDROGEN",
      description:
        "Pioneering agrovoltaics, green hydrogen infrastructure, and smart microgrids, carrying Sarhat's trusted execution model to national and global markets.",
      icon: Rocket,
      metrics: ["Agrovoltaics", "Green Hydrogen", "Global Expansion"],
      achievements: [
        "Developing dual-use agrovoltaic solar projects combining farming & power",
        "Pioneering green hydrogen generation & storage infrastructure",
        "Forging global strategic alliances for large-scale energy transition",
      ],
      badgeColor: "bg-[#707B00]/20 text-[#707B00] border-[#707B00]/40",
      image: "/images/timeline-2027.jpg",
      imageCaption: "Agrovoltaics & Green Hydrogen Infrastructure",
    },
  ];

  const filteredMoments =
    selectedYearFilter === "ALL"
      ? keyMoments
      : keyMoments.filter((m) => m.year.includes(selectedYearFilter));

  // Activate the milestone that crosses the middle band of the viewport
  useEffect(() => {
    const rows = rowRefs.current.slice(0, filteredMoments.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = rows.indexOf(entry.target as HTMLDivElement);
          if (idx >= 0) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, [filteredMoments.length]);

  const handleYearFilter = (year: string) => {
    setSelectedYearFilter(year);
    setActiveIndex(-1);
    // Bring the (re)filtered journey into view smoothly; the observer then activates the milestone
    requestAnimationFrame(() => timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky Background Image Overlay Hero) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
          >
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/about-hero-bg-bright.jpg"
                alt="Our Story — Sarhat Energy"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                    Rooted in India. <br />
                    <span className="text-[#D4E012] italic font-normal">Trusted Globally.</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-5xl text-center leading-relaxed font-normal drop-shadow-md">
                    Sarhat is an execution-led energy and infrastructure company. Engineering discipline, hands-on delivery and continuous learning shape every project we deliver.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ------------------------------------------------------------- */}
          {/* VISION STATEMENT SECTION (CENTERED) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#F8FAF8] border-2 border-slate-200/90 rounded-3xl p-8 sm:p-14 shadow-2xl relative text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5EE72D]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Centered Yellow Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-8">
                    <Compass className="w-4 h-4 text-slate-950" />
                    <span>VISION STATEMENT</span>
                  </div>

                  {/* Main Vision Headline Paragraph */}
                  <h2 className="text-2xl sm:text-4xl md:text-4xl font-serif-display font-bold text-slate-900 leading-snug tracking-tight mb-8 max-w-4xl mx-auto">
                    &ldquo;Sarhat aspires to be an India-rooted energy and infrastructure company trusted globally for safe, reliable execution.&rdquo;
                  </h2>

                  {/* Vision Paragraphs */}
                  <div className="space-y-6 max-w-3xl mx-auto text-slate-700 font-normal text-base sm:text-lg leading-relaxed text-center">
                    <p>
                      Building on our solar EPC foundations, we will develop connected capabilities in renewable energy, storage, grid systems and civil infrastructure. We will invest in our people, strengthen our engineering and learn from every project we deliver.
                    </p>
                    <p className="font-medium text-slate-900">
                      We will measure our progress by the trust we earn, the capability we build and the lasting value our projects create for customers, partners, communities and the environment.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* KEY MOMENTS SECTION (HIGHLY ANIMATED PROFESSIONAL TIMELINE) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 sm:py-32 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 overflow-hidden">
            {/* Background Gradient Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-[#6DAD45]/10 via-[#D4E012]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#5EE72D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header */}
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6DAD45]/15 border border-[#6DAD45]/30 text-[#6DAD45] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    <Calendar className="w-3.5 h-3.5 text-[#6DAD45]" />
                    <span>TIMELINE & MILESTONES</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Key <span className="bg-gradient-to-r from-[#6DAD45] via-[#707B00] to-[#16A34A] bg-clip-text text-transparent italic font-serif-display">Moments</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                    The growth trajectory of Sarhat Energy & Infrastructure — from solar EPC and clean EV mobility to multi-state execution.
                  </p>
                </div>
              </ScrollReveal>

              {/* Interactive Year Filter Bar */}
              <ScrollReveal direction="up" distance={20} delay={0.1}>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
                  {["ALL", "2024", "2025", "2026", "2027+"].map((year) => {
                    const isActive = selectedYearFilter === year;
                    return (
                      <button
                        key={year}
                        onClick={() => handleYearFilter(year)}
                        className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 shadow-sm cursor-pointer ${
                          isActive
                            ? "bg-slate-950 text-[#D4E012] border-2 border-[#6DAD45] scale-105 shadow-lg shadow-[#6DAD45]/20"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-[#6DAD45] hover:text-slate-900"
                        }`}
                      >
                        {year === "ALL" ? "All Milestones" : `Year ${year}`}
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Animated Timeline Container */}
              <div ref={timelineRef} className="relative scroll-mt-28 space-y-16 sm:space-y-24">
                {/* Central Track & Animated Gradient Beam */}
                <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-slate-200/90 rounded-full overflow-hidden pointer-events-none">
                  <motion.div
                    style={{ height: beamHeight }}
                    className="w-full bg-gradient-to-b from-[#6DAD45] via-[#D4E012] to-[#5EE72D] shadow-[0_0_20px_rgba(109,173,69,0.9)] relative"
                  >
                    {/* Static glowing head of the progress beam */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-10 bg-white/90 rounded-full blur-xs" />
                  </motion.div>
                </div>

                {filteredMoments.map((moment, index) => {
                  const IconComp = moment.icon;
                  const isEven = index % 2 === 0;
                  const status: MilestoneStatus =
                    index < activeIndex ? "completed" : index === activeIndex ? "current" : "upcoming";

                  // Image Showcase Card component
                  const ImageShowcaseCard = (
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="relative h-64 sm:h-[360px] w-full rounded-[28px] overflow-hidden border-2 border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#6DAD45]/25 group cursor-pointer transition-all duration-500"
                    >
                      <ParallaxImage>
                        <Image
                          src={moment.image}
                          alt={moment.headline}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                      </ParallaxImage>
                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95" />

                      {/* Top Badge */}
                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[#D4E012] font-mono text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3 h-3 text-[#5EE72D]" />
                        <span>{moment.year} SHOWCASE</span>
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#6DAD45]/30 border border-[#6DAD45]/50 text-[#D4E012] text-[10px] font-mono font-bold uppercase tracking-wider mb-2 backdrop-blur-sm">
                          <MapPin className="w-3 h-3 text-[#D4E012]" />
                          <span>{moment.tag}</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-serif-display font-medium text-white drop-shadow-sm group-hover:text-[#D4E012] transition-colors leading-snug">
                          {moment.imageCaption}
                        </h4>
                      </div>
                    </motion.div>
                  );

                  // Content Details Card component
                  const ContentDetailsCard = (
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="bg-white border-2 border-slate-200/90 hover:border-[#6DAD45] p-7 sm:p-9 rounded-[28px] shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#6DAD45]/20 transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-between"
                    >
                      {/* Ambient Corner Glow Flare */}
                      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#6DAD45]/10 rounded-full blur-2xl group-hover:bg-[#6DAD45]/25 transition-all duration-500 pointer-events-none" />

                      <div>
                        {/* Top Badge & Tag Header */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <span
                            className={`text-[10px] font-mono font-extrabold px-3 py-1.5 rounded-full border uppercase tracking-widest ${moment.badgeColor}`}
                          >
                            {moment.tag}
                          </span>

                          <div className="w-10 h-10 rounded-2xl bg-[#F8FAF8] border border-slate-200 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors duration-300 shadow-sm">
                            <IconComp className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Year & Headline */}
                        <div className="mb-4">
                          <span className="text-xs font-mono font-bold text-slate-600 block mb-1">
                            {moment.subtitle}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-[#0F172A] group-hover:text-[#6DAD45] transition-colors leading-snug">
                            {moment.year} — {moment.headline}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                          {moment.description}
                        </p>

                        {/* Specs / Metrics Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {moment.metrics.map((metric) => (
                            <span
                              key={metric}
                              className="text-[11px] font-mono px-3 py-1 bg-[#F8FAF8] border border-slate-200 text-slate-800 rounded-lg font-semibold shadow-2xs"
                            >
                              ✓ {metric}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements Bullet List */}
                      <div className="pt-4 border-t border-slate-100 space-y-2.5">
                        {moment.achievements.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-normal font-light">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );

                  return (
                    <div
                      key={moment.year}
                      ref={(el) => {
                        rowRefs.current[index] = el;
                      }}
                      className="relative"
                    >
                      {/* DESKTOP LAYOUT (sm and up): Alternating Text Card & Image Showcase */}
                      <div className="hidden sm:flex items-center justify-between flex-row gap-6">
                        {/* Left Column */}
                        <div className="w-5/12">
                          <MilestoneReveal mask={!isEven} delay={0.05}>
                            {isEven ? ContentDetailsCard : ImageShowcaseCard}
                          </MilestoneReveal>
                        </div>

                        {/* Center Year Node: muted → expands + burst when reached → settles; check once completed */}
                        <MilestoneNode
                          year={moment.year}
                          status={status}
                          size="lg"
                          hoverIcon={<IconComp className="w-6 h-6 text-[#5EE72D]" />}
                        />

                        {/* Right Column */}
                        <div className="w-5/12">
                          <MilestoneReveal mask={isEven} delay={0.05}>
                            {isEven ? ImageShowcaseCard : ContentDetailsCard}
                          </MilestoneReveal>
                        </div>
                      </div>

                      {/* MOBILE LAYOUT (less than sm): Vertical Stack */}
                      <div className="flex sm:hidden flex-col space-y-5 pl-10 relative">
                        {/* Mobile Year Node */}
                        <div className="absolute left-0 top-0">
                          <MilestoneNode year={moment.year} status={status} size="sm" />
                        </div>

                        {/* Image Showcase Card on Mobile */}
                        <MilestoneReveal mask>{ImageShowcaseCard}</MilestoneReveal>

                        {/* Content Details Card on Mobile */}
                        <MilestoneReveal delay={0.1}>{ContentDetailsCard}</MilestoneReveal>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* CORE PILLARS SECTION */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    What Guides Us
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight">
                    Our Foundation & <span className="text-[#707B00]">Pillars</span>
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pillar 1 */}
                <ScrollReveal direction="up" distance={40} delay={0.1}>
                  <div className="bg-[#F8FAF8] border border-slate-200/90 hover:border-[#D4E012] p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center text-[#707B00] mb-6 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-colors">
                        <Target className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">Rooted in India</h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        Deeply connected to India&apos;s clean energy goals, building local infrastructure resilience with world-class engineering standards.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Pillar 2 */}
                <ScrollReveal direction="up" distance={40} delay={0.2}>
                  <div className="bg-[#F8FAF8] border border-slate-200/90 hover:border-[#D4E012] p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center text-[#707B00] mb-6 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-colors">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">Execution Discipline</h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        Hands-on delivery, zero-compromise safety protocols, and rigorous quality control from site survey to commissioning.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Pillar 3 */}
                <ScrollReveal direction="up" distance={40} delay={0.3}>
                  <div className="bg-[#F8FAF8] border border-slate-200/90 hover:border-[#D4E012] p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center text-[#707B00] mb-6 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-colors">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">Global Ambition</h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        Earning trust globally through scalable renewable energy designs, storage integration, and sustainable infrastructure.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Quote Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
