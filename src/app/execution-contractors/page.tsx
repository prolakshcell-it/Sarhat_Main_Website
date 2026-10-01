"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Wrench,
  Zap,
  Building2,
  HardHat,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  PhoneCall,
  ClipboardList,
  FileCheck2,
  FileSignature,
  CircleDollarSign,
  ChevronDown,
  Check,
  Truck,
  Layers,
  Activity,
  Award,
  Clock,
  Coins,
  ShieldAlert,
  Users,
  Upload,
  Send,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

export default function ExecutionContractorsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeFaqTab, setActiveFaqTab] = useState<"Empanellment" | "Execution" | "Payments">("Empanellment");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("Civil & Earthworks");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking
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

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    specialty: "Civil & Earthworks",
    teamSize: "10-25 Workers",
    experienceYears: "3-5 Years",
    gstin: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify that you are human before submitting.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const selectCategoryCard = (specialty: string) => {
    setSelectedCategory(specialty);
    setFormData((prev) => ({ ...prev, specialty }));
    const formElement = document.getElementById("empanelment-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Why Empanel 4 Steps (Image 1 Style)
  const whyEmpanelSteps = [
    {
      step: "01",
      title: "Simple Profile Submission",
      description: "Submit your company credentials, team size, tools, and GSTIN details in under 10 minutes.",
      icon: ClipboardList,
    },
    {
      step: "02",
      title: "Quality & License Audit",
      description: "We audit contractors on technical capability, electrical licenses, safety records, and past execution projects.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      title: "Milestone RA Payouts",
      description: "We process weekly and milestone-linked Running Account bills with transparent SLAs.",
      icon: Coins,
    },
    {
      step: "04",
      title: "Long-Term Work Orders",
      description: "Continuous project allocation across ongoing multi-MW solar parks, substations, and civil infrastructure.",
      icon: CheckCircle2,
    },
  ];

  // Benefits for Empanelled Contractors
  const contractorBenefits = [
    {
      id: 0,
      title: "Pan-India Project Pipeline",
      subtitle: "Continuous Work Opportunities",
      icon: Building2,
      description:
        "Access steady execution work orders across Sarhat's 250+ MW utility-scale solar parks, EHV substations, commercial rooftops, and civil infrastructure projects across India.",
    },
    {
      id: 1,
      title: "Transparent Milestone Payouts",
      subtitle: "Guaranteed Commercial Terms",
      icon: Coins,
      description:
        "Enjoy weekly and milestone-linked payment releases backed by clear SLA criteria and automated RA bill processing without bureaucratic delays.",
    },
    {
      id: 2,
      title: "Engineering & Material Support",
      subtitle: "Full On-Site Technical Backup",
      icon: HardHat,
      description:
        "Sarhat provides detailed engineering drawings (SLDs, civil layouts), site surveys, high-grade BOM materials, and dedicated site safety engineers.",
    },
    {
      id: 3,
      title: "Strict Safety & HSE Standards",
      subtitle: "Zero-Accident Workplace",
      icon: ShieldCheck,
      description:
        "Empanelled contractors receive comprehensive PPE support, safety training toolkits, and site HSE supervision to protect your workforce.",
    },
    {
      id: 4,
      title: "Fair Competitive Bidding",
      subtitle: "Empanelled Vendor Portal",
      icon: Award,
      description:
        "Direct RFQs and transparent item-rate contracts sent exclusively to our verified sub-contractor network without middleman margins.",
    },
    {
      id: 5,
      title: "Long-Term Growth Partnership",
      subtitle: "Preferred Contractor Ranking",
      icon: Clock,
      description:
        "High-performing contractor teams get auto-allocated to large multi-MW projects and receive annual performance incentives.",
    },
  ];

  // Process Steps for Empanelment
  const empanelmentSteps = [
    {
      step: "01",
      title: "Submit Contractor Profile",
      description: "Fill out company credentials, team size, tools, and GSTIN details.",
      icon: ClipboardList,
      position: "top",
    },
    {
      step: "02",
      title: "Document Verification",
      description: "Our procurement team audits your licenses, past projects, and safety records.",
      icon: FileCheck2,
      position: "bottom",
    },
    {
      step: "03",
      title: "Empanelment Approval",
      description: "Get enlisted into Sarhat's active contractor registry with regional priority.",
      icon: FileSignature,
      position: "top",
    },
    {
      step: "04",
      title: "RFQ & Bid Allocation",
      description: "Receive project RFQs, item-rate BOQs, and site work orders.",
      icon: Wrench,
      position: "bottom",
    },
    {
      step: "05",
      title: "Site Execution & Payouts",
      description: "Execute site packages and receive timely milestone RA bill payouts.",
      icon: CircleDollarSign,
      position: "top",
    },
  ];

  // Contractor Categories List
  const contractorCategories = [
    {
      id: "civil-earthworks",
      title: "Civil & Earthworks",
      tag: "CIVIL INFRASTRUCTURE",
      icon: Building2,
      number: "01",
      description:
        "Specialized teams for solar park land grading, pile foundation casting, access road development, boundary fencing, transformer plinths, and control room civil construction.",
      specs: [
        "Pile Foundation Casting & Testing",
        "Control Room & Equipment Plinths",
        "Heavy Earthmoving & Land Leveling",
        "Internal Access Roads & Drainage",
      ],
    },
    {
      id: "electrical-cabling",
      title: "Electrical Erection & Cabling",
      tag: "ELECTRICAL SYSTEMS",
      icon: Zap,
      number: "02",
      description:
        "Licensed Class-A electrical contractors for DC string cabling, AC power cabling, cable trenching, inverter station integration, and earthing protection grid execution.",
      specs: [
        "HT & LT Cable Laying & Termination",
        "DC Cable Stringing & Combiner Boxes",
        "Earthing Grid & Lightning Protection",
        "Megger & Insulation Testing",
      ],
    },
    {
      id: "substation-ehv",
      title: "Substation & EHV Grid Works",
      tag: "GRID INTERCONNECTION",
      icon: Activity,
      number: "03",
      description:
        "Experienced erection teams for 33kV / 132kV / 220kV bay erection, power transformer placement, gantry structure assembly, and switchyard cabling.",
      specs: [
        "33kV / 132kV / 220kV Bay Erection",
        "Power Transformer Placement & Oil Testing",
        "Gantry Structures & Busbar Assembly",
        "CEIG Clearance Coordination",
      ],
    },
    {
      id: "pv-structure-mounting",
      title: "Solar PV Structure & Module Mounting",
      tag: "SOLAR ARRAY MECHANICAL",
      icon: Layers,
      number: "04",
      description:
        "High-speed mechanical teams for MMS (Module Mounting Structure) assembly, seasonal tilt/tracker alignment, solar PV module mounting, and torque-tightening.",
      specs: [
        "MMS Column & Rafter Assembly",
        "Single-Axis Tracker Alignment",
        "Solar PV Module Mounting & Fastening",
        "Calibrated Torque Tightening Inspections",
      ],
    },
  ];

  // FAQ Data by Category
  const faqData = {
    Empanellment: [
      {
        question: "Who can register as an Execution Contractor with Sarhat?",
        answer:
          "Civil engineering contractors, Class-A electrical contractors, solar mounting teams, pile casting crews, and EHV substation erection specialists with active GSTIN and execution machinery.",
      },
      {
        question: "Is there any registration fee to become an empanelled contractor?",
        answer:
          "No. Registration in Sarhat's empanelled contractor network is 100% free with no registration or listing fee required.",
      },
      {
        question: "What documents are required for contractor verification?",
        answer:
          "Company registration / PAN, GSTIN certificate, Class-A electrical license (for electrical contractors), PF/ESIC registration, and past project execution references.",
      },
    ],
    Execution: [
      {
        question: "How are work orders allocated to contractors?",
        answer:
          "When a project is sanctioned in your region, item-rate BOQs and RFQs are dispatched directly to verified empanelled contractors in that category for competitive bidding.",
      },
      {
        question: "Does Sarhat supply project materials or do contractors provide them?",
        answer:
          "Sarhat supplies major high-value procurement materials (solar PV modules, inverters, structures, HT cables, transformers). Contractors focus primarily on labor, machinery, tools, and execution quality.",
      },
      {
        question: "What safety protocols are enforced on site?",
        answer:
          "All workers must wear mandatory PPE (helmets, harnesses, safety boots). Sarhat enforces strict zero-accident HSE guidelines, daily toolbox talks, and work-at-height permits.",
      },
    ],
    Payments: [
      {
        question: "What are the payment terms for empanelled contractors?",
        answer:
          "Payments are processed based on weekly / fortnightly Running Account (RA) bills against verified site measurements, certified by Sarhat's Resident Project Manager.",
      },
      {
        question: "Are mobilization advances provided for large work orders?",
        answer:
          "Yes, for major civil and substation packages, mobilization advances are available against standard bank guarantees or contractual milestones.",
      },
    ],
  };

  return (
    <SmoothScroll>
      <div className="bg-[#F8FAF8] text-slate-900 font-sans min-h-screen selection:bg-[#D4E012] selection:text-black">
        {/* Navigation */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* Dynamic Quote Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

        {/* Sticky Hero Container (100vh Fullscreen Hero) */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={containerRef} className="relative h-full w-full flex flex-col justify-center items-center bg-slate-950 text-white overflow-hidden select-none">
            {/* Cinematic High-Res Fullscreen Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Execution Contractors Sarhat Energy"
                fill
                priority
                quality={100}
                className="object-cover object-center opacity-90 transform scale-105"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10 pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={40}>
                {/* Main Headline */}
                <div className="max-w-4xl flex flex-col items-center text-center">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.12] mb-6 text-center drop-shadow-lg">
                    Empanelled <br />
                    <span className="text-[#D4E012] italic relative inline-block">
                      Execution Contractors.
                    </span>
                  </h1>

                  {/* Subtitle Paragraph */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-3xl text-center leading-relaxed mb-6 tracking-wide drop-shadow-md">
                    Join Sarhat&apos;s verified contractor network for civil, electrical, substation, and mechanical solar project execution across India. <br className="hidden sm:block" />

                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Main Content Sections */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ==========================================
          1. WHY EMPANEL WITH SARHAT (Image 1 Style 4-Column Hexagons)
          ========================================== */}
          <section id="why-empanel" className="py-8 sm:py-12 bg-[#F8FAF8] relative z-10 font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-4xl mx-auto mb-10">
                  <AnimatedPillBadge className="mb-3">
                    Why Empanel
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-4">
                    Execute with India&apos;s Premier <span className="text-[#6DAD45] italic">Solar &amp; Infra EPC.</span>
                  </h2>
                  <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                    Sarhat Energy executes mega-watt solar parks, EHV substations, BESS storage, and industrial civil infrastructure across Uttar Pradesh, Rajasthan, Gujarat, Maharashtra, and Madhya Pradesh. We empanel qualified execution contractors with guaranteed commercial terms and HSE backing.
                  </p>
                </div>
              </ScrollReveal>

              {/* 4 Column Process Steps with Hexagon Styling (Image 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
                {whyEmpanelSteps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.step} direction="up" distance={30}>
                      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg hover:border-[#D4E012] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group h-full">
                        {/* Step Number Tag */}
                        <span className="text-xs font-mono font-bold text-[#707B00] mb-3">
                          {item.step}
                        </span>

                        {/* Hexagon-Style Icon Badge */}
                        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                          <div className="absolute inset-0 bg-[#D4E012]/20 rounded-2xl rotate-45 group-hover:rotate-90 group-hover:bg-[#D4E012]/30 transition-all duration-300"></div>
                          <Icon className="w-8 h-8 text-[#707B00] relative z-10" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-serif-display font-bold text-slate-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans-ui">
                          {item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* 6 Contractor Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {contractorBenefits.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.id} direction="up" distance={30} delay={idx * 80}>
                      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg hover:border-[#D4E012] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-[#707B00]" />
                          </div>
                          <div className="text-xs font-mono font-bold text-[#707B00] uppercase tracking-wider mb-1.5">
                            {item.subtitle}
                          </div>
                          <h3 className="text-lg font-serif-display font-bold text-slate-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans-ui">
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

          {/* ==========================================
          2. CONTRACTOR CATEGORIES (Full Cards)
          ========================================== */}
          <section id="categories" className="py-8 sm:py-12 bg-slate-50/80 border-t border-slate-200 font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <AnimatedPillBadge className="mb-3">
                    Specialty Categories
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-3">
                    Contractor <span className="text-[#6DAD45] italic">Disciplines.</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    We empanel specialized execution teams across five primary renewable energy &amp; civil infrastructure disciplines.
                  </p>
                </div>
              </ScrollReveal>

              {/* Cards Stack */}
              <div className="space-y-6">
                {contractorCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <ScrollReveal key={cat.id} direction="up" distance={40}>
                      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:border-[#D4E012] transition-all duration-300 p-6 sm:p-8 relative overflow-hidden group">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          {/* Left Number Visual */}
                          <div className="lg:col-span-3 flex items-center justify-center">
                            <div className="relative flex items-center justify-center">
                              <span className="text-8xl sm:text-9xl font-serif-display font-bold text-slate-100 select-none group-hover:text-[#D4E012]/15 transition-colors">
                                {cat.number}
                              </span>
                              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center shadow-md">
                                <Icon className="w-10 h-10 text-[#707B00]" />
                              </div>
                            </div>
                          </div>

                          {/* Middle Details */}
                          <div className="lg:col-span-6 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="px-3 py-1 rounded-md bg-[#D4E012]/20 text-[#707B00] border border-[#D4E012]/40 font-mono font-bold text-xs uppercase tracking-wider">
                                {cat.tag}
                              </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                              {cat.title}
                            </h3>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                              {cat.description}
                            </p>
                          </div>

                          {/* Right Specs & Action */}
                          <div className="lg:col-span-3 space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
                            <ul className="space-y-2.5">
                              {cat.specs.map((spec, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                  <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>

                            <button
                              onClick={() => selectCategoryCard(cat.title)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/20 group/btn"
                            >
                              <span>Apply for {cat.title}</span>
                              <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ==========================================
          3. HOW EMPANELMENT WORKS (Process Timeline)
          ========================================== */}
          <section className="py-8 sm:py-12 bg-[#F8FAF8] relative overflow-hidden font-sans-ui border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <AnimatedPillBadge className="mb-3">
                    Empanelment Process
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-3">
                    How to Become an <span className="text-[#6DAD45] italic">Empanelled Contractor.</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    Follow these 5 simple steps to get enlisted into Sarhat&apos;s active project bidding network.
                  </p>
                </div>
              </ScrollReveal>

              {/* Desktop Curved Step Timeline */}
              <div className="relative py-2 hidden lg:block">
                {/* SVG Curved Line */}
                <svg
                  className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none z-0"
                  viewBox="0 0 1200 120"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 50 60 Q 200 120, 350 60 T 650 60 T 950 60 T 1150 60"
                    stroke="#6DAD45"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    fill="none"
                  />
                </svg>

                {/* 5 Step Cards */}
                <div className="grid grid-cols-5 gap-4 relative z-10">
                  {empanelmentSteps.map((item) => {
                    const Icon = item.icon;
                    const isTop = item.position === "top";

                    return (
                      <div key={item.step} className="flex flex-col items-center text-center">
                        {/* Top Card */}
                        {isTop && (
                          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg hover:border-[#D4E012] transition-all duration-300 w-full mb-6 relative group min-h-[140px] flex flex-col justify-center">
                            <div className="text-xs font-mono font-bold text-[#707B00] mb-1">{item.step}</div>
                            <h4 className="text-sm font-serif-display font-semibold text-slate-900 mb-1 leading-snug">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui">{item.description}</p>
                          </div>
                        )}

                        {/* Circle Node */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] border-4 border-white shadow-xl flex items-center justify-center shrink-0 z-20 my-2 hover:scale-125 transition-transform cursor-pointer">
                          <Icon className="w-5 h-5 text-black" />
                        </div>

                        {/* Bottom Card */}
                        {!isTop && (
                          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg hover:border-[#D4E012] transition-all duration-300 w-full mt-6 relative group min-h-[140px] flex flex-col justify-center">
                            <div className="text-xs font-mono font-bold text-[#707B00] mb-1">{item.step}</div>
                            <h4 className="text-sm font-serif-display font-semibold text-slate-900 mb-1 leading-snug">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui">{item.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
                {empanelmentSteps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#707B00]" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-[#707B00] mb-0.5">{item.step}</div>
                        <h4 className="text-base font-serif-display font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans-ui">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ==========================================
          4. CONTRACTOR EMPANELMENT FORM
          ========================================== */}
          <section id="empanelment-form" className="py-8 sm:py-12 bg-slate-100/80 border-t border-slate-200 font-sans-ui relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <AnimatedPillBadge className="mb-3">
                    Register Now
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-2">
                    Contractor <span className="text-[#6DAD45] italic">Registration.</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Register your firm into Sarhat&apos;s active execution database.
                  </p>
                </div>
              </ScrollReveal>

              {/* Form Card */}
              <ScrollReveal direction="up" distance={40}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8">
                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900">Registration Submitted!</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto">
                        Thank you for registering your contractor firm with Sarhat. Our site procurement manager will review your submission and reach out within 24-48 hours.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setIsVerified(false);
                          setFormData({
                            companyName: "",
                            contactPerson: "",
                            email: "",
                            phone: "",
                            city: "",
                            state: "",
                            specialty: "Civil & Earthworks",
                            teamSize: "10-25 Workers",
                            experienceYears: "3-5 Years",
                            gstin: "",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#D4E012] hover:text-black transition-colors"
                      >
                        Register Another Firm
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Company / Firm Name */}
                        <div>
                          <input
                            type="text"
                            name="companyName"
                            required
                            placeholder="Company / Firm Name *"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* Contact Person */}
                        <div>
                          <input
                            type="text"
                            name="contactPerson"
                            required
                            placeholder="Contact Person Name *"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Phone / WhatsApp *"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* City / Headquarter */}
                        <div>
                          <input
                            type="text"
                            name="city"
                            required
                            placeholder="Headquarter City *"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* Primary Operating State */}
                        <div>
                          <select
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Primary Operating State *
                            </option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Pan-India">Pan-India Coverage</option>
                          </select>
                        </div>

                        {/* Contractor Specialty */}
                        <div>
                          <select
                            name="specialty"
                            required
                            value={formData.specialty}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Contractor Specialty *
                            </option>
                            <option value="Civil & Earthworks">Civil &amp; Earthworks</option>
                            <option value="Electrical Erection & Cabling">Electrical Erection &amp; Cabling</option>
                            <option value="Substation & EHV Grid Works">Substation &amp; EHV Grid Works</option>
                            <option value="Solar PV Structure & Module Mounting">Solar PV Structure &amp; Module Mounting</option>
                            <option value="General EPC Subcontractor">General EPC Subcontractor</option>
                          </select>
                        </div>

                        {/* Team Size */}
                        <div>
                          <select
                            name="teamSize"
                            required
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Active On-Site Team Size *
                            </option>
                            <option value="5-10 Workers">5 - 10 Workers</option>
                            <option value="10-25 Workers">10 - 25 Workers</option>
                            <option value="25-50 Workers">25 - 50 Workers</option>
                            <option value="50-100 Workers">50 - 100 Workers</option>
                            <option value="100+ Workers">100+ Workers</option>
                          </select>
                        </div>

                        {/* Experience in Field */}
                        <div>
                          <select
                            name="experienceYears"
                            required
                            value={formData.experienceYears}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Years in Execution Business *
                            </option>
                            <option value="1-3 Years">1 - 3 Years</option>
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5-10 Years">5 - 10 Years</option>
                            <option value="10+ Years">10+ Years</option>
                          </select>
                        </div>

                        {/* GSTIN / License Number */}
                        <div>
                          <input
                            type="text"
                            name="gstin"
                            placeholder="GSTIN / License Number (Optional)"
                            value={formData.gstin}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>
                      </div>

                      {/* Message / Past Experience */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                          Past Projects &amp; Equipment Owned
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Briefly describe your major past solar/civil projects, available tools, pile rigs, or electrical testing gear..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                        ></textarea>
                      </div>

                      {/* Company Profile PDF Upload Field (Image 2 Style) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                          Company Profile / License Doc <span className="text-slate-400 font-normal lowercase">(optional, PDF only)</span>
                        </label>
                        <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 hover:border-[#D4E012] transition-all text-center cursor-pointer group">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex items-center justify-center gap-3 text-slate-600">
                            <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#707B00] transition-colors" />
                            <span className="text-sm font-medium">
                              {profileFile ? (
                                <span className="text-[#707B00] font-bold">{profileFile.name}</span>
                              ) : (
                                "Click to upload company profile PDF"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Security Verification */}
                      <div className="pt-1">
                        <div
                          onClick={() => setIsVerified(!isVerified)}
                          className={`inline-flex items-center gap-4 border rounded-lg px-4 py-3 cursor-pointer select-none transition-all ${isVerified
                              ? "bg-slate-900 border-slate-800 text-white"
                              : "bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-900"
                            }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isVerified
                                ? "bg-[#D4E012] border-[#D4E012] text-black"
                                : "border-slate-500 bg-slate-800"
                              }`}
                          >
                            {isVerified && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium">Verify you are human</span>
                          <div className="ml-auto pl-6 border-l border-slate-700 text-[10px] text-slate-400 font-mono">
                            CLOUDFLARE
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-10 py-4 rounded-xl transition-all shadow-xl shadow-[#D4E012]/20 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Submitting Profile...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Registration</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ==========================================
          5. EMPANELMENT FAQ SECTION
          ========================================== */}
          <section className="py-8 sm:py-12 bg-[#F8FAF8] border-t border-slate-200 font-sans-ui">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <AnimatedPillBadge className="mb-3">
                    Got Questions?
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-2">
                    Frequently Asked <span className="text-[#6DAD45] italic">Questions.</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Everything you need to know about Sarhat&apos;s contractor empanelment process and commercial terms.
                  </p>
                </div>
              </ScrollReveal>

              {/* Category Tabs */}
              <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                {(["Empanellment", "Execution", "Payments"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveFaqTab(tab);
                      setOpenFaqIndex(0);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeFaqTab === tab
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-[#D4E012]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-4">
                {faqData[activeFaqTab].map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <span className="font-serif-display font-medium text-base sm:text-lg text-slate-900">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#707B00]" : ""
                            }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-sans-ui">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
