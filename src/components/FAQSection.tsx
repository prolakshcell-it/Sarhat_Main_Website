"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface FAQItem {
  id: string;
  category: "solar" | "bess" | "grid" | "ppa";
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: "faq-1",
    category: "solar",
    question: "What is Sarhat's turnkey EPC scope for utility-scale solar power projects?",
    answer:
      "Sarhat provides complete end-to-end turnkey EPC services including GIS solar irradiance mapping, civil topography engineering, land title verification, module procurement, array stringing, 33kV/132kV substation bay erection, and statutory DISCOM / CEIG commissioning approvals.",
  },
  {
    id: "faq-2",
    category: "bess",
    question: "How does Sarhat execute containerized Battery Energy Storage Systems (BESS)?",
    answer:
      "We design utility-scale and C&I containerized lithium-ion BESS arrays integrated with solar parks or standalone grid backup. Our engineering team handles peak-load shaving controls, hybrid inverters, relay protection panels, and SCADA monitoring.",
  },
  {
    id: "faq-3",
    category: "grid",
    question: "What electrical and substation voltage capacities does Sarhat handle?",
    answer:
      "We engineer HT/LT electrical distribution systems, AIS & GIS substations ranging from 33kV up to 132kV EHV transmission corridors, step-up power transformers, breaker bays, and inter-state transmission (ISTS) wheeling clearances.",
  },
  {
    id: "faq-4",
    category: "grid",
    question: "How long does it take to secure DISCOM and state transmission wheeling clearances?",
    answer:
      "Statutory filing schedules depend on the operating state (such as GETCO in Gujarat, UPPCL in UP, or KPTCL in Karnataka). On average, our dedicated regulatory team secures bay allocation and CEIG safety clearance in 45 to 60 days.",
  },
  {
    id: "faq-5",
    category: "ppa",
    question: "Does Sarhat assist with Open Access PPA and project debt syndication?",
    answer:
      "Yes. We work closely with institutional clean energy financiers like IREDA, PFC, REC, and leading public sector banks to facilitate term loan debt syndication and structure group captive PPA agreements for commercial & industrial clients.",
  },
  {
    id: "faq-6",
    category: "solar",
    question: "What operations & maintenance (O&M) support does Sarhat offer after project commissioning?",
    answer:
      "We provide 24/7 remote SCADA telemetry monitoring, preventive panel maintenance, robotic module cleaning, thermal drone inspections, and rapid field dispatch to guarantee maximum annual PR (Performance Ratio) metrics.",
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "solar" | "bess" | "grid" | "ppa">("all");
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const filteredFaqs = activeCategory === "all"
    ? faqList
    : faqList.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-24 sm:py-28 bg-white relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8FAF8] border border-[#707B00]/30 text-[11px] font-bold text-[#707B00] uppercase tracking-widest mb-4 shadow-sm">
              <HelpCircle className="w-4 h-4 text-[#707B00]" />
              FREQUENTLY ASKED QUESTIONS
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-slate-900 leading-tight mb-4">
              Clear answers for <br />
              <span className="text-[#6DAD45] italic">your project execution.</span>
            </h2>

            <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
              Find technical details regarding Sarhat&apos;s EPC engineering scope, substation grid approvals, BESS energy storage, and statutory project clearances.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal direction="up" distance={30} delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: "all", label: "ALL QUESTIONS" },
              { id: "solar", label: "SOLAR EPC" },
              { id: "bess", label: "BESS & STORAGE" },
              { id: "grid", label: "SUBSTATIONS & GRID" },
              { id: "ppa", label: "PPA & FINANCING" },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                      : "bg-[#F8FAF8] text-slate-700 border border-slate-200/90 hover:border-[#707B00] hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Accordions List */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <ScrollReveal key={faq.id} delay={index * 0.05} direction={index % 2 === 0 ? "right" : "left"}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#F8FAF8] border-[#707B00]/60 shadow-xl shadow-slate-200/50"
                      : "bg-white border-slate-200/90 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-[#707B00]">
                        0{index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif-display font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "bg-[#D4E012] text-slate-900 rotate-180" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 sm:px-7 pt-0 text-slate-600 font-normal text-sm leading-relaxed border-t border-slate-200/60 mt-2">
                          <p className="pt-4">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Consultation Box */}
        <ScrollReveal direction="up" distance={30} delay={0.2}>
          <div className="max-w-2xl mx-auto mt-16 p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="text-left">
              <h4 className="text-sm font-bold font-serif-display text-white mb-1">
                Have a specific project question?
              </h4>
              <p className="text-xs text-slate-400">
                Speak directly with our senior EPC engineering team.
              </p>
            </div>
            <a
              href="#contact"
              className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-[#D4E012]/20"
            >
              <span>Get Answers</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
