"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, MapPin, Zap, ShieldCheck, CheckCircle2, Building2, Sun, Battery, Sprout } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";
import { stateProjectsData, StateProjectData } from "@/data/stateProjects";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
}

export default function StatePortfolioPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const stateSlug = resolvedParams.stateSlug;

  const stateData = stateProjectsData.find((s) => s.slug === stateSlug);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
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

  if (!stateData) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-serif-display mb-4">State Portfolio Not Found</h1>
        <p className="text-zinc-400 text-sm mb-8">The requested regional footprint data is not available.</p>
        <Link href="/projects" className="bg-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full">
          Back to Projects & Footprints
        </Link>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white selection:bg-[#5EE72D] selection:text-black font-sans-ui relative">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* State Hero Banner (Sticky background & Centered Content) */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={containerRef} className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt={`${stateData.name} Energy Hub`}
                fill
                priority
                className="object-cover object-center opacity-80"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#5EE72D]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform"
            >
              {/* Breadcrumb / Back Link */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#5EE72D] transition-colors mb-6 uppercase tracking-wider bg-black/60 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to National Footprint Map</span>
              </Link>

              <div className="max-w-4xl flex flex-col items-center text-center mb-6">
                <h1 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight text-center drop-shadow-lg mb-4">
                  {stateData.name} <span className="text-[#5EE72D] italic">Footprint</span>
                </h1>
                <p className="text-zinc-200 font-normal text-base sm:text-lg max-w-2xl text-center leading-relaxed drop-shadow-md">
                  {stateData.summary}
                </p>
              </div>

              {/* State Overview Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-6">
                <div className="bg-[#0A0E0A]/80 border border-white/20 rounded-2xl p-4 text-center backdrop-blur-xl shadow-xl">
                  <div className="text-2xl font-mono font-extrabold text-[#5EE72D]">
                    {stateData.mwInstalled}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-300 uppercase mt-1">
                    Installed Capacity
                  </div>
                </div>

                <div className="bg-[#0A0E0A]/80 border border-white/20 rounded-2xl p-4 text-center backdrop-blur-xl shadow-xl">
                  <div className="text-2xl font-mono font-extrabold text-white">
                    {stateData.projects.length}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-300 uppercase mt-1">
                    State Projects
                  </div>
                </div>

                <div className="bg-[#0A0E0A]/80 border border-white/20 rounded-2xl p-4 text-center backdrop-blur-xl col-span-2 sm:col-span-1 shadow-xl">
                  <div className="text-xs font-mono font-bold text-[#5EE72D] truncate">
                    {stateData.discom.split("/")[0]}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-300 uppercase mt-1">
                    Nodal DISCOM
                  </div>
                </div>
              </div>

              {/* Key Hubs Tags */}
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-mono text-zinc-400 uppercase">Key Execution Hubs:</span>
                {stateData.keyHubs.map((hub) => (
                  <span key={hub} className="px-3 py-1 bg-black/60 border border-white/15 rounded-full text-xs font-mono text-zinc-200">
                    📍 {hub}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-black border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.5)]">

        {/* State Projects Grid */}
        <section className="py-20 bg-black relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-2">
                Delivered & Active <span className="text-[#5EE72D] italic">Projects</span> in {stateData.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Turnkey engineering, procurement, substation evacuation, and long-term O&M management.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stateData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0A0E0A] border border-white/15 rounded-3xl overflow-hidden hover:border-[#5EE72D]/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Project Visual */}
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

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#5EE72D] font-mono mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>
                      <h3 className="text-xl font-serif-display font-medium text-white mb-3">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                        {proj.summary}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-2 border-t border-white/10 pt-4">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                          Execution Deliverables:
                        </span>
                        {proj.keyHighlights.map((hl) => (
                          <div key={hl} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5EE72D] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full bg-white/10 hover:bg-[#5EE72D] hover:text-black text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/15"
                    >
                      <span>Discuss Similar Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State Page CTA */}
        <section className="py-16 bg-gradient-to-r from-[#0B1209] via-black to-[#0B1209] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif-display text-white mb-4">
              Planning a Project in <span className="text-[#5EE72D] italic">{stateData.name}?</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto mb-8">
              Connect with our dedicated regional execution lead for DISCOM bay allocation, solar PPA feasibility, or substation grid connectivity in {stateData.name}.
            </p>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-xl shadow-[#5EE72D]/20 inline-flex items-center gap-2"
            >
              <span>Discuss {stateData.name} Project</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </section>
        </div>

        <Footer />
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
