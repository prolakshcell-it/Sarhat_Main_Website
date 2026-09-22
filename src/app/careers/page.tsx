"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  X,
  Send,
  Upload,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";

interface JobRole {
  id: string;
  category: "BUSINESS" | "ENGINEERING" | "SITE" | "O&M";
  type: string;
  title: string;
  details: string;
  description: string;
}

const roles: JobRole[] = [
  {
    id: "bde",
    category: "BUSINESS",
    type: "FULL-TIME",
    title: "Business Development Executive",
    details: "2–5 years · Any Graduate · Ghaziabad, U.P.",
    description:
      "Promote Sarhat's services, build relationships and grow renewable energy opportunities.",
  },
  {
    id: "css",
    category: "BUSINESS",
    type: "FULL-TIME",
    title: "Customer Support Specialist",
    details: "2–5 years · Any Graduate · Ghaziabad, U.P.",
    description:
      "Support renewable energy customers and coordinate technical and service requirements.",
  },
  {
    id: "sde",
    category: "ENGINEERING",
    type: "FULL-TIME",
    title: "Senior Design Engineer",
    details: "3–4 years · BE / BTech / Diploma · Ghaziabad, U.P.",
    description:
      "Prepare electrical drawings, SLDs, shadow analysis and engineering documentation.",
  },
  {
    id: "dem",
    category: "ENGINEERING",
    type: "FULL-TIME",
    title: "Design Engineer - Mechanical",
    details: "2–5 years · BE / BTech / Diploma · Ghaziabad, U.P.",
    description:
      "Design module mounting structures, trackers and foundations for ground-mounted and rooftop projects.",
  },
  {
    id: "se",
    category: "SITE",
    type: "FULL-TIME",
    title: "Site Engineer",
    details: "2–5 years · BE / BTech / Diploma · Ghaziabad, U.P.",
    description:
      "Supervise rooftop and ground-mounted solar installation with quality, safety and schedule discipline.",
  },
  {
    id: "oem",
    category: "O&M",
    type: "FULL-TIME",
    title: "O&M Engineer",
    details: "2–5 years · BE / BTech / Diploma · Ghaziabad, U.P.",
    description:
      "Monitor plant performance, preventive maintenance, generation reports and remote monitoring.",
  },
];

