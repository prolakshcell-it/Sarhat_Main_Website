"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    vertical: "Solar EPC",
    scale: "5 - 20 MW",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0A0E0A] border border-[#6DAD45]/40 rounded-3xl p-8 sm:p-10 max-w-xl w-full relative shadow-2xl overflow-hidden my-8"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                <span className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest">
                  SARHAT EPC CONSULTATION
                </span>
              </div>
              <h3 className="text-3xl font-serif-display font-medium text-white mb-2">
                Request Project Proposal
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Fill in your project requirements and our engineering execution team will prepare an initial site assessment within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Organization / Company *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Acme Renewables Pvt Ltd"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="vikram@acme.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Primary Vertical
                    </label>
                    <select
                      value={form.vertical}
                      onChange={(e) => setForm({ ...form, vertical: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                    >
                      <option value="Solar EPC">Solar EPC (Utility / C&I)</option>
                      <option value="BESS Storage">BESS Energy Storage</option>
                      <option value="Agrivoltaics">Agrivoltaics (PM-KUSUM)</option>
                      <option value="Substations">High-Voltage Substations</option>
                      <option value="Civil Infrastructure">Roads, Bridges & Civil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Target Capacity / Scale
                    </label>
                    <select
                      value={form.scale}
                      onChange={(e) => setForm({ ...form, scale: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                    >
                      <option value="Under 5 MW">Under 5 MW</option>
                      <option value="5 - 20 MW">5 - 20 MW</option>
                      <option value="20 - 50 MW">20 - 50 MW</option>
                      <option value="50+ MW Utility">50+ MW Utility</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    Project Details & Site Location
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide land availability, district, grid distance, or specific timeline goals..."
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#6DAD45] hover:bg-[#599335] text-black font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#6DAD45]/20"
                  >
                    <span>Submit Proposal Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 pt-2 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6DAD45]" />
                  <span>ISO 9001:2015 Confidential Engineering Data Safeguard</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#6DAD45]/20 border border-[#6DAD45] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#6DAD45]" />
              </div>
              <h3 className="text-3xl font-serif-display font-medium text-white">
                Proposal Request Received
              </h3>
              <p className="text-xs text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{form.name}</span>. Our lead EPC engineer for <span className="text-[#6DAD45] font-mono">{form.vertical}</span> has been assigned to your request and will reach out to {form.email} shortly.
              </p>

              <button
                onClick={handleReset}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors font-mono"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
