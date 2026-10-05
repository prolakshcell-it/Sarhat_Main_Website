"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PowerChain from "@/components/footer/PowerChain";

// Social Media Icons (SVG)
const SocialLinkedin = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const SocialTwitter = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialInstagram = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const SocialFacebook = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const SocialYoutube = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SOCIALS = [
  { href: "https://linkedin.com", label: "LinkedIn", Icon: SocialLinkedin },
  { href: "https://instagram.com", label: "Instagram", Icon: SocialInstagram },
  { href: "https://youtube.com", label: "YouTube", Icon: SocialYoutube },
  { href: "https://facebook.com", label: "Facebook", Icon: SocialFacebook },
  { href: "https://twitter.com", label: "Twitter / X", Icon: SocialTwitter },
];

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions#renewable-energy", label: "Solar & Wind Energy" },
      { href: "/solutions#bess-storage", label: "BESS & Storage" },
      { href: "/solutions#energy-infrastructure", label: "Substations & Grid" },
      {
        href: "/solutions#civil-infrastructure",
        label: "Civil Infrastructure",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Sarhat" },
      { href: "/about/our-story", label: "Our Story & Milestones" },
      { href: "/about/initiatives", label: "Sustainability" },
      { href: "/careers", label: "Careers & Life" },
      { href: "/insights", label: "Insights & News" },
    ],
  },
  {
    title: "Ecosystem & Network",
    links: [
      { href: "/projects", label: "Projects & Footprints" },
      { href: "/partners", label: "Partnership Programs" },
      { href: "/supply-partners", label: "Supply Partners & OEMs" },
      { href: "/execution-contractors", label: "Execution Contractors" },
    ],
  },
];

// phone: 2 + full-width row · tablet: 3 equal · lg: brand 3 + 3·3·3 · xl: brand 4 · gap · 2 · 2 · 3
const COLUMN_SPANS = ["lg:col-span-3 xl:col-span-2 xl:col-start-6", "lg:col-span-3 xl:col-span-2", "col-span-2 md:col-span-1 lg:col-span-3"];

const ROTATING_WORDS = ["SOLAR", "INFRA", "BESS", "AGRI", "LEISURE"];

/** Kept in its own component so the ticking word doesn't re-render the whole footer. */
function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative ml-0.5 inline-flex h-5 min-w-[55px] translate-y-1 items-center overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="block text-xs font-bold uppercase tracking-wider text-[#D4E012]"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-[#070C08] pt-16 pb-6 font-sans-ui text-white sm:pt-20">
      {/* Background image + glows (radial gradients instead of large blur filters: cheaper to paint) */}
      <div className="pointer-events-none absolute inset-0 opacity-15" aria-hidden>
        <Image src="/images/footer-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070C08] via-[#070C08]/85 to-[#070C08]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(600px 300px at 0% 100%, rgba(109,173,69,0.10), transparent 70%), radial-gradient(520px 260px at 100% 0%, rgba(212,224,18,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Links */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-10 sm:pb-12 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-8">
          {/* Brand: stacked on phones and desktop, two side-by-side blocks on tablets */}
          <div className="col-span-2 grid gap-6 md:col-span-3 md:grid-cols-2 md:gap-x-10 lg:col-span-3 lg:grid-cols-1 xl:col-span-4">
            <div className="space-y-5">
              <Link href="/" aria-label="Sarhat home" className="inline-flex select-none items-center">
                <Image src="/images/logo.png" alt="SARHAT" width={280} height={95} className="h-10 w-auto object-contain sm:h-11" />
                <span className="mx-1.5 inline-block h-2 w-2 shrink-0 translate-y-1 rounded-full bg-[#6DAD45] shadow-[0_0_10px_#6DAD45]" />
                <RotatingWord />
              </Link>

              <p className="max-w-sm text-sm font-light leading-relaxed text-slate-300">
                Engineering high-yield solar parks, utility-scale BESS storage, high-voltage substations, and resilient civil infrastructure across India.
              </p>
            </div>

            <div className="space-y-5 md:pt-2 lg:pt-0">
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a href="mailto:info@sarhatenergy.com" className="inline-flex items-center gap-2 transition-colors hover:text-[#D4E012]">
                    <Mail className="h-4 w-4 text-[#6DAD45]" />
                    info@sarhatenergy.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919266711125" className="inline-flex items-center gap-2 transition-colors hover:text-[#D4E012]">
                    <Phone className="h-4 w-4 text-[#6DAD45]" />
                    +91 9266 7111 25
                  </a>
                </li>
              </ul>

              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-[#6DAD45]">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>ISO 9001:2015 &amp; ISO 45001 CERTIFIED</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-9 sm:w-9 border border-white/10 bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-[#D4E012] hover:bg-[#D4E012] hover:text-black"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {COLUMNS.map((col, i) => (
            <nav key={col.title} aria-label={col.title} className={COLUMN_SPANS[i]}>
              <h4 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">{col.title}</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-[#D4E012]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[11px] leading-relaxed text-slate-400 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href="#" className="transition-colors hover:text-[#D4E012]">
              PRIVACY POLICY
            </a>
            <span className="hidden text-slate-700 sm:inline" aria-hidden>
              •
            </span>
            <a href="#" className="transition-colors hover:text-[#D4E012]">
              TERMS OF SERVICE
            </a>
            <span className="hidden text-slate-700 sm:inline" aria-hidden>
              •
            </span>
            <a href="#" className="transition-colors hover:text-[#D4E012]">
              COOKIE POLICY
            </a>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
            <span>© {year} SARHAT EPC PVT. LTD. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center justify-between gap-6">
              <span className="font-bold uppercase tracking-widest">
                Powered by <span className="font-extrabold text-white">PROLAKSH</span>
              </span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#D4E012] transition-colors hover:bg-[#D4E012] hover:text-black"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Plant → substation → transmission, closing the page */}
        <PowerChain className="-mx-4 mt-10 sm:mx-0" />
      </div>
    </footer>
  );
}
