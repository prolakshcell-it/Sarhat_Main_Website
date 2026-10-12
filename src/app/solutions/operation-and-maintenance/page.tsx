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
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import SolutionFlowGrid from "@/components/solutions/SolutionFlowGrid";
import {
  Wrench,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Cpu,
  Droplets,
  Clock,
  BarChart3,
  Stethoscope,
} from "lucide-react";

export default function OperationAndMaintenancePage() {
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

  const omPillars = [
    {
      icon: Activity,
      tag: "REAL-TIME TELEMETRY",
      title: "24/7 Central SCADA Remote Monitoring",
      desc: "Continuous telemetry tracking inverter MPPT outputs, string currents, pyranometer irradiance, and grid availability with sub-second alert triggers.",
      metric: "Sub-Second Ingestion",
    },
    {
      icon: Droplets,
      tag: "YIELD RESTORATION",
      title: "Robotic & Water-Saving Module Cleaning",
      desc: "Deploying automated robotic crawlers and treated de-mineralized water systems to eliminate soiling derates while saving up to 85% water.",
      metric: "Up to 85% Water Saved",
    },
    {
      icon: Wrench,
      tag: "PREVENTIVE CARE",
      title: "Scheduled Diagnostic Maintenance",
      desc: "Quarterly thermographic inspections, transformer dissolved gas analysis (DGA), relay calibration, and structural bolt re-torque verification.",
      metric: "Zero Surprise Outages",
    },
    {
      icon: Clock,
      tag: "RAPID RESTORATION",
      title: "Corrective Maintenance & Spares Management",
      desc: "Dedicated on-site rapid response teams and pre-stocked critical spare inventory ensuring Mean Time to Repair (MTTR) remains under 2 hours.",
      metric: "< 2 Hour MTTR",
    },
    {
      icon: BarChart3,
      tag: "FINANCIAL YIELD",
      title: "DISCOM Liaisoning & Commercial Settlement",
      desc: "ABT energy meter logging, State Load Despatch Centre (SLDC) scheduling & forecasting, and monthly joint meter reading (JMR) approvals.",
      metric: "100% Billing Accuracy",
    },
    {
      icon: ShieldCheck,
      tag: "CONTRACTUAL SLA",
      title: "Performance Ratio (PR) Guarantees",
      desc: "Contractually committed Weather-Adjusted Performance Ratio (>80%) and 99%+ plant availability warranties with penalty/bonus structures.",
      metric: "> 80% Guaranteed PR",
    },
  ];

  const serviceTiers = [
    {
      name: "Essential Monitoring",
      tag: "REMOTE OVERSIGHT",
      description: "Ideal for self-managed plants requiring 24/7 telemetry and automated failure ticketing.",
      features: [
        "24/7 SCADA cloud portal access",
        "Automated inverter fault notifications",
        "Monthly energy yield benchmarking reports",
        "SLDC generation forecasting support",
      ],
    },
    {
      name: "Comprehensive Preventive",
      tag: "MOST POPULAR",
      description: "Full preventive asset maintenance, scheduled cleaning cycles, and regular thermal audits.",
      features: [
        "Everything in Essential Monitoring",
        "Bi-weekly robotic / soft-brush module cleaning",
        "Quarterly electrical & thermal imaging audits",
        "Transformer oil and earth pit resistance testing",
        "Vegetation control and perimeter management",
      ],
      popular: true,
    },
    {
      name: "Turnkey PR Guarantee",
      tag: "MAXIMUM RETURN",
      description: "Complete asset stewardship with guaranteed Performance Ratio and on-site emergency engineers.",
      features: [
        "Everything in Comprehensive",
        "Resident on-site technicians & security team",
        "<2 hour corrective MTTR commitment",
        "Weather-adjusted PR guarantee (>80%)",
        "Consignment spare parts warehousing",
      ],
    },
  ];

  const stats = [
    { label: "Fleet Availability", val: "99.4%" },
    { label: "Mean Time to Repair", val: "<2 Hours" },
    { label: "Assets Under Management", val: "150+ MW" },
    { label: "Contractual PR Benchmark", val: ">81%" },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / HERO */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none"
          >
            <motion.div
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Operation & Maintenance Solutions"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-85"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/95 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
                filter: contentFilter,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                  Operation &amp; <br />
                  <span className="text-[#D4E012] italic font-normal">Maintenance Excellence</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  Maximizing lifecycle energy yield through 24/7 telemetry monitoring, precision robotic cleaning, and contractual Performance Ratio (PR) guarantees.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* Core Capabilities */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                  <AnimatedPillBadge className="mb-3">ASSET PERFORMANCE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Protecting Plant Lifetime Generation &amp; Cashflows
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    A solar power plant is a 25-year financial asset. Our dedicated O&amp;M engineering team ensures every kilowatt-hour generated reaches the grid without friction.
                  </p>
                </div>
              </ScrollReveal>

              <SolutionFlowGrid
                items={omPillars.map((p) => ({ ...p, description: p.desc }))}
                metricLabel="Service SLA"
                flowStageTitle="O&M Asset Lifecycle Flow"
              />
            </div>
          </section>

          {/* Service Tiers */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-3">SERVICE TIERS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Tailored Operation &amp; Maintenance Packages
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Select the level of care aligned with your financial risk tolerance and asset size.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceTiers.map((tier) => (
                  <ScrollReveal key={tier.name}>
                    <div
                      className={`relative flex flex-col justify-between h-full rounded-3xl p-8 transition-all ${
                        tier.popular
                          ? "bg-slate-900 text-white shadow-2xl border-2 border-[#D4E012]"
                          : "bg-white text-slate-900 shadow-sm border border-slate-200"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                              tier.popular
                                ? "bg-[#D4E012] text-slate-950"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {tier.tag}
                          </span>
                        </div>

                        <h3 className="font-serif-display text-2xl font-medium mb-3">{tier.name}</h3>
                        <p
                          className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${
                            tier.popular ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {tier.description}
                        </p>

                        <ul className="space-y-3 pt-4 border-t border-slate-200/20 text-xs sm:text-sm">
                          {tier.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5">
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  tier.popular ? "text-[#D4E012]" : "text-[#6DAD45]"
                                }`}
                              />
                              <span className={tier.popular ? "text-slate-200" : "text-slate-700"}>
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8 mt-6">
                        <button
                          onClick={() => setQuoteModalOpen(true)}
                          className={`w-full py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                            tier.popular
                              ? "bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black shadow-lg hover:scale-105"
                              : "bg-slate-900 hover:bg-slate-800 text-white"
                          }`}
                        >
                          Select Package
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white">
                {stats.map((st) => (
                  <div key={st.label} className="text-center space-y-1">
                    <div className="text-2xl sm:text-4xl font-mono font-bold text-[#D4E012]">{st.val}</div>
                    <div className="text-xs text-slate-300 font-mono uppercase tracking-wider">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
