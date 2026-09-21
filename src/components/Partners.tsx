"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Zap, Building2, Landmark, Layers } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface PartnerCategory {
  title: string;
  subtitle: string;
  icon: any;
  partners: {
    name: string;
    role: string;
    location: string;
  }[];
}

const partnerCategories: PartnerCategory[] = [
  {
    title: "TIER-1 OEM & TECHNOLOGY SUPPLIERS",
    subtitle: "High-efficiency bifacial solar PV modules, central/string inverters, and BESS cells",
    icon: Cpu,
    partners: [
      { name: "LONGi Solar", role: "Hi-MO 6/7 Bifacial PV Modules", location: "Global / India" },
      { name: "Sungrow Power", role: "Utility Scale Inverters & BESS Containers", location: "Global / India" },
      { name: "Trina Solar", role: "Vertex N-Type High Power Modules", location: "Global / India" },
      { name: "Huawei Digital Power", role: "Smart String Inverters & Monitoring", location: "Global / India" },
    ],
  },
  {
    title: "GRID & SUBSTATION EQUIPMENT OEMs",
    subtitle: "High voltage transformers, switchgear, GIS modules, and SCADA protection panels",
    icon: Zap,
    partners: [
      { name: "ABB / Hitachi Energy", role: "GIS Switchgear & Substation Automation", location: "India / Global" },
      { name: "Siemens Energy", role: "Power Transformers & High Voltage Breakers", location: "India / Global" },
      { name: "Schneider Electric", role: "Protection Relays & SCADA Management", location: "India / Global" },
      { name: "CG Power", role: "Step-Up Power Transformers & EHV Substations", location: "India" },
    ],
  },
  {
    title: "UTILITIES & TRANSMISSION DISCOMs",
    subtitle: "Seamless grid interconnection, bay allocation, and PPA wheeling execution",
    icon: Building2,
    partners: [
      { name: "UPPCL / KPTCL", role: "Grid Interconnection & Substation Bays", location: "UP & Karnataka" },
      { name: "GETCO / MSEDCL", role: "State Transmission Wheeling & Bay Clearances", location: "Gujarat & Maharashtra" },
      { name: "SECI / NTPC", role: "Utility Bidding & Inter-State Transmission (ISTS)", location: "Pan-India" },
      { name: "RECPDCL / PFC", role: "Grid Nodal & Infrastructure Execution", location: "Pan-India" },
    ],
  },
  {
    title: "FINANCIAL & INSTITUTIONAL PARTNERS",
    subtitle: "Project debt syndication, green bonds, and institutional equity funding",
    icon: Landmark,
    partners: [
      { name: "IREDA", role: "Renewable Energy Project Debt Financing", location: "New Delhi" },
      { name: "State Bank of India", role: "Infrastructure Project Finance & LC Facilities", location: "Pan-India" },
      { name: "PFC / REC Limited", role: "Utility Scale Debt & Term Loans", location: "Pan-India" },
      { name: "Tata Cleantech Capital", role: "C&I Solar & Storage Debt Syndication", location: "Mumbai" },
    ],
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-28 bg-black relative z-10 border-b border-white/10 select-none font-sans-ui overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#5EE72D]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#5EE72D]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-mono text-[#5EE72D] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
                ECOSYSTEM & ALLIANCES
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight">
                Our Strategic <span className="text-[#5EE72D] italic">Partners</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md leading-relaxed">
              We collaborate with world-class equipment manufacturers, grid utilities, state transmission corporations, and leading clean energy financiers to ensure turnkey execution excellence.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {partnerCategories.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <ScrollReveal key={category.title} delay={idx * 0.1}>
                <div className="bg-[#0A0E0A] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#5EE72D]/40 transition-all duration-300 relative group shadow-xl">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-[#5EE72D]/10 border border-[#5EE72D]/30 flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5 text-[#5EE72D]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Partner Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.partners.map((partner) => (
                      <div
                        key={partner.name}
                        className="bg-black/60 border border-white/5 rounded-xl p-3.5 hover:border-[#5EE72D]/30 hover:bg-black/90 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white tracking-wide">
                            {partner.name}
                          </span>
                          <span className="text-[9px] font-mono text-[#5EE72D] bg-[#5EE72D]/10 px-2 py-0.5 rounded-full border border-[#5EE72D]/20">
                            {partner.location}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-light line-clamp-1">
                          {partner.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 bg-gradient-to-r from-zinc-900/80 via-black to-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5EE72D]/20 border border-[#5EE72D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#5EE72D]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  ISO & BIS COMPLIANT SUPPLY CHAIN MANAGEMENT
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-0.5 max-w-xl">
                  Every vendor and component deployed across Sarhat project sites undergoes rigorous Tier-1 ALMM certification, factory acceptance testing (FAT), and strict quality audits.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors font-mono shrink-0 whitespace-nowrap border border-white/15"
            >
              BECOME A SUPPLIER / PARTNER
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
