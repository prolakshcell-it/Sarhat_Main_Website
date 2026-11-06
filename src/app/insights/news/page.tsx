"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, Newspaper, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FinalCTA from "@/components/FinalCTA";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import FilterSearchBar from "@/components/content/FilterSearchBar";
import { newsArticles, NEWS_CATEGORIES } from "@/data/newsData";

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  // Featured article (first featured article or first article)
  const featuredArticle = useMemo(() => {
    return newsArticles.find((a) => a.featured) || newsArticles[0];
  }, []);

  // Filtered list
  const filteredNews = useMemo(() => {
    return newsArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.location && item.location.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const visibleArticles = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / HERO SECTION (Fixed background & Centered Content)      */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}
        >
          <section className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            {/* Cinematic Background Image Layer with Dynamic Zoom & Scrim */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full will-change-transform">
              <Image
                src="/images/ground-mounted-hero.jpg"
                alt="Sarhat solar and clean energy projects"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/75 pointer-events-none" />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#D4E012]/10 rounded-full blur-[130px] pointer-events-none" />
            </motion.div>

            {/* Main Centered Content */}
            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-28 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <div className="mb-6">
                  <AnimatedPillBadge>NEWS & ANNOUNCEMENTS</AnimatedPillBadge>
                </div>

                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.1] mb-6 text-center max-w-4xl [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)]">
                    Corporate Updates & <br />
                    <span className="italic font-normal text-[#D4E012] relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      Project Milestones
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-3 text-[#D4E012]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                      </svg>
                    </span>
                  </h1>

                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 font-normal max-w-2xl text-center leading-relaxed mb-8 [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
                      Stay informed on our latest utility-scale EPC project awards, grid interconnections, technology deployments, and company milestones.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all shadow-xl shadow-[#D4E012]/30 hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        Discuss a Project
                      </button>
                      <a
                        href="#news-content"
                        className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        Browse Updates
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Mouse Scroll Indicator */}
                <ScrollIndicator opacity={indicatorOpacity} targetId="#news-content" />
              </section>
            </div>

            {/* Scroll Spacer */}
            <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

            {/* ------------------------------------------------------------- */}
            {/* 02 / CONTENT SHEET (Overlapping white sheet)                  */}
            {/* ------------------------------------------------------------- */}
            <div id="news-content" className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)] pt-12 sm:pt-16 pb-16">
              {/* Featured News Banner */}
              {featuredArticle && !searchQuery && selectedCategory === "All" && (
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
                  <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Image side */}
                      <div className="relative lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden">
                        <Image
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          fill
                          priority
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-[#D4E012] font-mono text-xs font-semibold uppercase tracking-wider">
                          <Newspaper className="w-3.5 h-3.5" /> Featured Milestone
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-white to-slate-50/50">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                            <span className="px-2.5 py-1 rounded-md bg-[#6DAD45]/10 text-[#427124] font-semibold">
                              {featuredArticle.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {featuredArticle.date}
                            </span>
                            {featuredArticle.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {featuredArticle.location}
                              </span>
                            )}
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 group-hover:text-[#4f832e] transition-colors leading-snug">
                            <Link href={`/insights/news/${featuredArticle.slug}`}>
                              {featuredArticle.title}
                            </Link>
                          </h2>

                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                            {featuredArticle.summary}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{featuredArticle.readTime}</span>
                          </div>

                          <Link
                            href={`/insights/news/${featuredArticle.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] group-hover:text-[#4f832e] transition-colors"
                          >
                            <span>Read Full Update</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Filter and Search Bar Section */}
              <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
                <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                  <FilterSearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categories={NEWS_CATEGORIES}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    totalCount={newsArticles.length}
                    resultCount={filteredNews.length}
                    placeholder="Search announcements, locations, EPC projects..."
                  />
                </div>
              </section>

              {/* News Grid */}
              <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
                {filteredNews.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
                    <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-lg font-serif-display font-medium text-slate-800">
                      No announcements found
                    </h3>
                    <p className="text-sm text-slate-500">
                      We couldn&apos;t find any news articles matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;. Try adjusting your search or clearing filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                      View All News
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                      {visibleArticles.map((article, idx) => (
                        <motion.article
                          key={article.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35, delay: idx * 0.05 }}
                          className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            {/* Thumbnail */}
                            <Link
                              href={`/insights/news/${article.slug}`}
                              className="relative block h-52 sm:h-56 w-full overflow-hidden bg-slate-100"
                            >
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute top-3.5 left-3.5">
                                <span className="px-2.5 py-1 rounded-md bg-[#0F172A]/80 backdrop-blur-md text-white text-[11px] font-mono font-medium">
                                  {article.category}
                                </span>
                              </div>
                              {article.location && (
                                <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                                  <MapPin className="w-3 h-3 text-[#D4E012]" />
                                  <span>{article.location}</span>
                                </div>
                              )}
                            </Link>

                            {/* Text Content */}
                            <div className="p-6 sm:p-7 space-y-3">
                              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {article.date}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {article.readTime}
                                </span>
                              </div>

                              <h3 className="text-lg sm:text-xl font-serif-display font-medium text-slate-900 group-hover:text-[#4f832e] transition-colors leading-snug line-clamp-2">
                                <Link href={`/insights/news/${article.slug}`}>
                                  {article.title}
                                </Link>
                              </h3>

                              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                {article.summary}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="p-6 sm:p-7 pt-0 border-t border-slate-100/80 mt-4 flex items-center justify-between">
                            <span className="text-xs font-mono text-slate-500">
                              {article.author}
                            </span>
                            <Link
                              href={`/insights/news/${article.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-[#0F172A] group-hover:text-[#4f832e] transition-colors"
                            >
                              <span>Read More</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-300 rounded-2xl text-slate-900 hover:bg-slate-50 hover:border-slate-400 font-medium text-sm transition-all shadow-sm active:scale-95"
                    >
                      <span>Load More Announcements</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </section>

              {/* Final CTA */}
              <FinalCTA
                onOpenQuote={() => setIsQuoteOpen(true)}
                headline="Partner with Sarhat on"
                accent="your next energy landmark."
                description="From high-voltage substation switchyards and utility-scale solar parks to battery energy storage and open-access mandates, our EPC engineers are ready to build."
              />
            </div>

            <Footer />
            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
          </main>
        </SmoothScroll>
        );
}
