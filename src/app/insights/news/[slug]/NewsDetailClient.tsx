"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FinalCTA from "@/components/FinalCTA";
import SmoothScroll from "@/components/SmoothScroll";
import SocialShareButtons from "@/components/content/SocialShareButtons";
import type { NewsItem } from "@/data/newsData";

interface NewsDetailClientProps {
  article: NewsItem;
  relatedArticles: NewsItem[];
}

export default function NewsDetailClient({
  article,
  relatedArticles,
}: NewsDetailClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F8FAF8] text-[#0F172A] font-sans-ui flex flex-col selection:bg-[#D4E012] selection:text-black">
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
              sizes="100vw"
            />
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
              <Link href="/insights/news" className="hover:text-white transition-colors">
                News & Updates
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
              {article.location && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-slate-200 backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#5EE72D]" />
                  {article.location}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white leading-[1.15] tracking-tight drop-shadow-md">
              {article.title}
            </h1>

            {/* Summary lead */}
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed border-l-4 border-[#D4E012] pl-4 sm:pl-6 py-1 max-w-4xl">
              {article.summary}
            </p>

            {/* Author & Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-[#D4E012] flex items-center justify-center font-serif font-bold text-sm">
                  SE
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {article.author}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Sarhat Energy Media & Investor Relations
                  </div>
                </div>
              </div>

              <SocialShareButtons title={article.title} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* MAIN ARTICLE BODY                                             */}
        {/* ------------------------------------------------------------- */}
        <main className="flex-grow py-12 sm:py-16">
          <article className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
            {/* Key Takeaways Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#D4E012] font-mono text-xs uppercase tracking-wider">
                    Strategic Highlights
                  </div>
                  <h3 className="text-xl font-serif-display font-medium text-white">
                    Key Takeaways & Delivery Parameters
                  </h3>
                  <ul className="space-y-3 pt-2">
                    {article.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200 font-light">
                        <CheckCircle2 className="w-5 h-5 text-[#5EE72D] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Article Paragraphs */}
            <div className="prose prose-slate max-w-none space-y-6 pt-2 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
              {article.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Press Contact / Media Box */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 my-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
                  <Building2 className="w-4 h-4 text-[#6DAD45]" />
                  <span>Media & Institutional Enquiries</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  For press interviews, high-resolution media kits, or technical EPC inquiries, reach our communications desk.
                </p>
              </div>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-mono font-medium rounded-xl transition-all shadow-sm shrink-0"
              >
                Contact Media Desk
              </button>
            </div>

            {/* Bottom Share & Back Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-6 border-t border-slate-200">
              <Link
                href="/insights/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to News & Updates</span>
              </Link>

              <SocialShareButtons title={article.title} />
            </div>
          </article>

          {/* Related News Section */}
          {relatedArticles.length > 0 && (
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16 border-t border-slate-200/80 pt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6DAD45] font-semibold">
                    Keep Reading
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 mt-1">
                    Related Announcements
                  </h2>
                </div>
                <Link
                  href="/insights/news"
                  className="text-xs sm:text-sm font-mono font-semibold text-slate-900 hover:text-[#6DAD45] flex items-center gap-1 transition-colors"
                >
                  <span>All Updates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        href={`/insights/news/${rel.slug}`}
                        className="relative block h-44 w-full overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                            {rel.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400">
                          {rel.date}
                        </div>
                        <h3 className="text-base font-serif-display font-medium text-slate-900 group-hover:text-[#4f832e] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/insights/news/${rel.slug}`}>
                            {rel.title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link
                        href={`/insights/news/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] group-hover:text-[#4f832e] transition-colors"
                      >
                        <span>Read Update</span>
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
            headline="Accelerate your renewable"
            accent="infrastructure roadmap."
            description="Our EPC project teams are ready to conduct feasibility, manage grid clearances, and execute high-yield clean energy assets across India."
          />
        </main>

        <Footer />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
