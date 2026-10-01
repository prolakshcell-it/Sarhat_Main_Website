"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import {
  ArrowUpRight,
  CheckCircle2,
  X,
  Send,
  Upload,
  Rocket,
  Sun,
  Users,
  TrendingUp,
  Wallet,
  GraduationCap,
  Heart,
  Coffee,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  Mail,
  ShieldCheck,
  Building2,
  FileText,
  Sparkles,
  Award,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";

interface JobRole {
  id: string;
  title: string;
  experience: string;
  category: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  vacancies: string;
  description: string;
}

const jobOpenings: JobRole[] = [
  {
    id: "sqe",
    title: "Solar Quality Engineer (QA/QC)",
    experience: "1-3 Years",
    category: "ENGINEERING",
    department: "QC Department",
    location: "Ghaziabad / PAN India",
    type: "Full-time",
    salary: "2.4–4.5L",
    vacancies: "2 vacancies",
    description:
      "Responsible for quality compliance across solar PV projects, material inspection, foundation testing, documentation, and client handover. Ensures execution matches approved engineering drawings.",
  },
  {
    id: "oem",
    title: "Solar O&M Engineer",
    experience: "2-5 Years",
    category: "O&M",
    department: "Maintenance",
    location: "PAN India",
    type: "Full-time",
    salary: "2.4–4.5L",
    vacancies: "3 vacancies",
    description:
      "Oversees operation, maintenance, performance monitoring, SCADA troubleshooting, and preventive health checks of solar PV systems to ensure maximum plant uptime and safe generation.",
  },
  {
    id: "dse",
    title: "Design cum Site Engineer",
    experience: "2 Years",
    category: "ENGINEERING",
    department: "Design & Civil",
    location: "Ghaziabad, U.P.",
    type: "Full-time",
    salary: "Competitive Salary",
    vacancies: "4 vacancies",
    description:
      "Prepares civil & structural designs, SLDs, MMS mounting layout drawings, supervises site foundations, and coordinates directly with EPC field teams for site quality assurance.",
  },
  {
    id: "se",
    title: "Site Engineers (Rooftop & Utility)",
    experience: "2 Years",
    category: "SITE",
    department: "Project Execution",
    location: "Gujarat / PAN India",
    type: "Full-time",
    salary: "Competitive Salary",
    vacancies: "3 vacancies",
    description:
      "Manages complete site execution of EPC solar projects across multiple states. Responsible for contractor coordination, safety protocols, and on-time commissioning.",
  },
  {
    id: "bde",
    title: "Business Development Executive",
    experience: "2-5 Years",
    category: "BUSINESS",
    department: "Sales & BD",
    location: "Ghaziabad, U.P.",
    type: "Full-time",
    salary: "Competitive Salary",
    vacancies: "2 vacancies",
    description:
      "Drives commercial & industrial solar EPC growth, builds long-term corporate client relationships, conducts site feasibility assessments, and closes renewable energy proposals.",
  },
  {
    id: "sde",
    title: "Senior Electrical Design Engineer",
    experience: "3-4 Years",
    category: "ENGINEERING",
    department: "Electrical Design",
    location: "Ghaziabad, U.P.",
    type: "Full-time",
    salary: "Competitive Salary",
    vacancies: "2 vacancies",
    description:
      "Leads HT/LT electrical design, inverter sizing, cable schedule calculations, grid interconnection schematics, and shadow analysis for utility-scale solar projects.",
  },
];

const faqs = [
  {
    question: "How can I apply for a job at Sarhat?",
    answer:
      "You can apply directly through the interactive application form on this page or send your CV to our recruitment team at hr@sarhat.in. Shortlisted candidates are contacted promptly for an initial interview.",
  },
  {
    question: "What is the work environment like at Sarhat?",
    answer:
      "We foster an execution-led, transparent, and collaborative environment. Field teams receive continuous support from senior engineers, safety protocols are strictly followed, and ownership is valued across all levels.",
  },
  {
    question: "Is there job stability and long-term opportunity?",
    answer:
      "Yes. India's energy transition is a multi-decade growth story. As Sarhat expands from solar EPC into BESS energy storage, grid substations, and civil infrastructure, team members enjoy continuous project pipelines and long-term career growth.",
  },
  {
    question: "Will I get training if I don't have extensive solar experience?",
    answer:
      "Absolutely. We provide structured technical onboarding, site safety training, and software tool exposure (PVsyst, AutoCAD, ETAP) for engineers who demonstrate strong engineering fundamentals and a passion to learn.",
  },
  {
    question: "What is the salary and growth opportunity?",
    answer:
      "We offer market-aligned compensation with performance-based increments, project completion incentives, and fast-track promotions based on results and leadership impact.",
  },
];

