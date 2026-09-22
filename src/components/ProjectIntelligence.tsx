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
    <section id="intelligence" className="py-24 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono font-extrabold tracking-widest text-[#707B00] uppercase mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8A9600] animate-ping"></span>
              SMART PROJECT INTELLIGENCE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
              Before you build it, <br />
              <span className="text-[#6DAD45]">know what can move it.</span>
            </h2>
          </div>
          <p className="text-slate-600 font-normal text-base max-w-md leading-relaxed">
            Use Sarhat&apos;s early-stage screening tool to analyze project readiness, grid proximity, land suitability, and ROI potential.
          </p>
        </div>

        {/* Screening Tool Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <span className="text-xs font-mono font-bold text-[#707B00] uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> INPUT PROJECT MATRIX
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">CONFIDENTIAL ANALYSIS</span>
            </div>

            <form onSubmit={handleRunScreen} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pin Code Input */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                  PROJECT PIN CODE
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#707B00] transition-colors"
                />
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                  STATE
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#707B00] transition-colors"
                >
                  {states.map((s) => (
                    <option key={s} value={s} className="bg-white text-slate-900">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Land Availability */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                  LAND STATUS
                </label>
                <select
                  value={formData.landAvailability}
                  onChange={(e) => setFormData({ ...formData, landAvailability: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#707B00] transition-colors"
                >
                  {landOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Substation Distance */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                  SUBSTATION PROXIMITY
                </label>
                <select
                  value={formData.substationDistance}
                  onChange={(e) =>
                    setFormData({ ...formData, substationDistance: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#707B00] transition-colors"
                >
                  {distanceOptions.map((d) => (
                    <option key={d} value={d} className="bg-white text-slate-900">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target COD */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                  TARGET COD
                </label>
                <select
                  value={formData.targetCod}
                  onChange={(e) => setFormData({ ...formData, targetCod: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#707B00] transition-colors"
                >
                  {codOptions.map((c) => (
                    <option key={c} value={c} className="bg-white text-slate-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* EPC Scope */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                  PREFERRED MODEL
                </label>
                <select
                  value={formData.epcScope}
                  onChange={(e) => setFormData({ ...formData, epcScope: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#707B00] transition-colors"
                >
                  {scopeOptions.map((sc) => (
                    <option key={sc} value={sc} className="bg-white text-slate-900">
                      {sc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-[#D4E012]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-black" />
                  <span>Run Project Screen →</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results Output Column (High-Contrast Slate-900 Feature Panel) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4E012]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono font-bold text-[#D4E012] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4E012]" /> HIGH EPC FEASIBILITY SCORE
                </span>
                <span className="px-3 py-1 bg-[#D4E012]/20 text-[#D4E012] font-mono text-xs font-bold rounded-full border border-[#D4E012]/30">
                  94.2 / 100
                </span>
              </div>

              <h3 className="text-2xl font-serif-display font-medium text-white mb-2">
                Ready when you are.
              </h3>
              <p className="text-xs text-slate-300 font-light mb-6">
                Based on your inputs for <span className="text-white font-mono font-bold">{formData.state}</span> ({formData.pinCode}), grid evacuation and land titling parameters indicate rapid project execution potential.
              </p>

              {/* Status Pills */}
              <div className="space-y-3 mb-8">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">GRID PROXIMITY</span>
                  <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Feasibility ({formData.substationDistance})
                  </span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">LAND TITLE STATUS</span>
                  <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Scope
                  </span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">ESTIMATED COD TIMELINE</span>
                  <span className="text-white font-mono">{formData.targetCod}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <a
                href="#contact"
                className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                Download Detailed Feasibility Report
              </a>
              <p className="text-[10px] text-slate-400 text-center font-mono font-semibold">
                Official SARHAT EPC Project Screening Algorithm v2.4
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
