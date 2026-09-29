"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { GraduationCap, CheckCircle2, ArrowRight, ArrowLeft, Users, Award, ShieldCheck } from "lucide-react";

export default function FieldExchangePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

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

  const modules = [
    "Hands-on Electrical Safety & Relay Protection Training",
    "On-site High Voltage Substation Commissioning Workshops",
    "Empanelled Local Technician Certification Courses",
    "Local Community Hiring & Economic Empowerment",
    "Zero-Accident Safety Protocol Certification",
    "Civil Foundations & Piling Quality Control Training",
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* Hero Section */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
          >
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Field Exchange Program — Sarhat"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4E012] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    <GraduationCap className="w-3.5 h-3.5 text-[#D4E012]" />
                    <span>WORKFORCE &amp; COMMUNITY</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                    Field Exchange <br />
                    <span className="text-[#D4E012] italic font-normal">Technician Program</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                    Bridging engineering academia with ground-level site execution through hands-on technical training, safety certifications, and local community hiring.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          <section className="py-24 bg-white border-b border-slate-200/80">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="bg-[#F8FAF8] border-2 border-slate-200/90 rounded-[32px] p-8 sm:p-14 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-8 space-y-6">
                      <Link
                        href="/about/initiatives"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#6DAD45] hover:underline mb-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Initiatives Overview</span>
                      </Link>

                      <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                        Upskilling Local Energy Technicians
                      </h2>
                      <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
                        Field Exchange is Sarhat&apos;s community-driven learning program. We empower local engineers, technicians, and apprentices at active solar, BESS, and substation construction sites across India.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        {modules.map((item) => (
                          <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white border border-slate-200/90 p-8 rounded-2xl text-center space-y-4 shadow-lg">
                      <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#6DAD45]">1,500+ Trained</div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                        Local Engineers &amp; Technicians
                      </div>
                      <button
                        onClick={() => setQuoteModalOpen(true)}
                        className="w-full bg-gradient-to-r from-[#6DAD45] to-[#5EE72D] hover:from-[#5cb338] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all shadow-md shadow-[#6DAD45]/20 hover:scale-105 cursor-pointer"
                      >
                        Join Field Exchange
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
