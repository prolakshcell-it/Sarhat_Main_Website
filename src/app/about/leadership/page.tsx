"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import { X, ArrowUpRight } from "lucide-react";

interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  description?: string;
  fullBio: string;
  education?: string;
  experience?: string;
  image?: string;
  initials?: string;
  linkedin: string;
}

const directors: LeaderProfile[] = [
  {
    id: "satish-chaudhary",
    name: "Satish Chaudhary",
    role: "Managing Director",
    description: "Leads business strategy, project origination and client partnerships.",
    fullBio:
      "Satish Chaudhary serves as Managing Director of Sarhat Energy. With 13 years of leadership in energy, infrastructure, and enterprise execution, he guides Sarhat's corporate vision, strategic project origination, capital allocation, and multi-gigawatt clean energy execution across India.",
    education: "Executive Leadership & Energy Management",
    experience: "13 Years Experience",
    image: "/team-heads/satish-chaudhary.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "avishek-anand",
    name: "Avishek Anand",
    role: "Director Operations",
    description: "Oversees engineering, site execution and project quality.",
    fullBio:
      "Avishek Anand serves as Director Operations at Sarhat Energy. Bringing 12 years of specialized operational expertise, he oversees turnkey site execution, multi-state project delivery timelines, field engineering coordination, and high-standard safety compliance across all utility-scale and commercial projects.",
    education: "B.Tech Engineering & Project Management",
    experience: "12 Years Experience",
    image: "/team-heads/avishek-anand.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "radha-kumari",
    name: "Radha Kumari",
    role: "Head of HR",
    description: "Leads talent development, people operations and workplace culture.",
    fullBio:
      "Radha Kumari leads Human Resources at Sarhat Energy. With 6 years of focused HR and talent leadership, she spearheads human capital management, organizational culture, workforce inclusion, policy frameworks, and continuous skill upskilling across on-site execution crews and corporate departments.",
    education: "MBA Human Resources Management",
    experience: "6 Years Experience",
    image: "/team-heads/radha-kumari-v4.jpg",
    initials: "RK",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
];

const functionalLeaders: LeaderProfile[] = [
  {
    id: "naresh-kumar",
    name: "Naresh Kumar",
    role: "Head of Business Growth & Strategic Alliances",
    initials: "NK",
    fullBio:
      "Naresh Kumar leads Business Growth and Strategic Alliances at Sarhat Energy. With over 14 years of industry experience, he manages institutional developer alliances, corporate PPA origination, state regulatory liaison, and strategic business expansion in solar, BESS storage, and agrovoltaic sectors.",
    education: "MBA Business Strategy & Marketing",
    experience: "14 Years Experience",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "ayush-raj",
    name: "Ayush Raj",
    role: "Manager – Business Development",
    image: "/team-heads/ayush-raj-v2.jpg",
    initials: "AR",
    fullBio:
      "Ayush Raj serves as Manager Business Development at Sarhat Energy. Bringing 3 years of dynamic business development and client engagement experience, he focuses on pipeline origination, tender analytics, commercial proposals, and client relationship management for commercial and utility clients.",
    education: "B.E. / B.Tech & Business Management",
    experience: "3 Years Experience",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "avishek-jha",
    name: "Avishek Jha",
    role: "Head of Operations",
    image: "/team-heads/avishek-jha.jpg",
    fullBio:
      "Avishek Jha serves as Head Operations at Sarhat Energy. With 12 years of hands-on technical and operational leadership, he directs site mobilization, field contractor performance, milestone scheduling, and inter-departmental logistics across high-voltage substation and solar generation sites.",
    education: "B.Tech Electrical & Electronics",
    experience: "12 Years Experience",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "amar-nath-jha",
    name: "Amar Nath Jha",
    role: "Head of Supply Chain Management",
    image: "/team-heads/amar-nath-jha.png",
    fullBio:
      "Amar Nath Jha leads Supply Chain Management at Sarhat Energy. Bringing 10 years of specialized procurement and supply chain experience, he steers vendor qualification, Tier-1 solar module & inverter procurement, logistics optimization, and material delivery assurance to maintain site schedules.",
    education: "Supply Chain & Operations Management",
    experience: "10 Years Experience",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "kana-sharma",
    name: "Kana Sharma",
    role: "Manager – Projects & Liaison",
    image: "/team-heads/kana-sharma.jpg",
    fullBio:
      "Kana Sharma serves as Manager Projects & Liaison at Sarhat Energy. With 4 years of dedicated liaison and project management experience, she coordinates state electricity board clearances, DISCOM grid approvals, statutory compliance, and smooth inter-agency communication for swift commissioning.",
    education: "B.Tech Engineering & Regulatory Management",
    experience: "4 Years Experience",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "prawesh-kumar-jha",
    name: "Prawesh Kumar Jha",
    role: "Manager – Design & Engineering",
    image: "/team-heads/prawesh-kumar-jha.jpg",
    fullBio:
      "Prawesh Kumar Jha serves as Manager Design & Engineering at Sarhat Energy. With 4 years of specialized engineering design expertise, he oversees plant layout optimization, 3D modeling, shadow analysis, single line diagrams (SLD), and structural validation to maximize energy yield.",
    education: "B.Tech Electrical / Power Systems",
    experience: "4 Years Experience",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
];

export default function LeadershipPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking for Hero
  const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky Background Image Overlay Hero) */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}>
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/about-hero-bg.jpg"
                alt="The people behind Sarhat Energy"
                fill
                priority
                className="object-cover object-center opacity-85" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 via-45% to-black/40 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform">
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center w-full">
                  <AnimatedPillBadge className="mb-6">
                    LEADERSHIP
                  </AnimatedPillBadge>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)]">
                    The people behind <br className="hidden sm:inline" />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      Sarhat Energy.
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-3 text-[#D4E012]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal max-w-3xl mx-auto text-center leading-relaxed tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)] mb-8">
                    Meet the leaders who shape our business, lead project delivery and build our teams.
                  </p>

                  <div>
                    <a
                      href="#directors"
                      className="inline-flex items-center gap-2 border-2 border-[#D4E012] hover:bg-[#D4E012]/15 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer">
                      <span>Meet Our Leaders</span>
                      <span className="text-[#D4E012] text-lg font-bold">↓</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 1: DIRECTORS */}
          {/* ------------------------------------------------------------- */}
          <section id="directors" className="py-14 sm:py-20 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center mb-10 sm:mb-14">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Directors
                  </h2>
                  <div className="w-12 h-0.5 bg-[#6DAD45] mx-auto mt-3 rounded-full" />
                </div>
              </ScrollReveal>

              {/* 3 Directors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {directors.map((director, idx) => (
                  <ScrollReveal key={director.id} direction="up" distance={30} delay={idx * 0.08}>
                    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#6DAD45]/40">
                      <div>
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-100">
                          {director.image && (
                            <Image
                              src={director.image}
                              alt={director.name}
                              fill
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                          )}
                        </div>
                        <h3 className="text-xl font-serif-display font-bold text-slate-900 mb-1">
                          {director.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-sans font-medium text-slate-600 mb-3">
                          {director.role}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mb-5">
                          {director.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedLeader(director)}
                        className="text-xs font-semibold text-[#6DAD45] hover:text-[#5cb338] transition-colors inline-flex items-center gap-1.5 cursor-pointer w-fit">
                        <span>Read bio</span>
                        <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: FUNCTIONAL & PROJECT LEADERSHIP */}
          {/* ------------------------------------------------------------- */}
          <section className="py-14 sm:py-20 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center mb-10 sm:mb-14">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Functional &amp; Project Leadership
                  </h2>
                  <div className="w-12 h-0.5 bg-[#6DAD45] mx-auto mt-3 rounded-full" />
                </div>
              </ScrollReveal>

              {/* 6 Leaders Grid (3 Cols x 2 Rows) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {functionalLeaders.map((leader, idx) => (
                  <ScrollReveal key={leader.id} direction="up" distance={30} delay={idx * 0.05}>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex items-center gap-4 group h-full">
                      {/* Avatar Left */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 shadow-inner">
                        {leader.image ? (
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        ) : leader.initials ? (
                          <div className="w-full h-full bg-[#0B1E36] text-white font-serif-display font-bold text-2xl flex items-center justify-center tracking-wider">
                            {leader.initials}
                          </div>
                        ) : null}
                      </div>

                      {/* Content Right */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-serif-display font-bold text-slate-900 leading-tight mb-1 truncate">
                          {leader.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-sans leading-snug mb-2 line-clamp-2">
                          {leader.role}
                        </p>
                        <button
                          onClick={() => setSelectedLeader(leader)}
                          className="text-xs font-semibold text-[#6DAD45] hover:text-[#5cb338] transition-colors inline-flex items-center gap-1 cursor-pointer">
                          <span>Read bio</span>
                          <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* CLOSING SECTION: HOW WE LEAD AT SARHAT */}
          {/* ------------------------------------------------------------- */}
          <section className="py-12 sm:py-16 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#0B1528] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Side: Photo Frame */}
                  <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-slate-900">
                    <Image
                      src="/images/leadership-how-we-lead-hd.jpg"
                      alt="How we lead at Sarhat"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center" />
                  </div>

                  {/* Right Side: Dark Panel with Content */}
                  <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-white relative bg-[#071120]">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-white tracking-tight leading-[1.15] mb-5">
                      How we lead <br />
                      <span className="text-[#D4E012] italic relative inline-block">
                        at Sarhat.
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-2.5 text-[#D4E012]"
                          viewBox="0 0 100 20"
                          preserveAspectRatio="none"
                          aria-hidden="true">
                          <path
                            d="M0 15 Q 50 0 100 15"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            fill="transparent" />
                        </svg>
                      </span>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
                      We give teams clear ownership, encourage them to raise issues early, and take responsibility for safety and quality from design through commissioning. After each project, we carry the lessons into the next one.
                    </p>

                    <div>
                      <Link
                        href="/about/culture-people"
                        className="inline-flex items-center gap-2 bg-[#5EE72D] hover:bg-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#5EE72D]/20 hover:scale-105 cursor-pointer group">
                        <span>EXPLORE LIFE AT SARHAT</span>
                        <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Quote Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE BIO MODAL DIALOG */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {selectedLeader && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border-2 border-slate-200 rounded-3xl max-w-2xl w-full relative shadow-2xl overflow-hidden text-slate-900">
                {/* Header Banner */}
                <div className="bg-[#0F172A] p-6 sm:p-8 text-white relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6DAD45]/30 via-[#0F172A] to-[#0F172A]">
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-black/40 border border-white/10 transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#6DAD45] shrink-0 bg-slate-800 shadow-xl">
                      {selectedLeader.image ? (
                        <Image
                          src={selectedLeader.image}
                          alt={selectedLeader.name}
                          fill
                          className="object-cover object-top" />
                      ) : selectedLeader.initials ? (
                        <div className="w-full h-full bg-[#0B1E36] text-white font-serif-display font-bold text-3xl flex items-center justify-center">
                          {selectedLeader.initials}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-[#6DAD45] mb-1">
                        {selectedLeader.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-200 font-semibold">{selectedLeader.role}</p>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      LEADERSHIP BIOGRAPHY
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed whitespace-pre-line">
                      {selectedLeader.fullBio}
                    </p>
                  </div>

                  {selectedLeader.education && (
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                        QUALIFICATIONS &amp; EDUCATION
                      </h4>
                      <p className="text-xs font-mono text-[#6DAD45] font-semibold">{selectedLeader.education}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {selectedLeader.experience || "Sarhat Energy Leadership"}
                    </span>
                    <a
                      href={selectedLeader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#6DAD45] hover:text-slate-950 transition-colors">
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-4 h-4 text-[#6DAD45]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScroll>
  );
}