export default function CareersPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedLoc, setSelectedLoc] = useState<string>("All");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<number>(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Solar Quality Engineer (QA/QC)",
    cvFile: null as File | null,
    cvFileName: "",
    isHuman: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // Filtered Jobs
  const filteredJobs = jobOpenings.filter((job) => {
    const matchDept =
      selectedDept === "All" ||
      (selectedDept === "Engineering" && job.category === "ENGINEERING") ||
      (selectedDept === "Maintenance" && job.category === "O&M") ||
      (selectedDept === "Project Execution" && job.category === "SITE") ||
      (selectedDept === "Sales & BD" && job.category === "BUSINESS");

    const matchLoc =
      selectedLoc === "All" ||
      (selectedLoc === "Ghaziabad" && job.location.includes("Ghaziabad")) ||
      (selectedLoc === "Gujarat" && job.location.includes("Gujarat")) ||
      (selectedLoc === "PAN India" && job.location.includes("PAN India"));

    return matchDept && matchLoc;
  });

  const handleApplySelectRole = (roleTitle: string) => {
    setFormData((prev) => ({ ...prev, role: roleTitle }));
    const formElement = document.getElementById("application-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isHuman) {
      alert("Please check the verification box to prove you are human.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "Solar Quality Engineer (QA/QC)",
          cvFile: null,
          cvFileName: "",
          isHuman: false,
        });
      }, 4000);
    }, 1200);
  };

  // 6 Employee Benefits Items for Orbit Diagram
  const benefits = [
    {
      id: "salary",
      title: "Competitive Salary",
      subtitle: "Market-aligned compensation with performance-based increments and rewards.",
      icon: Wallet,
      angle: 270, // Top (12 o'clock)
    },
    {
      id: "learning",
      title: "Learning & Development",
      subtitle: "In-house technical training, certifications, PVsyst exposure, and hands-on site learning.",
      icon: GraduationCap,
      angle: 330, // Top Right (2 o'clock)
    },
    {
      id: "health",
      title: "Health & Wellness",
      subtitle: "Medical insurance coverage for you and your family plus health programs.",
      icon: Heart,
      angle: 30, // Bottom Right (4 o'clock)
    },
    {
      id: "flexibility",
      title: "Flexible Environment",
      subtitle: "Collaborative workspace with a healthy work-life balance and open communication.",
      icon: Coffee,
      angle: 90, // Bottom (6 o'clock)
    },
    {
      id: "progression",
      title: "Career Progression",
      subtitle: "Clear growth paths with regular reviews, mentorship, and internal promotions.",
      icon: TrendingUp,
      angle: 150, // Bottom Left (8 o'clock)
    },
    {
      id: "mission",
      title: "Green Mission",
      subtitle: "Be part of India's most impactful renewable energy and infrastructure transition.",
      icon: Sun,
      angle: 210, // Top Left (10 o'clock)
    },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky background & Centered Content) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
          >
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Careers at Sarhat Energy"
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
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center drop-shadow-lg">
                    Build the people <br />
                    <span className="text-[#D4E012] italic font-normal">who build India.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-200 font-normal max-w-3xl text-center leading-relaxed mb-8 drop-shadow-md">
                    Join Sarhat as we expand from solar EPC into renewable energy, storage, grid infrastructure and civil execution. We value ownership, learning, safety, and people who want to build things that last.
                  </p>
                </div>
              </ScrollReveal>

              {/* Stats Bar */}
              <ScrollReveal direction="up" distance={40} delay={0.15}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl">
                  <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#D4E012] tracking-tight mb-1">
                      11-50
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                      CURRENT SIZE RANGE
                    </div>
                  </div>

                  <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                      2024
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                      FOUNDED
                    </div>
                  </div>

                  <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#5EE72D] tracking-tight mb-1">
                      7+
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                      PORTFOLIO STATES
                    </div>
                  </div>

                  <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                      49.77 MW
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                      SERVED TO BUILD
                    </div>
                  </div>
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
          {/* SECTION 1: WHY JOIN US (REFERENCE IMAGE 1) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-16">
                  {/* Yellow/Lime Pill Badge */}
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    Why Join Us
                  </div>

                  {/* Main Headline with Yellow Highlight */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight mb-6">
                    More Than a Job —{" "}
                    <span className="text-[#707B00]">A Career With Purpose</span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                    At Sarhat, you work on real solar & infrastructure projects from day one. Site engineers are on the ground at multi-megawatt industrial installations. Sales executives are closing projects that will power factories for 25+ years.
                  </p>
                </div>
              </ScrollReveal>

              {/* 4 Circular Feature Cards Grid */}
              <ScrollReveal direction="up" distance={40} delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {/* Circle 1 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Fast-Track Growth
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      High-performers move quickly at Sarhat. We're a growing company that promotes based on results, not tenure.
                    </p>
                  </motion.div>

                  {/* Circle 2 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <Sun className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Meaningful Work
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      Every project you touch contributes to India's clean energy transition. The panels you install will generate clean power for 25+ years.
                    </p>
                  </motion.div>

                  {/* Circle 3 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Collaborative Team
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      A tight-knit team of 37+ engineers, salespeople, and project managers who share knowledge and support each other on every project.
                    </p>
                  </motion.div>

                  {/* Circle 4 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Booming Industry
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      Solar is India's fastest-growing energy sector. The skills you build here will be in high demand for decades.
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: EMPLOYEE BENEFITS (REFERENCE IMAGE 2) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-16">
                  {/* Yellow/Lime Pill Badge */}
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    Employee Benefits
                  </div>

                  {/* Main Headline */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight mb-6">
                    What We <span className="text-[#707B00]">Offer You</span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                    We believe great work deserves great support. Here's what you get when you join Sarhat Energy & Infrastructure.
                  </p>
                </div>
              </ScrollReveal>

              {/* Central Circular Orbital Diagram (Desktop & Tablet) */}
              <ScrollReveal direction="up" distance={40} delay={0.15}>
                <div className="relative max-w-5xl mx-auto min-h-[560px] flex items-center justify-center my-8">
                  {/* SVG Outer Dotted Orbit Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
                    <circle
                      cx="300"
                      cy="300"
                      r="220"
                      fill="none"
                      stroke="#D4E012"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      className="opacity-75"
                    />
                  </svg>

                  {/* Center Circle Image Frame */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-br from-[#D4E012] to-[#5EE72D] shadow-2xl z-20 overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                      <Image
                        src="/images/hero-solar.jpg"
                        alt="Sarhat Site Engineers"
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white z-10">
                        <div className="w-8 h-8 rounded-full bg-[#D4E012] text-black flex items-center justify-center mb-1 font-bold text-xs">
                          ★
                        </div>
                        <span className="font-serif-display font-bold text-sm text-white drop-shadow-md">
                          Sarhat Team
                        </span>
                        <span className="text-[10px] font-mono text-[#D4E012]">37+ Specialists</span>
                      </div>
                    </div>
                  </div>

                  {/* 6 Orbit Benefit Nodes (Positioned around the center circle) */}
                  <div className="hidden md:block absolute inset-0 pointer-events-auto">
                    {/* 1. Competitive Salary (Top) */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center text-center max-w-[200px]">
                      <button
                        onClick={() => setActiveBenefitIndex(0)}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          activeBenefitIndex === 0
                            ? "bg-[#D4E012] border-[#707B00] text-black scale-115 shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/60 text-[#707B00] hover:border-[#707B00]"
                        }`}
                      >
                        <Wallet className="w-6 h-6" />
                      </button>
                      <h4 className="text-xs font-serif-display font-bold text-slate-900 mb-0.5">Competitive Salary</h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-tight">
                        Market-aligned compensation with performance increments.
                      </p>
                    </div>

                    {/* 2. Learning & Development (Top Right) */}
                    <div className="absolute top-24 right-10 flex flex-col items-start text-left max-w-[210px]">
                      <button
                        onClick={() => setActiveBenefitIndex(1)}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          activeBenefitIndex === 1
                            ? "bg-[#D4E012] border-[#707B00] text-black scale-115 shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/60 text-[#707B00] hover:border-[#707B00]"
                        }`}
                      >
                        <GraduationCap className="w-6 h-6" />
                      </button>
                      <h4 className="text-xs font-serif-display font-bold text-slate-900 mb-0.5">Learning & Development</h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-tight">
                        In-house technical training, certifications & site exposure.
                      </p>
                    </div>

                    {/* 3. Health & Wellness (Bottom Right) */}
                    <div className="absolute bottom-24 right-10 flex flex-col items-start text-left max-w-[210px]">
                      <button
                        onClick={() => setActiveBenefitIndex(2)}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          activeBenefitIndex === 2
                            ? "bg-[#D4E012] border-[#707B00] text-black scale-115 shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/60 text-[#707B00] hover:border-[#707B00]"
                        }`}
                      >
                        <Heart className="w-6 h-6" />
                      </button>
                      <h4 className="text-xs font-serif-display font-bold text-slate-900 mb-0.5">Health & Wellness</h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-tight">
                        Medical insurance coverage for you and your family.
                      </p>
                    </div>

                    {/* 4. Flexible Environment (Bottom) */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center text-center max-w-[200px]">
                      <button
                        onClick={() => setActiveBenefitIndex(3)}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          activeBenefitIndex === 3
                            ? "bg-[#D4E012] border-[#707B00] text-black scale-115 shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/60 text-[#707B00] hover:border-[#707B00]"
                        }`}
                      >
                        <Coffee className="w-6 h-6" />
                      </button>
                      <h4 className="text-xs font-serif-display font-bold text-slate-900 mb-0.5">Flexible Environment</h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-tight">
                        Collaborative workspace with a healthy work-life balance.
                      </p>
                    </div>

                    {/* 5. Career Progression (Bottom Left) */}
                    <div className="absolute bottom-24 left-10 flex flex-col items-end text-right max-w-[210px]">
                      <button
                        onClick={() => setActiveBenefitIndex(4)}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          activeBenefitIndex === 4
                            ? "bg-[#D4E012] border-[#707B00] text-black scale-115 shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/60 text-[#707B00] hover:border-[#707B00]"
                        }`}
                      >
                        <TrendingUp className="w-6 h-6" />
                      </button>
                      <h4 className="text-xs font-serif-display font-bold text-slate-900 mb-0.5">Career Progression</h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-tight">
                        Clear growth paths with regular reviews & promotions.
                      </p>
                    </div>

                    {/* 6. Green Mission (Top Left) */}
                    <div className="absolute top-24 left-10 flex flex-col items-end text-right max-w-[210px]">
                      <button
                        onClick={() => setActiveBenefitIndex(5)}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          activeBenefitIndex === 5
                            ? "bg-[#D4E012] border-[#707B00] text-black scale-115 shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/60 text-[#707B00] hover:border-[#707B00]"
                        }`}
                      >
                        <Sun className="w-6 h-6" />
                      </button>
                      <h4 className="text-xs font-serif-display font-bold text-slate-900 mb-0.5">Green Mission</h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-tight">
                        Be part of India's most impactful clean energy mission.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Responsive Grid for Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-8">
                  {benefits.map((b) => {
                    const IconComp = b.icon;
                    return (
                      <div
                        key={b.id}
                        className="bg-[#F8FAF8] border border-slate-200/90 rounded-2xl p-5 flex items-start gap-4 shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#D4E012]/20 border border-[#D4E012] flex items-center justify-center text-[#707B00] shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif-display font-bold text-slate-900 mb-1">{b.title}</h4>
                          <p className="text-xs text-slate-600 font-normal leading-relaxed">{b.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION: LIFE @ SARHAT ENERGY (REFERENCE IMAGE) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-16">
                  {/* Yellow/Lime Pill Badge */}
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    Life @ Sarhat
                  </div>

                  {/* Main Headline */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight mb-6">
                    Life @ <span className="text-[#707B00]">Sarhat Energy</span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                    A culture rooted in engineering discipline, shared ownership, continuous learning, and mutual respect across every site and office.
                  </p>
                </div>
              </ScrollReveal>

              {/* 2x2 Grid of Visual Cards */}
              <ScrollReveal direction="up" distance={40} delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                  {/* Card 1: Work-Life Balance */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-white border border-slate-200/90 hover:border-[#D4E012] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/20 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-900">
                        <Image
                          src="/images/about-hero-bg-bright.jpg"
                          alt="Work-Life Balance at Sarhat"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#D4E012] text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                          HOLISTIC CULTURE
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#707B00] transition-colors">
                          Work-Life Balance
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          We believe in the benefits of a holistic life, which involves the optimal blend of work challenges, recreation, and relaxation. Our work culture and people policies promote balance and we constantly strive to ensure that these are reinstated in spirit, not just in words.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Workplace Engagement */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-white border border-slate-200/90 hover:border-[#D4E012] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/20 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-900">
                        <Image
                          src="/images/partner-hero-bg.jpg"
                          alt="Workplace Engagement at Sarhat"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#D4E012] text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                          TEAM UNITY
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#707B00] transition-colors">
                          Workplace Engagement
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          The Sarhat Energy work-family gets together for various employee engagement events. This fosters a sense of belonging and ties in well with our philosophy of work-life balance. We also encourage a culture of cooperation rather than competition, resulting in greater levels of achievement.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Career Growth */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-white border border-slate-200/90 hover:border-[#D4E012] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/20 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-900">
                        <Image
                          src="/images/substation-project.jpg"
                          alt="Career Growth at Sarhat"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#D4E012] text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                          SKILL ELEVATION
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#707B00] transition-colors">
                          Career Growth
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          Sarhat Energy encourages our people to stay relevant and even ahead of the curve by facilitating upgradation of their skills and developing new ones, through regular workshops and seminars. We reward performance, initiatives, and constantly mentor those that show promise.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 4: Diversity at the Workplace */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-white border border-slate-200/90 hover:border-[#D4E012] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/20 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-900">
                        <Image
                          src="/images/agrivoltaics-project.jpg"
                          alt="Diversity at the Workplace at Sarhat"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-[#D4E012] text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                          INCLUSIVE MINDSET
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#707B00] transition-colors">
                          Diversity at the Workplace
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          With a workforce that comprises talent from across regions and disciplines, we recognize that every individual is unique and brings to the table their irreplaceable combination of talents, experiences, culture, learnings, and values. Our diverse workforce delivers outstanding business outcomes and team strength.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 3: OPEN POSITIONS & APPLICATION FORM (REFERENCE IMAGE 3) */}
          {/* ------------------------------------------------------------- */}
          <section id="application-form-section" className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-12">
                  {/* Yellow/Lime Pill Badge */}
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    Open Positions
                  </div>

                  {/* Main Headline */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight mb-6">
                    Current Openings at <span className="text-[#707B00]">Sarhat Energy</span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                    We're looking for driven, capable people to join our growing team across engineering, sales, and field operations.
                  </p>
                </div>
              </ScrollReveal>

              {/* Filters Bar */}
              <ScrollReveal direction="up" distance={30} delay={0.1}>
                <div className="flex flex-wrap items-center gap-4 mb-10 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
                  {/* Department Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">DEPARTMENT:</span>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#707B00] cursor-pointer"
                    >
                      <option value="All">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Maintenance">Maintenance / O&M</option>
                      <option value="Project Execution">Project Execution / Site</option>
                      <option value="Sales & BD">Sales & BD</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">LOCATION:</span>
                    <select
                      value={selectedLoc}
                      onChange={(e) => setSelectedLoc(e.target.value)}
                      className="bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#707B00] cursor-pointer"
                    >
                      <option value="All">All Locations</option>
                      <option value="Ghaziabad">Ghaziabad, U.P.</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="PAN India">PAN India</option>
                    </select>
                  </div>

                  <span className="text-xs font-mono text-slate-400 ml-auto hidden sm:inline-block">
                    Showing {filteredJobs.length} open roles
                  </span>
                </div>
              </ScrollReveal>

              {/* 2-Column Layout: Left (Job Listings) | Right (Sticky Application Form) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Job Opening Cards */}
                <div className="lg:col-span-7 space-y-6">
                  {filteredJobs.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
                      <p className="text-sm text-slate-500 font-medium">No roles match your selected filter options.</p>
                      <button
                        onClick={() => {
                          setSelectedDept("All");
                          setSelectedLoc("All");
                        }}
                        className="mt-3 text-xs font-mono text-[#707B00] underline font-bold"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    filteredJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        whileHover={{ y: -4 }}
                        className="bg-white border border-slate-200/90 hover:border-[#D4E012] rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#D4E012]/15 transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 group-hover:text-[#707B00] transition-colors">
                              {job.title}
                            </h3>
                            <span className="px-3 py-1 bg-[#D4E012] text-slate-950 font-bold text-[10px] font-mono rounded-full shrink-0">
                              {job.experience}
                            </span>
                          </div>

                          <button
                            onClick={() => handleApplySelectRole(job.title)}
                            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#D4E012] border border-slate-300 hover:border-[#D4E012] flex items-center justify-center text-slate-600 hover:text-slate-950 transition-all shrink-0 cursor-pointer"
                            title="Apply for this role"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 font-normal leading-relaxed mb-5">
                          {job.description}
                        </p>

                        {/* Metadata Tags */}
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-100">
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <MapPin className="w-3 h-3 text-[#707B00]" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <Clock className="w-3 h-3 text-[#707B00]" />
                            {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <Briefcase className="w-3 h-3 text-[#707B00]" />
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <Wallet className="w-3 h-3 text-[#707B00]" />
                            {job.salary}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-slate-700">
                            <Users className="w-3 h-3 text-[#707B00]" />
                            {job.vacancies}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Right Column: Sticky Application Form Card (Matching Image 3) */}
                <div className="lg:col-span-5 sticky top-28">
                  <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4E012]/15 rounded-full blur-2xl pointer-events-none" />

                    <h3 className="text-xl font-serif-display font-bold text-slate-900 mb-1">
                      Apply for Position
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
                      Fill in your details below. Our HR team will reach out directly.
                    </p>

                    {submitSuccess ? (
                      <div className="py-8 text-center space-y-4">
                        <div className="w-14 h-14 bg-[#D4E012]/30 border-2 border-[#707B00] text-[#707B00] rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-serif-display font-bold text-slate-900">Application Submitted!</h4>
                        <p className="text-xs text-slate-600 max-w-xs mx-auto">
                          Thank you for your application. Our team will review your CV and get in touch with you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Full Name <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Email Address <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Phone Number <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">Role of Interest</label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none cursor-pointer transition-colors font-semibold"
                          >
                            {jobOpenings.map((j) => (
                              <option key={j.id} value={j.title}>
                                {j.title}
                              </option>
                            ))}
                            <option value="General Profile">General Profile / Other Roles</option>
                          </select>
                        </div>

                        {/* Attach CV File Picker */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Attach CV <span className="text-slate-400 font-normal">(PDF, DOC, or Image)</span>
                          </label>
                          <label className="w-full border-2 border-dashed border-slate-300 hover:border-[#707B00] bg-slate-100/80 hover:bg-white rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-all">
                            <Upload className="w-4 h-4 text-[#707B00]" />
                            <span className="text-xs text-slate-600 font-medium truncate">
                              {formData.cvFileName || "Click to upload your CV"}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.png,.jpg"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    cvFile: file,
                                    cvFileName: file.name,
                                  }));
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Cloudflare Styled Verification Box */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-white">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={formData.isHuman}
                              onChange={(e) => setFormData({ ...formData, isHuman: e.target.checked })}
                              className="w-4 h-4 rounded text-[#D4E012] focus:ring-0 cursor-pointer accent-[#D4E012]"
                            />
                            <span className="text-xs font-medium text-slate-200">Verify you are human</span>
                          </label>
                          <div className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#D4E012]" />
                            <span>SECURE HR</span>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0f] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/30 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit — We'll Reach Out</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (REFERENCE IMAGE 4) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  {/* Yellow/Lime Pill Badge */}
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    Careers FAQs
                  </div>

                  {/* Main Headline */}
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight mb-6">
                    Frequently Asked <span className="text-[#707B00]">Questions</span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                    Quick answers about working at Sarhat, applying for a role, training, and growth opportunities.
                  </p>
                </div>
              </ScrollReveal>

              {/* Accordions Container */}
              <ScrollReveal direction="up" distance={30} delay={0.15}>
                <div className="bg-[#F8FAF8] border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div
                        key={index}
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#707B00] transition-colors cursor-pointer"
                        >
                          <span className="text-sm sm:text-base font-serif-display leading-snug">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-[#707B00]" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-5 pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 5: CONTACT HR BANNER (BOTTOM OF REFERENCE IMAGE 4) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-16 bg-[#F8FAF8] relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-[#D4E012] uppercase tracking-widest">
                        CONTACT HR
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-serif-display font-bold text-white tracking-tight">
                        Have a question? We'd love to hear from you.
                      </h3>
                    </div>

                    <a
                      href="mailto:hr@sarhat.in"
                      className="inline-flex items-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition-all shadow-lg shadow-[#D4E012]/20 shrink-0 self-start sm:self-auto cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-slate-950" />
                      <span>hr@sarhat.in</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />

        {/* Quote Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
