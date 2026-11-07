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
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useHeroScroll } from "@/hooks/useHeroScroll";
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
    id: "satish-chaudhary",
    name: "Satish Chaudhary",
    role: "Managing Director",
    categoryTag: "EXECUTIVE LEADERSHIP",
    experience: "13 Years Experience",
    shortBio:
    "Satish leads executive management, corporate strategy, and the overall direction of Sarhat Energy across India.",
    fullBio:
    "Satish Chaudhary serves as Managing Director of Sarhat Energy. With 13 years of leadership in energy, infrastructure, and enterprise execution, he guides Sarhat's corporate vision, strategic project origination, capital allocation, and multi-gigawatt clean energy execution across India.",
    education: "Executive Leadership & Energy Management",
    image: "/director/Satish.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "avishek-anand",
    name: "Avishek Anand",
    role: "Director Operations",
    categoryTag: "OPERATIONS LEADERSHIP",
    experience: "12 Years Experience",
    shortBio:
    "Avishek directs company-wide engineering operations, site construction protocols, and quality execution.",
    fullBio:
    "Avishek Anand serves as Director Operations at Sarhat Energy. Bringing 12 years of specialized operational expertise, he oversees turnkey site execution, multi-state project delivery timelines, field engineering coordination, and high-standard safety compliance across all utility-scale and commercial projects.",
    education: "B.Tech Engineering & Project Management",
    image: "/director/Avishek_.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "radha-kumari",
    name: "Radha Kumari",
    role: "Head of HR",
    categoryTag: "PEOPLE & CULTURE",
    experience: "6 Years Experience",
    shortBio:
    "Radha leads human resources, talent acquisition, organizational culture, and employee welfare programs.",
    fullBio:
    "Radha Kumari leads Human Resources at Sarhat Energy. With 6 years of focused HR and talent leadership, she spearheads human capital management, organizational culture, workforce inclusion, policy frameworks, and continuous skill upskilling across on-site execution crews and corporate departments.",
    education: "MBA Human Resources Management",
    image: "/director/Radha.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "naresh-kumar",
    name: "Naresh Kumar",
    role: "Head Business Growth & Strategic Alliances",
    categoryTag: "STRATEGIC ALLIANCES",
    experience: "14 Years Experience",
    shortBio:
      "Naresh drives enterprise growth, institutional partnerships, strategic joint ventures, and market expansion.",
    fullBio:
      "Naresh Kumar leads Business Growth and Strategic Alliances at Sarhat Energy. With over 14 years of industry experience, he manages institutional developer alliances, corporate PPA origination, state regulatory liaison, and strategic business expansion in solar, BESS storage, and agrovoltaic sectors.",
    education: "MBA Business Strategy & Marketing",
    image: "/images/partner-hero-bg.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "ayush-raj",
    name: "Ayush Raj",
    role: "Manager Business Development",
    categoryTag: "BUSINESS DEVELOPMENT",
    experience: "3 Years Experience",
    shortBio:
    "Ayush manages market origination, client engagement, bid preparation, and clean energy pipeline development.",
    fullBio:
    "Ayush Raj serves as Manager Business Development at Sarhat Energy. Bringing 3 years of dynamic business development and client engagement experience, he focuses on pipeline origination, tender analytics, commercial proposals, and client relationship management for commercial and utility clients.",
    education: "B.E. / B.Tech & Business Management",
    image: "/team/Ayush-Raj.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "avishek-jha",
    name: "Avishek Jha",
    role: "Head Operations",
    categoryTag: "OPERATIONS EXCELLENCE",
    experience: "12 Years Experience",
    shortBio:
    "Avishek leads multi-site execution operations, contractor management, and field mobilization across India.",
    fullBio:
    "Avishek Jha serves as Head Operations at Sarhat Energy. With 12 years of hands-on technical and operational leadership, he directs site mobilization, field contractor performance, milestone scheduling, and inter-departmental logistics across high-voltage substation and solar generation sites.",
    education: "B.Tech Electrical & Electronics",
    image: "/team/Avishek-Jha.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "amar-nath-jha",
    name: "Amar Nath Jha",
    role: "Head Supply Chain Management",
    categoryTag: "SUPPLY CHAIN & LOGISTICS",
    experience: "10 Years Experience",
    shortBio:
      "Amar Nath oversees Tier-1 vendor procurement, logistics coordination, and equipment quality assurance.",
    fullBio:
      "Amar Nath Jha leads Supply Chain Management at Sarhat Energy. Bringing 10 years of specialized procurement and supply chain experience, he steers vendor qualification, Tier-1 solar module & inverter procurement, logistics optimization, and material delivery assurance to maintain site schedules.",
    education: "Supply Chain & Operations Management",
    image: "/team/Amar-Nath-Jha.png",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "kana-sharma",
    name: "Kana Sharma",
    role: "Manager Projects & Liaison",
    categoryTag: "PROJECTS & LIAISON",
    experience: "4 Years Experience",
    shortBio:
      "Kana manages statutory approvals, DISCOM liaison, ROW clearances, and project coordination.",
    fullBio:
      "Kana Sharma serves as Manager Projects & Liaison at Sarhat Energy. With 4 years of dedicated liaison and project management experience, she coordinates state electricity board clearances, DISCOM grid approvals, statutory compliance, and smooth inter-agency communication for swift commissioning.",
    education: "B.Tech Engineering & Regulatory Management",
    image: "/team/Kana-Sharma.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "prawesh-kumar-jha",
    name: "Prawesh Kumar Jha",
    role: "Manager Design & Engg",
    categoryTag: "DESIGN & ENGINEERING",
    experience: "4 Years Experience",
    shortBio:
    "Prawesh directs detailed engineering design, SLDs, structural layout modeling, and electrical schematics.",
    fullBio:
    "Prawesh Kumar Jha serves as Manager Design & Engineering at Sarhat Energy. With 4 years of specialized engineering design expertise, he oversees plant layout optimization, 3D modeling, shadow analysis, single line diagrams (SLD), and structural validation to maximize energy yield.",
    education: "B.Tech Electrical / Power Systems",
    image: "/team/Prawesh.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "mrityunjay-kumar-jha",
    name: "Mrityunjay Kumar Jha",
    role: "Manager Accounts",
    categoryTag: "FINANCE & ACCOUNTS",
    experience: "13 Years Experience",
    shortBio:
    "Mrityunjay oversees financial accounting, statutory audits, project cash flows, and fiscal compliance.",
    fullBio:
    "Mrityunjay Kumar Jha serves as Manager Accounts at Sarhat Energy. Bringing 13 years of rigorous accounting and financial governance experience, he oversees corporate fiscal reporting, vendor accounting, budget allocations, statutory taxation, and financial compliance across all projects.",
    education: "M.Com / Chartered Financial Accounting",
    image: "/team/Mritunjay-Jha.jpg",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "amar-kumar-rauniyar",
    name: "Amar Kumar Rauniyar",
    role: "Manager Projects & O&M",
    categoryTag: "PROJECTS & O&M",
    experience: "8 Years Experience",
    shortBio:
    "Amar manages on-site project construction, plant testing, preventative O&M, and asset availability.",
    fullBio:
    "Amar Kumar Rauniyar serves as Manager Projects & O&M at Sarhat Energy. With 8 years of dedicated field execution and operations & maintenance expertise, he manages turnkey solar site erection, testing & commissioning, preventative maintenance cycles, and SCADA-monitored plant performance.",
    education: "B.Tech Electrical / Mechanical Engineering",
    image: "/team/Amar-Kumar-Rauniyar.png",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "srimanta-das",
    name: "Srimanta Das",
    role: "Assistant Project Manager",
    categoryTag: "PROJECT MANAGEMENT",
    experience: "6 Years Experience",
    shortBio:
    "Srimanta coordinates site civil works, daily execution tracking, and contractor quality compliance.",
    fullBio:
    "Srimanta Das serves as Assistant Project Manager at Sarhat Energy. With 6 years of ground execution and management experience, he coordinates civil foundations, piling schedules, structural assembly inspections, and contractor progress tracking across active solar sites.",
    education: "Diploma / B.Tech Civil Engineering",
    image: "/team/Srimanta-Das.png",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
  {
    id: "abhishek-jha",
    name: "Abhishek Jha",
    role: "Assistant Project Manager SCM",
    categoryTag: "SUPPLY CHAIN MANAGEMENT",
    experience: "2 Years Experience",
    shortBio:
      "Abhishek coordinates procurement tracking, warehouse inventory, and on-time site material dispatches.",
    fullBio:
      "Abhishek Jha serves as Assistant Project Manager SCM at Sarhat Energy. With 2 years of supply chain and logistics coordination experience, he supports procurement scheduling, inventory tracking, bill of materials (BOM) auditing, and delivery dispatch logistics across project sites.",
    education: "B.Tech / SCM Operations",
    image: "/team/Abhishek-Jha.png",
    linkedin: "https://www.linkedin.com/company/sarhatenergy/",
  },
];

