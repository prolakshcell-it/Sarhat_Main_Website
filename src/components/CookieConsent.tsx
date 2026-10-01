"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Lock } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "sarhat_cookie_consent";

type Prefs = { functional: boolean; analytics: boolean; marketing: boolean };
type CategoryKey = "necessary" | keyof Prefs;

const CATEGORIES: { key: CategoryKey; title: string; desc: string }[] = [
  {
    key: "necessary",
    title: "Strictly Necessary Cookies",
    desc: "These cookies are required for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or navigating between pages.",
  },
  {
    key: "functional",
    title: "Functional Cookies",
    desc: "These cookies enable enhanced functionality and personalization, such as remembering your preferences. If you do not allow them, some features may not work properly.",
  },
  {
    key: "analytics",
    title: "Analytics Cookies",
    desc: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are most and least popular.",
  },
  {
    key: "marketing",
    title: "Marketing Cookies",
    desc: "These cookies may be set by us or our partners to build a profile of your interests and show you relevant content. They measure the effectiveness of our campaigns.",
  },
];

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#6DAD45]" : "bg-slate-300"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [active, setActive] = useState<CategoryKey>("necessary");
  const [prefs, setPrefs] = useState<Prefs>({
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowSettings(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSettings]);

  const notify = (choice: "all" | "custom", preferences: Record<string, boolean>) => {
    fetch("/api/cookie-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice, preferences, page: window.location.href }),
      keepalive: true,
    }).catch(() => {});
  };

  const save = (value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setShowSettings(false);
    setIsVisible(false);
  };

  const handleAllowAll = () => {
    save("all");
    notify("all", { necessary: true, functional: true, analytics: true, marketing: true });
  };
  const handleDecline = () => save("essential");
  const handleConfirm = () => {
    const all = { necessary: true, ...prefs };
    save(JSON.stringify(all));
    if (prefs.functional || prefs.analytics || prefs.marketing) notify("custom", all);
  };

  const btnBase =
    "cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B120B]";

  const current = CATEGORIES.find((c) => c.key === active)!;
  const locked = current.key === "necessary";

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="dialog"
            aria-label="Cookie consent"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#D4E012] bg-[#0B120B]/97 font-sans-ui text-white shadow-[0_-12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4E012]/30 bg-[#D4E012]/15 text-[#D4E012]">
                  <Cookie className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-slate-200">
                  <span className="font-bold text-white">We value your privacy. </span>
                  We use cookies to improve your journey and personalize your experience on the
                  Sarhat EPC website. By continuing to use this site, you accept our{" "}
                  <Link
                    href="#"
                    className="font-semibold text-[#D4E012] underline underline-offset-2 hover:text-white"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className={`${btnBase} border border-white/25 text-white hover:border-[#D4E012] hover:text-[#D4E012]`}
                >
                  Cookie Settings
                </button>
                <button
                  onClick={handleAllowAll}
                  className={`${btnBase} bg-gradient-to-r from-[#D4E012] to-[#6DAD45] text-black shadow-md hover:brightness-110`}
                >
                  Allow All Cookies
                </button>
                <button
                  onClick={handleDecline}
                  className={`${btnBase} bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white`}
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && showSettings && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Cookie settings"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white font-sans-ui text-slate-800 shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-center justify-between bg-[#0B120B] px-5 py-4 text-white sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4E012]/15 text-[#D4E012]">
                    <Cookie className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Privacy Preference Center</h2>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#6DAD45]">
                      Sarhat EPC
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  aria-label="Close cookie settings"
                  className="cursor-pointer rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto sm:flex-row sm:overflow-hidden">
                <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 p-2 sm:w-60 sm:flex-col sm:overflow-y-auto sm:border-r sm:border-b-0">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setActive(c.key)}
                      className={`cursor-pointer whitespace-nowrap rounded-lg border-l-4 px-3 py-2.5 text-left text-sm font-semibold transition-colors sm:whitespace-normal ${
                        active === c.key
                          ? "border-[#6DAD45] bg-white text-[#0B120B] shadow-sm"
                          : "border-transparent text-slate-600 hover:bg-white/70"
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-5 sm:overflow-y-auto sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-[#0B120B]">{current.title}</h3>
                    {locked ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#6DAD45]">
                        <Lock className="h-3.5 w-3.5" /> Always Active
                      </span>
                    ) : (
                      <Toggle
                        checked={prefs[current.key as keyof Prefs]}
                        label={current.title}
                        onChange={() =>
                          setPrefs((p) => ({
                            ...p,
                            [current.key]: !p[current.key as keyof Prefs],
                          }))
                        }
                      />
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{current.desc}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  onClick={handleDecline}
                  className={`${btnBase} border border-slate-300 bg-white text-slate-700 hover:border-slate-500`}
                >
                  Reject All
                </button>
                <button
                  onClick={handleConfirm}
                  className={`${btnBase} border border-[#0B120B] bg-[#0B120B] text-white hover:bg-[#1a2a1a]`}
                >
                  Confirm My Choices
                </button>
                <button
                  onClick={handleAllowAll}
                  className={`${btnBase} bg-gradient-to-r from-[#D4E012] to-[#6DAD45] text-black shadow-md hover:brightness-110`}
                >
                  Allow All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
