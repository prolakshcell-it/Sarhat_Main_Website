"use client";

import { useState, useRef, useEffect } from "react";
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
import ProductFAQ from "@/components/ProductFAQ";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import { API_BASE_URL, applyCareer } from "@/lib/api";
import { toast } from "sonner";
import EmployeeBenefits from "@/components/employee-benefits/EmployeeBenefits";

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
    answer: (
      <span>
        You can apply directly through the interactive application form on this page or send your CV to our recruitment team at{" "}
        <a href="mailto:hr@sarhatenergy.com" className="text-[#16A34A] font-semibold underline hover:text-[#15803d]">
          hr@sarhatenergy.com
        </a>
        . Shortlisted candidates are contacted promptly for an initial interview.
      </span>
    ),
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

  // Dynamic Jobs State from API with fallback
  const [jobs, setJobs] = useState<JobRole[]>(jobOpenings);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      })
      .catch((err) => console.warn("Using default jobs list:", err));
  }, []);

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
  const [submitError, setSubmitError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  // Filtered Jobs
  const filteredJobs = jobs.filter((job) => {
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
    const formElement = document.getElementById("current-openings") || document.getElementById("application-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isHuman) {
      alert("Please check the verification box to prove you are human.");
      return;
    }
    if (!formData.cvFile) {
      alert("Please attach your CV (PDF, DOC, or Image) before submitting.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName.trim());
      data.append("email", formData.email.trim());
      data.append("phone", formData.phone.trim());
      data.append("roleOfInterest", formData.role);
      if (formData.cvFile) {
        data.append("cv", formData.cvFile);
      }

      const result = await applyCareer(data);
      if (!result || result.success === false) {
        throw new Error(result?.message || "Failed to submit application");
      }

      const returnedId = result.data?._id || result.applicationId || "";
      setApplicationId(returnedId);
      setSubmitSuccess(true);
      toast.success(result.message || "Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "Solar Quality Engineer (QA/QC)",
        cvFile: null,
        cvFileName: "",
        isHuman: false,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit application. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky background & Centered Content) */}
        {/* ------------------------------------------------------------- */}
        {/* Fixed Hero Section (Pinned background layer while scrolling) */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}>
          <section
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/career-hero-bg.jpg"
                alt="Careers at Sarhat Energy"
                fill
                priority
                className="object-cover object-right opacity-95" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Scrim for text legibility on left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 via-35% to-transparent pointer-events-none w-full md:w-3/5 lg:w-1/2" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 sm:pt-28 pb-6 my-auto flex flex-col items-start text-left will-change-transform">
              <ScrollReveal direction="up" distance={30} className="w-full">
                <div className="max-w-md lg:max-w-lg w-full flex flex-col items-start text-left">
                  <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-5 text-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Build your career. <br />
                    <span className="text-[#D4E012] italic font-normal inline-block relative mt-1.5">
                      Help build India.
                      <span className="block h-[2.5px] w-full bg-[#D4E012] mt-1.5" />
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-md text-left leading-relaxed mb-8 drop-shadow-md">
                    Work on renewable energy, battery storage and infrastructure projects with teams that value safety, ownership and learning.
                  </p>

                  {/* Solid Lime/Yellow Action Button matching Image 2 mockup (shifted right) */}
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("current-openings");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-2.5 ml-12 sm:ml-24 lg:ml-32 px-7 py-3 rounded-full bg-[#D4E012] hover:bg-[#c2ce10] text-slate-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-[#D4E012]/30 hover:scale-105 active:scale-95 cursor-pointer">
                    <span>View open roles</span>
                    <span className="text-sm font-bold">↓</span>
                  </button>
                </div>
              </ScrollReveal>

            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* Main Content Sections (Slides UP over fixed Hero layer) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 1: WHY JOIN US (REFERENCE IMAGE 1) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-16">
                  {/* Yellow/Lime Pill Badge */}
                  <AnimatedPillBadge className="mb-6">
                    Why Join Us
                  </AnimatedPillBadge>

                  {/* Main Headline with Green Highlight */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">More Than a Job.</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      A Career With Purpose
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                    At Sarhat, engineering, site and commercial teams work together to deliver solar and infrastructure projects. You&apos;ll see how decisions made in the office shape what happens on site.
                  </p>
                </div>
              </ScrollReveal>

              {/* 4 Circular Feature Cards Grid */}
              <ScrollReveal direction="up" distance={40} delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {/* Circle 1 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Take Ownership Early
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      Take responsibility for work that moves a project forward, with support from your team.
                    </p>
                  </motion.div>

                  {/* Circle 2 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <Sun className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Meaningful Work
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      Contribute to renewable energy and infrastructure projects built for long-term use.
                    </p>
                  </motion.div>

                  {/* Circle 3 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Collaborative Team
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      Work with colleagues across engineering, operations and business development.
                    </p>
                  </motion.div>

                  {/* Circle 4 */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border-2 border-[#D4E012]/40 hover:border-[#D4E012] rounded-full p-8 sm:p-10 flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#D4E012]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="w-14 h-14 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/50 flex items-center justify-center mb-4 text-[#707B00] group-hover:scale-110 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-all duration-300">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900 mb-2 leading-snug">
                      Build Skills Across Projects
                    </h3>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-[220px]">
                      Learn how design, procurement, installation and commissioning fit together.
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: EMPLOYEE BENEFITS (CAREER GROWTH LADDER) */}
          {/* ------------------------------------------------------------- */}
          <EmployeeBenefits />

          {/* ------------------------------------------------------------- */}
          {/* SECTION 3: OPEN POSITIONS & APPLICATION FORM (REFERENCE IMAGE 3) */}
          {/* ------------------------------------------------------------- */}
          <section id="current-openings" className="py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-12">
                  {/* Yellow/Lime Pill Badge */}
                  <AnimatedPillBadge className="mb-6">
                    Open Positions
                  </AnimatedPillBadge>

                  {/* Main Headline */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Join Our Mission.</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Current Openings at Sarhat
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                    We&apos;re looking for driven, capable people to join our growing team across engineering, sales, and field operations.
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
                      className="bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#707B00] cursor-pointer">
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
                      className="bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#707B00] cursor-pointer">
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
                        className="mt-3 text-xs font-mono text-[#707B00] underline font-bold">
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    filteredJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        whileHover={{ y: -4 }}
                        className="bg-white border border-slate-200/90 hover:border-[#D4E012] rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#D4E012]/15 transition-all duration-300 relative overflow-hidden group">
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
                            title="Apply for this role">
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
                        {applicationId && (
                          <div className="inline-block bg-slate-900 text-[#D4E012] font-mono text-xs font-bold px-3 py-1 rounded-lg border border-slate-700">
                            Reference: {applicationId}
                          </div>
                        )}
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
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition-colors" />
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
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition-colors" />
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
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition-colors" />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">Role of Interest</label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-slate-100/80 border border-slate-300 focus:border-[#707B00] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none cursor-pointer transition-colors font-semibold">
                            {jobs.map((j) => (
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
                              className="hidden" />
                          </label>
                        </div>

                        {/* Cloudflare Styled Verification Box */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-white">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={formData.isHuman}
                              onChange={(e) => setFormData({ ...formData, isHuman: e.target.checked })}
                              className="w-4 h-4 rounded text-[#D4E012] focus:ring-0 cursor-pointer accent-[#D4E012]" />
                            <span className="text-xs font-medium text-slate-200">Verify you are human</span>
                          </label>
                          <div className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#D4E012]" />
                            <span>SECURE HR</span>
                          </div>
                        </div>

                        {submitError && (
                          <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                            {submitError}
                          </p>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0f] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/30 flex items-center justify-center gap-2 cursor-pointer">
                          {isSubmitting ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit — We&apos;ll Reach Out</span>
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
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  {/* Yellow/Lime Pill Badge */}
                  <AnimatedPillBadge className="mb-6">
                    Careers FAQs
                  </AnimatedPillBadge>

                  {/* Main Headline */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Careers{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      FAQs
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                    What to know before you apply.
                  </p>
                </div>
              </ScrollReveal>

              {/* Accordions Container */}
              <ProductFAQ
                faqs={faqs}
                openIndex={activeFaq}
                onToggle={(idx) => setActiveFaq(activeFaq === idx ? null : idx)} />
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 5: CONTACT HR BANNER (BOTTOM OF REFERENCE IMAGE 4) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-16 bg-[#F8FAF8] relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#071325] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-4xl font-serif-display font-medium text-white tracking-tight leading-tight">
                        Build what India needs. <br />
                        <span className="text-[#D4E012] italic">Build your future here.</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                        Join the teams behind Sarhat&apos;s energy and infrastructure projects.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                      <button
                        onClick={() => {
                          const el = document.getElementById("current-openings");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-full transition-all shadow-lg shadow-[#D4E012]/20 hover:scale-105 active:scale-95 cursor-pointer">
                        <span>Explore open roles ↑</span>
                      </button>
                      <a
                        href="mailto:hr@sarhatenergy.com"
                        className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-white/30 hover:border-white transition-all cursor-pointer">
                        <Mail className="w-4 h-4 text-[#D4E012]" />
                        <span>Contact HR</span>
                      </a>
                    </div>
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
