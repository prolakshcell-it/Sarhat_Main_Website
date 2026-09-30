"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";

export default function CulturePeoplePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

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

                  <p className="text-base sm:text-lg text-slate-200 font-normal max-w-3xl text-center leading-relaxed mb-8 drop-shadow-md">
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
          <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <ScrollReveal direction="up" distance={30}>
                <AnimatedPillBadge className="mb-8">
                  CULTURE & PURPOSE
                </AnimatedPillBadge>

                <p className="text-xl sm:text-2xl md:text-3xl font-serif-display font-normal text-slate-900 leading-relaxed tracking-tight max-w-4xl mx-auto">
                  <span className="font-semibold text-slate-950">Our culture, core values and team members drive our success.</span> We are a values-led company which informs how we engage with others as we aim to create{" "}
                  <span className="text-[#6DAD45] italic font-normal">sustained value for our people, partners and planet</span>. At Sarhat, we pride ourselves on creating a culture of safety, being respectful and working with integrity. Through our VIBES programme, we foster a sense of belonging, understanding and inclusivity. Our people are the foundation of our success; we invest in their continuous growth and development, supporting driven people with a range of diverse perspectives to thrive.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: OUR VIBES - INCLUSIVITY PROGRAMME */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-[#FAFBF9] border-b border-slate-200/80 relative z-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6DAD45]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Text Block */}
                <div className="lg:col-span-7">
                  <ScrollReveal direction="up" distance={30}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4E012]/20 border border-[#707B00]/30 text-[#707B00] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-[#707B00]" />
                      <span>OUR VIBES PROGRAMME</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                      Inclusivity & <span className="text-[#6DAD45] italic font-normal">Belonging</span>
                    </h2>

                    <div className="text-xs sm:text-sm font-mono font-bold text-[#707B00] uppercase tracking-wider mb-6 bg-[#D4E012]/15 border border-[#D4E012]/40 inline-block px-4 py-2 rounded-xl">
                      VIBES: Volunteering • Inclusivity • Belonging • Engagement • Social
                    </div>

                    <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-8">
                      For our people and by our people, VIBES is focused on building an inclusive and supportive culture. Through the various volunteering, social and wellbeing events, we unite around shared purposes, build connections and cultivate an environment where people can make a positive impact within Sarhat and in the communities in which we work. It&apos;s how we continue to grow and succeed - it&apos;s our vibe!
                    </p>

                    {/* V.I.B.E.S Pill Badges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {vibesPills.map((item) => (
                        <div
                          key={item.title}
                          className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#6DAD45]/50 transition-all flex items-start gap-3.5 group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4E012] to-[#6DAD45] text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                            {item.letter}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">{item.title}</div>
                            <div className="text-xs text-slate-600 mt-0.5 leading-snug">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Visual Graphic Block */}
                <div className="lg:col-span-5 flex justify-center">
                  <ScrollReveal direction="left" distance={40}>
                    <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-10 sm:p-14 shadow-2xl text-center overflow-hidden group">
                      {/* Subtle Glow inside Card */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4E012]/10 via-[#6DAD45]/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#D4E012] text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
                          CULTURE INITIATIVE
                        </div>
                        
                        {/* Vibrant Brand Yellow-Green VIBES Typography */}
                        <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans-ui tracking-tight bg-gradient-to-r from-[#D4E012] via-[#6DAD45] to-[#5EE72D] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(212,224,18,0.3)] select-none py-2">
                          VIBES
                        </h3>

                        <p className="text-slate-300 text-xs font-normal leading-relaxed mt-4">
                          Volunteering • Inclusivity • Belonging • Engagement • Social
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#D4E012] uppercase tracking-wider">
                          <Smile className="w-4 h-4 text-[#D4E012]" />
                          <span>IT&apos;S OUR VIBE!</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
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
          {/* SECTION 4: CAREERS BANNER (SPLIT SCREEN IMAGE & DARK CTA) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
                  
                  {/* Left Column: Engineer Photo */}
                  <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px]">
                    <Image
                      src="/images/hero-solar.jpg"
                      alt="Sarhat Engineer Solar Site Worker"
                      fill
                      priority
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Floating Badge on Image */}
                    <div className="absolute bottom-6 left-6 right-6 bg-black/75 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white">
                      <div className="text-xs font-mono font-bold text-[#D4E012] uppercase tracking-wider">
                        SARHAT FIELD LEADERSHIP
                      </div>
                      <div className="text-sm font-medium text-slate-200 mt-1">
                        Empowered teams building India&apos;s renewable energy backbone.
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dark Slate Brand CTA Box */}
                  <div className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B132B] p-8 sm:p-14 flex flex-col justify-center text-white relative overflow-hidden">
                    {/* Subtle Brand Accent Glow */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4E012]/15 border border-[#D4E012]/30 text-[#D4E012] text-xs font-mono font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4E012]" />
                        <span>CAREERS AT SARHAT</span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                        Join Sarhat <br />
                        <span className="text-[#D4E012] italic font-normal">& Build the Future.</span>
                      </h2>

                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal mb-8">
                        Choose a career where you are empowered to &apos;be the change&apos;. If you are passionate about supporting the energy transition and are looking to join a company focused on delivering renewable energy and battery storage solutions, visit our careers page to find out more about working at Sarhat.
                      </p>

                      <div>
                        <Link
                          href="/careers"
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-xl shadow-[#D4E012]/20 hover:scale-[1.03] active:scale-[0.98] group cursor-pointer"
                        >
                          <span>FIND YOUR NEXT ROLE</span>
                          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
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
