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
      <main className="min-h-screen bg-black text-white selection:bg-[#5EE72D] selection:text-black font-sans-ui relative">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* Hero Section */}
        <section className="pt-32 sm:pt-40 pb-16 bg-gradient-to-b from-zinc-900/80 via-black to-black border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5EE72D] animate-ping"></span>
                  <span className="text-xs font-mono text-[#5EE72D] uppercase tracking-widest">
                    PROJECTS & GEOGRAPHICAL FOOTPRINTS
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight">
                  Our Execution <span className="text-[#5EE72D] italic">Portfolio</span>
                </h1>
                <p className="text-zinc-300 font-light text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
                  Utility solar power plants, extra high voltage grid substations, BESS storage reserves, and PM-KUSUM agrivoltaics delivered across India.
                </p>
              </div>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-xl shadow-[#5EE72D]/25 shrink-0 self-start lg:self-end"
              >
                Discuss a Project
              </button>
            </div>

            {/* Top National Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              <div className="bg-[#0A0E0A] border border-white/15 rounded-2xl p-5 backdrop-blur-xl">
                <div className="text-3xl font-mono font-extrabold text-[#5EE72D]">250+ MW</div>
                <div className="text-xs font-mono text-zinc-400 uppercase mt-1">Total Solar & Storage</div>
              </div>

              <div className="bg-[#0A0E0A] border border-white/15 rounded-2xl p-5 backdrop-blur-xl">
                <div className="text-3xl font-mono font-extrabold text-white">8+ States</div>
                <div className="text-xs font-mono text-zinc-400 uppercase mt-1">Pan-India Footprint</div>
              </div>

              <div className="bg-[#0A0E0A] border border-white/15 rounded-2xl p-5 backdrop-blur-xl">
                <div className="text-3xl font-mono font-extrabold text-[#5EE72D]">220 kV</div>
                <div className="text-xs font-mono text-zinc-400 uppercase mt-1">EHV Substation Corridors</div>
              </div>

              <div className="bg-[#0A0E0A] border border-white/15 rounded-2xl p-5 backdrop-blur-xl">
                <div className="text-3xl font-mono font-extrabold text-white">100% ISO</div>
                <div className="text-xs font-mono text-zinc-400 uppercase mt-1">Confidential & Compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footprint Map Section */}
        <FootprintMap />

        {/* State Projects Showcase Section */}
        <section id="state-portfolio-details" className="py-24 bg-black relative z-10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & State Selector Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono text-[#5EE72D] uppercase tracking-widest block mb-2">
                  STATE-WISE PROJECT INFORMATION
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-white">
                  State Footprint: <span className="text-[#5EE72D] italic">{currentStateData.name}</span>
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
                        ? "bg-[#5EE72D] text-black border-[#5EE72D] font-extrabold shadow-lg shadow-[#5EE72D]/20"
                        : "bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {st.name} ({st.code})
                  </button>
                ))}
              </div>
            </div>

            {/* Current State Detailed Card */}
            <div className="bg-gradient-to-r from-[#0A0E0A] via-black to-[#0A0E0A] border border-white/15 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#5EE72D] mb-2">
                    <MapPin className="w-4 h-4 text-[#5EE72D]" />
                    <span>{currentStateData.region}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-3">
                    {currentStateData.name} Energy Hub
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    {currentStateData.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                    <div>Nodal DISCOM: <span className="text-white font-bold">{currentStateData.discom}</span></div>
                    <div>•</div>
                    <div>MW Installed: <span className="text-[#5EE72D] font-bold">{currentStateData.mwInstalled}</span></div>
                  </div>
                </div>

                <Link
                  href={`/projects/${currentStateData.slug}`}
                  className="bg-white/10 hover:bg-[#5EE72D] hover:text-black text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all border border-white/20 shrink-0 flex items-center gap-2"
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
                  className="bg-[#0A0E0A] border border-white/15 rounded-3xl overflow-hidden hover:border-[#5EE72D]/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-56 w-full overflow-hidden border-b border-white/10">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0A] via-transparent to-black/30"></div>

                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-black/80 border border-white/20 text-[#5EE72D] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                          {proj.vertical}
                        </span>
                        <span className="bg-[#5EE72D] text-black font-extrabold font-mono text-[10px] px-2.5 py-1 rounded-full uppercase">
                          {proj.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 text-zinc-300 font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                        {proj.capacity}
                      </div>
                    </div>

                    {/* Project Body */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#5EE72D] font-mono mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>
                      <h4 className="text-xl font-serif-display font-medium text-white mb-3">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                        {proj.summary}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 border-t border-white/10 pt-4">
                        {proj.keyHighlights.map((hl) => (
                          <div key={hl} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5EE72D] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full bg-white/10 hover:bg-[#5EE72D] hover:text-black text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/15"
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
