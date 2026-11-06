"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Quote,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FinalCTA from "@/components/FinalCTA";
import SmoothScroll from "@/components/SmoothScroll";
import SocialShareButtons from "@/components/content/SocialShareButtons";
import type { ArticleItem } from "@/data/articlesData";

interface ArticleDetailClientProps {
  article: ArticleItem;
  relatedArticles: ArticleItem[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
}: ArticleDetailClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    article.tableOfContents[0]?.id || ""
  );

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of article.tableOfContents) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos>= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.tableOfContents]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F8FAF8] text-[#0F172A] font-sans-ui flex flex-col selection:bg-[#D4E012] selection:text-black relative">
        {/* Top Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4E012] via-[#6DAD45] to-[#5EE72D] origin-left z-50 pointer-events-none"
          style={{ scaleX }} />

        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* CINEMATIC HERO SECTION WITH BACKGROUND IMAGE                  */}
        {/* ------------------------------------------------------------- */}
        <section className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-16 sm:pb-20 text-white">
          {/* Background Image Layer with Scrim */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              quality={90}
              className="object-cover object-center opacity-40 scale-105"
              sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950 pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4E012]/10 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-300 overflow-x-auto whitespace-nowrap py-1">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link href="/insights" className="hover:text-white transition-colors">
                Insights
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link href="/insights/articles" className="hover:text-white transition-colors">
                Articles
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-[#D4E012] font-semibold truncate max-w-[200px] sm:max-w-xs">
                {article.title}
              </span>
            </nav>

            {/* Category & Meta pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-[#6DAD45] text-white font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-[#D4E012]" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#D4E012]" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white leading-[1.15] tracking-tight drop-shadow-md">
              {article.title}
            </h1>

            {/* Summary lead */}
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed border-l-4 border-[#D4E012] pl-4 sm:pl-6 py-1 max-w-4xl">
              {article.excerpt}
            </p>

            {/* Author & Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-[#D4E012] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <SocialShareButtons title={article.title} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* MAIN BODY                                                     */}
        {/* ------------------------------------------------------------- */}
        <main className="flex-grow py-12 sm:py-16">
          <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            {/* Mobile Quick Table of Contents Dropdown */}
            <div className="lg:hidden mb-8 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                <span className="flex items-center gap-2">
                  <List className="w-4 h-4 text-[#6DAD45]" />
                  <span>Table of Contents ({article.tableOfContents.length})</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileTocOpen ? "rotate-180" : ""
                  }`} />
              </button>
              {mobileTocOpen && (
                <nav className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                  {article.tableOfContents.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setMobileTocOpen(false);
                      }}
                      className="w-full text-left text-xs font-mono py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                      <span className="text-slate-400">0{idx + 1}.</span>
                      <span className="truncate">{item.title}</span>
                    </button>
                  ))}
                </nav>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Sticky Table of Contents (Desktop) */}
              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-28 space-y-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold border-b border-slate-100 pb-3">
                    <List className="w-4 h-4 text-[#6DAD45]" />
                    <span>Table of Contents</span>
                  </div>

                  <nav className="space-y-2">
                    {article.tableOfContents.map((item, idx) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left text-xs font-mono py-2 px-3 rounded-xl transition-all flex items-start gap-2.5 ${isActive
                            ? "bg-[#6DAD45]/15 text-[#3b6820] font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}>
                          <span className="text-[11px] text-slate-400 mt-0.5">
                            0{idx + 1}.
                          </span>
                          <span className="line-clamp-2 leading-relaxed">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Consultation Promo Card */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 text-xs">
                      <div className="font-semibold text-[#D4E012]">
                        Need this engineering architecture?
                      </div>
                      <p className="text-slate-300 text-[11px] font-light leading-relaxed">
                        Connect with our electrical & substation engineering team for site-specific SLDs and simulations.
                      </p>
                      <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="w-full mt-2 py-2 bg-[#6DAD45] hover:bg-[#5da037] text-white rounded-lg font-mono font-medium text-[11px] transition-colors">
                        Consult Engineers &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Article Body */}
              <div className="lg:col-span-8 space-y-12">
                {article.sections.map((section, sIdx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-xs font-bold">
                        0{sIdx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 tracking-tight">
                        {section.heading}
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-700 leading-relaxed font-light text-base sm:text-lg">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Editorial Callout / Quote */}
                    {section.callout && (
                      <div className="my-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
                        <div className="absolute top-2 right-4 text-white/5 pointer-events-none">
                          <Quote className="w-24 h-24" />
                        </div>
                        <div className="relative z-10 space-y-3">
                          <p className="text-base sm:text-lg font-serif-display italic text-[#D4E012] leading-relaxed">
                            &ldquo;{section.callout.quote}&rdquo;
                          </p>
                          {section.callout.author && (
                            <div className="text-xs font-mono text-slate-300">
                              — {section.callout.author}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bullet List */}
                    {section.bulletList && section.bulletList.length> 0 && (
                      <div className="my-6 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <ul className="space-y-3">
                          {section.bulletList.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-light">
                              <CheckCircle className="w-5 h-5 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}

                {/* Article Footer & Navigation */}
                <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href="/insights/articles"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Articles</span>
                  </Link>

                  <SocialShareButtons title={article.title} />
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length> 0 && (
            <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-16 border-t border-slate-200/80 pt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6DAD45] font-semibold">
                    Technical Knowledge Base
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 mt-1">
                    Related Whitepapers & Articles
                  </h2>
                </div>
                <Link
                  href="/insights/articles"
                  className="text-xs sm:text-sm font-mono font-semibold text-slate-900 hover:text-[#6DAD45] flex items-center gap-1 transition-colors">
                  <span>All Whitepapers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/insights/articles/${rel.slug}`}
                        className="relative block h-44 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                            {rel.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400">
                          {rel.author.name} • {rel.readTime}
                        </div>
                        <h3 className="text-base font-serif-display font-medium text-slate-900 group-hover:text-[#4f832e] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/insights/articles/${rel.slug}`}>
                            {rel.title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link
                        href={`/insights/articles/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] group-hover:text-[#4f832e] transition-colors">
                        <span>Read Whitepaper</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Final CTA */}
          <FinalCTA
            onOpenQuote={() => setIsQuoteOpen(true)}
            headline="Engineer your clean power"
            accent="infrastructure with precision."
            description="Our EPC engineering team delivers comprehensive feasibility, single-line diagrams, substation layouts, and turnkey asset delivery across India." />
        </main>

        <Footer />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
