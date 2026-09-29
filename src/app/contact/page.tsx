"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import {
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function ContactPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking
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
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION: 05 / CONTACT (Sticky background & Centered Content) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={containerRef} className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Contact Sarhat Energy"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl drop-shadow-lg">
                    Let’s build <br className="hidden sm:inline" />
                    <span className="text-[#D4E012] italic font-normal">what’s next.</span>
                  </h1>

                  <p className="text-lg sm:text-xl text-slate-200 font-normal max-w-2xl text-center leading-relaxed drop-shadow-md">
                    Share the project, location, capacity and challenge. We will route the requirement to the right team.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

      {/* Main Content Sections (Slides UP over static Hero) */}
      <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

      {/* ------------------------------------------------------------- */}
      {/* MAIN SECTION: FORM & OFFICE DETAILS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Card ("START A PROJECT") */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" distance={40}>
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-[#707B00]/10 text-[#707B00] rounded-full flex items-center justify-center mx-auto border border-[#707B00]/30">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display text-[#0F172A]">Enquiry Received</h3>
                      <p className="text-sm text-slate-600 max-w-xs mx-auto font-light">
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
                          className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <input
                          type="text"
                          placeholder="Company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors"
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
                          className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors"
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
                          className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors"
                        />
                      </div>

                      {/* Dropdown Select */}
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="Renewable Energy">Renewable Energy</option>
                          <option value="BESS & Storage">BESS & Storage</option>
                          <option value="Energy Infrastructure">Energy Infrastructure</option>
                          <option value="Civil Infrastructure">Civil Infrastructure</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Textarea */}
                      <div>
                        <textarea
                          rows={4}
                          placeholder="Project capacity, location and requirement"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors resize-none"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-xs uppercase tracking-wider py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#D4E012]/20 cursor-pointer mt-2"
                      >
                        <span>Send enquiry</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-950" />
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

                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                    Ghaziabad, <br />
                    Uttar Pradesh
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light max-w-md">
                    AHS-411, 4th Floor, Aditya High Street, Lal Kuan, Ghaziabad, Uttar Pradesh–201009
                  </p>

                  <div className="space-y-2 text-sm font-mono text-slate-800 pt-2">
                    <div>+91 9266 7111 25</div>
                    <div>info@sarhatenergy.com</div>
                    <div className="text-xs text-slate-500 font-sans pt-1">Mon – Sat: 9:00 AM – 6:00 PM</div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://maps.google.com/?q=Aditya+High+Street+Lal+Kuan+Ghaziabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold tracking-wider transition-colors bg-white hover:bg-slate-50 shadow-sm"
                    >
                      <span>Open office in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
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
      <section className="py-20 bg-[#F8FAF8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-xs font-mono text-[#D4E012] uppercase tracking-widest">
                    DIRECT CONNECTION
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-white tracking-tight leading-tight">
                    Talk to the right <br />
                    Sarhat team.
                  </h3>
                  <p className="text-slate-300 font-light text-sm max-w-md leading-relaxed">
                    For projects, partnerships, careers and technical conversations, use the channel that works best for you.
                  </p>
                </div>

                {/* Right Side Stacked Contact Cards */}
                <div className="lg:col-span-6 space-y-3">
                  {/* Phone */}
                  <a
                    href="tel:+919266711125"
                    className="block bg-slate-950/80 border border-slate-800 hover:border-[#D4E012]/60 rounded-2xl p-5 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-[#D4E012] uppercase tracking-widest mb-1">
                      PHONE
                    </div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-[#D4E012] transition-colors">
                      +91 9266 7111 25
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@sarhatenergy.com"
                    className="block bg-slate-950/80 border border-slate-800 hover:border-[#D4E012]/60 rounded-2xl p-5 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-[#D4E012] uppercase tracking-widest mb-1">
                      EMAIL
                    </div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-[#D4E012] transition-colors">
                      info@sarhatenergy.com
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-950/80 border border-slate-800 hover:border-[#D4E012]/60 rounded-2xl p-5 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-[#D4E012] uppercase tracking-widest mb-1">
                      LINKEDIN
                    </div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-[#D4E012] transition-colors">
                      Sarhat Energy
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </main>
  </SmoothScroll>
  );
}
