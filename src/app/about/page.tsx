"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  Compass,
  CheckCircle2,
  Lock,
  ArrowDownRight,
  Leaf,
  Layers,
  Activity,
  Heart,
  HelpCircle,
  Play,
  Pause,
  Sun,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeFlightNode, setActiveFlightNode] = useState<string>("land");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const leadershipTeam = [
    {
      name: "Lalit Kumarr",
      role: "Founder & Managing Director",
      bio: "Seasoned leader with over 35 years of global experience across the energy sector, spanning solar, nuclear, thermal, and hydro power.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Ajay Singh",
      role: "Chief Financial Officer (CFO)",
      bio: "Chartered Accountant with over 30 years of experience in working as CFO & Board member across leading infrastructure enterprises.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Shrikant Bartakke",
      role: "Chief Growth Officer",
      bio: "Seasoned business leader with over 20 years of experience across telecommunications, infrastructure and renewable energy.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Ajit Shah",
      role: "Vice President",
      bio: "Over 18 years of diverse experience as a Business Development Leader, specializing in stakeholder management, government liaison, and project financial management.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Rajesh Kumar",
      role: "General Manager - Projects & Operation",
      bio: "Over 24 years of vast experience in Project Management, Operation Management, Grid Substation Execution and Solar O&M.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Harshita Arora",
      role: "Business Growth & Strategic Partnerships",
      bio: "Dynamic leader driving business growth through client acquisition, strategic partnerships, proposal management, and strengthening the company's business pipeline.",
      linkedin: "https://linkedin.com",
    },
  ];

  const coreValues = [
    {
      num: "01",
      title: "Integrity",
      description:
        "We are committed to upholding the highest standards of professionalism, ethics, and transparency in all our operations. Our ethical integrity ensures trust at every level.",
      icon: Heart,
      badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      image: "/images/hero-solar.jpg",
    },
    {
      num: "02",
      title: "Innovation",
      description:
        "We continually explore new technologies and strategies to provide cutting-edge solar energy solutions that address evolving energy needs with unprecedented speed.",
      icon: Zap,
      badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      image: "/images/bess-substation.jpg",
    },
    {
      num: "03",
      title: "Sustainability",
      description:
        "We strive to minimize environmental impact while helping our clients transition to clean, renewable energy sources that safeguard the planet for future generations.",
      icon: Leaf,
      badgeBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      image: "/images/agrivoltaics-project.jpg",
    },
    {
      num: "04",
      title: "Excellence",
      description:
        "Our dedication to quality ensures that every infrastructure project we undertake is completed to the highest standards of engineering craftsmanship and efficiency.",
      icon: Target,
      badgeBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      image: "/images/substation-project.jpg",
    },
  ];

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const flightNodes = [
    { id: "land", title: "LAND / SITE", sub: "Control", x: "18%", y: "30%" },
    { id: "approvals", title: "APPROVALS", sub: "Readiness", x: "42%", y: "25%" },
    { id: "schedule", title: "SCHEDULE", sub: "COD", x: "78%", y: "32%" },
    { id: "grid", title: "GRID", sub: "Evacuation", x: "28%", y: "70%" },
    { id: "design", title: "DESIGN", sub: "Maturity", x: "55%", y: "72%" },
    { id: "supply", title: "SUPPLY", sub: "Procurement", x: "82%", y: "76%" },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-hidden font-sans-ui">
      {/* Soft Ambient Porcelain Flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

      {/* Floating Transparent Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* ------------------------------------------------------------- */}
      {/* 01 / HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-screen w-full flex items-center pt-28 pb-16 overflow-hidden z-10 border-b border-neutral-900 bg-black select-none">
        {/* Background Image Layer (Fully Visible) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-solar.jpg"
            alt="Sarhat Bright Solar & Wind Energy Infrastructure"
            fill
            priority
            quality={95}
            className="object-cover object-center opacity-85"
          />
          {/* Soft Dark Vignette Scrim for High-Contrast Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Left-sliding Animated Content Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
            className="max-w-4xl"
          >
            {/* Tag */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="text-xs font-mono font-extrabold tracking-widest text-[#D4E012] uppercase mb-4 flex items-center justify-start gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4E012] animate-ping shadow-[0_0_8px_#D4E012]"></span>
              <span>ABOUT SARHAT</span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, x: -70 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 drop-shadow-lg"
            >
              People at the centre. <br />
              <span className="italic font-normal text-white">
                Progress in{" "}
                <span className="text-[#D4E012]">
                  every project.
                </span>
              </span>
            </motion.h1>

            {/* Description Box */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="bg-black/75 border border-white/20 backdrop-blur-xl p-6 sm:p-7 rounded-2xl shadow-2xl max-w-2xl"
            >
              <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
                We bring people, engineering and execution together to turn clean–energy and infrastructure ideas into practical projects that create value for businesses, communities and India.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 02 / CORPORATE OVERVIEW & VIDEO SHOWCASE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Category Breadcrumb */}
            <div className="text-[12px] font-mono uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2 font-semibold">
              <span className="text-[#707B00]">Corporate</span>
              <span className="text-slate-400">&gt;</span>
              <span className="text-slate-800 font-bold">Overview</span>
            </div>

            {/* Editorial Headline matching corporate standard */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 leading-relaxed tracking-tight mb-8 max-w-6xl">
              <strong className="font-semibold text-slate-900">
                Sarhat Energy &amp; Infrastructure is an Indian renewable engineering enterprise
              </strong>{" "}
              engaged in Turnkey Solar EPC, Wind Energy, BESS, Grid Substations, and Civil Infrastructure.
            </h2>

            {/* Detail Paragraphs */}
            <div className="space-y-4 max-w-6xl text-slate-600 font-normal text-base sm:text-lg leading-relaxed mb-16">
              <p>
                We are engaged in core, high-impact sectors of the Indian energy transition. Our integrated capabilities span the entire spectrum of &apos;design to delivery&apos;—including site control, grid evacuation feasibility, regulatory approvals, procurement, EPC execution, and long-term asset operation.
              </p>
              <p>
                Sustainability and technical discipline are embedded into our long-term strategy for growth. Sarhat&apos;s footprint extends across 6 key states with over 47 MW served and 65,792+ tonnes of annual CO2 emissions offset through high-yield clean power installations.
              </p>
            </div>
          </ScrollReveal>

          {/* Corporate Video Player Container */}
          <ScrollReveal direction="up" distance={40} delay={0.2}>
            <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-200 group">
              <video
                ref={videoRef}
                poster="/images/about-hero-bg-bright.jpg"
                src="/generate_professional_and_attr.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-[340px] sm:h-[480px] md:h-[600px] object-cover rounded-3xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Custom Play Button Overlay when video is paused/stopped */}
              {!isPlaying && (
                <div
                  onClick={handlePlayClick}
                  className="absolute inset-0 bg-slate-950/35 hover:bg-slate-950/20 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group/btn"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center transform group-hover/btn:scale-110 transition-transform duration-300 pl-1">
                    <Play className="w-9 h-9 text-slate-900 fill-slate-900" />
                  </div>
                  <span className="mt-5 px-5 py-2 rounded-full bg-slate-900/80 text-white font-mono text-xs font-semibold uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-lg">
                    Watch Corporate Film
                  </span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 / YOUR TRUSTED ENERGY PARTNER SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" distance={40}>
                {/* Category Tag */}
                <div className="text-xs font-mono text-[#6DAD45] font-extrabold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#6DAD45] rounded-full"></span>
                  <span>WELCOME TO SARHAT INFRA</span>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-none mb-6">
                  YOUR TRUSTED <br />
                  <span className="text-[#6DAD45]">ENERGY PARTNER</span>
                </h2>

                {/* Long Editorial Paragraph */}
                <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed text-justify">
                  Sarhat Infra is an integrated clean energy infrastructure company delivering end-to-end solutions across Engineering, Procurement &amp; Construction (EPC), Project Management Consultancy (PMC), and Operations &amp; Maintenance (O&amp;M). Our expertise spans Solar Power, Battery Energy Storage Systems (BESS), Wind Energy, and Agrivoltaics Projects, supporting projects from concept and engineering through commissioning and long-term asset management. Driven by innovation and execution excellence, Sarhat Infra is expanding into Green Hydrogen and next-generation energy technologies to accelerate the transition towards a sustainable, resilient, and low-carbon energy future.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column: Overlapping Dual Image Showcase Frame */}
            <div className="lg:col-span-6 relative pb-8 pr-4 sm:pb-10 sm:pr-8">
              <ScrollReveal direction="right" distance={40}>
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                  <Image
                    src="/images/hero-solar.jpg"
                    alt="Sarhat Solar Farm Aerial View"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Overlapping Bottom-Right Foreground Substation Image Frame */}
                <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 w-2/3 aspect-[16/10] rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20">
                  <Image
                    src="/images/bess-substation.jpg"
                    alt="Sarhat Substation & BESS Infrastructure"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 04 / OUR MISSION & VISION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-white border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Category Tag */}
            <div className="text-xs font-mono text-[#6DAD45] font-extrabold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#6DAD45] rounded-full"></span>
              <span>PURPOSE &amp; DIRECTION</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-14">
              Our <span className="text-[#6DAD45] font-bold">Mission</span> &amp; <span className="text-[#D97706] font-bold">Vision</span>
            </h2>
          </ScrollReveal>

          {/* 2 Feature Image Header Cards Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <ScrollReveal direction="left" distance={40}>
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                {/* Image Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/agrivoltaics-project.jpg"
                    alt="Sarhat Mission Solar Farm"
                    fill
                    className="object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

                  {/* Badge top left */}
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-md text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6DAD45]"></span>
                    <span>01 • MISSION</span>
                  </div>

                  {/* Center Title inside Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl sm:text-4xl font-serif-display font-bold text-white tracking-tight drop-shadow-md">
                      Our <span className="text-[#6DAD45]">Mission</span>
                    </h3>
                  </div>
                </div>

                {/* Card Body Text */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center bg-white">
                  <p className="text-slate-700 font-normal text-sm sm:text-base leading-relaxed">
                    To develop and execute bankable clean energy projects by combining strong EPC capabilities, land procurement with grid integration approval expertise, stakeholder management, and advanced energy solutions, while building future-ready capabilities to become Solar, BESS, Green Hydrogen Developer and actively contributing to Viksit Bharat 2047.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal direction="right" distance={40}>
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                {/* Image Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/substation-project.jpg"
                    alt="Sarhat Vision Renewable Ecosystem"
                    fill
                    className="object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

                  {/* Badge top left */}
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-md text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                    <span>02 • VISION</span>
                  </div>

                  {/* Center Title inside Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl sm:text-4xl font-serif-display font-bold text-white tracking-tight drop-shadow-md">
                      Our <span className="text-[#D97706]">Vision</span>
                    </h3>
                  </div>
                </div>

                {/* Card Body Text */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center bg-white">
                  <p className="text-slate-700 font-normal text-sm sm:text-base leading-relaxed">
                    To become a leading intelligent renewable energy ecosystem, delivering solar, storage, hybrid, and green hydrogen infrastructure through execution excellence, indigenous technology, and sustainable innovation.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 04.5 / OUR CORE VALUES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Tag */}
            <div className="text-center mb-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest text-[#6DAD45]">
                <span className="w-4 h-0.5 bg-[#6DAD45] rounded-full"></span>
                WHAT DRIVES US
                <span className="w-4 h-0.5 bg-[#6DAD45] rounded-full"></span>
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight text-center mb-4">
              Our <span className="text-[#6DAD45]">Core Values</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto text-center leading-relaxed mb-16">
              We don&apos;t just build clean energy infrastructure—we cultivate an enduring ecosystem where ethical integrity, technological innovation, and sustainable excellence thrive.
            </p>
          </ScrollReveal>

          {/* Core Values Vertical Banner Stack */}
          <div className="space-y-6 sm:space-y-8">
            {coreValues.map((item, index) => {
              const IconComp = item.icon;
              // Alternating direction: even index comes from left side, odd index comes from right side
              const cardDirection = index % 2 === 0 ? "right" : "left";
              return (
                <ScrollReveal key={item.title} direction={cardDirection} distance={60} delay={0.1}>
                  <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] shadow-2xl border border-slate-200 group flex flex-col justify-end p-8 sm:p-12 bg-slate-950">
                    {/* Background Image with Slow Zoom Hover */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Dark Directional Gradient Overlay for 100% Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20"></div>

                    {/* Content inside banner */}
                    <div className="relative z-10 max-w-3xl">
                      {/* Icon & Badge Pill */}
                      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-md mb-4">
                        <div className={`p-1 rounded-full ${item.badgeBg}`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-200">
                          CORE VALUE {item.num}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl sm:text-5xl font-serif-display font-bold text-white tracking-tight mb-3 drop-shadow-md">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-200 font-normal text-sm sm:text-base leading-relaxed max-w-2xl drop-shadow">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 02 / THE SARHAT EFFECT - RISK VS VALUE GRAPH */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-slate-200/80 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#707B00] uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#8A9600] animate-ping"></span>
                  THE SARHAT EFFECT
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                  As project risk falls, <br />
                  <span className="bg-gradient-to-r from-[#707B00] to-[#16A34A] bg-clip-text text-transparent">
                    Sarhat value rises.
                  </span>
                </h2>
              </div>
              <p className="text-slate-600 font-normal text-base max-w-md leading-relaxed">
                One continuous visual story: uncertainty moves down while confidence, control and execution value move up.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Graph Canvas Box */}
          <ScrollReveal direction="up" distance={50} delay={0.15}>
            <div className="bg-[#F8FAF8] rounded-3xl p-8 sm:p-12 border border-slate-200/80 relative overflow-hidden mb-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-200/80 px-3.5 py-1.5 rounded-full border border-slate-300">
                  <ArrowDownRight className="w-4 h-4 text-slate-600" />
                  <span className="uppercase tracking-widest font-bold">PROJECT RISK</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-black bg-gradient-to-r from-[#D4E012] to-[#5EE72D] px-4 py-1.5 rounded-full font-extrabold shadow-md">
                  <span className="uppercase tracking-widest">SARHAT VALUE</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Graph SVG canvas */}
              <div className="relative w-full h-[220px] sm:h-[260px] my-6">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="valueGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8A9600" />
                      <stop offset="100%" stopColor="#16A34A" />
                    </linearGradient>
                  </defs>

                  {/* Sloping Down Dark Line (Project Risk) */}
                  <line
                    x1="5"
                    y1="10"
                    x2="95"
                    y2="42"
                    stroke="#475569"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                    opacity="0.8"
                  />
                  {/* Sloping Up Chartreuse-to-Green Line (Sarhat Value) */}
                  <line
                    x1="5"
                    y1="42"
                    x2="95"
                    y2="10"
                    stroke="url(#valueGradLight)"
                    strokeWidth="3.5"
                    className="path-pulse"
                  />
                </svg>
              </div>

              {/* Graph X-Axis Labels */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase tracking-widest pt-4 border-t border-slate-200 font-bold">
                <span>START / FEASIBILITY</span>
                <span>ENGINEERING</span>
                <span>PROCUREMENT</span>
                <span>EXECUTION</span>
                <span className="text-[#16A34A]">DELIVERY / TRUST</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 2 Bottom Cards */}
          <ScrollReveal direction="up" distance={40} delay={0.25}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md">
                <span className="text-[10px] font-mono text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  WE REDUCE
                </span>
                <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                  Risk
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Technical gaps, coordination gaps, avoidable delays, quality surprises and unclear ownership.
                </p>
              </div>

              {/* High Contrast White Accent Panel */}
              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
                <span className="text-[10px] font-mono text-[#D4E012] font-black uppercase tracking-widest block mb-2">
                  WE RAISE
                </span>
                <h3 className="text-2xl font-serif-display font-bold text-white mb-3">
                  Confidence & Solar Value
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Clarity, accountability, execution visibility, safety and long-term asset confidence.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 / OUR CULTURE & PEOPLE FIRST */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-slate-200/80 bg-[#F8FAF8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Dual Image Stack */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal direction="left" distance={40}>
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/images/hero-solar.jpg"
                    alt="SARHAT Solar Plant"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                </div>

                {/* Overlapping Solar Badge Pill */}
                <div className="absolute -bottom-6 -right-4 sm:right-4 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-2xl border-2 border-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                  <span>People + Engineering + Execution</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Culture Info & 4 Cards */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right" distance={40}>
                <div className="text-xs font-semibold tracking-widest text-[#707B00] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8A9600]"></span>
                  OUR CULTURE & PEOPLE FIRST
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                  A people-first company in an execution-heavy industry.
                </h2>

                <p className="text-slate-700 font-normal text-sm sm:text-base leading-relaxed mb-10">
                  We believe people do their best work when they have context, ownership and respect. That means listening to site teams, supporting learning, giving clients honest answers and treating partners as part of the delivery chain.
                </p>
              </ScrollReveal>

              {/* 4 Culture Pillars */}
              <ScrollReveal direction="up" distance={40} delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:border-[#D4E012] transition-colors">
                    <span className="text-[10px] font-mono text-[#707B00] font-extrabold uppercase tracking-widest block mb-2">
                      CARE
                    </span>
                    <h3 className="text-base font-serif-display font-bold text-slate-900 mb-2">
                      Safety is personal.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every site decision should protect people before schedule.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:border-[#16A34A] transition-colors">
                    <span className="text-[10px] font-mono text-[#16A34A] font-extrabold uppercase tracking-widest block mb-2">
                      OWNERSHIP
                    </span>
                    <h3 className="text-base font-serif-display font-bold text-slate-900 mb-2">
                      Take responsibility.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Problems are surfaced early and solved together.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:border-[#D4E012] transition-colors">
                    <span className="text-[10px] font-mono text-[#707B00] font-extrabold uppercase tracking-widest block mb-2">
                      KNOWLEDGE
                    </span>
                    <h3 className="text-base font-serif-display font-bold text-slate-900 mb-2">
                      Stay curious.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We turn field experience into repeatable knowledge.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:border-[#16A34A] transition-colors">
                    <span className="text-[10px] font-mono text-[#16A34A] font-extrabold uppercase tracking-widest block mb-2">
                      TRUST
                    </span>
                    <h3 className="text-base font-serif-display font-bold text-slate-900 mb-2">
                      Say what is true.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Clear communication builds stronger relationships.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 / SARHAT EXECUTION RADAR */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-slate-200/80 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="text-xs font-semibold tracking-widest text-[#707B00] uppercase mb-3">
              WHAT SARHAT STANDS FOR
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl">
              Energy that works for people.
            </h2>
            <p className="text-slate-700 font-normal text-base sm:text-lg max-w-2xl leading-relaxed mb-16">
              From a rooftop that helps a family manage electricity costs to a utility-scale project that supports a larger power system, we believe good infrastructure should make everyday progress easier, cleaner and more dependable.
            </p>
          </ScrollReveal>

          {/* Radar Section */}
          <ScrollReveal direction="up" distance={40} delay={0.15}>
            <div className="mb-12">
              <div className="text-xs font-mono text-[#707B00] font-extrabold uppercase tracking-widest mb-3">
                SARHAT EXECUTION RADAR
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                Challenges move. <br />
                <span className="text-[#16A34A]">We keep the project moving.</span>
              </h2>
              <p className="text-slate-600 font-normal text-sm max-w-xl">
                Every project has obstacles. Our job is to identify them early, navigate them deliberately and keep the project on course.
              </p>
            </div>
          </ScrollReveal>

          {/* Radar Canvas Container */}
          <ScrollReveal direction="up" distance={50} delay={0.25}>
            <div className="bg-[#F8FAF8] rounded-3xl p-6 sm:p-10 border border-slate-200/80 relative overflow-hidden min-h-[380px] shadow-xl">
              <div className="relative w-full h-[320px] sm:h-[360px] border border-slate-200 rounded-2xl bg-white p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase font-bold">
                  <span>RISK FIELD</span>
                  <span className="text-[#707B00]">ENGINEERED PATH</span>
                  <span className="text-[#16A34A]">DELIVERY</span>
                </div>

                {/* Radar Floating Nodes */}
                {flightNodes.map((node) => {
                  const isActive = activeFlightNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveFlightNode(node.id)}
                      style={{ top: node.y, left: node.x }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                    >
                      <div
                        className={`px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 flex items-center gap-2 ${isActive
                          ? "bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold border-black scale-110 shadow-md"
                          : "bg-white text-slate-800 border-slate-300 hover:border-[#D4E012] shadow-sm"
                          }`}
                      >
                        <span>{node.title}</span>
                        <span className="opacity-80 font-normal">({node.sub})</span>
                      </div>
                    </button>
                  );
                })}

                {/* Center Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white font-extrabold px-5 py-2 rounded-full text-xs font-mono flex items-center gap-2 shadow-xl border-2 border-[#D4E012]">
                  <span>SARHAT</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4E012] animate-ping"></span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 04 / CLIMATE IMPACT */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-slate-200/80 bg-[#F8FAF8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#707B00] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8A9600] animate-ping"></span>
                  CLIMATE IMPACT & SUSTAINABILITY
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                  Measure the impact. <br />
                  <span className="text-slate-500 font-normal">Do not just describe it.</span>
                </h2>
              </div>
              <p className="text-slate-600 font-normal text-base max-w-md leading-relaxed">
                We will publish verified Sarhat portfolio numbers as our internal impact data is consolidated and audited.
              </p>
            </div>
          </ScrollReveal>

          {/* 2 Impact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left" distance={40}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-lg flex flex-col justify-between min-h-[320px]">
                <div>
                  <span className="text-[10px] font-mono text-[#707B00] font-extrabold uppercase tracking-widest block mb-4">
                    CO2 AVOIDED
                  </span>
                  <div className="font-serif-display text-6xl sm:text-7xl font-bold text-[#707B00] mb-2">
                    0
                  </div>
                  <div className="text-xs text-slate-600 font-mono mb-6">
                    tonnes of CO2 avoided through verified Sarhat projects
                  </div>

                  <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#D4E012]/30 border border-[#8A9600] text-[#556000] text-xs font-mono rounded-lg font-extrabold">
                      Verified data (Portfolio based)
                    </span>
                    <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono rounded-lg">
                      Annual (Impact reporting)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-normal leading-relaxed border-t border-slate-100 pt-4">
                  The live number should be replaced with Sarhat&apos;s verified cumulative calculation before launch. We have intentionally not invented a company-wide figure.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" distance={40}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-lg flex flex-col justify-between min-h-[320px]">
                <div>
                  <span className="text-[10px] font-mono text-[#16A34A] font-extrabold uppercase tracking-widest block mb-4">
                    HOW WE WILL CALCULATE
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-4">
                    Generation × approved emissions factor.
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                    For each project, record verified renewable generation and the applicable grid or displaced-emission factor. Aggregate the result by project and reporting year.
                  </p>
                </div>

                <p className="text-xs text-slate-500 font-normal leading-relaxed border-t border-slate-100 pt-4">
                  This is more credible than using generic tree-equivalent claims. Sarhat&apos;s existing solar calculator currently uses an example of 5.2 tonnes of CO2 avoided per year for a 5 kW system, but that is a customer estimate.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 05 / THE ROAD AHEAD */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-white relative z-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-10 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#D4E012]/20 via-[#5EE72D]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <span className="text-xs font-mono text-[#D4E012] font-extrabold uppercase tracking-widest block mb-4">
                THE ROAD AHEAD
              </span>

              <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6 max-w-3xl">
                Energy today. <br />
                <span className="text-[#D4E012]">More possibilities tomorrow.</span>
              </h2>

              <p className="text-slate-300 font-normal text-base sm:text-lg max-w-xl leading-relaxed">
                Hospitality is planned as a future vertical and will be developed separately under its own brand and website.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 05.5 / MEET OUR TOP MANAGEMENT SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Category Tag */}
            <div className="text-xs font-mono text-[#707B00] font-extrabold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#6DAD45] rounded-full"></span>
              <span>OUR LEADERSHIP</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
              Meet Our <span className="text-[#6DAD45]">Top Management</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 font-normal text-base sm:text-lg max-w-3xl leading-relaxed mb-16">
              Experienced leaders driving renewable energy across solar, BESS, substations, and green hydrogen infrastructure.
            </p>
          </ScrollReveal>

          {/* Grid of 6 Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {leadershipTeam.map((member, index) => (
              <ScrollReveal key={member.name} direction="up" distance={40} delay={index * 0.08}>
                <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#6DAD45] transition-all duration-300 flex flex-col justify-between min-h-[270px] group h-full">
                  <div>
                    <h3 className="text-xl font-serif-display font-bold text-slate-900 mb-1 group-hover:text-[#6DAD45] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-mono font-bold text-[#6DAD45] uppercase tracking-wider mb-4">
                      {member.role}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#122E1A] text-white text-xs font-mono font-semibold hover:bg-[#6DAD45] transition-colors duration-200 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9Z" />
                      </svg>
                      <span>Connect</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 06 / START YOUR SOLAR JOURNEY TODAY CTA BANNER (SARHAT BRAND COLORS) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-950 via-[#0A160C] to-slate-950 text-white relative z-10 overflow-hidden border-t border-[#6DAD45]/20">
        {/* Ambient Brand Glowing Flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D4E012]/15 via-[#6DAD45]/15 to-transparent rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ScrollReveal direction="up" distance={30}>
            {/* Top Sun Icon Badge in Sarhat Chartreuse */}
            <div className="w-14 h-14 rounded-2xl bg-[#D4E012] flex items-center justify-center text-slate-950 mx-auto mb-8 shadow-[0_0_25px_rgba(212,224,18,0.35)] transform hover:rotate-6 transition-transform">
              <Sun className="w-8 h-8 text-slate-950 fill-slate-950/20" />
            </div>

            {/* Headline with Brand Accent */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-5">
              Start Your{" "}
              <span className="text-[#D4E012] drop-shadow-[0_2px_10px_rgba(212,224,18,0.3)]">
                Solar Journey
              </span>{" "}
              Today
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg font-normal max-w-2xl leading-relaxed mb-10 mx-auto">
              Join 80+ clients who trust Sarhat to deliver clean energy at scale. Let&apos;s build your solar future together.
            </p>

            {/* CTA Buttons in Sarhat Palette */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4E012] text-slate-950 font-bold text-base hover:bg-[#6DAD45] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-[#D4E012]/20 flex items-center justify-center gap-2 group"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 hover:border-[#D4E012] hover:scale-105 active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center"
              >
                Call Us Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </main>
  );
}
