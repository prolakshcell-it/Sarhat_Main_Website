"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs: FAQItem[];
  openIndex: number | null;
  onToggle: (idx: number) => void;
}

export default function ProductFAQ({ faqs, openIndex, onToggle }: ProductFAQProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <ScrollReveal key={idx} delay={Math.min(idx * 0.05, 0.2)} direction="up">
            <div
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[#F8FAF8] border-[#707B00]/60 shadow-xl shadow-slate-200/50"
                  : "bg-white border-slate-200/90 hover:border-slate-300 shadow-sm"
              }`}>
              <button
                type="button"
                onClick={() => onToggle(idx)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-sans-inter tabular-nums font-bold text-[#707B00]">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif-display font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "bg-[#D4E012] text-slate-900 rotate-180"
                      : "bg-slate-100 text-slate-500"
                  }`}>
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
                    className="overflow-hidden">
                    <div className="px-6 pb-7 sm:px-7 pt-0 text-slate-600 font-normal text-sm sm:text-base leading-relaxed border-t border-slate-200/60 mt-2">
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
  );
}

