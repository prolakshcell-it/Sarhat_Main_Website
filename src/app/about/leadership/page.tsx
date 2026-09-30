"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Award, Sparkles, X, ArrowRight, ArrowUpRight, ShieldCheck, UserCheck } from "lucide-react";

interface ExecutiveLeader {
  id: string;
  name: string;
  role: string;
  categoryTag: string;
  experience: string;
  shortBio: string;
  fullBio: string;
  education: string;
  image: string;
  linkedin: string;
}

const executiveTeam: ExecutiveLeader[] = [
  {
    id: "lalit-kumarr",
    name: "Lalit Kumarr",
    role: "Founder & Managing Director",
    categoryTag: "EXECUTIVE LEADERSHIP",
    experience: "35+ Years Industry Leadership",
    shortBio:
      "Lalit leads the business, bringing over 35 years of global energy and infrastructure vision to steer Sarhat to the next level.",
    fullBio:
      "Lalit Kumarr is the Founder & Managing Director of Sarhat Energy. With over 35 years of global energy industry leadership, he has steered multi-gigawatt power, solar EPC, and civil infrastructure projects across India. Prior to founding Sarhat, he held senior executive positions across major energy corporations, pioneering sustainable engineering, regulatory compliance, and execution discipline.",
    education: "B.E. Electrical Engineering · Global Energy Management Program",
    image: "/images/hero-solar.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "ajay-singh",
    name: "Ajay Singh",
    role: "Chief Financial Officer (CFO)",
    categoryTag: "FINANCE & GOVERNANCE",
    experience: "30+ Years Financial Governance",
    shortBio:
      "In his current role as Chief Financial Officer, Ajay leads the financial strategy, capital allocation, and risk management.",
    fullBio:
      "Ajay Singh serves as CFO, bringing over 30 years of financial governance, risk management, and capital allocation experience. A Chartered Accountant by background, he has managed multi-crore project financing, utility contract structures, corporate governance, and fiscal compliance for leading energy and infrastructure enterprises across India.",
    education: "FCA Chartered Accountant · B.Com (Hons)",
    image: "/images/substation-project.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "shrikant-bartakke",
    name: "Shrikant Bartakke",
    role: "Chief Growth Officer (CGO)",
    categoryTag: "STRATEGIC EXPANSION",
    experience: "20+ Years Strategic Expansion",
    shortBio:
      "Shrikant leads strategic commercial expansion, enterprise partnerships, and multi-state renewable energy scaling.",
    fullBio:
      "Shrikant Bartakke leads strategic market expansion and commercial partnerships at Sarhat Energy. With 20+ years of leadership in telecommunications and renewable energy scaling, he oversees enterprise client acquisitions, strategic joint ventures, utility PPAs, and expansion into emerging storage & agrovoltaic sectors.",
    education: "MBA Marketing & Strategy · B.Tech Mechanical",
    image: "/images/partner-hero-bg.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "ajit-shah",
    name: "Ajit Shah",
    role: "Vice President — Business Development",
    categoryTag: "BUSINESS DEVELOPMENT",
    experience: "18+ Years Business Development",
    shortBio:
      "Ajit specializes in utility-scale solar origination, state regulatory liaison, land banking, and PPA negotiations.",
    fullBio:
      "Ajit Shah brings over 18 years of diverse experience as a Business Development Leader, specializing in utility-scale solar origination, government liaison, DISCOM regulatory approvals, land banking frameworks, and power purchase agreement (PPA) financial management.",
    education: "M.Sc Energy Economics · B.E. Civil Engineering",
    image: "/images/bess-substation.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    role: "General Manager — Projects & Operations",
    categoryTag: "PROJECT EXECUTION",
    experience: "24+ Years Grid & Solar O&M",
    shortBio:
      "Rajesh oversees field EPC execution, grid substation integration (33kV to 400kV), and long-term asset O&M performance.",
    fullBio:
      "Rajesh Kumar oversees complete field EPC execution, grid substation integration (33kV to 400kV), EHV transmission corridor clearances, site safety protocols, and long-term asset O&M performance across all operational project sites nationwide.",
    education: "B.Tech Electrical & Electronics · Certified PMP",
    image: "/images/agrivoltaics-project.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "harshita-arora",
    name: "Harshita Arora",
    role: "Head — Business Growth & Strategic Alliances",
    categoryTag: "STRATEGIC ALLIANCES",
    experience: "Strategic Partnerships",
    shortBio:
      "Harshita leads corporate client relations, project proposals, ESG integration, and strategic alliances nationwide.",
    fullBio:
      "Harshita Arora leads corporate client relations, project proposals, ESG integration, and strategic alliances across Sarhat's solar, BESS storage, and agrovoltaic initiatives, strengthening Sarhat's national business footprint.",
    education: "MBA International Business · B.Sc Environmental Science",
    image: "/images/about-hero-bg-bright.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "vikram-sharma",
    name: "Vikram Sharma",
    role: "Chief Technical Officer (CTO)",
    categoryTag: "ENGINEERING & INNOVATION",
    experience: "22+ Years Technical Design",
    shortBio:
      "Vikram directs electrical & structural engineering, microgrid integration, SCADA automation, and quality control.",
    fullBio:
      "Vikram Sharma directs electrical and structural engineering design, microgrid integration, SCADA automation, shadow analysis, and technical quality control standards across utility and C&I solar installations.",
    education: "M.Tech Electrical Power Systems · B.Tech Electrical",
    image: "/images/hero-solar.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "pooja-malhotra",
    name: "Pooja Malhotra",
    role: "Chief HR & People Officer",
    categoryTag: "PEOPLE & CULTURE",
    experience: "16+ Years Organizational Culture",
    shortBio:
      "Pooja leads talent acquisition, organizational culture, safety policies, and leadership development programs.",
    fullBio:
      "Pooja Malhotra leads talent acquisition, organizational culture, safety policies, and leadership development programs to foster a high-performance, inclusive environment across site and corporate teams.",
    education: "MBA Human Resources · B.A. Psychology",
    image: "/images/about-hero-bg.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "sanjay-verma",
    name: "Sanjay Verma",
    role: "Head — Supply Chain & Procurement",
    categoryTag: "SUPPLY CHAIN & LOGISTICS",
    experience: "20+ Years Global Sourcing",
    shortBio:
      "Sanjay manages tier-1 solar module procurement, inverter logistics, civil material sourcing, and vendor alliances.",
    fullBio:
      "Sanjay Verma manages global tier-1 solar module procurement, inverter sourcing, civil material logistics, and strategic vendor alliances to ensure seamless project delivery and cost optimization.",
    education: "B.Tech Mechanical · Diploma in Supply Chain Management",
    image: "/images/partner-hero-bg.jpg",
    linkedin: "https://linkedin.com",
  },
];

