"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Truck,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowUpRight,
  ClipboardList,
  ChevronDown,
  Check,
  Upload,
  Cpu,
  Layers,
  Zap,
  Building2,
  Coins,
  Send,
  FileText,
  FileCheck2,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

export default function SupplyPartnersPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeFaqTab, setActiveFaqTab] = useState<"Empanellment" | "Procurement" | "Payments">("Empanellment");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    supplyCategory: "Solar Modules (Tier-1 ALMM)",
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
      setBrochureFile(e.target.files[0]);
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

  // Why Register 4 Steps (Image 1 Content)
  const whyRegisterSteps = [
    {
      step: "01",
      title: "Simple Registration",
      description: "Submit your company details and product categories in under 10 minutes.",
      icon: ClipboardList,
    },
    {
      step: "02",
      title: "Quality-First Evaluation",
      description: "We evaluate vendors on product quality, ALMM/BIS certifications, compliance, and delivery track record.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      title: "Timely Payments",
      description: "We maintain structured payment cycles with clear terms for all empanelled vendors.",
      icon: Truck,
    },
    {
      step: "04",
      title: "Long-Term Partnership",
      description: "Recurring procurement for ongoing multi-MW EPC projects — not one-off orders.",
      icon: CheckCircle2,
    },
  ];

  // Primary Supply Categories
  const supplyCategories = [
    {
      id: "modules",
      title: "Solar PV Modules",
      subtitle: "Tier-1 & ALMM Approved",
      icon: Layers,
      description:
        "High-efficiency TOPCon, Mono PERC, and bifacial solar PV modules with ALMM List-I listing and BIS certification for utility & C&I projects.",
      specs: ["TOPCon & Bifacial Technology", "ALMM List-I Empanelled", "144 / 132 Cell Configurations", "Linear Performance Warranties"],
    },
    {
      id: "inverters",
      title: "Solar Inverters & Power Electronics",
      subtitle: "String & Central Solutions",
      icon: Cpu,
      description:
        "On-grid string inverters (50kW-350kW) and central inverter stations (1MW-3.125MW) with SCADA telemetry compatibility.",
      specs: ["High Efficiency (>98.8%)", "Multi-MPPT Trackers", "IP66 Outdoor Rated", "Modbus / IEC 61850 SCADA"],
    },
    {
      id: "cables-switchgear",
      title: "Cables, Transformers & Switchgear",
      subtitle: "HT/LT Electrical Equipment",
      icon: Zap,
      description:
        "Solar DC cables, XLPE insulated HT cables, 33kV step-up transformers, vacuum circuit breakers (VCB), and RMUs.",
      specs: ["TÜV Certified Solar DC Cables", "33kV Power Transformers", "CPRI Tested Switchgear Panels", "Armoured HT Cabling"],
    },
    {
      id: "structures",
      title: "Mounting Structures & Fasteners",
      subtitle: "Galvanized Steel & Trackers",
      icon: Building2,
      description:
        "Hot-dip galvanized Module Mounting Structures (MMS), seasonal tilt structures, single-axis tracker assemblies, and SS304/SS316 hardware.",
      specs: ["Hot-Dip Galvanized (80+ Microns)", "Wind Load Certified (up to 180 km/h)", "Single-Axis Smart Trackers", "Fastener & Hardware Supplies"],
    },
  ];

  // FAQ Data by Category
  const faqData = {
    Empanellment: [
      {
        question: "Who can register as a Supply Partner with Sarhat?",
        answer:
          "Tier-1 solar module OEMs, inverter manufacturers, cable & conductor suppliers, transformer manufacturers, MMS structure fabricators, and electrical equipment vendors.",
      },
      {
        question: "Are ALMM and BIS certifications mandatory for solar module suppliers?",
        answer:
          "Yes. Solar PV module suppliers must possess valid ALMM (Approved List of Models and Manufacturers) listing and BIS certifications for utility and government projects.",
      },
      {
        question: "Is there any fee to register as a vendor?",
        answer:
          "No. Vendor empanelment and registration in Sarhat's procurement network is completely free of cost.",
      },
    ],
    Procurement: [
      {
        question: "How does Sarhat float procurement tenders and RFQs?",
        answer:
          "Empanelled supply partners receive direct electronic RFQs and purchase indent notifications based on upcoming project site bills of materials (BOM).",
      },
      {
        question: "What are the quality inspection protocols prior to dispatch?",
        answer:
          "All major procurement lots undergo Factory Acceptance Testing (FAT) and Joint Material Inspection (JMI) by Sarhat's QA/QC team before dispatch clearance.",
      },
    ],
    Payments: [
      {
        question: "What are the standard payment terms for supply partners?",
        answer:
          "Payment terms are structured via LC (Letter of Credit) or milestone-linked bank transfers against dispatch documents, invoice verification, and site GRN generation.",
      },
      {
        question: "Are long-term rate contracts available for OEMs?",
        answer:
          "Yes. High-capacity Tier-1 vendors can sign annual rate contracts (ARC) for committed MW volume allocations across our multi-state execution pipeline.",
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
                src="/images/bess-substation.jpg"
                alt="Supply Partners Sarhat Energy"
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
                      Supply Partners (OEMs).
                    </span>
                  </h1>

                  {/* Subtitle Paragraph */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-4xl text-center leading-relaxed mb-6 tracking-wide drop-shadow-md">
                    Join Sarhat&apos;s empanelled vendor network for Tier-1 solar modules, inverters, cables, transformers, mounting structures, and electrical equipment across India.
                  </p>

                  {/* Accent Yellow Underline */}
                  <div className="w-20 h-1.5 bg-[#D4E012] rounded-full shadow-[0_0_12px_#D4E012] mx-auto"></div>
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
          1. WHY REGISTER SECTION (Image 1 Replica styled with website theme)
          ========================================== */}
          <section id="why-register" className="py-8 sm:py-12 bg-[#F8FAF8] relative z-10 font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-4xl mx-auto mb-10">
                  <AnimatedPillBadge className="mb-3">
                    Why Register
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-4">
                    Supply to India&apos;s Growing <span className="text-[#6DAD45] italic">Solar EPC Pipeline.</span>
                  </h2>
                  <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                    Sarhat Energy executes solar EPC projects continuously across Uttar Pradesh, Rajasthan, Gujarat, Maharashtra, and Madhya Pradesh. We source Tier-1 equipment and services from a panel of pre-qualified vendors — prioritising quality, compliance, and delivery reliability above all else.
                  </p>
                </div>
              </ScrollReveal>

              {/* 4 Column Process Steps with Hexagon Styling (Image 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {whyRegisterSteps.map((item) => {
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
            </div>
          </section>

          {/* ==========================================
          2. PRIMARY SUPPLY CATEGORIES
          ========================================== */}
          <section id="categories" className="py-8 sm:py-12 bg-slate-50/80 border-t border-slate-200 font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <AnimatedPillBadge className="mb-3">
                    Procurement Categories
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-3">
                    Vendor <span className="text-[#6DAD45] italic">Supply Portfolios.</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    We regularly empanel manufacturers and distributors across four primary procurement buckets.
                  </p>
                </div>
              </ScrollReveal>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supplyCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <ScrollReveal key={cat.id} direction="up" distance={40}>
                      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:border-[#D4E012] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group h-full">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-[#707B00]" />
                            </div>
                            <span className="px-3 py-1 rounded-md bg-[#D4E012]/20 text-[#707B00] border border-[#D4E012]/40 font-mono font-bold text-xs uppercase tracking-wider">
                              {cat.subtitle}
                            </span>
                          </div>

                          <h3 className="text-2xl font-serif-display font-medium text-slate-900 mb-3 tracking-tight">
                            {cat.title}
                          </h3>

                          <p className="text-slate-600 text-sm leading-relaxed mb-6">
                            {cat.description}
                          </p>
                        </div>

                        {/* Specs List */}
                        <ul className="space-y-2 border-t border-slate-100 pt-4">
                          {cat.specs.map((spec, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ==========================================
          3. VENDOR APPLICATION FORM (Image 2 Replica styled with website theme)
          ========================================== */}
          <section id="vendor-application" className="py-8 sm:py-12 bg-slate-100/80 border-t border-slate-200 font-sans-ui relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <AnimatedPillBadge className="mb-3">
                    Submit Details
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-2">
                    Vendor <span className="text-[#6DAD45] italic">Application.</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Tell us about your company and what you supply.
                  </p>
                </div>
              </ScrollReveal>

              {/* Form Card (Image 2 Structure) */}
              <ScrollReveal direction="up" distance={40}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8">
                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900">Application Submitted!</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto">
                        Thank you for submitting your vendor profile to Sarhat Energy. Our procurement team will review your product catalog and contact you within 24-48 hours.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setIsVerified(false);
                          setBrochureFile(null);
                          setFormData({
                            companyName: "",
                            contactPerson: "",
                            email: "",
                            phone: "",
                            city: "",
                            supplyCategory: "Solar Modules (Tier-1 ALMM)",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#D4E012] hover:text-black transition-colors"
                      >
                        Submit Another Vendor Profile
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Company Name */}
                        <div>
                          <input
                            type="text"
                            name="companyName"
                            required
                            placeholder="Company Name *"
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
                            placeholder="Contact Person *"
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
                            placeholder="Email *"
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
                            placeholder="Phone *"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* City */}
                        <div>
                          <input
                            type="text"
                            name="city"
                            required
                            placeholder="City *"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* Primary Supply Category */}
                        <div>
                          <select
                            name="supplyCategory"
                            required
                            value={formData.supplyCategory}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Primary Supply Category *
                            </option>
                            <option value="Solar Modules (Tier-1 ALMM)">Solar Modules (Tier-1 ALMM)</option>
                            <option value="Solar Inverters (String/Central)">Solar Inverters (String/Central)</option>
                            <option value="Cables & Conductors (HT/LT/DC)">Cables &amp; Conductors (HT/LT/DC)</option>
                            <option value="Mounting Structures & Trackers">Mounting Structures &amp; Trackers</option>
                            <option value="Transformers & Switchgear">Transformers &amp; Switchgear</option>
                            <option value="BESS & Battery Components">BESS &amp; Battery Components</option>
                            <option value="Electrical Balance of Plant (eBoP)">Electrical Balance of Plant (eBoP)</option>
                            <option value="Other">Other Equipment</option>
                          </select>
                        </div>
                      </div>

                      {/* Message Area */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Share certifications, product details, and capacity."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                        ></textarea>
                      </div>

                      {/* Company Brochure PDF Upload Field (Image 2) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                          Company Brochure <span className="text-slate-400 font-normal lowercase">(optional, PDF only)</span>
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
                              {brochureFile ? (
                                <span className="text-[#707B00] font-bold">{brochureFile.name}</span>
                              ) : (
                                "Click to upload brochure PDF"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Security Verification Box (Image 2) */}
                      <div className="pt-1">
                        <div
                          onClick={() => setIsVerified(!isVerified)}
                          className={`inline-flex items-center gap-4 border rounded-lg px-4 py-3 cursor-pointer select-none transition-all ${
                            isVerified
                              ? "bg-slate-900 border-slate-800 text-white"
                              : "bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-900"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isVerified
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

                      {/* Submit Button (Image 2) */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-10 py-4 rounded-xl transition-all shadow-xl shadow-[#D4E012]/20 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Submitting Registration...</span>
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
          4. SUPPLY PARTNER FAQ SECTION
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
                    Everything you need to know about Sarhat&apos;s vendor empanelment process and commercial terms.
                  </p>
                </div>
              </ScrollReveal>

              {/* Category Tabs */}
              <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                {(["Empanellment", "Procurement", "Payments"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveFaqTab(tab);
                      setOpenFaqIndex(0);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeFaqTab === tab
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-[#D4E012]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3">
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
                          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-[#707B00]" : ""
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
