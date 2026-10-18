"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricsTicker from "@/components/MetricsTicker";
import SolutionsGrid from "@/components/SolutionsGrid";
import ExecutionCurve from "@/components/ExecutionCurve";
import EPCCapabilities from "@/components/EPCCapabilities";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustedByLogos from "@/components/TrustedByLogos";
import FootprintMap from "@/components/FootprintMap";
import PeopleFirst from "@/components/PeopleFirst";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollFadeSection from "@/components/ScrollFadeSection";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const handleOpenQuote = () => {
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  // Performance optimization: when user scrolls past 1.05x viewport height,
  // hide the fixed hero completely to eliminate GPU compositor repainting & CPU load
  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > window.innerHeight * 1.05);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Navigation */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Fixed Hero Section (Pinned background layer while scrolling) */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${
            isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
          }`}
          aria-hidden={isPastHero}
        >
          <Hero onOpenQuote={handleOpenQuote} />
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* Main Content Sections (Slides UP over the fixed Hero layer) */}
        <div id="content" className="relative z-10">
          {/* Metrics Ticker (z-20 with dynamic opacity transition from 0 to 1 directly over Hero) */}
          <MetricsTicker />

          {/* Solid Porcelain Body that follows */}
          <div className="relative z-10 bg-[#F8FAF8]">
            {/* Soft Ambient Porcelain Flares */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
            <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

            {/* 01 / One-Halt EPC Capability (About Us) */}
            <ScrollFadeSection>
            <EPCCapabilities />
          </ScrollFadeSection>

          {/* 02 / Solutions Capabilities */}
          <ScrollFadeSection>
            <SolutionsGrid />
          </ScrollFadeSection>

          {/* 03 / The Curve of Execution (Portfolio) */}
          <ScrollFadeSection>
            <ExecutionCurve />
          </ScrollFadeSection>

          {/* 06 / Why Choose Us */}
          <ScrollFadeSection>
            <WhyChooseUs />
          </ScrollFadeSection>

          {/* 05 / Trusted By Industry Leaders Marquee */}
          <ScrollFadeSection>
            <TrustedByLogos />
          </ScrollFadeSection>

          {/* 05 / Pan-India Footprint Map (Footprints) */}
          <ScrollFadeSection>
            <FootprintMap />
          </ScrollFadeSection>

          {/* 07 / People First & Culture */}
          <ScrollFadeSection>
            <PeopleFirst />
          </ScrollFadeSection>

          {/* 08 / Client & Partner Testimonials */}
          <ScrollFadeSection>
            <TestimonialsSection />
          </ScrollFadeSection>

          {/* 09 / Frequently Asked Questions */}
          <ScrollFadeSection>
            <FAQSection />
          </ScrollFadeSection>

          {/* Final Call To Action */}
          <ScrollFadeSection>
            <FinalCTA onOpenQuote={handleOpenQuote} />
          </ScrollFadeSection>

          {/* Footer */}
          <Footer />
        </div>
      </div>

        {/* Consultation Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={handleCloseQuote} />
      </main>
    </SmoothScroll>
  );
}
