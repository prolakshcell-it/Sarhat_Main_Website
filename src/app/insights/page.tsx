"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import { ArrowUpRight, X, Clock, Calendar, Share2, BookOpen } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";

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

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky background & Centered Content) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={containerRef} className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Energy Insights Background"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-28 flex flex-col items-center text-center will-change-transform"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="max-w-4xl flex flex-col items-center text-center"
              >
                {/* Title */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                  }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl drop-shadow-lg"
                >
                  Useful thinking. <br />
                  <span className="italic font-normal text-white">
                    Better <span className="text-[#D4E012]">decisions.</span>
                  </span>
                </motion.h1>

                {/* Description Paragraph */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                  }}
                  className="text-base sm:text-lg text-slate-100 font-normal max-w-2xl text-center leading-relaxed drop-shadow-md"
                >
                  Technical, commercial and policy content that helps developers, businesses, farmers and infrastructure leaders understand India’s energy transition.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Bottom Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

      {/* Main Content Sections (Slides UP over static Hero) */}
      <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

      {/* ------------------------------------------------------------- */}
      {/* SECTION NEWS + INSIGHTS & GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 sm:py-16 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sub Header */}
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl sm:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight max-w-2xl">
                  Built from Sarhat’s <br />
                  <span className="text-[#0F172A]">own thinking.</span>
                </h2>
              </div>

              <p className="text-slate-600 font-light text-sm sm:text-base max-w-md leading-relaxed">
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
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#6DAD45]/60 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image Header with Green Badge Overlay */}
                    <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#D4E012] text-slate-950 font-extrabold text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                          {article.badge}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="text-[11px] font-mono text-slate-500">
                        {article.date} · {article.author}
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif-display font-medium text-[#0F172A] group-hover:text-[#707B00] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3 pt-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Link Footer */}
                  <div className="px-6 sm:px-7 pb-6 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#707B00] uppercase tracking-wider group-hover:text-[#0F172A] transition-colors">
                      <span>Read on Sarhat</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#707B00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full relative shadow-2xl overflow-hidden my-8 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 text-slate-300 hover:text-white p-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Image */}
              <div className="relative w-full h-64 sm:h-72 bg-slate-900">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#D4E012] text-slate-950 font-extrabold text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                    {selectedArticle.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4E012]" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span>By {selectedArticle.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4E012]" />
                    {selectedArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-white leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="space-y-4 text-sm text-slate-300 font-light leading-relaxed pt-2">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono text-[#D4E012] flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>SARHAT INSIGHTS LIBRARY</span>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#c2ce0f] transition-colors cursor-pointer"
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
  </SmoothScroll>
  );
}
