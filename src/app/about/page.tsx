"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
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
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

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

  const [activeValueIndex, setActiveValueIndex] = useState<number>(0);

  const coreValues = [
    {
      id: "integrity",
      num: "01",
      title: "Integrity",
      description:
        "Open to risks, honour our commitments and take responsibility for outcomes.",
      icon: ShieldCheck,
    },
    {
      id: "execution",
      num: "02",
      title: "Execution Excellence",
      description:
        "Agile team, bring engineering and site teams together to deliver safely, solve problems and improve with every project.",
      icon: Zap,
    },
    {
      id: "sustainability",
      num: "03",
      title: "Sustainable Progress",
      description:
        "Deliver cleaner energy while caring for the land, resources and communities each project touches.",
      icon: Leaf,
    },
  ];

  // Auto-rotation loop for Our Values circles without needing hover/click
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [coreValues.length]);

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
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / PAGE HEADER: short image banner, left-aligned title, bold lead paragraph below */}
        {/* ------------------------------------------------------------- */}
        <header className="relative z-10">
          <section className="relative overflow-hidden bg-[#0B120C] pt-[104px] sm:pt-[121px]">
            <Image
              src="/images/hero-solar.jpg"
              alt="Sarhat solar and wind energy infrastructure"
              fill
              preload
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* solid brand wash on the left, fading out by the middle of the banner */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B120C]/90 from-0% via-[#0B120C]/55 via-45% to-transparent to-80%" />

            <div className="relative mx-auto flex h-[200px] max-w-6xl items-center px-4 sm:h-[250px] sm:px-6 lg:px-8">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl font-sans-ui text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.75rem]"
              >
                People at the centre. Progress in every project.
              </motion.h1>
            </div>
          </section>

          <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
              <p className="font-sans-ui text-xl font-bold leading-snug tracking-tight text-[#333333] sm:text-[1.75rem] sm:leading-[1.35]">
                We bring people, engineering and execution together to turn clean–energy and infrastructure ideas into practical projects that create value for businesses, communities and India.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Sections */}
        <div className="relative z-10 bg-[#F8FAF8]">

          {/* ------------------------------------------------------------- */}
          {/* 02 / CORPORATE OVERVIEW & VIDEO SHOWCASE SECTION */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>


                {/* Who We Are Section (Matching Image 1 in Website Theme) */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-4">
                    WHO WE ARE
                  </AnimatedPillBadge>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight mb-6">
                    Who We Are
                  </h2>
                  <p className="text-slate-600 font-light text-base sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                    Sarhat is India&apos;s leading decarbonisation and renewable infrastructure solutions provider on a mission to build a fossil-free future through innovative and sustainable solutions.
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
          <section className="py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-6">
                  <ScrollReveal direction="left" distance={40}>


                    {/* Main Headline */}
                    <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-none mb-6">
                      YOUR TRUSTED <br />
                      <span className="text-[#6DAD45]">ENERGY PARTNER</span>
                    </h2>

                    {/* Long Editorial Paragraph */}
                    <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed text-justify">
                      Sarhat Energy is India’s emerging clean-energy EPCM partner, combining
breakthrough solar technologies with disciplined project execution for
residential, commercial, industrial, institutional and solar-park clients. From
detailed engineering to installation, commissioning and long-term
maintenance, we stay with every project - turning rooftops and open land into
reliable, revenue-generating energy assets.
Our Transmission & Sub-Station Division extends that expertise to the grid
itself, delivering high-voltage lines and sub-stations up to 400 kV, while our
infrastructure arm builds the roads, bridges and buildings that projects
depend on.
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
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>


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
          {/* 04.5 / OUR CORE VALUES SECTION (INTERCONNECTED CIRCLES REFERENCE DESIGN) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-[#070D08] border-b border-slate-800/90 relative z-10 text-white overflow-hidden select-none">
            {/* Dynamic Radial Ambient Spotlight shifting with active index */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-[#D4E012]/15 via-[#5EE72D]/10 to-transparent rounded-full blur-[150px] pointer-events-none transition-all duration-700"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={30}>
                {/* Website Brand Pill Badge */}
                <div className="flex justify-center mb-4">
                  <AnimatedPillBadge className="mb-2">
                    Our Core Values
                  </AnimatedPillBadge>
                </div>

                {/* Main Headline (2 lines website style) */}
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white tracking-tight text-center max-w-4xl mx-auto leading-tight mb-4 drop-shadow-lg">
                  Engineering Excellence for the <br />
                  <span className="text-[#D4E012] italic font-normal">Net-Zero Era</span>
                </h2>

                <p className="text-base sm:text-lg text-slate-300 font-normal max-w-3xl text-center leading-relaxed mx-auto mb-14 drop-shadow-md">
                  Our foundational execution principles driving engineering quality, site safety, and sustainable impact across India.
                </p>
              </ScrollReveal>

              {/* 3 Interconnected Overlapping Circles Container */}
              <ScrollReveal direction="up" distance={40} delay={0.15}>
                <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 my-6">
                  {coreValues.map((item, index) => {
                    const IconComp = item.icon;
                    const isActive = activeValueIndex === index;

                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => setActiveValueIndex(index)}
                        onMouseEnter={() => setActiveValueIndex(index)}
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[385px] lg:h-[385px] rounded-full p-7 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 backdrop-blur-2xl ${
                          index > 0 ? "md:-ml-10 lg:-ml-14" : ""
                        } ${
                          isActive
                            ? "bg-slate-950/95 border-2 border-[#D4E012] shadow-[0_0_60px_rgba(212,224,18,0.45)] z-30 scale-105"
                            : "bg-slate-950/65 border border-white/20 hover:border-[#D4E012]/70 hover:bg-slate-950/85 z-10 opacity-85 hover:opacity-100"
                        }`}
                      >
                        {/* Double Spinning Arc Rings on Active Circle */}
                        {isActive && (
                          <>
                            <svg
                              className="absolute inset-0 w-full h-full pointer-events-none animate-spin origin-center"
                              style={{ animationDuration: "12s" }}
                              viewBox="0 0 100 100"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="48.5"
                                fill="none"
                                stroke="#D4E012"
                                strokeWidth="1.8"
                                strokeDasharray="40 140"
                                className="opacity-95"
                              />
                            </svg>
                            <svg
                              className="absolute inset-0 w-full h-full pointer-events-none origin-center"
                              style={{ animation: "spin 8s linear infinite reverse" }}
                              viewBox="0 0 100 100"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="46"
                                fill="none"
                                stroke="#5EE72D"
                                strokeWidth="1.2"
                                strokeDasharray="25 110"
                                className="opacity-70"
                              />
                            </svg>
                          </>
                        )}

                        {/* Top Number Tag */}
                        <span
                          className={`absolute top-6 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                            isActive
                              ? "bg-[#D4E012] text-slate-950 border-[#D4E012] shadow-sm"
                              : "bg-slate-900/80 text-slate-400 border-white/10"
                          }`}
                        >
                          VALUE {item.num}
                        </span>

                        {/* Top Icon Badge */}
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mt-4 mb-4 shadow-lg transition-all duration-300 ${
                            isActive
                              ? "bg-[#D4E012] text-slate-950 shadow-[0_0_25px_rgba(212,224,18,0.6)] scale-110"
                              : "bg-[#D4E012]/20 border border-[#D4E012]/50 text-[#D4E012]"
                          }`}
                        >
                          <IconComp className="w-7 h-7 text-slate-950 stroke-[2.2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white mb-2 tracking-tight">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-[260px]">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Auto-Rotation Progress Indicator Dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {coreValues.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveValueIndex(i)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        activeValueIndex === i
                          ? "w-8 bg-[#D4E012] shadow-[0_0_12px_#D4E012]"
                          : "w-2.5 bg-slate-700 hover:bg-slate-500"
                      }`}
                      title={`Jump to ${v.title}`}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>



          {/* ------------------------------------------------------------- */}
          {/* 05 / THE ROAD AHEAD */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white relative z-10 border-b border-slate-200/80">
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
          {/* 06 / START YOUR SOLAR JOURNEY TODAY CTA BANNER (SARHAT BRAND COLORS) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-950 via-[#0A160C] to-slate-950 text-white relative z-10 overflow-hidden border-t border-[#6DAD45]/20">
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
        </div>

        {/* Footer */}
        <Footer />

        {/* Consultation Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
