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
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";


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
      <main className="min-h-screen bg-black text-white selection:bg-[#6DAD45] selection:text-black relative">
        {/* Interactive Fluid Canvas Gradient Background across Full Home Page */}

        {/* Navigation */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Hero Section */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* Metrics Ticker Bar */}
        <MetricsTicker />

        {/* 01 / Solutions Capabilities */}
        <SolutionsGrid />

        {/* 02 / The Curve of Execution (Portfolio) */}
        <ExecutionCurve />

        {/* 03 / Smart Project Intelligence Screening Tool */}
        <ProjectIntelligence />

        {/* 04 / One-Halt EPC Capability */}
        <EPCCapabilities />

        {/* 05 / Pan-India Footprint Map (Footprints) */}
        <FootprintMap />

        {/* 06 / Strategic Partners & Ecosystem */}
        <Partners />

        {/* 07 / People First & Culture */}
        <PeopleFirst />

        {/* Final Call To Action */}
        <FinalCTA onOpenQuote={handleOpenQuote} />

        {/* Footer */}
        <Footer />

        {/* Consultation Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={handleCloseQuote} />
      </main>
    </SmoothScroll>
  );
}
