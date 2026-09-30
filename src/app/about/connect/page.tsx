"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import FinalCTA from "@/components/FinalCTA";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

import {
  Share2,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Globe,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

// Social Media SVG Components
const LinkedinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function ConnectWithUsPage() {
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

  const socialHandles = [
    {
      name: "LinkedIn",
      handle: "@sarhat-energy",
      url: "https://linkedin.com/company/sarhat",
      description: "Follow Sarhat for corporate announcements, project milestone videos, procurement tenders, and executive insights.",
      icon: LinkedinIcon,
      accentBorder: "hover:border-blue-500/50",
      btnBg: "bg-blue-600 hover:bg-blue-500 text-white",
    },
    {
      name: "X (Twitter)",
      handle: "@SarhatEnergy",
      url: "https://x.com/sarhatenergy",
      description: "Real-time updates on renewable energy policy, state DISCOM grid interconnections, and clean tech discussions.",
      icon: TwitterIcon,
      accentBorder: "hover:border-sky-500/50",
      btnBg: "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700",
    },
    {
      name: "YouTube",
      handle: "@SarhatEnergyOfficial",
      url: "https://youtube.com/@sarhatenergy",
      description: "Watch high-definition drone footage of our 250+ MW utility solar parks, EHV substations, and site execution videos.",
      icon: YoutubeIcon,
      accentBorder: "hover:border-red-500/50",
      btnBg: "bg-red-600 hover:bg-red-500 text-white",
    },
    {
      name: "Instagram",
      handle: "@sarhat_infrastructure",
      url: "https://instagram.com/sarhatenergy",
      description: "Behind-the-scenes look at site life, safety drills, engineering teams, field exchange programs, and green culture.",
      icon: InstagramIcon,
      accentBorder: "hover:border-pink-500/50",
      btnBg: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
    },
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
                alt="Connect With Sarhat"
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
                    Connect With <span className="text-[#D4E012] italic font-normal">Sarhat</span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-200 font-normal max-w-3xl text-center leading-relaxed mb-8 drop-shadow-md">
                    Stay connected with our execution journey across official social media channels, news updates, media press rooms, and direct communication hubs.
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
          {/* SECTION 1: SOCIAL CHANNELS GRID */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-4">
                    OFFICIAL SOCIAL CHANNELS
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight">
                    Follow Our <span className="text-[#6DAD45] italic font-normal">Execution Journey</span>
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {socialHandles.map((channel, idx) => {
                  const Icon = channel.icon;
                  return (
                    <ScrollReveal key={channel.name} delay={idx * 0.1}>
                      <div
                        className={`bg-white border border-slate-200/90 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl ${channel.accentBorder}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-[#F8FAF8] border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold font-serif-display text-slate-900">
                                  {channel.name}
                                </h3>
                                <div className="text-xs font-mono font-bold text-[#707B00]">{channel.handle}</div>
                              </div>
                            </div>

                            <a
                              href={channel.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 bg-[#F8FAF8] border border-slate-200 rounded-xl hover:border-[#6DAD45] text-slate-700 hover:text-slate-950 transition-colors shadow-sm"
                            >
                              <ArrowUpRight className="w-5 h-5" />
                            </a>
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                            {channel.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                          <a
                            href={channel.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`w-full font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${channel.btnBg}`}
                          >
                            <span>Follow {channel.name}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: DIRECT CONTACT & HQ CARD */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-[#FAFBF9] border-b border-slate-200/80 relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl text-white">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4E012]/15 border border-[#D4E012]/30 text-[#D4E012] text-xs font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4E012]" />
                        <span>CORPORATE COMMUNICATIONS</span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-white tracking-tight">
                        Direct Enquiries & <span className="text-[#D4E012] italic font-normal">Partnerships</span>
                      </h2>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                        Have a project proposal, vendor query, or media enquiry? Our corporate team responds promptly to all valid business communications.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-3.5 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-[#D4E012]/15 border border-[#D4E012]/30 flex items-center justify-center text-[#D4E012] shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">EMAIL ENQUIRIES</div>
                            <div className="text-xs font-bold text-white">info@sarhatenergy.com</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-[#5EE72D]/15 border border-[#5EE72D]/30 flex items-center justify-center text-[#5EE72D] shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">HEADQUARTERS</div>
                            <div className="text-xs font-bold text-white">New Delhi, India</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                      <button
                        onClick={() => setQuoteModalOpen(true)}
                        className="w-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-widest py-4 px-6 rounded-2xl transition-all shadow-xl shadow-[#D4E012]/20 flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.03] active:scale-[0.98]"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-950" />
                        <span>Send Direct Message</span>
                      </button>
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
