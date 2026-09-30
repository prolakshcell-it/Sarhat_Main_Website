"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import {
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText,
  Headphones,
  Wrench,
  Send,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function ContactPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeSubheading, setActiveSubheading] = useState<"inquiry" | "support">("inquiry");
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
  
  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "Solar EPC",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Support Ticket Form State
  const [supportData, setSupportData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    projectId: "",
    issueCategory: "Inverter & SCADA Telemetry",
    priority: "Normal / Standard SLA",
    description: "",
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);

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

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportData({
        name: "",
        company: "",
        phone: "",
        email: "",
        projectId: "",
        issueCategory: "Inverter & SCADA Telemetry",
        priority: "Normal / Standard SLA",
        description: "",
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
          {/* Subheadings Selector Bar */}
          <div className="flex items-center justify-center mb-14">
            <div className="bg-slate-200/90 p-1.5 rounded-full border border-slate-300 shadow-inner flex items-center gap-2 max-w-md w-full">
              <button
                onClick={() => setActiveSubheading("inquiry")}
                className={`flex-1 py-3 px-5 rounded-full text-xs font-mono uppercase tracking-widest font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  activeSubheading === "inquiry"
                    ? "bg-slate-950 text-white shadow-xl scale-105"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-300/50"
                }`}
              >
                <FileText className="w-4 h-4 text-[#D4E012]" />
                <span>INQUIRY</span>
              </button>

              <button
                onClick={() => setActiveSubheading("support")}
                className={`flex-1 py-3 px-5 rounded-full text-xs font-mono uppercase tracking-widest font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  activeSubheading === "support"
                    ? "bg-slate-950 text-white shadow-xl scale-105"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-300/50"
                }`}
              >
                <Headphones className="w-4 h-4 text-[#D4E012]" />
                <span>CUSTOMER SUPPORT</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeSubheading === "inquiry" ? (
              <motion.div
                key="inquiry-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Column: Inquiry Form Card */}
                <div className="lg:col-span-6">
                  <ScrollReveal direction="left" distance={40}>
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative">
                      <div className="mb-6">
                        <span className="text-[10px] font-mono font-bold text-[#707B00] uppercase tracking-widest block mb-1">
                          START A PROJECT
                        </span>
                        <h3 className="text-2xl font-serif-display font-medium text-slate-900">
                          Submit Project Enquiry
                        </h3>
                      </div>

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
                              <option value="Solar EPC">Solar EPC (Ground & Rooftop)</option>
                              <option value="PM-KUSUM Feeder Solar">PM-KUSUM Feeder Solarization</option>
                              <option value="BESS & Storage">BESS & Storage Integration</option>
                              <option value="Substation & Grid Infrastructure">Substation & Grid Infrastructure</option>
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

                {/* Right Column: Office Info & Live Interactive Map */}
                <div className="lg:col-span-6 space-y-6 lg:pl-6 pt-4 flex flex-col justify-between">
                  <ScrollReveal direction="right" distance={40}>
                    <div className="space-y-5">
                      <div>
                        <span className="text-[11px] font-mono text-[#707B00] uppercase tracking-widest font-bold block mb-2 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#707B00]" /> HEADQUARTERS LOCATION
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                          Ghaziabad, Uttar Pradesh
                        </h2>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-md">
                        AHS-411, 4th Floor, Aditya High Street, Lal Kuan, Ghaziabad, Uttar Pradesh–201009
                      </p>

                      <div className="space-y-1.5 text-xs sm:text-sm font-mono text-slate-800 pt-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#707B00]" />
                          <span>+91 9266 7111 25</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#707B00]" />
                          <span>info@sarhatenergy.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-sans pt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                        </div>
                      </div>

                      {/* Live Google Maps Embedded Canvas */}
                      <div className="w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl relative group">
                        <iframe
                          title="Sarhat Energy Ghaziabad Headquarters Office Location Map"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3253723380234!2d77.4516113!3d28.6476889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee325dd8b8d9%3A0x6b811246c4aa029f!2sAditya%20High%20Street!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>

                        {/* Floating Google Maps Overlay Button */}
                        <a
                          href="https://maps.google.com/?q=Aditya+High+Street+Lal+Kuan+Ghaziabad"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 right-3 bg-white/95 text-slate-900 text-xs font-bold px-4 py-2 rounded-full border border-slate-300 shadow-md flex items-center gap-1.5 hover:bg-slate-950 hover:text-white transition-all backdrop-blur-md"
                        >
                          <span>Open in Google Maps</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </motion.div>
            ) : (
              /* CUSTOMER SUPPORT TAB CONTENT */
              <motion.div
                key="support-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Column: Support Ticket Form */}
                <div className="lg:col-span-6">
                  <ScrollReveal direction="left" distance={40}>
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative">
                      <div className="mb-6">
                        <span className="text-[10px] font-mono font-bold text-[#707B00] uppercase tracking-widest block mb-1">
                          TECHNICAL SUPPORT PORTAL
                        </span>
                        <h3 className="text-2xl font-serif-display font-medium text-slate-900">
                          Raise a Support & Service Ticket
                        </h3>
                        <p className="text-xs text-slate-500 font-light mt-1">
                          For active plant maintenance, SCADA issues, inverter tripping, or O&M service requests.
                        </p>
                      </div>

                      {supportSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-16 text-center space-y-4"
                        >
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <h3 className="text-2xl font-serif-display text-[#0F172A]">Ticket Submitted</h3>
                          <p className="text-sm text-slate-600 max-w-xs mx-auto font-light">
                            Your service request has been registered. Our O&M engineer will contact you within 2 hours.
                          </p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSupportSubmit} className="space-y-4">
                          {/* Name & Company */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              required
                              placeholder="Name"
                              value={supportData.name}
                              onChange={(e) => setSupportData({ ...supportData, name: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors"
                            />
                            <input
                              type="text"
                              placeholder="Plant / Company Name"
                              value={supportData.company}
                              onChange={(e) => setSupportData({ ...supportData, company: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors"
                            />
                          </div>

                          {/* Phone & Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="tel"
                              required
                              placeholder="Phone"
                              value={supportData.phone}
                              onChange={(e) => setSupportData({ ...supportData, phone: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={supportData.email}
                              onChange={(e) => setSupportData({ ...supportData, email: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors"
                            />
                          </div>

                          {/* Project ID & Issue Category */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Project ID / Plant Code (Optional)"
                              value={supportData.projectId}
                              onChange={(e) => setSupportData({ ...supportData, projectId: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors font-mono"
                            />

                            <div className="relative">
                              <select
                                value={supportData.issueCategory}
                                onChange={(e) => setSupportData({ ...supportData, issueCategory: e.target.value })}
                                className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#0F172A] outline-none transition-colors appearance-none cursor-pointer pr-10"
                              >
                                <option value="Inverter & SCADA Telemetry">Inverter & SCADA Telemetry</option>
                                <option value="Grid Synchronization Outage">Grid Synchronization Outage</option>
                                <option value="Substation Transformer Bay">Substation Transformer Bay</option>
                                <option value="Preventive O&M Support">Preventive O&M Support</option>
                                <option value="Warranty & Component Claim">Warranty & Component Claim</option>
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Priority Select */}
                          <div className="relative">
                            <select
                              value={supportData.priority}
                              onChange={(e) => setSupportData({ ...supportData, priority: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] outline-none transition-colors appearance-none cursor-pointer pr-10"
                            >
                              <option value="Normal / Standard SLA">Priority: Normal (24-Hr SLA)</option>
                              <option value="Urgent">Priority: High / Urgent (6-Hr SLA)</option>
                              <option value="Critical Outage">Priority: Critical Plant Outage (2-Hr SLA)</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>

                          {/* Description */}
                          <div>
                            <textarea
                              rows={4}
                              required
                              placeholder="Describe the issue, alarm codes, or maintenance requirement"
                              value={supportData.description}
                              onChange={(e) => setSupportData({ ...supportData, description: e.target.value })}
                              className="w-full bg-[#F8FAF8] border border-slate-200 focus:border-[#707B00] rounded-xl px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors resize-none"
                            ></textarea>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer mt-2"
                          >
                            <Send className="w-4 h-4 text-[#D4E012]" />
                            <span>Submit Service Ticket</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Column: O&M Helpline & SLA Guarantees */}
                <div className="lg:col-span-6 space-y-6 lg:pl-6 pt-4">
                  <ScrollReveal direction="right" distance={40}>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[11px] font-mono text-emerald-600 uppercase tracking-widest font-bold block mb-2 flex items-center gap-1.5">
                          <Headphones className="w-4 h-4 text-emerald-600" /> 24/7 SUPPORT & O&M HELPLINE
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                          Dedicated Plant Operations Assistance
                        </h2>
                      </div>

                      {/* Direct Hotlines Box */}
                      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                        <div className="text-xs font-mono text-[#D4E012] uppercase tracking-widest font-bold">
                          24/7 EMERGENCY TELEMETRY HOTLINE
                        </div>
                        <div className="space-y-3">
                          <a
                            href="tel:+919266711125"
                            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#D4E012] transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#D4E012] text-black flex items-center justify-center shrink-0">
                              <Phone className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-slate-400 uppercase">O&M Helpline</div>
                              <div className="text-lg font-mono font-bold text-white group-hover:text-[#D4E012] transition-colors">
                                +91 9266 7111 25
                              </div>
                            </div>
                          </a>

                          <a
                            href="mailto:info@sarhatenergy.com"
                            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#D4E012] transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#D4E012] text-black flex items-center justify-center shrink-0">
                              <Mail className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-slate-400 uppercase">Support Email</div>
                              <div className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-[#D4E012] transition-colors">
                                info@sarhatenergy.com
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* Response SLA Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                          <Wrench className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-mono font-bold uppercase text-slate-900">2-Hour Triage</h4>
                            <p className="text-[11px] text-slate-600 font-light mt-0.5 leading-snug">
                              Immediate SCADA telemetry diagnostics & remote triage.
                            </p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-mono font-bold uppercase text-slate-900">12-Hour Dispatch</h4>
                            <p className="text-[11px] text-slate-600 font-light mt-0.5 leading-snug">
                              On-site field technician dispatch across key state hubs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
