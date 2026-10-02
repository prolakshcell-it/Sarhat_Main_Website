"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import FinalCTA from "@/components/FinalCTA";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

import {
  Users,
  ShieldCheck,
  Heart,
  Leaf,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Award,
  Compass,
  MessageSquare,
  Shield,
  Smile,
  Flame,
  Quote,
} from "lucide-react";

export default function CulturePeoplePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Subtle scroll-reveal for the VIBES section: fade + small upward drift
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const },
  });

  // Parallax & Scroll Fade-out Tracking for Hero
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

  const vibesPills = [
    { letter: "V", title: "Volunteering", desc: "Community outreach, solar literacy & site stewardship" },
    { letter: "I", title: "Inclusivity", desc: "Equal voice & diverse perspectives celebrated across teams" },
    { letter: "B", title: "Belonging", desc: "A safe, supportive workplace where everyone thrives" },
    { letter: "E", title: "Engagement", desc: "Active listening, field exchange & transparent forums" },
    { letter: "S", title: "Social", desc: "Team celebrations, sports events & field camaraderie" },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>

        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ==========================================
            1. HERO SECTION (Sticky background & Centered Content)
            ========================================== */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col justify-between items-center bg-black text-white overflow-hidden select-none"
          >
            {/* Background Image Layer with Parallax Zoom */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Culture & People"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Dark Gradient Overlay Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 sm:pt-32 pb-4 my-auto flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center drop-shadow-lg">
                    Safety, Unity & Ownership <br />
                    <span className="text-[#D4E012] italic font-normal">guide every project.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-200 font-normal max-w-5xl text-center leading-relaxed mb-8 drop-shadow-md">
                    At Sarhat, our strength lies in our people. We foster an execution-driven, safety-first culture where engineering excellence meets deep mutual respect.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Standard Animated Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* ==========================================
            MAIN SLIDING CONTENT OVERLAY
            ========================================== */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* ------------------------------------------------------------- */}
          {/* SECTION 1: CULTURE STATEMENT OVERVIEW */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
            {/* Subtle background quote mark watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-serif text-[280px] sm:text-[340px] leading-none pointer-events-none select-none opacity-40">
              &ldquo;
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <ScrollReveal direction="up" distance={30}>
                <AnimatedPillBadge className="mb-6">
                  CULTURE & PURPOSE
                </AnimatedPillBadge>

                {/* Big Inverted Quote Icon Accent Box */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#D4E012]/30 to-[#6DAD45]/20 border border-[#D4E012]/50 flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#707B00] rotate-180" />
                </div>

                <p className="text-xl sm:text-2xl md:text-3xl font-serif-display font-normal text-slate-900 leading-relaxed tracking-tight max-w-4xl mx-auto relative">
                  <span className="text-[#6DAD45] font-serif text-4xl sm:text-6xl inline-block -translate-y-1 sm:-translate-y-2 mr-1 sm:mr-2 select-none">&ldquo;</span>
                  <span className="font-semibold text-slate-950">Our culture, core values and team members drive our success.</span> We are a values-led company which informs how we engage with others as we aim to create{" "}
                  <span className="text-[#6DAD45] italic font-normal">sustained value for our people, partners and planet</span>. At Sarhat, we pride ourselves on creating a culture of safety, being respectful and working with integrity. Through our VIBES programme, we foster a sense of belonging, understanding and inclusivity. Our people are the foundation of our success; we invest in their continuous growth and development, supporting driven people with a range of diverse perspectives to thrive.
                  <span className="text-[#6DAD45] font-serif text-4xl sm:text-6xl inline-block translate-y-2 sm:translate-y-3 ml-1 sm:ml-2 select-none">&rdquo;</span>
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: OUR VIBES - INCLUSIVITY PROGRAMME */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFBF9] border-b border-slate-200/80 relative z-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#6DAD45]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                {/* Left Editorial Block */}
                <div className="lg:col-span-7 min-w-0">
                  <motion.div {...reveal(0)}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4E012]/20 border border-[#707B00]/30 text-[#707B00] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                      <Sparkles className="w-3.5 h-3.5 text-[#707B00]" />
                      <span>OUR VIBES PROGRAMME</span>
                    </div>
                  </motion.div>

                  <motion.h2 {...reveal(0.08)} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium text-slate-900 tracking-tight leading-[1.05] mb-6 text-balance">
                    Inclusivity & <span className="text-[#6DAD45] italic font-normal">Belonging</span>
                  </motion.h2>

                  <motion.div {...reveal(0.14)} className="text-[11px] sm:text-sm font-mono font-bold text-[#707B00] uppercase tracking-wider mb-8 bg-[#D4E012]/15 border border-[#D4E012]/40 inline-block px-4 py-2 rounded-xl max-w-full">
                    VIBES: Volunteering • Inclusivity • Belonging • Engagement • Social
                  </motion.div>

                  <motion.p {...reveal(0.2)} className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-12 pl-5 sm:pl-6 border-l-2 border-[#6DAD45]/60 max-w-2xl">
                    For our people and by our people, VIBES is focused on building an inclusive and supportive culture. Through the various volunteering, social and wellbeing events, we unite around shared purposes, build connections and cultivate an environment where people can make a positive impact within Sarhat and in the communities in which we work. It&apos;s how we continue to grow and succeed - it&apos;s our vibe!
                  </motion.p>

                  {/* V.I.B.E.S Editorial List */}
                  <ul className="border-t border-slate-300/70">
                    {vibesPills.map((item, i) => (
                      <motion.li
                        key={item.title}
                        {...reveal(0.1 + i * 0.07)}
                        className="group border-b border-slate-300/70 py-5 sm:py-6 flex items-start gap-4 sm:gap-6 transition-all duration-300 hover:translate-x-1 hover:border-[#6DAD45]/60 motion-reduce:hover:translate-x-0"
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#D4E012] to-[#6DAD45] text-slate-950 font-black text-base flex items-center justify-center shrink-0 shadow-sm ring-4 ring-[#D4E012]/10 transition-shadow duration-300 group-hover:shadow-md">
                          {item.letter}
                        </div>
                        <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-8">
                          <div className="text-sm font-bold text-slate-900 uppercase tracking-[0.14em] font-sans sm:w-40 shrink-0">{item.title}</div>
                          <div className="text-sm sm:text-[15px] text-slate-600 mt-1 sm:mt-0 leading-relaxed sm:flex-1">{item.desc}</div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Right Visual Graphic Block */}
                <div className="lg:col-span-5 min-w-0 lg:sticky lg:top-28">
                  <motion.div {...reveal(0.15)} className="flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md lg:max-w-none bg-slate-950 border border-slate-800 rounded-[2rem] p-8 sm:p-12 lg:p-14 shadow-2xl text-center overflow-hidden group transition-transform duration-500 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                      {/* Subtle Glow inside Card */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4E012]/10 via-[#6DAD45]/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-3 sm:inset-4 rounded-[1.5rem] border border-white/10 pointer-events-none" />

                      <div className="relative z-10 py-4 sm:py-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#D4E012] text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8">
                          CULTURE INITIATIVE
                        </div>

                        {/* Vibrant Brand Yellow-Green VIBES Typography */}
                        <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans-ui tracking-tight bg-gradient-to-r from-[#D4E012] via-[#6DAD45] to-[#5EE72D] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(212,224,18,0.3)] select-none py-2">
                          VIBES
                        </h3>

                        <p className="text-slate-300 text-xs font-normal leading-relaxed mt-5">
                          Volunteering • Inclusivity • Belonging • Engagement • Social
                        </p>

                        <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#D4E012] uppercase tracking-wider">
                          <Smile className="w-4 h-4 text-[#D4E012]" />
                          <span>IT&apos;S OUR VIBE!</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 3: OUR CORE VALUES (5 VALUES LAYOUT) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                  <AnimatedPillBadge className="mb-4">
                    OUR GUIDING PRINCIPLES
                  </AnimatedPillBadge>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight mb-4">
                    Our core <span className="text-[#6DAD45] italic font-normal">values</span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                    From our corporate social responsibility to our passion for renewable energy, Sarhat works to five core values that shape everything we do.
                  </p>
                </div>
              </ScrollReveal>

              {/* Core Values 5-Card Layout */}
              <div className="space-y-8">
                
                {/* 1. TOP FEATURED CENTER CARD: INTEGRITY */}
                <ScrollReveal direction="up" distance={30}>
                  <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#F8FAF5] via-white to-[#F3F7EE] border-2 border-[#D4E012]/60 rounded-3xl p-8 sm:p-10 text-center shadow-lg hover:shadow-2xl hover:border-[#6DAD45] transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 text-[#707B00] flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900 mb-4">
                      Integrity
                    </h3>
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
                      We are a company of uncompromising integrity and business ethics. We achieve our ambitions and strategic initiatives by doing the right thing in an honest, fair, and responsible way, with and by our employees and business partners, every time.
                    </p>
                  </div>
                </ScrollReveal>

                {/* 2. MIDDLE ROW: SAFETY & RESPECT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Safety */}
                  <ScrollReveal direction="left" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
                        <Shield className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Safety
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        Safety isn&apos;t a check-box; it&apos;s our foundational law. Every team member on site is empowered with absolute stop-work authority to prevent hazards and protect lives across every field location.
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Respect */}
                  <ScrollReveal direction="right" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                        <Users className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Respect
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        We treat everyone with dignity, empathy, and mutual respect, fostering open communication, active listening, and inclusive collaboration across field teams, partners, and executive leadership.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* 3. BOTTOM ROW: SUSTAINABILITY & DRIVE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Sustainability */}
                  <ScrollReveal direction="left" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                        <Leaf className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Sustainability
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        We deliver clean renewable energy assets that protect the environment and create long-term economic and ecological benefits for communities across India.
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Drive */}
                  <ScrollReveal direction="right" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 text-[#707B00] flex items-center justify-center mb-6 shadow-sm">
                        <Flame className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Drive
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        We bring passion, technical mastery, and energy to every project, continuously pushing boundaries to turn clean energy ambitions into operational reality.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

              </div>
            </div>
          </section>


          {/* ------------------------------------------------------------- */}
          {/* FINAL CTA SECTION */}
          {/* ------------------------------------------------------------- */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />

        </div>

        <Footer />
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
