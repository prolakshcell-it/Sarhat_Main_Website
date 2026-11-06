"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Layers,
  Zap,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  TrendingUp,
  Cpu,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FinalCTA from "@/components/FinalCTA";
import SmoothScroll from "@/components/SmoothScroll";
import SocialShareButtons from "@/components/content/SocialShareButtons";
import type { CaseStudyItem } from "@/data/caseStudiesData";

interface CaseStudyDetailClientProps {
  study: CaseStudyItem;
  relatedStudies: CaseStudyItem[];
}

export default function CaseStudyDetailClient({
  study,
  relatedStudies,
}: CaseStudyDetailClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F8FAF8] text-[#0F172A] font-sans-ui flex flex-col selection:bg-[#D4E012] selection:text-black">
        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* CINEMATIC HERO SECTION WITH BACKGROUND IMAGE                  */}
        {/* ------------------------------------------------------------- */}
        <section className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-16 sm:pb-20 text-white">
          {/* Background Image Layer with Scrim */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <Image
              src={study.image}
              alt={study.title}
              fill
              priority
              quality={90}
              className="object-cover object-center opacity-40 scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950 pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6DAD45]/15 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-300 overflow-x-auto whitespace-nowrap py-1">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link href="/insights" className="hover:text-white transition-colors">
                Insights
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link href="/insights/case-studies" className="hover:text-white transition-colors">
                Case Studies
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-[#D4E012] font-semibold truncate max-w-[200px] sm:max-w-xs">
                {study.title}
              </span>
            </nav>

            {/* Case Study Meta Chips */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-[#6DAD45] text-white font-semibold uppercase tracking-wider">
                {study.category}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-[#D4E012] font-semibold">
                {study.capacity}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#5EE72D]" />
                {study.location}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-[#D4E012]" />
                Commissioned {study.completionYear}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white leading-[1.15] tracking-tight drop-shadow-md">
              {study.title}
            </h1>

            {/* Summary lead */}
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed border-l-4 border-[#5EE72D] pl-4 sm:pl-6 py-1 max-w-4xl">
              {study.summary}
            </p>

            {/* Share & Consultation Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-[#D4E012] flex items-center justify-center font-mono text-xs font-bold">
                  EPC
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {study.clientSector}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Turnkey Engineering, Procurement & Commissioning
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SocialShareButtons title={study.title} />
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-5 py-2.5 bg-[#6DAD45] hover:bg-[#5da037] text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-95"
                >
                  Request Project RFP
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* MAIN BODY                                                     */}
        {/* ------------------------------------------------------------- */}
        <main className="flex-grow py-12 sm:py-16">
          {/* Key Metrics Banner (4 Cards) */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#6DAD45]" />
              <span>Measurable Project Performance Benchmarks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {study.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#6DAD45]/5 rounded-bl-full pointer-events-none" />
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-900">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono text-[#427025] font-semibold uppercase tracking-wider mt-1.5">
                    {metric.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main 4 Core Engineering Sections: Challenge, Solution, Implementation, Results */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 my-16">
            {/* 1. The Challenge */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Section 01
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900">
                    {study.challenge.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed font-light text-base sm:text-lg">
                {study.challenge.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {study.challenge.keyPoints && study.challenge.keyPoints.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-900 font-semibold mb-3">
                    Key Engineering Constraints
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {study.challenge.keyPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. The Solution & Technical Specs */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#6DAD45]/15 text-[#427025]">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Section 02
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900">
                    {study.solution.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed font-light text-base sm:text-lg">
                {study.solution.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Technical Specifications Matrix */}
              {study.solution.technicalSpecs && study.solution.technicalSpecs.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-4 h-4 text-[#6DAD45]" />
                    <h4 className="text-sm font-mono uppercase tracking-wider text-slate-900 font-semibold">
                      Technical Architecture Specifications
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {study.solution.technicalSpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          {spec.label}
                        </div>
                        <div className="text-sm font-mono font-bold text-slate-900 mt-1">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Phased Implementation Roadmap */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600">
                  <Workflow className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Section 03
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900">
                    {study.implementation.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {study.implementation.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all"
                  >
                    <div className="px-3 py-1 rounded-lg bg-slate-900 text-[#D4E012] font-mono text-xs font-semibold uppercase tracking-wider shrink-0">
                      {step.phase}
                    </div>
                    <div className="space-y-1">
                      <div className="text-base font-semibold text-slate-900">
                        {step.title}
                      </div>
                      <p className="text-sm text-slate-600 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Measurable Results & Delivery Outcomes */}
            <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#5EE72D]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#D4E012] uppercase tracking-wider">
                      Section 04
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-white">
                      {study.results.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 text-slate-200 leading-relaxed font-light text-base sm:text-lg">
                  {study.results.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {study.results.outcomes && study.results.outcomes.length > 0 && (
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-mono uppercase tracking-wider text-[#D4E012] font-semibold mb-4">
                      Delivered Project Outcomes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {study.results.outcomes.map((outcome, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#5EE72D] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation back and Share */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-6 border-t border-slate-200">
              <Link
                href="/insights/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Case Studies</span>
              </Link>

              <SocialShareButtons title={study.title} />
            </div>
          </section>

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-16 border-t border-slate-200/80 pt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6DAD45] font-semibold">
                    Portfolio Benchmarks
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 mt-1">
                    Related Turnkey Projects
                  </h2>
                </div>
                <Link
                  href="/insights/case-studies"
                  className="text-xs sm:text-sm font-mono font-semibold text-slate-900 hover:text-[#6DAD45] flex items-center gap-1 transition-colors"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStudies.map((rel) => (
                  <div
                    key={rel.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        href={`/insights/case-studies/${rel.slug}`}
                        className="relative block h-44 w-full overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                            {rel.category}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#6DAD45] text-white text-[10px] font-mono font-semibold">
                            {rel.capacity}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400">
                          {rel.location} • {rel.completionYear}
                        </div>
                        <h3 className="text-base font-serif-display font-medium text-slate-900 group-hover:text-[#4f832e] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/insights/case-studies/${rel.slug}`}>
                            {rel.title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link
                        href={`/insights/case-studies/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] group-hover:text-[#4f832e] transition-colors"
                      >
                        <span>View Blueprint</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Final CTA */}
          <FinalCTA
            onOpenQuote={() => setIsQuoteOpen(true)}
            headline="Ready to build your next"
            accent="high-performance asset?"
            description="Our multidisciplinary civil, electrical, and structural engineers will map the optimal execution blueprint for your land parcel or industrial facility."
          />
        </main>

        <Footer />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
