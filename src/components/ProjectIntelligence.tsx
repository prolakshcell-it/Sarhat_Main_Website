"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Play, ShieldAlert, Sparkles, SlidersHorizontal, Calculator } from "lucide-react";

interface FormState {
  pinCode: string;
  state: string;
  landAvailability: string;
  soilCondition: string;
  offtakeModel: string;
  substationDistance: string;
  targetCod: string;
  epcScope: string;
}

export default function ProjectIntelligence() {
  const [formData, setFormData] = useState<FormState>({
    pinCode: "201301",
    state: "Uttar Pradesh",
    landAvailability: "Owned / Clear Title",
    soilCondition: "Normal / Firm",
    offtakeModel: "Captive PPA",
    substationDistance: "Under 5 km",
    targetCod: "6 - 12 Months",
    epcScope: "Turnkey EPC (Full Scope)",
  });

  const [analyzed, setAnalyzed] = useState(true);

  const states = [
    "Uttar Pradesh",
    "Rajasthan",
    "Haryana",
    "Himachal Pradesh",
    "Bihar",
    "Gujarat",
    "Maharashtra",
  ];

  const landOptions = [
    "Owned / Clear Title",
    "Leased Land (Long Term)",
    "Government Allotment",
    "In Acquisition Process",
  ];

  const distanceOptions = ["Under 2 km", "Under 5 km", "5 - 10 km", "Over 10 km"];

  const codOptions = ["Under 6 Months", "6 - 12 Months", "12 - 18 Months", "Over 18 Months"];

  const scopeOptions = [
    "Turnkey EPC (Full Scope)",
    "Balance of Plant (BoP)",
    "Engineering & Advisory",
  ];

  const handleRunScreen = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzed(true);
  };

  return (
    <section id="intelligence" className="py-24 bg-black relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6DAD45]"></span>
              03 / SMART PROJECT INTELLIGENCE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
              Before you build it, <br />
              <span className="text-[#6DAD45]">know what can move it.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light text-base max-w-md leading-relaxed">
            Use Sarhat&apos;s early-stage screening tool to analyze project readiness, grid proximity, land suitability, and ROI potential.
          </p>
        </div>

        {/* Screening Tool Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Controls Column */}
          <div className="lg:col-span-7 card-gradient rounded-3xl p-8 border border-white/15">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> INPUT PROJECT MATRIX
              </span>
              <span className="text-xs text-zinc-500 font-mono">CONFIDENTIAL ANALYSIS</span>
            </div>

            <form onSubmit={handleRunScreen} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pin Code Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  PROJECT PIN CODE
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#6DAD45]"
                />
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  STATE
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#6DAD45]"
                >
                  {states.map((s) => (
                    <option key={s} value={s} className="bg-zinc-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Land Availability */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  LAND STATUS
                </label>
                <select
                  value={formData.landAvailability}
                  onChange={(e) => setFormData({ ...formData, landAvailability: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#6DAD45]"
                >
                  {landOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-zinc-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Substation Distance */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  SUBSTATION PROXIMITY
                </label>
                <select
                  value={formData.substationDistance}
                  onChange={(e) =>
                    setFormData({ ...formData, substationDistance: e.target.value })
                  }
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#6DAD45]"
                >
                  {distanceOptions.map((d) => (
                    <option key={d} value={d} className="bg-zinc-900 text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target COD */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  TARGET COD
                </label>
                <select
                  value={formData.targetCod}
                  onChange={(e) => setFormData({ ...formData, targetCod: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#6DAD45]"
                >
                  {codOptions.map((c) => (
                    <option key={c} value={c} className="bg-zinc-900 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* EPC Scope */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  PREFERRED MODEL
                </label>
                <select
                  value={formData.epcScope}
                  onChange={(e) => setFormData({ ...formData, epcScope: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#6DAD45]"
                >
                  {scopeOptions.map((sc) => (
                    <option key={sc} value={sc} className="bg-zinc-900 text-white">
                      {sc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#6DAD45] hover:bg-[#5a9436] text-black font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-[#6DAD45]/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Run Project Screen →</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 bg-[#090C09] rounded-3xl p-8 border border-[#6DAD45]/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6DAD45]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6DAD45]" /> HIGH EPC FEASIBILITY SCORE
                </span>
                <span className="px-3 py-1 bg-[#6DAD45]/20 text-[#6DAD45] font-mono text-xs font-bold rounded-full">
                  94.2 / 100
                </span>
              </div>

              <h3 className="text-2xl font-serif-display font-medium text-white mb-2">
                Ready when you are.
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Based on your inputs for <span className="text-white font-mono">{formData.state}</span> ({formData.pinCode}), grid evacuation and land titling parameters indicate rapid project execution potential.
              </p>

              {/* Status Pills */}
              <div className="space-y-3 mb-8">
                <div className="bg-black/60 p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">GRID PROXIMITY</span>
                  <span className="text-[#6DAD45] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Feasibility ({formData.substationDistance})
                  </span>
                </div>
                <div className="bg-black/60 p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">LAND TITLE STATUS</span>
                  <span className="text-[#6DAD45] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Scope
                  </span>
                </div>
                <div className="bg-black/60 p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">ESTIMATED COD TIMELINE</span>
                  <span className="text-white font-mono">{formData.targetCod}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="#contact"
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Download Detailed Feasibility Report
              </a>
              <p className="text-[10px] text-zinc-500 text-center font-mono">
                Official SARHAT EPC Project Screening Algorithm v2.4
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
