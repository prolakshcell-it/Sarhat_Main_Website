"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Shield } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("sarhat_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("sarhat_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("sarhat_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-md z-50 bg-[#0B120B]/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-5 shadow-2xl shadow-black/80 font-sans-ui text-white select-none"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4E012]/15 border border-[#D4E012]/30 flex items-center justify-center shrink-0 text-[#D4E012]">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Cookie &amp; Privacy Preferences
              </h3>
              <p className="text-[11px] font-mono text-[#6DAD45] uppercase tracking-wider">
                SARHAT EPC DATA SECURITY
              </p>
            </div>
          </div>
          <button
            onClick={handleAcceptEssential}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          We use cookies to enhance navigation, analyze site traffic, and optimize your experience on Sarhat EPC platform. Read our{" "}
          <Link href="#" className="text-[#D4E012] underline underline-offset-2 hover:text-white font-medium">
            Cookie Policy
          </Link>{" "}
          for more details.
        </p>

        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800">
          <button
            onClick={handleAcceptAll}
            className="flex-1 bg-gradient-to-r from-[#D4E012] to-[#6DAD45] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4 text-black stroke-[3]" />
            <span>Accept All</span>
          </button>
          <button
            onClick={handleAcceptEssential}
            className="flex-1 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Essential Only</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
