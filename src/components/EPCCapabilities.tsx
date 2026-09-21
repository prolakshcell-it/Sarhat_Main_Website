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
    <section id="about" className="py-28 bg-black relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={40}>
          <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
            ONE-HALT EPC CAPABILITY
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Card with Scroll Reveal */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" distance={50}>
              <div className="card-gradient rounded-3xl p-8 sm:p-12 border border-[#6DAD45]/40 flex flex-col justify-between relative overflow-hidden h-full shadow-2xl">
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                    One project. <br />
                    <span className="text-[#6DAD45]">One connected</span> execution mindset.
                  </h2>
                  <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                    We connect generation, storage, grid evacuation and civil infrastructure into one single project view so the handoff between disciplines does not become someone else&apos;s problem.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#solutions"
                    className="bg-[#6DAD45] hover:bg-[#5b9538] text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-[#6DAD45]/20"
                  >
                    <span>See our capabilities</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#intelligence"
                    className="glass-panel hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all border border-white/15"
                  >
                    Private Project Readiness
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 3 Pillar Cards Stack with Staggered Scroll Motion */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  whileHover={{ x: 6 }}
                  className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-all shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComp className="w-4 h-4 text-[#6DAD45]" />
                    <h3 className="text-lg font-serif-display font-medium text-white">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
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
