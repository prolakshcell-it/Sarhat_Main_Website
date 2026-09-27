"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Eye, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function EPCCapabilities() {
  const pillars = [
    {
      title: "Design around the site.",
      description: "Topography, civil engineering, electrical SLD and asset load planning finalized long before procurement begins.",
      icon: Compass,
    },
    {
      title: "Build with visibility.",
      description: "Procurement, construction, grid commissioning and field support connected through 24/7 transparent telemetry.",
      icon: Eye,
    },
    {
      title: "Integrity before convenience.",
      description: "Zero-compromise safety, regulatory compliance, quality materials, and transparent communication across all stakeholders.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-28 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-2.5 rounded-full bg-white border border-[#707B00]/40 text-[#707B00] font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-sm mb-6">
              ABOUT US
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
              India&apos;s Trusted Solar & EPC Partner <br />
              <span className="text-[#6DAD45] italic relative inline-block">
                — Built on Experience.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Sarhat Energy & Infrastructure is a premier turnkey Solar EPC and renewable infrastructure company building utility-scale solar, C&I rooftops, BESS storage, and EHV substations across India.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Info Column */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" distance={60}>
              <div>
                {/* Paragraph Content */}
                <div className="space-y-4 text-slate-600 font-normal text-base sm:text-lg leading-relaxed mb-8">
                  <p>
                    Our in-house engineering and execution mindset connects site topography, electrical SLDs, procurement, DISCOM grid clearances, and 24/7 telemetry under one single project view for faster execution and long-term reliability.
                  </p>
                  <p className="text-sm sm:text-base text-slate-500">
                    We deliver end-to-end EPC services tailored for commercial manufacturing plants, ground-mounted IPP solar parks, and government utility projects with zero compromise on safety and quality.
                  </p>
                </div>

                {/* 3 Pillar Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                  {pillars.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.title}
                        className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm hover:border-[#707B00] transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-[#707B00] shrink-0" />
                          <h4 className="text-xs font-bold text-slate-900 font-sans-ui">
                            {p.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {p.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#solutions"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all border border-slate-300 shadow-sm"
                  >
                    <span>Our Capabilities</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image & Overlay Badge Column */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" distance={60}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 h-[420px] sm:h-[500px] w-full group">
                <Image
                  src="/images/hero-solar.jpg"
                  alt="Sarhat Solar EPC Team & Infrastructure"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Floating Experience / Capacity Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute bottom-5 left-5 z-20 bg-[#D4E012] text-black p-5 rounded-2xl shadow-2xl border border-black/10 max-w-[210px]"
                >
                  <div className="text-3xl font-serif-display font-black tracking-tight text-black leading-none mb-1">
                    47.77+ MW
                  </div>
                  <div className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-900 leading-tight">
                    Turnkey Renewable Solar Capacity Delivered
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