export default function LeadershipPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<ExecutiveLeader | null>(null);

  const containerRef = useRef<HTMLElement>(null);

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
                src="/images/about-hero-bg.jpg"
                alt="Sarhat Executive Leadership"
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
                    Guided by Decades of <br />
                    <span className="text-[#D4E012] italic font-normal">Energy & Engineering Excellence</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-5xl text-center leading-relaxed font-normal drop-shadow-md">
                    Our executive team leads our culture of innovation, inclusion, and operational excellence—supporting our teams across India to thrive and succeed in driving the clean energy transition.
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
          {/* EXECUTIVE TEAM 3D FLIP CARD GRID SECTION */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6DAD45]/15 border border-[#6DAD45]/30 text-[#6DAD45] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-[#6DAD45]" />
                      <span>SARHAT DIRECTORS & EXECUTIVES</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight">
                      Executive team
                    </h2>
                  </div>

                  <p className="text-xs font-mono text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping" />
                    <span>Hover or tap card to flip &amp; view profile</span>
                  </p>
                </div>
              </ScrollReveal>

              {/* 3x3 Grid of Executive Member 3D Flip Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {executiveTeam.map((leader, idx) => (
                  <ScrollReveal key={leader.id} direction="up" distance={40} delay={idx * 0.06}>
                    <div className="group [perspective:1000px] flex flex-col">
                      {/* 3D Flip Card Container */}
                      <div
                        onClick={() => setSelectedLeader(leader)}
                        className="relative w-full aspect-[4/3] rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-lg hover:shadow-2xl border border-slate-200/90 hover:border-[#6DAD45]"
                      >
                        {/* ---------------- CARD FRONT ---------------- */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] z-10 bg-slate-100">
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Soft Bottom Scrim */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                          {/* Front Overlay Badge */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                            <span className="text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                              {leader.categoryTag}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                              <ArrowUpRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* ---------------- CARD BACK (3D FLIPPED WITH FADED IMAGE) ---------------- */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-950 p-6 flex flex-col justify-between text-white border-2 border-[#6DAD45] shadow-2xl z-20">
                          {/* Faded Background Photo */}
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover object-center opacity-25 filter blur-[2px] brightness-75 transition-transform duration-700 scale-105 pointer-events-none"
                          />
                          {/* Dark Glass Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950/95 pointer-events-none" />

                          {/* Back Top: Category Tag */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-extrabold text-[#6DAD45] bg-[#6DAD45]/20 border border-[#6DAD45]/40 px-3 py-1 rounded-full uppercase tracking-widest">
                              {leader.categoryTag}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-semibold">
                              {leader.experience}
                            </span>
                          </div>

                          {/* Back Middle: Info & Short Bio */}
                          <div className="relative z-10 my-auto">
                            <h4 className="text-xl font-serif-display font-medium text-white mb-1">
                              {leader.name}
                            </h4>
                            <p className="text-xs font-mono font-bold text-[#D4E012] mb-3">
                              {leader.role}
                            </p>
                            <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-3">
                              {leader.shortBio}
                            </p>
                          </div>

                          {/* Back Bottom: Interactive Action Button */}
                          <div className="relative z-10 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLeader(leader);
                              }}
                              className="bg-gradient-to-r from-[#6DAD45] to-[#5EE72D] hover:from-[#5cb338] hover:to-[#4ed423] text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-5 py-2 rounded-full transition-all shadow-md shadow-[#6DAD45]/30 hover:scale-105 cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <span>READ FULL BIO</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Info Below Photo Box */}
                      <div className="mt-4 text-left">
                        <h3
                          onClick={() => setSelectedLeader(leader)}
                          className="text-lg sm:text-xl font-serif-display font-bold text-[#0F172A] group-hover:text-[#6DAD45] transition-colors cursor-pointer leading-tight mb-1"
                        >
                          {leader.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono font-medium text-slate-600">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION: OUR CULTURE AND PEOPLE BANNER */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Side: Team Photo Frame */}
                  <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] bg-slate-900">
                    <Image
                      src="/images/hero-solar.jpg"
                      alt="Sarhat Energy Team"
                      fill
                      className="object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90 hidden lg:block" />
                  </div>

                  {/* Right Side: Dark Gradient Panel with Content */}
                  <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                    <span className="text-xs font-mono text-[#D4E012] font-bold uppercase tracking-widest block mb-3">
                      SARHAT CULTURE & VALUES
                    </span>

                    <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-white tracking-tight leading-tight mb-6">
                      Our culture and people
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8">
                      Our people, culture, and core values underpin how we deliver and grow. We are committed to building an inclusive and high-performing organization, where different perspectives strengthen our business and support long-term energy infrastructure success.
                    </p>

                    <div>
                      <Link
                        href="/about/culture-people"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6DAD45] to-[#5EE72D] hover:from-[#5cb338] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-lg shadow-[#6DAD45]/30 cursor-pointer"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
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
                className="bg-white border-2 border-slate-200 rounded-3xl max-w-2xl w-full relative shadow-2xl overflow-hidden text-slate-900"
              >
                {/* Header Banner */}
                <div className="bg-[#0F172A] p-6 sm:p-8 text-white relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6DAD45]/30 via-[#0F172A] to-[#0F172A]">
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-black/40 border border-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#6DAD45] shrink-0 bg-slate-800 shadow-xl">
                      <Image
                        src={selectedLeader.image}
                        alt={selectedLeader.name}
                        fill
                        className="object-cover object-center"
                      />
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
                      EXECUTIVE BIOGRAPHY
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed whitespace-pre-line">
                      {selectedLeader.fullBio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                      QUALIFICATIONS & EDUCATION
                    </h4>
                    <p className="text-xs font-mono text-[#6DAD45] font-semibold">{selectedLeader.education}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">{selectedLeader.experience}</span>
                    <a
                      href={selectedLeader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#6DAD45] hover:text-slate-950 transition-colors"
                    >
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
