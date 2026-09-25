"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Eye, ShieldAlert } from "lucide-react";
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
    <section id="about" className="py-28 bg-white relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="right" distance={50}>
          <div className="text-xs font-mono font-extrabold tracking-widest text-[#707B00] uppercase mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8A9600] animate-ping"></span>
            ONE-HALT EPC CAPABILITY
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Card - Sliding in from Left */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" distance={80}>
              <div className="bg-[#F8FAF8] rounded-3xl p-8 sm:p-12 border border-slate-200/90 flex flex-col justify-between relative overflow-hidden h-full shadow-xl shadow-slate-200/50">
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    One project. <br />
                    <span className="text-[#6DAD45]">One connected</span> execution mindset.
                  </h2>
                  <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                    We connect generation, storage, grid evacuation and civil infrastructure into one single project view so the handoff between disciplines does not become someone else&apos;s problem.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#solutions"
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-[#D4E012]/20"
                  >
                    <span>See our capabilities</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </a>
                  <a
                    href="#intelligence"
                    className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all border border-slate-300 shadow-sm"
                  >
                    Private Project Readiness
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 3 Pillar Cards Stack - Sliding in from Right */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: -6 }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-[#D4E012] transition-all shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComp className="w-4.5 h-4.5 text-[#707B00]" />
                    <h3 className="text-lg font-serif-display font-bold text-slate-900">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
