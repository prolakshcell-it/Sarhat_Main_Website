"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import { X, Clock, Calendar, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useHeroScroll } from "@/hooks/useHeroScroll";

interface Article {
  id: string;
  badge: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: "Market" | "Policy" | "Engineering" | "Case Study";
  overlay?: "why-solar-2026" | "cochin-airport" | "pm-kusum";
  keyTakeaways?: string[];
  content: string[];
}

const articles: Article[] = [
  {
    id: "why-everyone-talking-solar",
    badge: "solar",
    date: "Jul 11, 2026",
    author: "Sarhat",
    title: "Why Everyone Around You Is Suddenly Talking About Solar, And What's Really Happening in India's Solar Market Right Now",
    excerpt: "Discover why everyone is talking about solar in 2026. Explore India's rapidly growing solar market, rooftop solar adoption, open access power, battery storage, government initiatives, and what these trends mean for homeowners and businesses.",
    image: "/images/insights/insight-card-1.jpg",
    readTime: "5 min read",
    category: "Market",
    overlay: "why-solar-2026",
    keyTakeaways: [
      "Solar levelized cost of electricity is now over 50% cheaper than conventional grid tariffs across India.",
      "Corporate C&I procurement has shifted from optional CSR green-washing to essential balance sheet cost reduction.",
      "PM Surya Ghar Muft Bijli Yojana has catalyzed residential rooftop solar adoption to historic all-time monthly highs.",
      "Battery Energy Storage Systems (BESS) are ending intermittency, paving the way for 24/7 firm renewable delivery.",
    ],
    content: [
      "If you've noticed more solar panels on neighborhood rooftops, industrial shed roofs, and highway corridors lately, you aren't imagining things. In 2026, solar energy in India has crossed a psychological and economic tipping point.",
      "What was once viewed as an expensive environmental hobby has transformed into the single most financially compelling capital upgrade for homeowners, commercial factories, hospitals, and agricultural pump operators alike.",
      "Three core dynamics are driving this transformation: module efficiencies crossing 23% with bifacial TOPCon cells, aggressive central policy backing through subsidies like PM Surya Ghar and PM-KUSUM, and escalating commercial power tariffs across state electricity distribution companies (DISCOMs).",
      "For commercial and industrial enterprises, open-access solar power purchase agreements (PPAs) are delivering verified savings of 30% to 45% on monthly utility bills. For homeowners, rooftop arrays provide immediate bill neutrality with 3-to-4 year capital payback periods.",
      "At Sarhat Energy, our turnkey EPC engineering teams are executing high-yield solar installations across north and central India, combining civil engineering precision, high-voltage substations, and long-term asset health management.",
    ],
  },
  {
    id: "cochin-airport-story",
    badge: "solar",
    date: "Jul 11, 2026",
    author: "Sarhat",
    title: "The Airport That Runs Entirely on Sunlight: The Cochin International Airport Story",
    excerpt: "Discover how Cochin International Airport became the world's first fully solar-powered airport, proving that renewable energy can reliably power even the most energy-intensive infrastructure. From a modest 100 kWp pilot project to a 50 MW solar ecosystem, this inspiring journey offers valuable lessons for businesses looking to reduce energy costs, improve sustainability, and embrace the future of clean power.",
    image: "/images/insights/insight-card-2.jpg",
    readTime: "6 min read",
    category: "Case Study",
    overlay: "cochin-airport",
    keyTakeaways: [
      "World's first fully solar-powered airport, handling 10M+ passengers annually on 100% clean power.",
      "Scaled systematically from a 100 kWp pilot to over 50 MWp across ground, floating, and carport arrays.",
      "Pioneered agrivoltaics: cultivated 90+ metric tons of organic vegetables yearly beneath the solar panels.",
      "Capital investment repaid in under 5 years, saving tens of crores of rupees in utility costs every year.",
    ],
    content: [
      "Cochin International Airport Limited (CIAL) in Kerala, India, made global aviation history by becoming the first airport in the world to be powered completely by solar energy. Operating international terminals, radar systems, baggage handling, cooling towers, and high-intensity runway lighting demands enormous 24/7 electrical reliability.",
      "The airport's clean energy journey began in 2013 with a modest 100 kWp solar PV installation on the arrival terminal. Today, CIAL's total installed solar capacity exceeds 50 MWp across ground-mounted arrays, floating solar on reservoirs, and 1,400-vehicle solar carports, producing over 250,000 units of green electricity daily.",
      "Beyond energy generation, CIAL pioneered agrivoltaics: cultivating organic vegetables beneath solar panels across 45 acres, harvesting over 90 metric tons annually while preventing weed overgrowth and grass fires.",
      "For industrial complexes, universities, and commercial developers across India, CIAL proves that solar power eliminates recurrent electricity operational expenditure while future-proofing facilities against grid tariff escalations.",
    ],
  },
  {
    id: "pm-kusum-extension",
    badge: "solar",
    date: "Apr 1, 2026",
    author: "Sarhat",
    title: "PM-KUSUM Extension: A New Lifeline for Solar",
    excerpt: "The MNRE has officially extended the PM-KUSUM execution timelines, offering a vital lifeline to developers and farmers facing financing hurdles. With commissioning deadlines now pushed to 2027 for many projects, this move clears the \"financing logjam\" and provides a stable bridge toward the upcoming KUSUM 2.0 framework. It's a pragmatic shift that ensures India's decentralized solar targets stay within reach while giving the industry the breathing room it needs to deliver quality results.",
    image: "/images/agrivoltaics-project.jpg",
    readTime: "4 min read",
    category: "Policy",
    overlay: "pm-kusum",
    keyTakeaways: [
      "MNRE officially extends project commissioning deadlines to 2027, preventing bank guarantee liquidations.",
      "Clears financing logjams by enabling regional rural banks and NBFCs to re-open sanctioned credit lines.",
      "Acts as a regulatory bridge toward KUSUM 2.0 with streamlined DISCOM bay allotments and automated escrow.",
      "Sarhat Energy's rural EPC task forces provide turnkey DPR, land vetting, and substation intertie support.",
    ],
    content: [
      "The Ministry of New and Renewable Energy (MNRE) has formally extended the implementation timelines for the Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) scheme through 2027.",
      "This decisive policy move provides critical breathing space to agricultural solar developers, EPC contractors, and regional farmers who faced project delays stemming from transformer delivery lead times and DISCOM bay clearance schedules.",
      "Under Component A and Component C, the timeline relaxation prevents bank guarantee encashments and enables regional rural financing institutions to disburse pending capital tranches.",
      "The extension acts as a stable regulatory bridge toward KUSUM 2.0, establishing automated escrow payment protections, standard PPAs, and mandatory feeder-level SCADA telemetry.",
      "At Sarhat Energy, our turnkey EPC task forces in Uttar Pradesh, Haryana, and Rajasthan guide landowners and developers through DPR vetting, grid interconnection, and accelerated COD commissioning.",
    ],
  },
  {
    id: "indias-solar-boom-2025",
    badge: "solar",
    date: "Oct 14, 2025",
    author: "Sarhat",
    title: "India's Solar Boom Continues: 29.5 GW Added in First Nine Months of 2025",
    excerpt: "India's clean energy transition gained unprecedented momentum in the first nine months of 2025, with solar capacity additions soaring 70% year-on-year to a record 29.5 GW. The surge was fueled by rapid deployment across both utility-scale and consumer rooftop segments, as per data from JMK Research.",
    image: "/images/insights/insight-card-4.jpg",
    readTime: "4 min read",
    category: "Market",
    keyTakeaways: [
      "Record-breaking 29.5 GW of solar installations completed within 9 months, marking a 70% YoY surge.",
      "Utility-scale ground-mounted projects comprised over 74% of capacity additions, anchored in western corridors.",
      "Rooftop solar additions surged 140% YoY backed by central capital subsidies and simplified digital net-metering.",
      "Grid transmission availability and substation evacuation remain the critical bottleneck for developers.",
    ],
    content: [
      "India's clean energy transition has broken all prior historical records, with solar capacity additions reaching 29.5 GW during the first nine months of 2025—a massive 70% year-on-year increase according to JMK Research data.",
      "Utility-scale ground-mounted projects formed the anchor of this deployment, contributing over 74% of capacity in key high-irradiance states like Rajasthan and Gujarat.",
      "Simultaneously, rooftop solar installations witnessed a parabolic surge of over 140% driven by direct digital capital subsidies under the PM Surya Ghar Muft Bijli Yojana.",
      "With domestic module manufacturing stabilizing under ALMM regulations, the primary focus for developers and EPC contractors has shifted to transmission infrastructure, substation evacuation bays, and BESS hybrid integration.",
    ],
  },
  {
    id: "bihar-powers-up",
    badge: "solar",
    date: "Jul 12, 2025",
    author: "Sarhat",
    title: "Bihar Powers Up: Bold New Renewable Energy Policy Set to Spark Investment and Job Growth",
    excerpt: "The Bihar government has introduced the Bihar Renewable Energy Policy 2025 to make the state a clean energy leader. The goal is to build 23.97 GW of renewable energy (like solar and wind) and 6.1 GWh of energy storage by the year 2030. This policy comes just before state elections and is designed to attract companies and create jobs by offering many benefits to investors and developers.",
    image: "/images/insights/insight-card-5.jpg",
    readTime: "4 min read",
    category: "Policy",
    keyTakeaways: [
      "State targets 23.97 GW renewable capacity and 6.1 GWh of battery energy storage (BESS) by 2030.",
      "100% stamp duty exemption, land conversion fee waivers, and single-window statutory approvals.",
      "Special incentives for agrivoltaics and canal-top solar to optimize high-density agricultural land use.",
      "Projected to unlock over ₹80,000 crore in clean energy investments and create 65,000+ technical jobs.",
    ],
    content: [
      "In a major policy milestone for eastern India, the Bihar state cabinet has ratified the ambitious Bihar Renewable Energy Policy 2025, setting a target of 23.97 GW renewable capacity and 6.1 GWh energy storage by 2030.",
      "The policy introduces comprehensive investor incentives including 100% reimbursement of stamp duty on project land, land conversion fee waivers, and guaranteed 25-year open-access priority grid dispatch.",
      "Recognizing the fertile agricultural nature of Bihar's terrain, the framework prioritizes agrivoltaics and canal-top installations that generate clean electricity while conserving water and enhancing farmer incomes.",
      "Sarhat Energy's regional presence and turnkey EPC capabilities in eastern India position us to assist developers in deploying high-reliability solar assets under this progressive policy.",
    ],
  },
  {
    id: "grounding-solar-system",
    badge: "solar",
    date: "Jul 4, 2025",
    author: "Sarhat",
    title: "Grounding of Solar system: Safety consideration",
    excerpt: "When installing a solar Photo-voltaic system (PV), it is extremely important all the equipment is grounded correctly.",
    image: "/images/insights/insight-card-6.jpg",
    readTime: "5 min read",
    category: "Engineering",
    keyTakeaways: [
      "Grounding is mandatory to eliminate lethal touch-potential shock hazards from up to 1500V DC arrays.",
      "Equipment Grounding Conductors (EGC) bond all metal frames and racks to trigger GFDI relays on faults.",
      "Lightning Protection Systems (LPS) and Type 1/2 SPDs protect sensitive inverter electronics from surges.",
      "IS 3043 and IEEE 80 standards mandate earth pit resistance below 1.0 Ohm using chemical earthing.",
    ],
    content: [
      "When installing a solar Photo-voltaic system (PV), it is extremely important all the equipment is grounded correctly. Solar arrays operate outdoors in exposed environments, continuously subjected to high DC voltages (up to 1500V in utility installations), lightning transients, and induced electromagnetic surges.",
      "A comprehensive solar earthing system requires dual protection: Equipment Grounding Conductors (EGC) that bond non-current-carrying metal frames and mounting racks to eliminate touch-potential shock hazards, and System Grounding that stabilizes reference potential.",
      "Adherence to IS 3043 and IEEE 80 earthing standards requires earth pit resistance values under 1.0 Ohm, achieved through chemical earthing electrodes and moisture-retaining bentonite compounds.",
      "Routine testing with 3-point fall-of-potential testers and thermal imaging inspections protects both field maintenance crews and high-value inverter electronics over the 25-year plant lifecycle.",
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
    category: "Engineering",
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
    category: "Policy",
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
    category: "Engineering",
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
    category: "Market",
    content: [
      "India is targeting 500 GW of non-fossil energy capacity by 2030, with solar power forming the backbone of this historic energy transformation.",
      "Advancements in BESS energy storage, floating solar arrays on reservoirs, and PM-KUSUM feeder solarization are bringing clean power directly to urban centers and agricultural farmlands.",
      "Sarhat Energy continues to lead this transition through turnkey EPC execution, high-voltage substation engineering, and lifetime asset operations.",
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Insights", count: 10 },
  { id: "market", label: "Market Trends", count: 3 },
  { id: "policy", label: "Policies & Schemes", count: 3 },
  { id: "engineering", label: "Engineering & Safety", count: 3 },
  { id: "case-study", label: "Case Studies", count: 1 },
] as const;

export default function InsightsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Lock body scroll and listen for Escape key when article reader is active
  useEffect(() => {
    if (!selectedArticle) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArticle(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArticle]);

  const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    if (activeCategory === "market") return articles.filter((a) => a.category === "Market");
    if (activeCategory === "policy") return articles.filter((a) => a.category === "Policy");
    if (activeCategory === "engineering") return articles.filter((a) => a.category === "Engineering");
    if (activeCategory === "case-study") return articles.filter((a) => a.category === "Case Study");
    return articles;
  }, [activeCategory]);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Fixed background & Centered Content) */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}>
          <section className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Energy Insights Background"
                fill
                priority
                className="object-cover object-center opacity-85" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 via-45% to-black/40 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-28 flex flex-col items-center text-center will-change-transform">
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
                className="max-w-4xl flex flex-col items-center text-center">
                {/* Title */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                  }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl drop-shadow-lg [text-wrap:balance]">
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
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100 font-normal max-w-5xl mx-auto text-center leading-relaxed tracking-wide drop-shadow-md">
                  <span className="block sm:whitespace-nowrap">
                    Technical, commercial and policy content that helps businesses,
                  </span>
                  <span className="block sm:whitespace-nowrap mt-1 sm:mt-1.5">
                    developers and infrastructure leaders understand India&apos;s energy transition.
                  </span>
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Bottom Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* Main Content Sections (Slides UP over fixed Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* ------------------------------------------------------------- */}
          {/* SECTION LATEST INSIGHTS & NEWS (Exact Image 2 Design Layout) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header matching Image 2 */}
              <ScrollReveal direction="up" distance={40}>
                <div className="text-center max-w-4xl mx-auto mb-14">
                  <AnimatedPillBadge className="mb-6">
                    INDUSTRY INTELLIGENCE
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Thought Leadership.</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Latest Insights &amp; News
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>
                  <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
                    Stay informed with our latest articles, case studies,
                    <br className="hidden sm:inline" />
                    {" "}and updates on solar energy trends and innovations.
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
                      className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#6DAD45] hover:shadow-xl transition-all duration-300 group cursor-pointer shadow-sm">
                      <div>
                        {/* Top Image Banner with Small Green Pill Badge */}
                        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized />
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

        {/* Professional Article Detail Modal */}
        <AnimatePresence>
          {selectedArticle && (
                  <div
                    data-lenis-prevent="true"
                    onClick={() => setSelectedArticle(null)}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 backdrop-blur-md overflow-hidden">
                    <motion.div
                      data-lenis-prevent="true"
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-4xl h-[88vh] max-h-[88vh] bg-[#0A1022] border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white my-auto selection:bg-[#D4E012] selection:text-black">
                      {/* Modal Top Sticky Header */}
                      <div className="shrink-0 w-full bg-[#0A1022]/95 backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 py-4 flex items-center justify-between z-20">
                        {/* Left: Category Badge & Brand */}
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-[#16A34A] text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm">
                            {selectedArticle.badge.toUpperCase()}
                          </span>
                          <span className="text-white/30">•</span>
                          <span className="text-[#D4E012] font-mono font-bold text-xs tracking-wider uppercase">
                            SARHAT INSIGHTS
                          </span>
                          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-mono uppercase tracking-wider">
                            {selectedArticle.category}
                          </span>
                        </div>

                        {/* Right: Close Button */}
                        <button
                          onClick={() => setSelectedArticle(null)}
                          aria-label="Close modal"
                          className="p-2 rounded-full bg-white/10 hover:bg-[#D4E012] hover:text-slate-950 text-slate-300 transition-all duration-200 cursor-pointer shadow-sm">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                        {/* Modal Scrollable Content */}
                        <div
                          data-lenis-prevent="true"
                          tabIndex={0}
                          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-10 space-y-7 custom-scrollbar focus:outline-none">
                          {/* Metadata Row */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-300 border-b border-white/10 pb-4">
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

                          {/* Article Title */}
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-medium text-white leading-tight tracking-tight [text-shadow:_0_2px_14px_rgba(0,0,0,0.8)]">
                            {selectedArticle.title}
                          </h2>

                            {/* Cover Image Banner */}
                            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900 shrink-0">
                              <Image
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1022]/60 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Excerpt Lead */}
                            <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed border-l-2 border-[#D4E012] pl-4 sm:pl-5">
                              {selectedArticle.excerpt}
                            </p>

                            {/* Executive Summary / Key Takeaways Box */}
                            {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                              <div className="bg-gradient-to-br from-[#D4E012]/10 via-[#16A34A]/5 to-white/[0.02] border border-[#D4E012]/30 rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                                <div className="flex items-center gap-2 text-[#D4E012] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                                  <BookOpen className="w-4 h-4" />
                                  <span>Key Takeaways &amp; Executive Summary</span>
                                </div>
                                <ul className="space-y-3">
                                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-100 font-normal leading-relaxed">
                                      <CheckCircle2 className="w-4 h-4 text-[#D4E012] shrink-0 mt-1" />
                                      <span>{takeaway}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Article Body Paragraphs */}
                            <div className="space-y-5 text-base sm:text-lg text-slate-200 font-normal leading-[1.8] tracking-normal pt-2">
                              {selectedArticle.content.map((paragraph, index) => (
                                <p
                                  key={index}
                                  className={index === 0 ? "text-lg sm:text-xl text-white font-normal leading-relaxed border-b border-white/10 pb-5 mb-5" : ""}>
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>

                            {/* Modal Bottom Sticky Footer Bar */}
                            <div className="shrink-0 w-full bg-[#080D1C]/95 backdrop-blur-xl border-t border-white/10 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
                              <div className="text-xs font-mono text-[#D4E012] flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span>SARHAT INSIGHTS LIBRARY</span>
                              </div>

                              <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                  onClick={() => {
                                    setSelectedArticle(null);
                                    setQuoteModalOpen(true);
                                  }}
                                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md whitespace-nowrap">
                                  <span>Discuss a Project</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setSelectedArticle(null)}
                                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full border border-white/15 transition-all cursor-pointer whitespace-nowrap">
                                  <span>Close</span>
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
