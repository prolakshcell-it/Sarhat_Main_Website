"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Box,
  Layers,
  Globe2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteModal from "@/components/QuoteModal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

const INDIAN_STATES = [
  "Rajasthan",
  "Uttar Pradesh",
  "Haryana",
  "Madhya Pradesh",
  "Bihar",
  "Arunachal Pradesh",
  "Other state",
];

const PRODUCT_SLUG_MAP: Record<string, string> = {
  kusum: "PM-KUSUM",
  "pm-kusum": "PM-KUSUM",
  "open-access": "Open Access Solar",
  "open-access-solar": "Open Access Solar",
  "surya-sarovar": "Surya Sarovar",
  "canal-top": "Canal-Top Solar",
  "canal-top-solar": "Canal-Top Solar",
  "agri-pv": "Agri-PV (Agrivoltaics)",
  agrivoltaics: "Agri-PV (Agrivoltaics)",
  residential: "Residential Rooftop Solar",
  "residential-solar": "Residential Rooftop Solar",
  "industrial-commercial": "Industrial & Commercial Rooftop Solar",
  institutional: "Institutional Rooftop Solar",
  "standalone-bess": "Standalone BESS",
  "bess-pv-wind": "BESS meets PV / Wind",
  substations: "Substations & Switchyards",
  "substations-switchyards": "Substations & Switchyards",
  "transmission-lines": "Transmission Lines",
  transmission: "Transmission Lines",
  "piling-foundations": "Piling & Foundations",
  piling: "Piling & Foundations",
  "telecom-towers": "Telecommunication Towers",
  "telecommunication-towers": "Telecommunication Towers",
  "industrial-buildings": "Industrial Buildings",
  "commercial-buildings": "Commercial Buildings",
  "roads-drainage": "Roads & Drainage",
  roads: "Roads & Drainage",
  drainage: "Roads & Drainage",
  other: "Something else",
};

