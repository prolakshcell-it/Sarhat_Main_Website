"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Clock, Calendar, Share2, BookOpen } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";

interface Article {
  id: string;
  badge: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  content: string[];
}

const articles: Article[] = [
  {
    id: "solar-market-2026",
    badge: "SOLAR MARKET",
    date: "Jul 9, 2026",
    author: "Sarhat",
    title:
      "Why Everyone Around You Is Suddenly Talking About Solar, And What's Really Happening in India's Solar Market Right Now",
    excerpt:
      "India's solar shift is accelerating across rooftops, open access, BESS and PM-KUSUM. Sarhat's latest market explainer looks at what the numbers mean for homes and businesses.",
    image:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    content: [
      "India’s solar capacity addition has reached unprecedented momentum driven by favorable DISCOM net-metering policies, declining module costs, and corporate sustainability commitments.",
      "Commercial & Industrial (C&I) consumers are aggressively transitioning towards open-access solar models to hedge against long-term grid tariff escalation. Simultaneously, PM-KUSUM Component B & C solarization of agricultural feeders is unlocking tremendous rural energy independence.",
      "As battery energy storage system (BESS) costs align with grid parity, round-the-clock (RTC) renewable power purchase agreements are becoming the standard benchmark for utility-scale procurement.",
    ],
  },
  {
    id: "cochin-airport-story",
    badge: "CASE STUDY",
    date: "Jul 9, 2026",
    author: "Sarhat",
    title: "The Airport That Runs Entirely on Sunlight: The Cochin International Airport Story",
    excerpt:
      "A look at CIAL's solar journey and what large, energy-intensive facilities can learn from a long-running renewable energy model.",
    image:
      "https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    content: [
      "Cochin International Airport Limited (CIAL) became the world's first fully solar-powered airport, operating on over 40 MWp of solar installations spread across vacant land and carports.",
      "For large industrial hubs, airports, and universities, CIAL demonstrates that solar power is not merely a CSR initiative—it is a high-return capital investment that eliminates electricity operational expenditure over a 25-year lifecycle.",
      "Integrating rooftop, ground-mounted, and floating solar arrays allows facilities to maximize spatial efficiency while providing grid support back to state power DISCOMs.",
    ],
  },
  {
    id: "pm-kusum-extension",
    badge: "POLICY",
    date: "Apr 1, 2026",
    author: "Sarhat",
    title: "PM-KUSUM Extension: A New Lifeline for Solar",
    excerpt:
      "Sarhat's policy explainer covers the PM-KUSUM execution timeline extension and what it means for developers and farmers.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    content: [
      "The Ministry of New and Renewable Energy (MNRE) extended the PM-KUSUM scheme execution timelines to ensure state implementation agencies and solar developers can complete feeder-level solarization without penalty.",
      "Component C of PM-KUSUM enables farmers to solarize existing grid-connected agriculture pumps, selling surplus clean electricity back to DISCOMs to generate supplementary revenue.",
      "At Sarhat Energy, our turnkey EPC execution teams in Uttar Pradesh and neighboring states assist regional developers with land procurement, DISCOM bay clearance, and rapid sub-station integration.",
    ],
  },
  {
    id: "india-solar-boom-2025",
    badge: "MARKET",
    date: "Oct 14, 2025",
    author: "Sarhat",
    title: "India's Solar Boom Continues: 29.5 GW Added in First Nine Months of 2025",
    excerpt:
      "An industry update on India's accelerating solar capacity additions and the growing role of utility-scale and rooftop deployment.",
    image:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    content: [
      "India registered a monumental 29.5 GW of solar installations within nine months, solidifying its position as one of the fastest-growing solar markets globally.",
      "Utility-scale ground-mounted projects contributed over 75% of total capacity, while rooftop solar installations surged due to domestic subsidies under PM Surya Ghar Muft Bijli Yojana.",
      "Grid integration challenges are now shifting developer focus toward hybrid solar-wind projects backed by BESS energy storage solutions to stabilize transmission frequencies.",
    ],
  },
  {
    id: "bihar-powers-up",
    badge: "POLICY",
    date: "Jul 12, 2025",
    author: "Sarhat",
    title:
      "Bihar Powers Up: Bold New Renewable Energy Policy Set to Spark Investment and Job Growth",
    excerpt:
      "An explainer on Bihar's renewable energy ambitions, investment opportunities and energy-storage direction.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    content: [
      "Bihar's latest Renewable Energy Policy offers targeted incentives for agrivoltaics, pump storage systems, and industrial rooftop installations across its agricultural heartlands.",
      "The state government has introduced single-window clearance mechanisms for land acquisition and evacuation infrastructure, lowering regulatory hurdles for solar EPC developers.",
      "This policy framework creates substantial employment opportunities for site engineers, O&M technicians, and regional supply chain partners across eastern India.",
    ],
  },
  {
    id: "grounding-solar-system-safety",
    badge: "ENGINEERING",
    date: "Jul 4, 2025",
    author: "Sarhat",
    title: "Grounding of Solar System: Safety Consideration",
    excerpt:
      "A practical technical note on why correct grounding is fundamental to safe and reliable PV installations.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    readTime: "7 min read",
    content: [
      "Earthing and lightning protection systems (LPS) are critical safeguards for solar PV plants against high-voltage surges, fault currents, and atmospheric strikes.",
      "Proper equipment grounding conductors (EGC) and system grounding must conform strictly to IS 3043 / IEC 62305 standards to prevent inverter tripping, equipment damage, and electrical hazards.",
      "Routine earth pit resistance testing and chemical earthing compound inspection ensure long-term equipment integrity and operational reliability throughout the plant's 25-year design lifespan.",
    ],
  },
];