export default function CareersPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const filterOptions = ["All", "Engineering", "Site + O&M", "Business"];

  const filteredRoles = roles.filter((role) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Engineering") return role.category === "ENGINEERING";
    if (activeFilter === "Site + O&M") return role.category === "SITE" || role.category === "O&M";
    if (activeFilter === "Business") return role.category === "BUSINESS";
    return true;
  });

  const handleApplyClick = (role?: JobRole) => {
    setSelectedRole(role || null);
    setApplyModalOpen(true);
    setAppliedSuccess(false);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setApplyModalOpen(false);
      setAppliedSuccess(false);
      setApplicant({ name: "", email: "", phone: "", experience: "", message: "" });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-hidden font-sans-ui">
      {/* Floating Transparent Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-36 pb-16 border-b border-slate-200/80 relative z-10 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Breadcrumb */}
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-6">
              HOME / CAREERS
            </div>

            {/* Tag */}
            <div className="text-xs font-semibold tracking-widest text-[#707B00] uppercase mb-4 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#707B00] animate-ping"></span>
              CAREERS / BUILD THE NEXT
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-[#0F172A] leading-[1.08] mb-6 max-w-5xl">
              Build the people <br />
              <span className="text-[#707B00]">who build India.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-light max-w-3xl leading-relaxed mb-16">
              Join Sarhat as we expand from solar EPC into renewable energy, storage, grid infrastructure and civil execution. We value ownership, learning, safety and people who want to build things that last.
            </p>
          </ScrollReveal>

          {/* Stats Bar */}
          <ScrollReveal direction="up" distance={40} delay={0.15}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#6DAD45]/40 transition-colors">
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#6DAD45]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#707B00] tracking-tight mb-3">
                  11-50
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                  CURRENT COMPANY SIZE RANGE
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#6DAD45]/40 transition-colors">
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#6DAD45]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#707B00] tracking-tight mb-3">
                  2024
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                  FOUNDED
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#6DAD45]/40 transition-colors">
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#6DAD45]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#707B00] tracking-tight mb-3">
                  6
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                  PORTFOLIO STATES
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#6DAD45]/40 transition-colors">
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#6DAD45]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#707B00] tracking-tight mb-3">
                  47 MW
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                  SERVED TO BUILD
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* OPEN ROLES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 border-b border-slate-200/80 bg-[#F8FAF8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="text-xs font-mono font-semibold tracking-widest text-[#707B00] uppercase mb-3">
                  OPEN ROLES
                </div>
                <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                  Find where <br />
                  <span className="text-[#0F172A]">you fit.</span>
                </h2>
              </div>

              <p className="text-slate-600 font-light text-sm sm:text-base max-w-md leading-relaxed">
                Current roles are based on the openings published by Sarhat Energy. Use the filters to find a function and apply directly by email.
              </p>
            </div>
          </ScrollReveal>

          {/* Filter Pills */}
          <ScrollReveal direction="up" distance={30} delay={0.1}>
            <div className="flex items-center gap-3 flex-wrap mb-10">
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#D4E012] text-slate-950 font-bold shadow-md shadow-[#D4E012]/20"
                        : "bg-white border border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Job Cards Grid */}
          <ScrollReveal direction="up" distance={40} delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#6DAD45]/60 transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest mb-6">
                      <span className="text-[#707B00] uppercase font-bold">{role.category}</span>
                      <span className="text-slate-500 uppercase">{role.type}</span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-[#0F172A] group-hover:text-[#707B00] transition-colors mb-3 leading-snug">
                      {role.title}
                    </h3>

                    {/* Subtitle / Details */}
                    <p className="text-xs font-mono text-slate-500 mb-4">{role.details}</p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 font-light leading-relaxed mb-8">
                      {role.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <button
                    onClick={() => handleApplyClick(role)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#707B00] hover:text-[#0F172A] uppercase tracking-wider transition-colors pt-4 border-t border-slate-100 w-full justify-between cursor-pointer"
                  >
                    <span>Apply now</span>
                    <ArrowUpRight className="w-4 h-4 text-[#707B00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* HOW WE WORK SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 border-b border-slate-200/80 bg-[#FFFFFF] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-mono font-semibold tracking-widest text-[#707B00] uppercase mb-3">
                  HOW WE WORK
                </div>
                <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                  Own the work. <br />
                  <span className="text-[#0F172A]">Learn fast. Build well.</span>
                </h2>
              </div>

              <p className="text-slate-600 font-light text-sm sm:text-base max-w-md leading-relaxed">
                Our people-first culture is built around accountability, continuous learning, care and responsible execution.
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Cards Grid */}
          <ScrollReveal direction="up" distance={40} delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 01 */}
              <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:border-[#6DAD45]/50 transition-colors shadow-sm">
                <span className="text-xs font-mono text-[#707B00] font-bold block mb-4">01</span>
                <h3 className="text-xl font-serif-display font-medium text-[#0F172A] mb-2">Ownership</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Take responsibility from the first brief to the final handover.
                </p>
              </div>

              {/* Card 02 */}
              <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:border-[#6DAD45]/50 transition-colors shadow-sm">
                <span className="text-xs font-mono text-[#707B00] font-bold block mb-4">02</span>
                <h3 className="text-xl font-serif-display font-medium text-[#0F172A] mb-2">Learning</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Turn site experience and project lessons into better systems.
                </p>
              </div>

              {/* Card 03 */}
              <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:border-[#6DAD45]/50 transition-colors shadow-sm">
                <span className="text-xs font-mono text-[#707B00] font-bold block mb-4">03</span>
                <h3 className="text-xl font-serif-display font-medium text-[#0F172A] mb-2">Safety</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Quality and safety are part of delivery, not an afterthought.
                </p>
              </div>

              {/* Card 04 */}
              <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:border-[#6DAD45]/50 transition-colors shadow-sm">
                <span className="text-xs font-mono text-[#707B00] font-bold block mb-4">04</span>
                <h3 className="text-xl font-serif-display font-medium text-[#0F172A] mb-2">Impact</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Build energy and infrastructure that has a measurable purpose.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* DON'T SEE YOUR ROLE? CARD SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-[#F8FAF8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="text-xs font-mono text-[#D4E012] uppercase tracking-widest">
                    DON'T SEE YOUR ROLE?
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
                    Send us your profile.
                  </h3>
                  <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                    Tell us what you can build, improve or lead. We keep strong profiles in mind as new projects and verticals open up.
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleApplyClick()}
                    className="bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-xl shadow-[#D4E012]/20 cursor-pointer"
                  >
                    <span>Send resume</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      {/* Job Application Modal */}
      <AnimatePresence>
        {applyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl overflow-hidden text-white"
            >
              <button
                onClick={() => setApplyModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-[11px] font-mono text-[#D4E012] uppercase tracking-widest mb-1">
                CAREERS AT SARHAT
              </div>
              <h3 className="text-2xl font-serif-display font-medium text-white mb-1">
                {selectedRole ? `Apply: ${selectedRole.title}` : "Submit General Profile"}
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-light">
                {selectedRole ? selectedRole.details : "Send your details to info@sarhatenergy.com"}
              </p>

              {appliedSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#D4E012]/20 text-[#D4E012] rounded-full flex items-center justify-center mx-auto border border-[#D4E012]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif-display text-white">Application Sent</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Thank you! Our recruitment team will review your profile and reach out if there is a match.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#D4E012] rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#D4E012] rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#D4E012] rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Years of Experience / Current Role"
                      value={applicant.experience}
                      onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#D4E012] rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Cover note or LinkedIn profile link"
                      value={applicant.message}
                      onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#D4E012] rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>Submit Application</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
