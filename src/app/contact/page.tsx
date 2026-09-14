"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "Solar EPC",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        service: "Solar EPC",
        message: "",
      });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#6DAD45] selection:text-black relative overflow-x-hidden font-sans-ui">
      {/* Floating Transparent Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION: 05 / CONTACT */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-36 pb-16 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Tag 05 / CONTACT */}
            <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-4 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
              05 / CONTACT
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 max-w-4xl">
              Let’s build <br className="hidden sm:inline" />
              <span>what’s next.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed">
              Share the project, location, capacity and challenge. We will route the requirement to the right team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MAIN SECTION: FORM & OFFICE DETAILS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-black relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Card ("START A PROJECT") */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" distance={40}>
                <div className="bg-[#0B0D0B] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                  <div className="text-[11px] font-mono font-bold tracking-widest text-[#6DAD45] uppercase mb-6 flex items-center gap-2">
                    START A PROJECT
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-[#6DAD45]/20 text-[#6DAD45] rounded-full flex items-center justify-center mx-auto border border-[#6DAD45]/40">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display text-white">Enquiry Received</h3>
                      <p className="text-sm text-zinc-400 max-w-xs mx-auto font-light">
                        Thank you for reaching out. Our engineering & project team will get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#121412] border border-white/15 focus:border-[#6DAD45] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <input
                          type="text"
                          placeholder="Company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-[#121412] border border-white/15 focus:border-[#6DAD45] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#121412] border border-white/15 focus:border-[#6DAD45] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#121412] border border-white/15 focus:border-[#6DAD45] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Dropdown Select */}
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#121412] border border-white/15 focus:border-[#6DAD45] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="Solar EPC">Solar EPC</option>
                          <option value="Wind Energy EPC">Wind Energy EPC</option>
                          <option value="BESS Storage">BESS Storage</option>
                          <option value="Substations & Grid">Substations & Grid</option>
                          <option value="Civil Infrastructure">Civil Infrastructure</option>
                          <option value="Agrivoltaics">Agrivoltaics</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Textarea */}
                      <div>
                        <textarea
                          rows={4}
                          placeholder="Project capacity, location and requirement"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#121412] border border-white/15 focus:border-[#6DAD45] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors resize-none"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#6DAD45] hover:bg-[#5b9538] text-black font-bold text-xs uppercase tracking-wider py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#6DAD45]/20 cursor-pointer mt-2"
                      >
                        <span>Send enquiry</span>
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Office Info */}
            <div className="lg:col-span-6 space-y-8 lg:pl-6 pt-4">
              <ScrollReveal direction="right" distance={40}>
                <div className="space-y-6">
                  <div className="text-[11px] font-mono font-bold tracking-widest text-[#6DAD45] uppercase flex items-center gap-2">
                    OFFICE
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
                    Ghaziabad, <br />
                    Uttar Pradesh
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light max-w-md">
                    AHS-411, 4th Floor, Aditya High Street, Lal Kuan, Ghaziabad, Uttar Pradesh–201009
                  </p>

                  <div className="space-y-2 text-sm font-mono text-zinc-200 pt-2">
                    <div>+91 9266 7111 25</div>
                    <div>info@sarhatenergy.com</div>
                    <div className="text-xs text-zinc-400 font-sans pt-1">Mon – Sat: 9:00 AM – 6:00 PM</div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://maps.google.com/?q=Aditya+High+Street+Lal+Kuan+Ghaziabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white/50 text-white text-xs font-semibold tracking-wider transition-colors bg-white/5 hover:bg-white/10"
                    >
                      <span>Open office in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* DIRECT CONNECTION CARD SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="bg-[#0B0F0B] border border-[#6DAD45]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest">
                    DIRECT CONNECTION
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-white tracking-tight leading-tight">
                    Talk to the right <br />
                    Sarhat team.
                  </h3>
                  <p className="text-zinc-400 font-light text-sm max-w-md leading-relaxed">
                    For projects, partnerships, careers and technical conversations, use the channel that works best for you.
                  </p>
                </div>

                {/* Right Side Stacked Contact Cards */}
                <div className="lg:col-span-6 space-y-3">
                  {/* Phone */}
                  <a
                    href="tel:+919266711125"
                    className="block bg-black/70 border border-white/15 hover:border-[#6DAD45]/60 rounded-2xl p-5 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest mb-1">
                      PHONE
                    </div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-[#6DAD45] transition-colors">
                      +91 9266 7111 25
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@sarhatenergy.com"
                    className="block bg-black/70 border border-white/15 hover:border-[#6DAD45]/60 rounded-2xl p-5 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest mb-1">
                      EMAIL
                    </div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-[#6DAD45] transition-colors">
                      info@sarhatenergy.com
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black/70 border border-white/15 hover:border-[#6DAD45]/60 rounded-2xl p-5 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest mb-1">
                      LINKEDIN
                    </div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-[#6DAD45] transition-colors">
                      Sarhat Energy
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </main>
  );
}