function DiscussProjectContent() {
  const searchParams = useSearchParams();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "PM-KUSUM",
    state: "",
    scope: "",
    details: "",
  });

  useEffect(() => {
    const rawParam = searchParams.get("product") || searchParams.get("p");
    if (rawParam) {
      const lower = rawParam.toLowerCase();
      if (PRODUCT_SLUG_MAP[lower]) {
        setForm((prev) => ({ ...prev, product: PRODUCT_SLUG_MAP[lower] }));
      } else {
        // Direct match check
        setForm((prev) => ({ ...prev, product: rawParam }));
      }
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-slate-900 font-sans-ui selection:bg-[#D4E012] selection:text-black">
        {/* Navigation */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Matching User Screenshot 1) */}
        {/* ------------------------------------------------------------- */}
        <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-[#070D18] text-white overflow-hidden">
          {/* Background image & ambient glow */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/footer-bg.jpg"
              alt="Sarhat Energy Infrastructure"
              fill
              priority
              className="object-cover opacity-25 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070D18]/90 via-[#070D18]/70 to-[#070D18]" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
              <ol className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-slate-200">Discuss a project</li>
              </ol>
            </nav>

            {/* Pill Badge */}
            <div className="mb-6 flex justify-center">
              <AnimatedPillBadge darkBg>
                Discuss a project
              </AnimatedPillBadge>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium text-white tracking-tight leading-[1.12] mb-6 max-w-4xl">
              Have a project{" "}
              <span className="text-[#D4E012] italic relative inline-block font-normal">
                worth building?
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-10 text-center">
              Solar. BESS Storage. Substations. Agrivoltaics. Roads. Bridges. Buildings. Tell us where you want to build and let&apos;s map the execution path together.
            </p>

            {/* Hero Actions (Matching Screenshot 1) */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#form"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 shadow-xl shadow-[#D4E012]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>START YOUR ENQUIRY</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="tel:+919266711125"
                className="inline-flex items-center gap-2 rounded-full bg-transparent hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>CALL +91 9266 7111 25</span>
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* MAIN ENQUIRY FORM & SIDEBAR SECTION (Matching Screenshot 2) */}
        {/* ------------------------------------------------------------- */}
        <section id="form" className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-start">
              {/* LEFT COLUMN: ENQUIRY FORM */}
              <ScrollReveal>
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
                  {/* Badge */}
                  <div className="mb-4 text-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-50 border border-[#6DAD45]/30 text-[#707B00] font-mono text-[11px] font-bold tracking-widest uppercase mx-auto">
                      PROJECT ENQUIRY
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight mb-6 text-center">
                    Tell us about{" "}
                    <span className="text-[#6DAD45] italic relative inline-block font-normal">
                      your project.
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true"
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

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Row 1: Full Name & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            FULL NAME
                          </label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            COMPANY / ORGANISATION
                          </label>
                          <input
                            required
                            type="text"
                            value={form.company}
                            onChange={(e) =>
                              setForm({ ...form, company: e.target.value })
                            }
                            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            EMAIL
                          </label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            PHONE
                          </label>
                          <input
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 3: Product & Project State */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            PRODUCT
                          </label>
                          <select
                            value={form.product}
                            onChange={(e) =>
                              setForm({ ...form, product: e.target.value })
                            }
                            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Select a product
                            </option>
                            <optgroup label="Solar Energy">
                              <option value="PM-KUSUM">PM-KUSUM</option>
                              <option value="Open Access Solar">
                                Open Access Solar
                              </option>
                              <option value="Surya Sarovar">Surya Sarovar</option>
                              <option value="Canal-Top Solar">Canal-Top Solar</option>
                              <option value="Agri-PV (Agrivoltaics)">
                                Agri-PV (Agrivoltaics)
                              </option>
                              <option value="Residential Rooftop Solar">
                                Residential Rooftop Solar
                              </option>
                              <option value="Industrial & Commercial Rooftop Solar">
                                Industrial & Commercial Rooftop Solar
                              </option>
                              <option value="Institutional Rooftop Solar">
                                Institutional Rooftop Solar
                              </option>
                            </optgroup>
                            <optgroup label="BESS & Hybrid">
                              <option value="Standalone BESS">Standalone BESS</option>
                              <option value="BESS meets PV / Wind">
                                BESS meets PV / Wind
                              </option>
                            </optgroup>
                            <optgroup label="Infrastructure">
                              <option value="Substations & Switchyards">
                                Substations & Switchyards
                              </option>
                              <option value="Transmission Lines">
                                Transmission Lines
                              </option>
                              <option value="Piling & Foundations">
                                Piling & Foundations
                              </option>
                              <option value="Telecommunication Towers">
                                Telecommunication Towers
                              </option>
                              <option value="Industrial Buildings">
                                Industrial Buildings
                              </option>
                              <option value="Commercial Buildings">
                                Commercial Buildings
                              </option>
                              <option value="Roads & Drainage">
                                Roads & Drainage
                              </option>
                            </optgroup>
                            <option value="Something else">Something else</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            PROJECT STATE
                          </label>
                          <select
                            value={form.state}
                            onChange={(e) =>
                              setForm({ ...form, state: e.target.value })
                            }
                            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              Select a state
                            </option>
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 4: Approx Size / Scope */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          APPROX. SIZE / SCOPE
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 MW KUSUM, 500 kW rooftop, 33 kV bay"
                          value={form.scope}
                          onChange={(e) =>
                            setForm({ ...form, scope: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>

                      {/* Row 5: Project Details (Textarea) */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          PROJECT DETAILS
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Site location, land or roof status, PPA / LoA status, timelines…"
                          value={form.details}
                          onChange={(e) =>
                            setForm({ ...form, details: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-y"
                        />
                      </div>

                      {/* Send Enquiry Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] px-7 py-3.5 text-xs font-mono font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#D4E012]/30 transition-all duration-200 hover:-translate-y-px cursor-pointer"
                        >
                          <span>SEND ENQUIRY</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Disclaimer */}
                      <p className="text-[11.5px] text-slate-500 leading-relaxed pt-1">
                        By submitting you agree to be contacted by Sarhat about this enquiry. We never share your details.
                      </p>
                    </form>
                  ) : (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-[#6DAD45]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                        Thank you. Your enquiry is received.
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        A project lead for <span className="font-semibold text-[#6DAD45]">{form.product}</span> will review your site details and call you back within one working day.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="bg-slate-900 text-white font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-800 transition-colors"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* RIGHT COLUMN: 3 STEPS & REGISTERED OFFICE CARD */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-4">
                  {/* Step 01 */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm transition-all hover:border-[#6DAD45]/40 hover:shadow-md">
                    <div className="font-mono text-xs font-bold text-[#707B00] mb-1">
                      01
                    </div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 mb-1.5">
                      We review
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A project lead reviews your site, load or tender details.
                    </p>
                  </div>

                  {/* Step 02 */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm transition-all hover:border-[#6DAD45]/40 hover:shadow-md">
                    <div className="font-mono text-xs font-bold text-[#707B00] mb-1">
                      02
                    </div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 mb-1.5">
                      We call
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Usually within one working day, to understand your goals.
                    </p>
                  </div>

                  {/* Step 03 */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm transition-all hover:border-[#6DAD45]/40 hover:shadow-md">
                    <div className="font-mono text-xs font-bold text-[#707B00] mb-1">
                      03
                    </div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 mb-1.5">
                      We propose
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Feasibility view, execution path and indicative proposal.
                    </p>
                  </div>

                  {/* REGISTERED OFFICE CARD (Matching Prototype in Screenshot 2) */}
                  <div className="bg-[#FAFDF6] rounded-2xl p-6 border border-[#6DAD45]/30 shadow-sm">
                    <div className="font-mono text-[11px] font-bold text-[#707B00] uppercase tracking-wider mb-2">
                      REGISTERED OFFICE
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                      AHS-411, 4th Floor, Aditya High Street, NH-24, Lal Kuan, Ghaziabad, Uttar Pradesh – 201009
                    </p>
                    <div className="space-y-2 pt-2 border-t border-[#6DAD45]/20 font-mono text-xs text-slate-800">
                      <div>
                        <a
                          href="mailto:info@sarhatenergy.com"
                          className="hover:text-[#6DAD45] transition-colors flex items-center gap-2"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#6DAD45]" />
                          <span>info@sarhatenergy.com</span>
                        </a>
                      </div>
                      <div>
                        <a
                          href="tel:+919266711125"
                          className="hover:text-[#6DAD45] transition-colors flex items-center gap-2"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#6DAD45]" />
                          <span>+91 9266 7111 25</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM SECTION: EXPLORE BEFORE YOU ENQUIRE (Matching Screenshot 2) */}
        {/* ------------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="mb-3">
                  <span className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-50 border border-[#6DAD45]/30 text-[#707B00] font-mono text-[11px] font-bold tracking-widest uppercase">
                    NOT SURE YET?
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                  Explore{" "}
                  <span className="text-[#6DAD45] italic relative inline-block font-normal">
                    before you enquire.
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full h-3 text-[#6DAD45]"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      aria-hidden="true"
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
              </div>
            </ScrollReveal>

            {/* 3 Explore Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1: Products */}
              <ScrollReveal delay={0.1}>
                <Link
                  href="/products"
                  className="block h-full bg-[#F8FAF8] hover:bg-white rounded-3xl p-8 border border-slate-200/90 hover:border-[#6DAD45] shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#6DAD45]/15 text-[#6DAD45] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Box className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-[#6DAD45] transition-colors">
                    Products
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    17 products across solar, storage and infrastructure.
                  </p>
                </Link>
              </ScrollReveal>

              {/* Card 2: Solutions */}
              <ScrollReveal delay={0.2}>
                <Link
                  href="/solutions"
                  className="block h-full bg-[#F8FAF8] hover:bg-white rounded-3xl p-8 border border-slate-200/90 hover:border-[#6DAD45] shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#6DAD45]/15 text-[#6DAD45] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-[#6DAD45] transition-colors">
                    Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Engineering, procurement, construction and O&amp;M.
                  </p>
                </Link>
              </ScrollReveal>

              {/* Card 3: Projects by state */}
              <ScrollReveal delay={0.3}>
                <Link
                  href="/projects"
                  className="block h-full bg-[#F8FAF8] hover:bg-white rounded-3xl p-8 border border-slate-200/90 hover:border-[#6DAD45] shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#6DAD45]/15 text-[#6DAD45] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-[#6DAD45] transition-colors">
                    Projects by state
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    49.22 MW across 6 states.
                  </p>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Modal for navbar button */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}

export default function DiscussProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070D18] flex items-center justify-center text-white font-mono text-xs">
          Loading enquiry...
        </div>
      }
    >
      <DiscussProjectContent />
    </Suspense>
  );
}
