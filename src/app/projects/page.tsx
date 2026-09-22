"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, CheckCircle2, Building2, Sun, Zap, Battery, Sprout, Filter } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FootprintMap from "@/components/FootprintMap";
import SmoothScroll from "@/components/SmoothScroll";
import { stateProjectsData, StateProjectData } from "@/data/stateProjects";

export default function MainProjectsPage() {
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>("uttar-pradesh");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState<string>("All");

  const currentStateData = stateProjectsData.find((s) => s.slug === selectedStateSlug) || stateProjectsData[0];

  const allProjects = stateProjectsData.flatMap((state) =>
    state.projects.map((proj) => ({ ...proj, stateName: state.name, stateSlug: state.slug }))
  );

  const filteredProjects = selectedVertical === "All"
    ? currentStateData.projects
    : currentStateData.projects.filter((p) => p.vertical === selectedVertical);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black font-sans-ui relative overflow-x-hidden">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>

        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* Hero Section (Full Screen 100% Height) */}
        <section className="relative min-h-screen w-full flex items-center pt-28 pb-16 overflow-hidden z-10 border-b border-neutral-900 bg-black select-none">
          {/* Background Image Layer (Fully Visible) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-solar.jpg"
              alt="Sarhat Infrastructure Execution Background"
              fill
              priority
              className="object-cover object-center opacity-85"
            />
            {/* Soft Dark Vignette Scrim for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4E012] animate-ping shadow-[0_0_8px_#D4E012]"></span>
                  <span className="text-xs font-mono font-extrabold text-[#D4E012] uppercase tracking-widest">
                    PROJECTS & GEOGRAPHICAL FOOTPRINTS
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight drop-shadow-lg">
                  Our Execution <span className="text-[#D4E012] italic font-normal">Portfolio</span>
                </h1>
                <p className="text-slate-200 font-normal text-base sm:text-lg max-w-2xl mt-4 leading-relaxed drop-shadow-md">
                  Utility solar power plants, extra high voltage grid substations, BESS storage reserves, and PM-KUSUM agrivoltaics delivered across India.
                </p>
              </div>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-xl shadow-[#D4E012]/30 shrink-0 self-start lg:self-end cursor-pointer transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Discuss a Project
              </button>
            </div>

            {/* Top National Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/20">
              <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
                <div className="text-3xl font-mono font-extrabold text-[#D4E012]">250+ MW</div>
                <div className="text-xs font-mono font-bold text-slate-300 uppercase mt-1">Total Solar & Storage</div>
              </div>

              <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
                <div className="text-3xl font-mono font-extrabold text-white">8+ States</div>
                <div className="text-xs font-mono font-bold text-slate-300 uppercase mt-1">Pan-India Footprint</div>
              </div>

              <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
                <div className="text-3xl font-mono font-extrabold text-[#5EE72D]">220 kV</div>
                <div className="text-xs font-mono font-bold text-slate-300 uppercase mt-1">EHV Substation Corridors</div>
              </div>

              <div className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
                <div className="text-3xl font-mono font-extrabold text-white">100% ISO</div>
                <div className="text-xs font-mono font-bold text-slate-300 uppercase mt-1">Confidential & Compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footprint Map Section */}
        <FootprintMap />

        {/* State Projects Showcase Section */}
        <section id="state-portfolio-details" className="py-24 bg-white relative z-10 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & State Selector Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono font-extrabold text-[#707B00] uppercase tracking-widest block mb-2">
                  STATE-WISE PROJECT INFORMATION
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900">
                  State Footprint: <span className="text-[#6DAD45] italic font-bold">{currentStateData.name}</span>
                </h2>
              </div>

              {/* State Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {stateProjectsData.map((st) => (
                  <button
                    key={st.slug}
                    onClick={() => setSelectedStateSlug(st.slug)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                      selectedStateSlug === st.slug
                        ? "bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black border-[#D4E012] font-extrabold shadow-md"
                        : "bg-slate-100 text-slate-700 border-slate-300 hover:border-[#D4E012]"
                    }`}
                  >
                    {st.name} ({st.code})
                  </button>
                ))}
              </div>
            </div>

            {/* Current State Detailed Card */}
            <div className="bg-[#F8FAF8] border border-slate-200/90 rounded-3xl p-6 sm:p-10 mb-16 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#707B00] mb-2">
                    <MapPin className="w-4 h-4 text-[#707B00]" />
                    <span>{currentStateData.region}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900 mb-3">
                    {currentStateData.name} Energy Hub
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    {currentStateData.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 font-semibold">
                    <div>Nodal DISCOM: <span className="text-slate-900 font-bold">{currentStateData.discom}</span></div>
                    <div>•</div>
                    <div>MW Installed: <span className="text-[#707B00] font-bold">{currentStateData.mwInstalled}</span></div>
                  </div>
                </div>

                <Link
                  href={`/projects/${currentStateData.slug}`}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all border border-slate-800 shrink-0 flex items-center gap-2 shadow-md"
                >
                  <span>Explore Full {currentStateData.name} Page</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Projects Cards Grid for Selected State */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:border-[#D4E012] transition-all duration-300 group flex flex-col justify-between shadow-xl shadow-slate-200/50"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-56 w-full overflow-hidden border-b border-slate-200">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-slate-900/90 border border-white/20 text-[#D4E012] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                          {proj.vertical}
                        </span>
                        <span className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold font-mono text-[10px] px-2.5 py-1 rounded-full uppercase shadow-md">
                          {proj.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-slate-900/90 text-slate-200 font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/20">
                        {proj.capacity}
                      </div>
                    </div>

                    {/* Project Body */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#707B00] font-mono font-bold mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>
                      <h4 className="text-xl font-serif-display font-bold text-slate-900 mb-3">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed mb-6">
                        {proj.summary}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 border-t border-slate-200 pt-4">
                        {proj.keyHighlights.map((hl) => (
                          <div key={hl} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-slate-800 shadow-md cursor-pointer"
                    >
                      <span>Discuss Project Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
