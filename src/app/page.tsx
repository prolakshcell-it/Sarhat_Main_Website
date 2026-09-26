"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricsTicker from "@/components/MetricsTicker";
import SolutionsGrid from "@/components/SolutionsGrid";
import ExecutionCurve from "@/components/ExecutionCurve";
import ProjectIntelligence from "@/components/ProjectIntelligence";
import EPCCapabilities from "@/components/EPCCapabilities";
import FootprintMap from "@/components/FootprintMap";
import Partners from "@/components/Partners";
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
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-hidden font-sans-ui">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0"></div>

        {/* Navigation */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Hero Section */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* Metrics Ticker Bar */}
        <MetricsTicker />

        {/* 01 / Solutions Capabilities */}
        <ScrollFadeSection>
          <SolutionsGrid />
        </ScrollFadeSection>

        {/* 02 / The Curve of Execution (Portfolio) */}
        <ScrollFadeSection>
          <ExecutionCurve />
        </ScrollFadeSection>

        {/* 03 / Smart Project Intelligence Screening Tool */}
        <ScrollFadeSection>
          <ProjectIntelligence />
        </ScrollFadeSection>

        {/* 04 / One-Halt EPC Capability */}
        <ScrollFadeSection>
          <EPCCapabilities />
        </ScrollFadeSection>

        {/* 05 / Pan-India Footprint Map (Footprints) */}
        <ScrollFadeSection>
          <FootprintMap />
        </ScrollFadeSection>

        {/* 06 / Strategic Partners & Ecosystem */}
        <ScrollFadeSection>
          <Partners />
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

        {/* Consultation Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={handleCloseQuote} />
      </main>
    </SmoothScroll>
  );
}