export default function LeadershipPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<ExecutiveLeader | null>(null);

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
                alt="Sarhat Executive Leadership"
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
                <div className="max-w-5xl lg:max-w-6xl flex flex-col items-center text-center w-full">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.1] [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)]">
                    <span className="block sm:whitespace-nowrap">Guided by Decades of</span>
                    <span className="block mt-1">
                      <span className="text-[#D4E012] italic font-normal relative inline-block sm:whitespace-nowrap drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                        Energy &amp; Engineering Excellence
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
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100 font-normal max-w-5xl mx-auto text-center leading-relaxed tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
                    <span className="block sm:whitespace-nowrap">
                      Our executive team leads our culture of innovation, inclusion, and operational excellence—
                    </span>
                    <span className="block sm:whitespace-nowrap mt-1 sm:mt-1.5">
                      supporting our teams across India to thrive and succeed in driving the clean energy transition.
                    </span>
                  </p>
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
          {/* EXECUTIVE TEAM 3D FLIP CARD GRID SECTION */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <AnimatedPillBadge className="mb-6">
                    SARHAT DIRECTORS &amp; EXECUTIVES
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Executive{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      team.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden>
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>
                  <p className="text-xs font-mono text-slate-500 flex items-center justify-center gap-2 mt-4">
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
                        className="relative w-full aspect-[4/3] rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-lg hover:shadow-2xl border border-slate-200/90 hover:border-[#6DAD45]">
                        {/* ---------------- CARD FRONT ---------------- */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] z-10 bg-slate-100">
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
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
                            className="object-cover object-center opacity-25 filter blur-[2px] brightness-75 transition-transform duration-700 scale-105 pointer-events-none" />
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
                              className="bg-gradient-to-r from-[#6DAD45] to-[#5EE72D] hover:from-[#5cb338] hover:to-[#4ed423] text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-5 py-2 rounded-full transition-all shadow-md shadow-[#6DAD45]/30 hover:scale-105 cursor-pointer inline-flex items-center gap-1.5">
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
                          className="text-lg sm:text-xl font-serif-display font-bold text-[#0F172A] group-hover:text-[#6DAD45] transition-colors cursor-pointer leading-tight mb-1">
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
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Side: Team Photo Frame */}
                  <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] bg-slate-900">
                    <Image
                      src="/images/hero-solar.jpg"
                      alt="Sarhat Energy Team"
                      fill
                      className="object-cover object-center opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90 hidden lg:block" />
                  </div>

                  {/* Right Side: Dark Gradient Panel with Content */}
                  <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                    <span className="text-xs font-mono text-[#D4E012] font-bold uppercase tracking-widest block mb-3">
                      SARHAT CULTURE & VALUES
                    </span>

                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                      Our culture <br />
                      <span className="text-[#D4E012] italic relative inline-block">
                        and people.
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

                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8">
                      Our people, culture, and core values underpin how we deliver and grow. We are committed to building an inclusive and high-performing organization, where different perspectives strengthen our business and support long-term energy infrastructure success.
                    </p>

                    <div>
                      <Link
                        href="/about/culture-people"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6DAD45] to-[#5EE72D] hover:from-[#5cb338] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-lg shadow-[#6DAD45]/30 cursor-pointer">
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
                      <Image
                        src={selectedLeader.image}
                        alt={selectedLeader.name}
                        fill
                        className="object-cover object-center" />
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
