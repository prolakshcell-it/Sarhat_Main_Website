"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import { X, Clock, Calendar, BookOpen } from "lucide-react";
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
    id: "why-everyone-talking-solar",
    badge: "solar",
    date: "Jul 11, 2026",
    author: "Sarhat",
    title: "Why Everyone Around You Is Suddenly Talking About Solar, And What's Really Happening in India's Solar Market Right Now",
    excerpt: "Discover why everyone is talking about solar in 2026. Explore India's rapidly growing solar market, rooftop solar adoption, open access power, battery storage, government initiatives, and what those trends mean for homeowners and businesses.",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    content: [
      "India’s solar capacity addition has reached unprecedented momentum driven by favorable DISCOM net-metering policies, declining module costs, and corporate sustainability commitments.",
      "Commercial & Industrial (C&I) consumers are aggressively transitioning towards open-access solar models to hedge against long-term grid tariff escalation. Simultaneously, PM-KUSUM Component B & C solarization of agricultural feeders is unlocking tremendous rural energy independence.",
      "As battery energy storage system (BESS) costs align with grid parity, round-the-clock (RTC) renewable power purchase agreements are becoming the standard benchmark for utility-scale procurement.",
    ],
  },
  {
    id: "cochin-airport-story",
    badge: "solar",
    date: "Jul 11, 2026",
    author: "Sarhat",
    title: "The Airport That Runs Entirely on Sunlight: The Cochin International Airport Story",
    excerpt: "Discover how Cochin International Airport became the world's first fully solar-powered airport, proving that renewable energy can reliably power even the most energy-intensive infrastructure. From a modest 100 kWp pilot project to a 50 MW solar ecosystem, this inspiring journey offers valuable lessons for businesses looking to reduce energy costs, improve sustainability, and embrace the future of clean power.",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    content: [
      "Cochin International Airport Limited (CIAL) became the world's first fully solar-powered airport, operating on over 40 MWp of solar installations spread across vacant land and carports.",
      "For large industrial hubs, airports, and universities, CIAL demonstrates that solar power is not merely a CSR initiative—it is a high-return capital investment that eliminates electricity operational expenditure over a 25-year lifecycle.",
      "Integrating rooftop, ground-mounted, and floating solar arrays allows facilities to maximize spatial efficiency while providing grid support back to state power DISCOMs.",
    ],
  },
  {
    id: "pm-kusum-extension",
    badge: "solar",
    date: "Apr 1, 2026",
    author: "Sarhat",
    title: "PM-KUSUM Extension: A New Lifeline for Solar",
    excerpt: "The MNRE has officially extended the PM-KUSUM execution timelines, offering a vital lifeline to developers and farmers facing financing hurdles. With commissioning deadlines now pushed to 2027 for many projects, this move clears the 'financing logjam' and provides a stable bridge toward the upcoming KUSUM 2.0 framework. It's a pragmatic shift that ensures India's decentralized solar targets stay within reach while giving the industry the breathing room it needs to deliver quality results.",
    image: "/images/agrivoltaics-project.jpg",
    readTime: "4 min read",
    content: [
      "The Ministry of New and Renewable Energy (MNRE) extended the PM-KUSUM scheme execution timelines to ensure state implementation agencies and solar developers can complete feeder-level solarization without penalty.",
      "Component C of PM-KUSUM enables farmers to solarize existing grid-connected agriculture pumps, selling surplus clean electricity back to DISCOMs to generate supplementary revenue.",
      "At Sarhat Energy, our turnkey EPC execution teams in Uttar Pradesh and neighboring states assist regional developers with land procurement, DISCOM bay clearance, and rapid sub-station integration.",
    ],
  },
  {
    id: "indias-solar-boom-2025",
    badge: "solar",
    date: "Oct 14, 2025",
    author: "Sarhat",
    title: "India's Solar Boom Continues: 29.5 GW Added in First Nine Months of 2025",
    excerpt: "India's clean energy transition gained unprecedented momentum in the first nine months of 2025, with solar capacity additions soaring 70% year-on-year to a record 29.5 GW. The surge was fueled by rapid deployment across both utility-scale and consumer rooftop segments, as per data from JMK Research.",
    image: "/images/hero-solar.jpg",
    readTime: "5 min read",
    content: [
      "India registered a monumental 29.5 GW of solar installations within nine months, solidifying its position as one of the fastest-growing solar markets globally.",
      "Utility-scale ground-mounted projects contributed over 75% of total capacity, while rooftop solar installations surged due to domestic subsidies under PM Surya Ghar Muft Bijli Yojana.",
      "Grid integration challenges are now shifting developer focus toward hybrid solar-wind projects backed by BESS energy storage solutions to stabilize transmission frequencies.",
    ],
  },
  {
    id: "bihar-powers-up",
    badge: "solar",
    date: "Jul 12, 2025",
    author: "Sarhat",
    title: "Bihar Powers Up: Bold New Renewable Energy Policy Set to Spark Investment and Job Growth",
    excerpt: "The Bihar government has introduced the Bihar Renewable Energy Policy 2025 to make the state a clean energy leader. The goal is to build 23.97 GW of renewable energy (like solar and wind) and 6.1 GWh of energy storage by the year 2030. This policy comes just before state elections and is designed to attract companies and create jobs by offering many benefits to investors and developers.",
    image: "/images/timeline-2025.jpg",
    readTime: "4 min read",
    content: [
      "Bihar's latest Renewable Energy Policy offers targeted incentives for agrivoltaics, pump storage systems, and industrial rooftop installations across its agricultural heartlands.",
      "The state government has introduced single-window clearance mechanisms for land acquisition and evacuation infrastructure, lowering regulatory hurdles for solar EPC developers.",
      "This policy framework creates substantial employment opportunities for site engineers, O&M technicians, and regional supply chain partners across eastern India.",
    ],
  },
  {
    id: "grounding-solar-system",
    badge: "solar",
    date: "Jul 4, 2025",
    author: "Sarhat",
    title: "Grounding of Solar system: Safety consideration",
    excerpt: "When installing a Solar Photo-voltaic system (PV), it is extremely important all the equipment is grounded correctly.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    readTime: "7 min read",
    content: [
      "Earthing and lightning protection systems (LPS) are critical safeguards for solar PV plants against high-voltage surges, fault currents, and atmospheric strikes.",
      "Proper equipment grounding conductors (EGC) and system grounding must conform strictly to IS 3043 / IEC 62305 standards to prevent inverter tripping, equipment damage, and electrical hazards.",
      "Routine earth pit resistance testing and chemical earthing compound inspection ensure long-term equipment integrity and operational reliability throughout the plant's 25-year design lifespan.",
    ],
  },
  {
    id: "why-solar-parks-game-changer",
    badge: "solar",
    date: "Apr 21, 2025",
    author: "Sarhat",
    title: "Why Solar Parks Are a Game-Changer for India – Benefits You Should Know",
    excerpt: "In a country like India where the sun shines almost all year round, solar energy is one of the smartest ways to meet our growing power needs. And among the many ways to tap solar power, solar parks are becoming very popular – and for good reason.",
    image: "/images/timeline-2024.jpg",
    readTime: "5 min read",
    content: [
      "Utility solar parks pool shared infrastructure like high-voltage transmission lines, access roads, and substation bays to drastically lower per-megawatt capital expenditure.",
      "By consolidating land and DISCOM grid clearances in dedicated renewable power corridors, solar parks allow developers to achieve commercial operation dates in record timelines.",
      "The shared operational model also enables centralized 24/7 SCADA monitoring, automated panel cleaning, and predictive maintenance protocols.",
    ],
  },
  {
    id: "solar-subsidies-tax-benefits-2025",
    badge: "solar",
    date: "Apr 3, 2025",
    author: "Sarhat",
    title: "Solar Subsidies and Tax Benefits in 2025: A Bright Future for India",
    excerpt: "With rising electricity bills and increasing awareness about climate change, more and more Indians are turning to solar energy. The good news? In 2025, the Government of India continues to support this green transition through attractive subsidies and tax benefits, making solar power more affordable than ever.",
    image: "/images/partner-hero-bg.jpg",
    readTime: "6 min read",
    content: [
      "Government incentives under PM Surya Ghar Muft Bijli Yojana provide direct central financial assistance (CFA) for rooftop solar installations up to 3kW.",
      "For commercial and industrial enterprises, accelerated depreciation benefits of up to 40% allow businesses to write off capital investments faster while slashing corporate electricity tariffs.",
      "State-level net metering banking policies allow solar system owners to credit excess daytime generation against evening grid consumption.",
    ],
  },
  {
    id: "understanding-solar-panel-efficiency",
    badge: "solar",
    date: "Apr 3, 2025",
    author: "Sarhat",
    title: "Understanding Solar Panel Efficiency: What Every Indian Buyer Should Know",
    excerpt: "Learn about the factors that affect solar panel efficiency and how to maximize energy production from your solar installation.",
    image: "/images/timeline-2027.jpg",
    readTime: "5 min read",
    content: [
      "Solar panel efficiency measures the percentage of sunlight hitting the PV cell surface that gets converted into usable direct current (DC) electricity.",
      "Modern TOPCon and N-type bifacial modules achieve efficiency ratings over 22-23%, outperforming older polycrystalline panels especially in high-temperature ambient conditions.",
      "Regular cleaning, optimal tilt angles, anti-reflective glass coatings, and string inverter MPPT tracking ensure maximum energy yield over a 25-year operational lifecycle.",
    ],
  },
  {
    id: "the-future-of-solar-energy-in-india",
    badge: "solar",
    date: "Apr 3, 2025",
    author: "Sarhat",
    title: "The Future of Solar Energy in India",
    excerpt: "India, a country blessed with abundant sunlight, is rapidly moving toward solar energy as a key source of power. With rising population, increasing energy demands, and growing environmental concerns, solar energy is not just an option for India — it's becoming a necessity.",
    image: "/images/timeline-2026.jpg",
    readTime: "6 min read",
    content: [
      "India is targeting 500 GW of non-fossil energy capacity by 2030, with solar power forming the backbone of this historic energy transformation.",
      "Advancements in BESS energy storage, floating solar arrays on reservoirs, and PM-KUSUM feeder solarization are bringing clean power directly to urban centers and agricultural farmlands.",
      "Sarhat Energy continues to lead this transition through turnkey EPC execution, high-voltage substation engineering, and lifetime asset operations.",
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
                  className="text-base sm:text-lg text-slate-100 font-normal max-w-5xl text-center leading-relaxed drop-shadow-md"
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
      {/* SECTION LATEST INSIGHTS & NEWS (Exact Image 2 Design Layout) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-10 sm:py-14 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header matching Image 2 */}
          <ScrollReveal direction="up" distance={40}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans-ui font-extrabold text-slate-900 tracking-tight mb-4">
                Latest Insights &amp; News
              </h2>
              <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">
                Stay informed with our latest articles, case studies, and updates on solar energy trends and innovations.
              </p>
            </div>
          </ScrollReveal>

          {/* 10 Article Cards Grid (3 columns) matching Image 2 */}
          <ScrollReveal direction="up" distance={40} delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#6DAD45] hover:shadow-xl transition-all duration-300 group cursor-pointer shadow-sm"
                >
                  <div>
                    {/* Top Image Banner with Small Green Pill Badge */}
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#16A34A] text-white font-bold text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                          {article.badge}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="text-[11px] font-mono text-slate-500 font-medium">
                        {article.date} • By {article.author}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#16A34A] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-4">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Link Footer */}
                  <div className="px-5 sm:px-6 pb-6 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#16A34A] group-hover:text-slate-900 transition-colors">
                      <span>Read More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                  <span className="bg-[#16A34A] text-white font-extrabold text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
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
