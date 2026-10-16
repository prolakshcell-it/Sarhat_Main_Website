"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

const INDIAN_STATES = [
  "Rajasthan",
  "Uttar Pradesh",
  "Haryana",
  "Madhya Pradesh",
  "Bihar",
  "Arunachal Pradesh",
  "Other state",
];

export default function QuoteModal({
  isOpen,
  onClose,
  defaultProduct,
}: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: defaultProduct || "PM-KUSUM",
    state: "",
    scope: "",
    details: "",
  });

  useEffect(() => {
    if (defaultProduct) {
      setForm((prev) => ({ ...prev, product: defaultProduct }));
    }
  }, [defaultProduct]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
        className="fixed inset-0 z-50 bg-[#05080c]/70 backdrop-blur-[6px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white text-slate-900 rounded-[28px] p-6 sm:p-10 max-w-[680px] w-full relative shadow-2xl border border-slate-200/90 my-8 overflow-hidden"
        >
          {/* Close button matching prototype */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>

          {!submitted ? (
            <div>
              {/* Header Badge */}
              <div className="text-center mb-3">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#6DAD45]/40 text-[#707B00] font-mono text-[10.5px] font-bold tracking-[0.2em] uppercase shadow-sm">
                  DISCUSS A PROJECT
                </span>
              </div>

              {/* Title & Signature Accent Underline */}
              <h2 className="text-3xl sm:text-[36px] font-serif font-bold text-slate-900 text-center tracking-tight leading-[1.15] mb-2">
                Let&apos;s map your{" "}
                <span className="text-[#6DAD45] italic font-serif relative inline-block font-normal">
                  execution path.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-[#6DAD45]"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    aria-hidden="true"
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

              <p className="text-[13px] sm:text-sm text-slate-600 text-center font-normal mb-6">
                Share a few details and a project lead will call you back.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Row 1: Full Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      COMPANY / ORGANISATION
                    </label>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      EMAIL
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      PHONE
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Product & Project State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      PRODUCT
                    </label>
                    <select
                      value={form.product}
                      onChange={(e) =>
                        setForm({ ...form, product: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a product
                      </option>
                      <optgroup label="Solar Energy">
                        <option value="PM-KUSUM">PM-KUSUM</option>
                        <option value="Open Access Solar">
                          Open Access Solar
                        </option>
                        <option value="Surya Sarovar">Surya Sarovar</option>
                        <option value="Canal-Top Solar">Canal-Top Solar</option>
                        <option value="Agri-PV (Agrivoltaics)">
                          Agri-PV (Agrivoltaics)
                        </option>
                        <option value="Residential Rooftop Solar">
                          Residential Rooftop Solar
                        </option>
                        <option value="Industrial & Commercial Rooftop Solar">
                          Industrial & Commercial Rooftop Solar
                        </option>
                        <option value="Institutional Rooftop Solar">
                          Institutional Rooftop Solar
                        </option>
                      </optgroup>
                      <optgroup label="BESS & Hybrid">
                        <option value="Standalone BESS">Standalone BESS</option>
                        <option value="BESS meets PV / Wind">
                          BESS meets PV / Wind
                        </option>
                      </optgroup>
                      <optgroup label="Infrastructure">
                        <option value="Substations & Switchyards">
                          Substations & Switchyards
                        </option>
                        <option value="Transmission Lines">
                          Transmission Lines
                        </option>
                        <option value="Piling & Foundations">
                          Piling & Foundations
                        </option>
                        <option value="Telecommunication Towers">
                          Telecommunication Towers
                        </option>
                        <option value="Industrial Buildings">
                          Industrial Buildings
                        </option>
                        <option value="Commercial Buildings">
                          Commercial Buildings
                        </option>
                        <option value="Roads & Drainage">
                          Roads & Drainage
                        </option>
                      </optgroup>
                      <option value="Something else">Something else</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      PROJECT STATE
                    </label>
                    <select
                      value={form.state}
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a state
                      </option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Approx Size / Scope */}
                <div>
                  <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    APPROX. SIZE / SCOPE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 MW KUSUM, 500 kW rooftop, 33 kV bay"
                    value={form.scope}
                    onChange={(e) =>
                      setForm({ ...form, scope: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Row 5: Project Details */}
                <div>
                  <label className="block text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Site location, land or roof status, PPA / LoA status, timelines..."
                    value={form.details}
                    onChange={(e) =>
                      setForm({ ...form, details: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-[#6DAD45] focus:ring-1 focus:ring-[#6DAD45] rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] px-7 py-3.5 text-xs font-mono font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#D4E012]/30 transition-all duration-200 hover:-translate-y-px cursor-pointer"
                  >
                    <span>SEND ENQUIRY</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Footer Disclaimer */}
                <p className="text-[11.5px] text-slate-500 leading-relaxed pt-1">
                  By submitting you agree to be contacted by Sarhat about this enquiry. We never share your details.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-[#6DAD45]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Enquiry Sent Successfully
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{form.name}</span>. A project lead for <span className="font-semibold text-[#6DAD45]">{form.product}</span> will review your enquiry and get back to you shortly at {form.email}.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
