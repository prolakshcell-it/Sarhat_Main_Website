"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const handleOpenQuote = () => {
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

        {/* Navigation */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Sticky Hero Section (Static background while scrolling down) */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <Hero onOpenQuote={handleOpenQuote} />
        </div>

        {/* Main Content Sections (Slides UP over the static Hero image) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Metrics Ticker Bar */}
          <MetricsTicker />

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

        {/* Consultation Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={handleCloseQuote} />
      </main>
    </SmoothScroll>
  );
}
