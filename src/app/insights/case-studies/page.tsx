"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FinalCTA from "@/components/FinalCTA";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import FilterSearchBar from "@/components/content/FilterSearchBar";
import { caseStudies, CASE_STUDY_CATEGORIES } from "@/data/caseStudiesData";

const ITEMS_PER_PAGE = 6;

export default function CaseStudiesPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  // Featured case study
  const featuredStudy = useMemo(() => {
    return caseStudies.find((c) => c.featured) || caseStudies[0];
  }, []);

  // Filtered case studies
  const filteredStudies = useMemo(() => {
    return caseStudies.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.clientSector.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.capacity.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const visibleStudies = filteredStudies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudies.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / HERO SECTION (Fixed background & Centered Content)      */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}>
          <section className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            {/* Cinematic Background Image Layer with Dynamic Zoom & Scrim */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full will-change-transform">
              <Image
                src="/images/bess-substation.jpg"
                alt="Sarhat high-voltage substation and BESS installation"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center opacity-85" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/75 pointer-events-none" />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#6DAD45]/15 rounded-full blur-[130px] pointer-events-none" />
            </motion.div>

            {/* Main Centered Content */}
            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-28 flex flex-col items-center text-center will-change-transform">
                <div className="max-w-5xl flex flex-col items-center text-center w-full">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.1] mb-6 text-center max-w-4xl [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)]">
                    Proven Engineering: <br />
                    <span className="italic font-normal text-[#D4E012] relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      Case Studies &amp; Results
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
                  </h1>

                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100 font-normal max-w-5xl mx-auto text-center leading-relaxed tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
                      <span className="block sm:whitespace-nowrap">
                        Explore how Sarhat Energy solves complex geotechnical, grid interconnection,
                      </span>
                      <span className="block sm:whitespace-nowrap mt-1 sm:mt-1.5">
                        and time-critical logistics challenges to deliver bankable renewable assets with superior performance ratios.
                      </span>
                    </p>
                </div>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} targetId="#studies-content" />
          </section>
        </div>

        {/* Scroll Spacer */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* ------------------------------------------------------------- */}
        {/* 02 / CONTENT SHEET (Overlapping white sheet)                  */}
        {/* ------------------------------------------------------------- */}
        <div id="studies-content" className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)] pt-12 sm:pt-16 pb-16">
          {/* Quick Impact Counters */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-sans-inter tabular-nums font-bold text-slate-900">400+ MW</div>
                <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">Delivered & Live</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-sans-inter tabular-nums font-bold text-[#4f832e]">99.4%</div>
                <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">Grid Availability</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-sans-inter tabular-nums font-bold text-slate-900">100%</div>
                <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">On-Time COD</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-sans-inter tabular-nums font-bold text-[#4f832e]">Tier-1</div>
                <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">BOM Equipment</div>
              </div>
            </div>
          </section>

          {/* Featured Case Study Hero Showcase */}
          {featuredStudy && !searchQuery && selectedCategory === "All" && (
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
              <div className="relative rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Image side */}
                  <div className="relative lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[360px] overflow-hidden">
                    <Image
                      src={featuredStudy.image}
                      alt={featuredStudy.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                      sizes="(max-width: 1024px) 100vw, 60vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/30 lg:to-slate-950" />

                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-[#0F172A]/90 backdrop-blur-md text-[#D4E012] font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> Flagship Case Study
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs">
                        {featuredStudy.capacity}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs font-mono text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-[#5EE72D]" />
                      <span>{featuredStudy.location}</span>
                      <span>•</span>
                      <span>{featuredStudy.completionYear}</span>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#D4E012]">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{featuredStudy.clientSector}</span>
                        <span>/</span>
                        <span>{featuredStudy.category}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-white group-hover:text-[#D4E012] transition-colors leading-snug">
                        <Link href={`/insights/case-studies/${featuredStudy.slug}`}>
                          {featuredStudy.title}
                        </Link>
                      </h2>

                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                        {featuredStudy.summary}
                      </p>

                      {/* Key metrics grid */}
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        {featuredStudy.metrics.slice(0, 2).map((m, i) => (
                          <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <div className="text-xl sm:text-2xl font-mono font-bold text-[#5EE72D]">
                              {m.value}
                            </div>
                            <div className="text-[11px] font-mono text-slate-300 uppercase tracking-wider mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        Turnkey EPC Delivery
                      </span>

                      <Link
                        href={`/insights/case-studies/${featuredStudy.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4E012] hover:text-white transition-colors">
                        <span>View Engineering Blueprint</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Search & Filter Section */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <FilterSearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                categories={CASE_STUDY_CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                totalCount={caseStudies.length}
                resultCount={filteredStudies.length}
                placeholder="Search by sector, technology, MW capacity, or state..." />
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
            {filteredStudies.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
                <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-serif-display font-medium text-slate-800">
                  No matching case studies found
                </h3>
                <p className="text-sm text-slate-500">
                  We couldn&apos;t find any project case studies matching &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                  View All Case Studies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {visibleStudies.map((study, idx) => (
                    <motion.article
                      key={study.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        {/* Image banner */}
                        <Link
                          href={`/insights/case-studies/${study.slug}`}
                          className="relative block h-56 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={study.image}
                            alt={study.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                          <div className="absolute top-3.5 left-3.5 flex gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-[#0F172A]/85 backdrop-blur-md text-white text-[11px] font-mono font-medium">
                              {study.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-[#6DAD45] text-white text-[11px] font-mono font-bold">
                              {study.capacity}
                            </span>
                          </div>
                          <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                            <MapPin className="w-3 h-3 text-[#D4E012]" />
                            <span>{study.location}</span>
                          </div>
                        </Link>

                        {/* Text details */}
                        <div className="p-6 sm:p-7 space-y-4">
                          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                            <span className="text-[#4f832e] font-semibold">{study.clientSector}</span>
                            <span>{study.completionYear}</span>
                          </div>

                          <h3 className="text-xl font-serif-display font-medium text-slate-900 group-hover:text-[#4f832e] transition-colors leading-snug line-clamp-2">
                            <Link href={`/insights/case-studies/${study.slug}`}>
                              {study.title}
                            </Link>
                          </h3>

                          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                            {study.summary}
                          </p>

                          {/* Measurable Results Chips */}
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                            {study.metrics.slice(0, 2).map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-base font-mono font-bold text-slate-900">
                                  {metric.value}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-tight truncate">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">
                          {study.solution.technicalSpecs[0]?.value || "Turnkey Mandate"}
                        </span>
                        <Link
                          href={`/insights/case-studies/${study.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-[#0F172A] group-hover:text-[#4f832e] transition-colors">
                          <span>Full Study</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-300 rounded-2xl text-slate-900 hover:bg-slate-50 hover:border-slate-400 font-medium text-sm transition-all shadow-sm active:scale-95">
                  <span>Load More Case Studies</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>

          {/* Final CTA */}
          <FinalCTA
            onOpenQuote={() => setIsQuoteOpen(true)}
            headline="Execute with the engineers"
            accent="who deliver the numbers."
            description="Whether you require rapid substation commissioning, high-yield bifacial solar layout design, or utility BESS integration, talk to Sarhat's project directors today." />
        </div>

        <Footer />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
