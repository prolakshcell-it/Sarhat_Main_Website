"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import {
  TrendingUp,
  ShieldCheck,
  Award,
  BookOpen,
  Megaphone,
  Share2,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  ClipboardList,
  GraduationCap,
  FileSignature,
  CircleDollarSign,
  ChevronDown,
  Send,
  Truck,
  Wrench,
  Check,
  HardHat,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

export default function PartnersPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeFaqTab, setActiveFaqTab] = useState<"Partnership" | "Joining" | "Responsibilities">("Partnership");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPartnerType, setSelectedPartnerType] = useState<string>("Solar Project Partner");
  const [activeOrbitNode, setActiveOrbitNode] = useState<number | null>(0);
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
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    profession: "",
    partnerType: "Solar Project Partner",
    experience: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const selectPartnerTypeCard = (type: string) => {
    setSelectedPartnerType(type);
    setFormData((prev) => ({ ...prev, partnerType: type }));
    const formElement = document.getElementById("apply");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Orbiting Benefit Nodes Data
  const orbitBenefits = [
    {
      id: 0,
      title: "High Commissions",
      subtitle: "Competitive Payouts",
      icon: TrendingUp,
      description: "Earn industry-leading commission structures on every converted solar project, from residential rooftop to megawatt utility scale.",
      angle: 0,
    },
    {
      id: 1,
      title: "Exclusive Territory",
      subtitle: "Regional Priority",
      icon: ShieldCheck,
      description: "Enjoy protected operational territory in your district with priority allocation for incoming regional leads.",
      angle: 60,
    },
    {
      id: 2,
      title: "Lead Sharing",
      subtitle: "Direct Routing",
      icon: Share2,
      description: "Receive pre-qualified inbound client leads generated through Sarhat's national digital marketing campaigns.",
      angle: 120,
    },
    {
      id: 3,
      title: "Growth Path",
      subtitle: "Tier Escalation",
      icon: Award,
      description: "Unlock higher commission tiers, annual bonuses, and exclusive partner awards as your closed volume expands.",
      angle: 180,
    },
    {
      id: 4,
      title: "Technical Training",
      subtitle: "Expert Orientation",
      icon: BookOpen,
      description: "Get continuous training on solar technology, net-metering policies, yield estimators, and closing strategies.",
      angle: 240,
    },
    {
      id: 5,
      title: "Brand Support",
      subtitle: "Co-Branded Assets",
      icon: Megaphone,
      description: "Access official Sarhat pitch decks, customized brochures, project site visit passes, and digital marketing kits.",
      angle: 300,
    },
  ];

  // Process Steps
  const processSteps = [
    {
      step: "01",
      title: "Fill the Application",
      description: "Submit your details via the partner form below.",
      icon: ClipboardList,
      position: "top",
    },
    {
      step: "02",
      title: "Get a Callback",
      description: "Our team reaches out to guide you to the right program.",
      icon: PhoneCall,
      position: "bottom",
    },
    {
      step: "03",
      title: "Training & Onboarding",
      description: "Complete a short onboarding on solar, sales, and Sarhat systems.",
      icon: GraduationCap,
      position: "top",
    },
    {
      step: "04",
      title: "Sign the Agreement",
      description: "Sign the contract and receive your welcome kit.",
      icon: FileSignature,
      position: "bottom",
    },
    {
      step: "05",
      title: "Start Earning",
      description: "Go live and start converting leads into commissions.",
      icon: CircleDollarSign,
      position: "top",
    },
  ];

  // FAQ Data by Category
  const faqData = {
    Partnership: [
      {
        question: "What is a Solar Partner with Sarhat?",
        answer:
          "A Solar Partner is someone who works with Sarhat to grow solar business in their network or region. You can either generate leads or execute projects based on your expertise. Sarhat supports you with technical, execution, and backend processes.",
      },
      {
        question: "What are the types of Solar Partners at Sarhat?",
        answer:
          "We offer flexible partnership tracks: Solar Project Partner (for sales lead generation, network building, & project co-execution) and Supply Partner (equipment suppliers & OEMs).",
      },
      {
        question: "Who can become a Solar Partner?",
        answer:
          "Entrepreneurs, real estate consultants, electrical contractors, civil engineers, financial advisors, equipment suppliers, hardware merchants, and motivated individuals with strong local networks.",
      },
      {
        question: "Is solar partnership a profitable business opportunity?",
        answer:
          "Yes! India's solar energy market is booming exponentially under PM Surya Ghar Muft Bijli Yojana and commercial net-metering mandates. As a Sarhat partner, you tap into multi-lakh commission potential on every project.",
      },
      {
        question: "Do I need technical knowledge to become a partner?",
        answer:
          "Not at all for sales and lead generation partners! Sarhat's dedicated technical team manages site feasibility assessments, string design, single line diagrams (SLD), DISCOM approvals, procurement, and turnkey installation.",
      },
    ],
    Joining: [
      {
        question: "How long does the onboarding process take?",
        answer:
          "Onboarding is fast and streamlined. Once you submit the partner form, our regional partner manager will call you within 24-48 hours. After agreement signing and a brief 1-hour orientation, you are ready to begin.",
      },
      {
        question: "Is there any registration fee or security deposit to join?",
        answer:
          "No. Joining the Sarhat Partner Program is 100% free with no hidden upfront fees, joining charges, or security deposits required.",
      },
      {
        question: "What documents are required to register?",
        answer:
          "Basic KYC documents are required: PAN Card, Aadhaar Card (or GST registration certificate for corporate partners), and valid bank account details for direct electronic commission transfers.",
      },
    ],
    Responsibilities: [
      {
        question: "How are leads and commissions tracked?",
        answer:
          "All client leads you submit are logged in Sarhat's partner tracking portal. You receive real-time notifications across survey completion, proposal dispatch, DISCOM sanctioning, and installation milestones.",
      },
      {
        question: "When and how are commissions paid out?",
        answer:
          "Commissions are transferred directly to your bank account upon project milestone completions or grid synchronization with zero delays.",
      },
      {
        question: "What marketing and sales support does Sarhat provide?",
        answer:
          "We supply complete sales toolkits including co-branded brochures, ROI calculation tools, video testimonials, sample solar panels/inverter datasheets, and dedicated account manager guidance.",
      },
    ],
  };

  return (
    <SmoothScroll>
      <main className="bg-[#F8FAF8] text-[#0F172A] min-h-screen font-sans-ui selection:bg-[#D4E012] selection:text-black overflow-x-clip">
        {/* Global Navigation */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

        {/* ==========================================
            1. HERO SECTION (Sticky background & Centered Content)
            ========================================== */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={containerRef} className="relative h-full w-full flex flex-col justify-center items-center bg-black text-white overflow-hidden select-none">
            {/* Cinematic High-Res Fullscreen Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/partner-hero-bg.jpg"
                alt="Sarhat Solar Energy Business Partnership"
                fill
                priority
                quality={100}
                className="object-cover object-center opacity-90 transform scale-105"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* High-Contrast Readability Gradient Overlay Scrims */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10 pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={40}>
                <div className="max-w-4xl flex flex-col items-center text-center">
                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.12] mb-6 text-center drop-shadow-lg">
                    Become a Sarhat <br />
                    <span className="text-[#D4E012] italic relative inline-block">
                      Solar Partner.
                    </span>
                  </h1>

                  {/* Subtitle Paragraph */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-5xl text-center leading-relaxed mb-6 tracking-wide drop-shadow-md">
                    Join India&apos;s growing solar economy. Earn commissions on lead referrals or co-execute projects as a Solar Project Partner — with Sarhat&apos;s full technical, marketing, and lead support behind you.
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

        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* ==========================================
          2. PARTNER BENEFITS & ORBIT VISUAL (Image 2 Top)
          ========================================== */}
          <section id="benefits" className="py-12 sm:py-16 bg-[#F8FAF8] relative z-10 font-sans-ui overflow-hidden">
            {/* Subtle Ambient Glows */}
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#6DAD45]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-6">
                    Partner Benefits
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-4">
                    Why Partner With <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Sarhat.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-2.5 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                      </svg>
                    </span>
                  </h2>
                  <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    India&apos;s solar market is booming. As a Sarhat partner, you get a proven brand, full support, and one of the most competitive commission structures in the market.
                  </p>
                </div>
              </ScrollReveal>

              {/* Central Interactive Orbit / Sun System (Matching Image 2 Orbit Diagram) */}
              <ScrollReveal direction="up" distance={40}>
                <div className="relative max-w-4xl mx-auto py-12 flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
                  {/* Concentric Glowing Outer Circles */}
                  <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full border border-[#D4E012]/30 animate-[spin_60s_linear_infinite]"></div>
                  <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-[#6DAD45]/40"></div>

                  {/* Center Sun Orb */}
                  <div className="z-20 w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#D4E012] via-[#6DAD45] to-[#5EE72D] p-1 shadow-[0_0_50px_rgba(212,224,18,0.4)] flex flex-col items-center justify-center text-center text-black font-extrabold select-none hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="w-full h-full rounded-full border border-white/50 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-lime-300/30 to-green-600/30 backdrop-blur-sm">
                      <div className="text-[10px] sm:text-xs tracking-widest uppercase text-slate-950 font-mono font-bold mb-1">
                        SARHAT ENERGY
                      </div>
                      <div className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider leading-tight font-sans-ui">
                        LIMITED.
                      </div>
                    </div>
                  </div>

                  {/* 6 Orbiting Satellite Benefit Nodes */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {orbitBenefits.map((node, idx) => {
                      const Icon = node.icon;
                      // Calculate positioning angles around the circle
                      const angles = [270, 330, 30, 90, 150, 210]; // degrees
                      const rad = (angles[idx] * Math.PI) / 180;
                      const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 150 : 210;
                      const x = Math.cos(rad) * radius;
                      const y = Math.sin(rad) * radius;

                      const isActive = activeOrbitNode === idx;

                      return (
                        <div
                          key={node.id}
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                          }}
                          onClick={() => setActiveOrbitNode(idx)}
                          className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 flex items-center gap-2.5 bg-white border ${isActive
                            ? "border-[#D4E012] ring-4 ring-[#D4E012]/30 shadow-xl scale-110 z-30"
                            : "border-slate-200 shadow-md hover:border-[#6DAD45] hover:scale-105"
                            } rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 max-w-[160px] sm:max-w-[200px]`}
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#707B00]" />
                          </div>
                          <div className="text-left">
                            <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                              {node.title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Active Benefit Detail Box */}
              {activeOrbitNode !== null && (
                <ScrollReveal direction="up" distance={20}>
                  <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-xl text-center">
                    <div className="inline-flex items-center gap-2 text-[#707B00] font-mono font-bold text-xs uppercase tracking-wider mb-2">
                      <span>{orbitBenefits[activeOrbitNode].subtitle}</span>
                    </div>
                    <h3 className="text-xl font-serif-display font-medium text-slate-900 mb-2">
                      {orbitBenefits[activeOrbitNode].title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans-ui">
                      {orbitBenefits[activeOrbitNode].description}
                    </p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </section>

          {/* ==========================================
          3. CHOOSE YOUR PARTNERSHIP / PARTNER TYPES (Image 2 Bottom & Image 3 Top)
          ========================================== */}
          <section id="partner-types" className="py-8 sm:py-10 bg-slate-50/80 border-t border-slate-200 font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                  <AnimatedPillBadge className="mb-6">
                    Partner Types
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-4">
                    Choose Your <span className="text-[#6DAD45] italic">Partnership.</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    We offer flexible partnership models tailored to your strengths, technical expertise, and business goals.
                  </p>
                </div>
              </ScrollReveal>

              {/* Cards Stack (2 Flexible Models: Project Partner, Supply Partner) */}
              <div className="space-y-8">
                {/* CARD 01: Solar Project Partner */}
                <ScrollReveal direction="up" distance={40}>
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:border-[#D4E012] transition-all duration-300 p-8 sm:p-10 relative overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Number Visual */}
                      <div className="lg:col-span-3 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <span className="text-8xl sm:text-9xl font-serif-display font-bold text-slate-100 select-none group-hover:text-[#D4E012]/15 transition-colors">
                            01
                          </span>
                          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center shadow-md">
                            <Wrench className="w-10 h-10 text-[#707B00]" />
                          </div>
                        </div>
                      </div>

                      {/* Middle Details */}
                      <div className="lg:col-span-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-md bg-[#D4E012]/20 text-[#707B00] border border-[#D4E012]/40 font-mono font-bold text-xs uppercase tracking-wider">
                            SALES &amp; EPC CO-EXECUTION
                          </span>
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">
                            Lead Gen &amp; Project Execution
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                          Solar Project Partner
                        </h3>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          Designed for sales professionals, real estate agents, electrical contractors, civil engineers, and EPC firms. Whether you generate sales leads for high commissions or co-execute solar installations alongside Sarhat&apos;s engineering teams, this model offers full technical support, shared procurement rates, and flexible earnings.
                        </p>
                      </div>

                      {/* Right Bullet Points & Action */}
                      <div className="lg:col-span-3 space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Earn commissions on sales leads</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Co-execute projects with Sarhat</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Full technical &amp; marketing support</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Shared procurement rates</span>
                          </li>
                        </ul>

                        <button
                          onClick={() => selectPartnerTypeCard("Solar Project Partner")}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/20 group/btn"
                        >
                          <span>Apply as Project Partner</span>
                          <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* CARD 02: Supply Partner (Equipment Vendors & OEMs) */}
                <ScrollReveal direction="up" distance={40}>
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:border-[#D4E012] transition-all duration-300 p-8 sm:p-10 relative overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Number Visual */}
                      <div className="lg:col-span-3 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <span className="text-8xl sm:text-9xl font-serif-display font-bold text-slate-100 select-none group-hover:text-[#D4E012]/15 transition-colors">
                            02
                          </span>
                          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center shadow-md">
                            <Truck className="w-10 h-10 text-[#707B00]" />
                          </div>
                        </div>
                      </div>

                      {/* Middle Details */}
                      <div className="lg:col-span-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-md bg-[#D4E012]/20 text-[#707B00] border border-[#D4E012]/40 font-mono font-bold text-xs uppercase tracking-wider">
                            VENDORS &amp; SUPPLIERS
                          </span>
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">
                            Pan-India Procurement
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                          Supply Partner (Vendors &amp; OEMs)
                        </h3>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          Designed for Tier-1 solar module manufacturers, inverter OEMs, cable &amp; structure suppliers, transformers, and electrical equipment vendors looking to supply high-volume solar projects across Sarhat&apos;s utility and C&amp;I execution pipeline.
                        </p>
                      </div>

                      {/* Right Bullet Points & Action */}
                      <div className="lg:col-span-3 space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>High-volume procurement contracts</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Transparent vendor onboarding</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Prompt payment cycles</span>
                          </li>
                        </ul>

                        <Link
                          href="/supply-partners"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/20 group/btn"
                        >
                          <span>Explore Supply Partners</span>
                          <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* CARD 03: Execution Contractors */}
                <ScrollReveal direction="up" distance={40}>
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:border-[#D4E012] transition-all duration-300 p-8 sm:p-10 relative overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Number Visual */}
                      <div className="lg:col-span-3 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <span className="text-8xl sm:text-9xl font-serif-display font-bold text-slate-100 select-none group-hover:text-[#D4E012]/15 transition-colors">
                            03
                          </span>
                          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center shadow-md">
                            <HardHat className="w-10 h-10 text-[#707B00]" />
                          </div>
                        </div>
                      </div>

                      {/* Middle Details */}
                      <div className="lg:col-span-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-md bg-[#D4E012]/20 text-[#707B00] border border-[#D4E012]/40 font-mono font-bold text-xs uppercase tracking-wider">
                            SITE EXECUTION
                          </span>
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">
                            Empanelled Subcontractors
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                          Execution Contractors
                        </h3>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          Empanelled contractor network for civil earthworks, pile foundation casting, AC/DC electrical cabling, solar PV structure mounting, and 33kV/132kV EHV substation erection teams across India.
                        </p>
                      </div>

                      {/* Right Bullet Points & Action */}
                      <div className="lg:col-span-3 space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Pan-India project bidding</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Timely milestone RA payouts</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>Full site safety &amp; engineering support</span>
                          </li>
                        </ul>

                        <Link
                          href="/execution-contractors"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/20 group/btn"
                        >
                          <span>Explore Execution Contractors</span>
                          <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ==========================================
          4. HOW TO BECOME A SOLAR PARTNER (Image 3 Bottom Curve Path)
          ========================================== */}
          <section className="py-8 sm:py-10 bg-[#F8FAF8] relative overflow-hidden font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                  <AnimatedPillBadge className="mb-3">
                    How It Works
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-3">
                    How to Become a <span className="text-[#6DAD45] italic">Solar Partner.</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    Follow these simple steps to start your partnership with Sarhat.
                  </p>
                </div>
              </ScrollReveal>

              {/* Desktop Curved Step Timeline (Matching Image 3 Wavy Path) */}
              <div className="relative py-4 hidden lg:block">
                {/* SVG Curved Connecting Line */}
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

                {/* 5 Step Cards Alternating Top and Bottom */}
                <div className="grid grid-cols-5 gap-4 relative z-10">
                  {processSteps.map((item) => {
                    const Icon = item.icon;
                    const isTop = item.position === "top";

                    return (
                      <div key={item.step} className="flex flex-col items-center text-center">
                        {/* Top Card (for top items) */}
                        {isTop && (
                          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:border-[#D4E012] transition-all duration-300 w-full mb-12 relative group min-h-[160px] flex flex-col justify-center">
                            <div className="text-xs font-mono font-bold text-[#707B00] mb-1">{item.step}</div>
                            <h4 className="text-sm font-serif-display font-semibold text-slate-900 mb-2 leading-snug">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui">{item.description}</p>
                          </div>
                        )}

                        {/* Circle Node on Wavy Path */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4E012] to-[#6DAD45] border-4 border-white shadow-xl flex items-center justify-center shrink-0 z-20 my-2 hover:scale-125 transition-transform cursor-pointer">
                          <Icon className="w-5 h-5 text-black" />
                        </div>

                        {/* Bottom Card (for bottom items) */}
                        {!isTop && (
                          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:border-[#D4E012] transition-all duration-300 w-full mt-12 relative group min-h-[160px] flex flex-col justify-center">
                            <div className="text-xs font-mono font-bold text-[#707B00] mb-1">{item.step}</div>
                            <h4 className="text-sm font-serif-display font-semibold text-slate-900 mb-2 leading-snug">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-sans-ui">{item.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Grid Layout for Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
                {processSteps.map((item) => {
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
          5. PARTNER APPLICATION FORM (Image 4)
          ========================================== */}
          <section id="apply" className="py-12 sm:py-16 bg-slate-100/80 border-t border-slate-200 font-sans-ui relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-6">
                    Apply Now
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-3">
                    Partner <span className="text-[#6DAD45] italic">Application.</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Fill in your details and we&apos;ll get back to you shortly.
                  </p>
                </div>
              </ScrollReveal>

              {/* Form Card (Exact visual structure from Image 4) */}
              <ScrollReveal direction="up" distance={40}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10">
                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900">Application Submitted!</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto">
                        Thank you for applying to become a Sarhat Solar Partner. Our regional partnership manager will review your submission and contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setIsVerified(false);
                          setFormData({
                            fullName: "",
                            email: "",
                            phone: "",
                            city: "",
                            state: "",
                            profession: "",
                            partnerType: "Solar Project Partner",
                            experience: "",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#D4E012] hover:text-black transition-colors"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                          <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="Full Name *"
                            value={formData.fullName}
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

                        {/* City / Region */}
                        <div>
                          <input
                            type="text"
                            name="city"
                            required
                            placeholder="City / Region *"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                          />
                        </div>

                        {/* Profession */}
                        <div>
                          <select
                            name="profession"
                            required
                            value={formData.profession}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Profession *
                            </option>
                            <option value="Real Estate Agent">Real Estate Agent / Consultant</option>
                            <option value="Electrical Contractor">Electrical / Civil Contractor</option>
                            <option value="Financial Advisor">Financial / Insurance Advisor</option>
                            <option value="Engineer">Engineer / Architect</option>
                            <option value="Business Owner">Business Owner / Merchant</option>
                            <option value="Equipment Vendor">Solar / Electrical Equipment Vendor</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* State */}
                        <div>
                          <select
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              State *
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
                            <option value="Other">Other State</option>
                          </select>
                        </div>

                        {/* Partner Type */}
                        <div>
                          <select
                            name="partnerType"
                            required
                            value={formData.partnerType}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Partner Type *
                            </option>
                            <option value="Solar Project Partner">Solar Project Partner (Sales &amp; Execution)</option>
                            <option value="Supply Partner">Supply Partner (Vendors &amp; OEMs)</option>
                            <option value="Execution Partner">Execution Partner (Contractor)</option>
                          </select>
                        </div>

                        {/* Experience in Solar Industry */}
                        <div>
                          <select
                            name="experience"
                            required
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Experience in Solar Industry *
                            </option>
                            <option value="None">No Prior Experience</option>
                            <option value="Under 1 Year">Less than 1 Year</option>
                            <option value="1-3 Years">1 - 3 Years</option>
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                          </select>
                        </div>
                      </div>

                      {/* Message Area */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell us about your business and why you'd like to partner with Sarhat..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4E012] focus:ring-2 focus:ring-[#D4E012]/30 font-medium transition-all"
                        ></textarea>
                      </div>

                      {/* Turnstile Security Box (Matching Image 4) */}
                      <div className="pt-2">
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
                            <span>Submitting Application...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-black" />
                              <span>Submit Application</span>
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
          6. FREQUENTLY ASKED QUESTIONS (Image 5)
          ========================================== */}
          <section className="py-12 sm:py-16 bg-[#F8FAF8] font-sans-ui">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-6">
                    Partner FAQs
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-3">
                    Frequently Asked <span className="text-[#6DAD45] italic">Questions.</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Quick answers about the Sarhat partner program, joining process, support, payments, and lead tracking.
                  </p>
                </div>
              </ScrollReveal>

              {/* Category Tabs & Accordion Container (Exact layout from Image 5) */}
              <ScrollReveal direction="up" distance={40}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-slate-100">
                    {(["Partnership", "Joining", "Responsibilities"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveFaqTab(tab);
                          setOpenFaqIndex(0);
                        }}
                        className={`px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all ${activeFaqTab === tab
                          ? "bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black shadow-md shadow-[#D4E012]/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Accordion Questions */}
                  <div className="divide-y divide-slate-100">
                    {faqData[activeFaqTab].map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="py-4 first:pt-0 last:pb-0">
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between gap-4 text-left py-2 font-bold text-slate-900 hover:text-[#707B00] transition-colors"
                          >
                            <span className="text-sm sm:text-base font-serif-display font-medium">{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#707B00]" : ""
                                }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 pb-3 pr-6 font-sans-ui">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ==========================================
          7. BOTTOM YELLOW ACCENT BANNER (Image 5 Bottom)
          ========================================== */}
          <section className="bg-gradient-to-r from-[#D4E012] via-[#5EE72D] to-[#D4E012] py-4 text-center select-none shadow-inner">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-slate-950 font-black italic text-sm sm:text-lg tracking-wide font-serif-display uppercase">
                Powering India with Green Energy
              </p>
            </div>
          </section>
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