export default function InsightsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#6DAD45] selection:text-black relative overflow-x-hidden font-sans-ui">
      {/* Floating Transparent Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-36 pb-16 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Tag */}
            <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-4 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
              NEWS & INSIGHTS
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 max-w-4xl">
              Useful thinking. <br />
              <span className="text-white">Better decisions.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed">
              Technical, commercial and policy content that helps developers, businesses, farmers and infrastructure leaders understand India’s energy transition.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION NEWS + INSIGHTS & GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-black relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sub Header */}
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-mono font-semibold tracking-widest text-[#6DAD45] uppercase mb-3">
                  NEWS & INSIGHTS
                </div>
                <h2 className="text-4xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight max-w-2xl">
                  Built from Sarhat’s <br />
                  <span className="text-white">own thinking.</span>
                </h2>
              </div>

              <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md leading-relaxed">
                Selected stories and explainers pulled from the live Sarhat Energy insights library, covering solar markets, PM-KUSUM, safety, policy and renewable infrastructure.
              </p>
            </div>
          </ScrollReveal>

          {/* 6 Article Cards Grid (3 columns, 2 rows) */}
          <ScrollReveal direction="up" distance={40} delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-[#0B0D0B] border border-white/15 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#6DAD45]/60 transition-all duration-300 group cursor-pointer shadow-2xl hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image Header with Green Badge Overlay */}
                    <div className="relative w-full h-52 overflow-hidden bg-zinc-900">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#6DAD45] text-black font-extrabold text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                          {article.badge}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0B] via-transparent to-transparent"></div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="text-[11px] font-mono text-zinc-500">
                        {article.date} · {article.author}
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif-display font-medium text-white group-hover:text-[#6DAD45] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3 pt-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Link Footer */}
                  <div className="px-6 sm:px-7 pb-6 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#6DAD45] uppercase tracking-wider group-hover:text-white transition-colors">
                      <span>Read on Sarhat</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6DAD45] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0F120F] border border-white/20 rounded-3xl max-w-2xl w-full relative shadow-2xl overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 text-zinc-300 hover:text-white p-2 rounded-full bg-black/70 border border-white/20 backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Image */}
              <div className="relative w-full h-64 sm:h-72 bg-zinc-900">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#6DAD45] text-black font-extrabold text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                    {selectedArticle.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F120F] via-transparent to-transparent"></div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 border-b border-white/10 pb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#6DAD45]" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span>By {selectedArticle.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#6DAD45]" />
                    {selectedArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-white leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed pt-2">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono text-[#6DAD45] flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>SARHAT INSIGHTS LIBRARY</span>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-[#6DAD45] text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#5b9538] transition-colors"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
