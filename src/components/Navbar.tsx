"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  FolderKanban,
  MapPin,
  Truck,
  Wrench,
  Handshake,
  Sun,
  Battery,
  Zap,
  Building2,
  Target,
  Sparkles,
  Users,
  Award,
  Share2,
  Globe,
  MessageSquare,
  Leaf,
  Sprout,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Social Media SVG Components
const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface NavbarProps {
  onOpenQuote: () => void;
}

interface MegaSubItem {
  id: string;
  title: string;
  headline: string;
  description: string;
  specs: string[];
  icon: any;
  href: string;
}

interface MegaMenuData {
  tag: string;
  items: MegaSubItem[];
  bottomText: string;
  bottomCtaText: string;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"solutions" | "projects" | "partners" | "about" | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Mobile Accordion states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobilePartnersOpen, setMobilePartnersOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const rotatingWords = ["SOLAR", "INFRA", "BESS", "AGRI", "LEISURE"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Mega Menu Content Definition matching website color palette & exact layout
  const megaMenuData: Record<"solutions" | "projects" | "partners" | "about", MegaMenuData> = {
    solutions: {
      tag: "SERVICES & CAPABILITIES",
      bottomText: "From design and procurement to EPCM, PMC, and long-term asset O&M.",
      bottomCtaText: "Discuss a project",
      items: [
        {
          id: "renewable-energy",
          title: "Renewable Energy",
          headline: "Solar Parks, Rooftop & Wind",
          description:
            "Providing precision technical blueprints, turnkey EPC execution, and long-term asset management for utility-scale solar parks, commercial & industrial rooftop installations, and wind energy farms.",
          specs: ["Solar Parks", "Rooftop & C&I", "Comprehensive O&M", "Wind Farms"],
          icon: Sun,
          href: "/solutions",
        },
        {
          id: "bess-storage",
          title: "BESS & Storage",
          headline: "Energy Storage Solutions",
          description:
            "Utility-scale containerized Battery Energy Storage Systems (BESS), solar + storage hybrid integration, emergency backup power, and peak-load shaving to optimize power dispatch.",
          specs: ["Containerized BESS", "Solar + Storage Hybrids", "Backup Power", "Peak-Load Shaving"],
          icon: Battery,
          href: "/solutions",
        },
        {
          id: "energy-infrastructure",
          title: "Energy Infrastructure",
          headline: "Substations & Grid Connectivity",
          description:
            "High-voltage and low-voltage electrical systems, AIS/GIS substations, power evacuation line corridors, relay protection SCADA, and seamless DISCOM grid connectivity.",
          specs: ["HT/LT Systems", "Substations (GIS/AIS)", "Evacuation Lines", "Protection & SCADA"],
          icon: Zap,
          href: "/solutions",
        },
        {
          id: "civil-infrastructure",
          title: "Civil Infrastructure",
          headline: "Industrial Civil & Foundations",
          description:
            "Heavy-payload access roads, control room buildings, structural equipment foundations, industrial civil works, and comprehensive project site infrastructure.",
          specs: ["Access Roads", "Buildings & Control Rooms", "Equipment Foundations", "Industrial Civil"],
          icon: Building2,
          href: "/solutions",
        },
      ],
    },
    projects: {
      tag: "EXECUTION & FOOTPRINTS",
      bottomText: "Over 250+ MW of solar and energy infrastructure delivered with 100% execution discipline.",
      bottomCtaText: "Discuss a project",
      items: [
        {
          id: "national-portfolio",
          title: "National Portfolio",
          headline: "Utility Solar & Storage Projects",
          description:
            "Delivered utility-scale solar power plants, EHV grid substations, BESS storage reserves, and PM-KUSUM agrivoltaics installed across India.",
          specs: ["250+ MW Capacity", "Utility Scale", "PM-KUSUM Agrivoltaics", "Turnkey EPC"],
          icon: FolderKanban,
          href: "/projects",
        },
        {
          id: "regional-footprints",
          title: "Geographical Footprints",
          headline: "Pan-India Regional State Hubs",
          description:
            "Interactive state-by-state execution footprints spanning Uttar Pradesh, Rajasthan, Gujarat, Maharashtra, Madhya Pradesh, and Bihar.",
          specs: ["8+ Key States", "DISCOM Approvals", "Local Site Control", "Regional Logistics"],
          icon: MapPin,
          href: "/projects#footprint",
        },
        {
          id: "ehv-substations",
          title: "EHV Substation Corridors",
          headline: "Grid Evacuation & Substation Bays",
          description:
            "Extra High Voltage 220kV and 132kV grid bay allocations, transmission corridors, and DISCOM power evacuation readiness.",
          specs: ["220 kV Corridors", "AIS & GIS Substations", "SCADA Integration", "Grid Compliance"],
          icon: Zap,
          href: "/projects",
        },
        {
          id: "state-hubs",
          title: "State Portfolio Pages",
          headline: "Regional Energy Project Hubs",
          description:
            "Dedicated state project portfolios detailing nodal DISCOMs, installed capacities, and site deliverables for each state.",
          specs: ["Uttar Pradesh Hub", "Rajasthan Hub", "Gujarat Hub", "Madhya Pradesh Hub"],
          icon: Building2,
          href: "/projects/uttar-pradesh",
        },
      ],
    },
    partners: {
      tag: "PARTNERSHIP PROGRAMS",
      bottomText: "Empowering partners, contractors, and suppliers to grow alongside India's solar market.",
      bottomCtaText: "Become a partner",
      items: [
        {
          id: "solar-sales-partner",
          title: "Solar Sales Partner",
          headline: "Earn Commissions on Solar Leads",
          description:
            "Ideal for entrepreneurs, real estate consultants, and networkers. You identify prospects and generate leads while Sarhat handles site surveys, design, installation, and backend execution.",
          specs: ["High Commission Payouts", "Zero Technical Requirement", "Marketing Toolkits", "Direct Payouts"],
          icon: Handshake,
          href: "/partners",
        },
        {
          id: "solar-project-partner",
          title: "Solar Project Partner",
          headline: "Co-Execute Projects with Sarhat",
          description:
            "Designed for electrical contractors, civil engineers, and EPC firms to co-execute solar installations backed by Sarhat's engineering and shared procurement rates.",
          specs: ["Co-Execution Model", "Engineering Blueprints", "Shared Procurement Rates", "Quality Oversight"],
          icon: Wrench,
          href: "/partners#partner-types",
        },
        {
          id: "supply-partner",
          title: "Supply Partner (OEMs)",
          headline: "Tier-1 Vendors & Material Suppliers",
          description:
            "High-volume procurement contracts for module OEMs, inverter manufacturers, cable suppliers, transformers, and electrical equipment vendors.",
          specs: ["Tier-1 Suppliers", "High Volume Procurement", "Transparent Onboarding", "Prompt Payout Cycles"],
          icon: Truck,
          href: "/partners#partner-types",
        },
        {
          id: "execution-contractors",
          title: "Execution Contractors",
          headline: "Civil & Electrical Erection Teams",
          description:
            "Join Sarhat's empanelled vendor network for piling, structural erection, AC/DC cabling, and substation civil works.",
          specs: ["Empanelled Contractors", "Pan-India Projects", "Safety Compliance", "Long-Term Contracts"],
          icon: FolderKanban,
          href: "/partners#apply",
        },
      ],
    },
    about: {
      tag: "ABOUT SARHAT",
      bottomText:
        "Sarhat is an execution-led energy and infrastructure company rooted in India, with the ambition to earn trust globally. Engineering discipline, hands-on delivery and continuous learning shape our work. Safety, unity and ownership guide every project.",
      bottomCtaText: "Discuss a project",
      items: [
        {
          id: "our-story",
          title: "Our Story",
          headline: "Building Clean Energy Infrastructure",
          description:
            "Sarhat's journey from foundation to a leading 250+ MW energy and infrastructure delivery company in India.",
          specs: ["Founded in India", "250+ MW Delivered", "Global Ambition", "Utility Infrastructure"],
          icon: Target,
          href: "/about/our-story",
        },
        {
          id: "our-approach",
          title: "Our Approach",
          headline: "Discipline, Delivery & Learning",
          description:
            "Exhaustive technical rigor, 24/7 resident site management, and continuous technology feedback loops.",
          specs: ["Engineering Rigor", "Hands-on Delivery", "Continuous Learning", "Zero Incident Mandate"],
          icon: Wrench,
          href: "/about/our-approach",
        },
        {
          id: "initiatives",
          title: "Initiatives Overview",
          headline: "Net Zero, AgroVoltaics & Field Exchange",
          description:
            "Strategic sustainability frameworks driving enterprise decarbonization, dual-use farming, and community empowerment.",
          specs: ["Net Zero", "AgroVoltaics", "Field Exchange", "Community Impact"],
          icon: Sparkles,
          href: "/about/initiatives",
        },
        {
          id: "net-zero",
          title: "Net Zero",
          headline: "Net Zero Infrastructure Initiative",
          description:
            "Turning corporate campuses carbon-neutral through solar PPAs, BESS storage reserves, and Scope 1 & 2 emissions reduction.",
          specs: ["Corporate PPAs", "24/7 BESS Storage", "Scope 1 & 2 Reduction", "Carbon Credits"],
          icon: Leaf,
          href: "/about/initiatives/net-zero",
        },
        {
          id: "agrovoltaics",
          title: "AgroVoltaics",
          headline: "AgroVoltaics (PM-KUSUM) Initiative",
          description:
            "Elevated dual-use solar mounting structures harvesting clean power above active farmlands while boosting farmer income.",
          specs: ["Elevated MMS (2.5m+)", "PM-KUSUM Program", "Dual Farmer Income", "Micro-Irrigation"],
          icon: Sprout,
          href: "/about/initiatives/agrovoltaics",
        },
        {
          id: "field-exchange",
          title: "Field Exchange",
          headline: "Field Exchange Program",
          description:
            "Community-driven knowledge transfer and technical skill upskilling for local engineers and technicians on project sites.",
          specs: ["Electrical Safety", "Relay Protection", "Workforce Upskilling", "1,500+ Trained"],
          icon: GraduationCap,
          href: "/about/initiatives/field-exchange",
        },
        {
          id: "culture-people",
          title: "Culture & People",
          headline: "Safety, Unity and Ownership",
          description:
            "A workplace built on radical accountability, zero-compromise safety standards, and shared execution pride.",
          specs: ["Safety First", "One Team Unity", "Radical Ownership", "Empowered Workforce"],
          icon: Users,
          href: "/about/culture-people",
        },
        {
          id: "leadership",
          title: "Leadership",
          headline: "Decades of Energy Excellence",
          description:
            "Executive leadership bringing over 150+ cumulative years of utility power, financial governance, and infrastructure mastery.",
          specs: ["35+ Yrs Leadership", "CFO Governance", "EPC Operations", "Strategic Growth"],
          icon: Award,
          href: "/about/leadership",
        },
        {
          id: "connect-with-us",
          title: "Connect With Us",
          headline: "Social Media & Official Channels",
          description:
            "Follow Sarhat across LinkedIn, Twitter/X, YouTube, and Instagram for project updates, site videos, and news.",
          specs: ["LinkedIn", "Twitter/X", "YouTube", "Instagram"],
          icon: Share2,
          href: "/about/connect",
        },
      ],
    },
  };

  const handleDropdownOpen = (menuKey: "solutions" | "projects" | "partners" | "about") => {
    setActiveDropdown(menuKey);
    setActiveItemIndex(0);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
    setActiveItemIndex(0);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans-ui"
      onMouseLeave={handleDropdownClose}
    >
      {/* Top Sub-Bar (Solid Black Utility Header) */}
      <div className="bg-black text-slate-200 py-1.5 select-none relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-[10px] sm:text-[11px] tracking-wider uppercase flex justify-between items-center">
          <div className="flex items-center gap-2 uppercase tracking-[0.18em] text-slate-200 font-semibold text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#D4E012] inline-block animate-pulse shadow-[0_0_8px_#D4E012]"></span>
            <span>अक्षय ऊर्जा • सुदृढ़ आधारभूत संरचना</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-200">
            <Link href="/careers" className="hover:text-[#D4E012] transition-colors uppercase">
              CAREERS
            </Link>
            <Link href="/contact" className="hover:text-[#D4E012] transition-colors uppercase">
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 relative z-50 ${
          scrolled
            ? "bg-black/95 py-3 shadow-2xl backdrop-blur-xl border-b border-neutral-900/40"
            : "bg-black/40 backdrop-blur-md py-3.5 border-b border-white/5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Brand Logo with Dynamic Rotating Words (Left Aligned) */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center group shrink-0 select-none">
              <div className="text-xl sm:text-2xl font-black tracking-tighter text-white flex items-center leading-none">
                <Image
                  src="/images/logo.png"
                  alt="SARHAT"
                  width={260}
                  height={88}
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  priority
                />
                <span className="w-2 h-2 rounded-full bg-[#D4E012] inline-block mx-1.5 shrink-0 self-center translate-y-1 sm:translate-y-2 group-hover:scale-125 transition-transform shadow-[0_0_10px_#D4E012]"></span>

                {/* Continuous Animated Vertical Text Ticker for Logo Words */}
                <div className="h-5 overflow-hidden inline-flex items-center ml-0.5 min-w-[50px] sm:min-w-[65px] relative translate-y-1 sm:translate-y-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ y: 12, opacity: 0, filter: "blur(3px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -12, opacity: 0, filter: "blur(3px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-[#D4E012]"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Center Aligned) */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 text-[11px] sm:text-[12px] uppercase font-bold tracking-widest text-slate-100">
            {/* 1. SOLUTIONS (Dropdown) */}
            <div
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => handleDropdownOpen("solutions")}
            >
              <Link
                href="/solutions"
                className="flex items-center gap-1.5 hover:text-[#D4E012] transition-colors duration-200 whitespace-nowrap"
              >
                <span>SOLUTIONS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "solutions" ? "rotate-180 text-[#D4E012]" : ""
                  }`}
                />
              </Link>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D4E012] transition-all duration-300 ${
                  activeDropdown === "solutions" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </div>

            {/* 2. PROJECTS (Dropdown) */}
            <div
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => handleDropdownOpen("projects")}
            >
              <Link
                href="/projects"
                className="flex items-center gap-1.5 hover:text-[#D4E012] transition-colors duration-200 whitespace-nowrap"
              >
                <span>PROJECTS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "projects" ? "rotate-180 text-[#D4E012]" : ""
                  }`}
                />
              </Link>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D4E012] transition-all duration-300 ${
                  activeDropdown === "projects" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </div>

            {/* 3. PARTNERS (Dropdown) */}
            <div
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => handleDropdownOpen("partners")}
            >
              <Link
                href="/partners"
                className="flex items-center gap-1.5 hover:text-[#D4E012] transition-colors duration-200 whitespace-nowrap"
              >
                <span>PARTNERS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "partners" ? "rotate-180 text-[#D4E012]" : ""
                  }`}
                />
              </Link>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D4E012] transition-all duration-300 ${
                  activeDropdown === "partners" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </div>

            {/* 4. INSIGHTS */}
            <Link
              href="/insights"
              className="relative py-2 hover:text-[#D4E012] transition-colors duration-200 group whitespace-nowrap"
            >
              INSIGHTS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* 5. ABOUT (Dropdown) */}
            <div
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => handleDropdownOpen("about")}
            >
              <Link
                href="/about"
                className="flex items-center gap-1.5 hover:text-[#D4E012] transition-colors duration-200 whitespace-nowrap"
              >
                <span>ABOUT</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "about" ? "rotate-180 text-[#D4E012]" : ""
                  }`}
                />
              </Link>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D4E012] transition-all duration-300 ${
                  activeDropdown === "about" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </div>
          </nav>

          {/* CTA Button & Mobile Menu Toggle (Right Aligned) */}
          <div className="flex items-center justify-end gap-4 shrink-0">
            <button
              onClick={onOpenQuote}
              className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-[#D4E012]/30 transform hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              DISCUSS A PROJECT
            </button>

            {/* Mobile / Tablet Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden text-zinc-200 hover:text-white p-2 rounded-lg bg-zinc-900/90 border border-white/15 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#5EE72D]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP MEGA MENU DRAWER OVERLAY (EXPANDED WIDTH FOR ABOUT) */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={handleDropdownClose}
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[92vw] ${
                activeDropdown === "about" ? "max-w-[940px]" : "max-w-[860px]"
              } bg-slate-950/98 border border-slate-800/90 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-4 sm:p-5 backdrop-blur-3xl z-50 text-white overflow-hidden select-none`}
            >
              {/* Top Tag Header */}
              <div className="flex items-center gap-2 text-[11px] font-mono font-extrabold text-[#D4E012] uppercase tracking-[0.2em] mb-3.5 border-b border-slate-800/80 pb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D4E012] animate-ping shadow-[0_0_8px_#D4E012]"></span>
                <span>{megaMenuData[activeDropdown].tag}</span>
              </div>

              {/* Main 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Column: Stacked List of Subsection Items */}
                <div
                  className="lg:col-span-5 space-y-1.5 max-h-[420px] overflow-y-auto overscroll-contain custom-scrollbar pr-2 font-sans-ui"
                  data-lenis-prevent="true"
                  data-lenis-prevent-scroll="true"
                >
                  {megaMenuData[activeDropdown].items.map((item, index) => {
                    const IconComp = item.icon;
                    const isSelected = activeItemIndex === index;
                    const isSubheading = item.id === "net-zero" || item.id === "agrovoltaics" || item.id === "field-exchange";
                    const isInitiativesActive = activeItemIndex >= 2 && activeItemIndex <= 5;

                    // Hide subheadings unless Initiatives or one of its subheadings is hovered
                    if (isSubheading && !isInitiativesActive) {
                      return null;
                    }

                    // Specific color badge for subheadings
                    let subheadStyle = "text-[#D4E012] bg-slate-950/90 border-slate-800/80";
                    if (item.id === "net-zero") subheadStyle = "text-emerald-400 bg-emerald-950/40 border-emerald-500/30";
                    if (item.id === "agrovoltaics") subheadStyle = "text-amber-400 bg-amber-950/40 border-amber-500/30";
                    if (item.id === "field-exchange") subheadStyle = "text-sky-400 bg-sky-950/40 border-sky-500/30";

                    return (
                      <motion.div
                        key={item.id}
                        initial={isSubheading ? { opacity: 0, y: -4 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Link
                          href={item.href}
                          onMouseEnter={() => setActiveItemIndex(index)}
                          onClick={handleDropdownClose}
                          className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                            isSubheading ? `ml-4 py-2 ${subheadStyle}` : ""
                          } ${
                            isSelected
                              ? "bg-[#D4E012]/12 border-[#D4E012] shadow-md shadow-[#D4E012]/10"
                              : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#D4E012] border-[#D4E012] text-black shadow-[0_0_10px_rgba(212,224,18,0.4)]"
                                  : "bg-slate-800/80 border-slate-700 text-slate-300"
                              }`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div
                                className={`text-xs sm:text-[13px] font-serif-display font-bold tracking-tight truncate ${
                                  isSelected ? "text-white" : "text-slate-200"
                                } ${isSubheading ? "text-[11px] font-mono" : ""}`}
                              >
                                {isSubheading ? `↳ ${item.title}` : item.title}
                              </div>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-3.5 h-3.5 shrink-0 transition-all ${
                              isSelected ? "text-[#D4E012] translate-x-1" : "text-slate-600 opacity-40"
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Column: Active Item Featured Detail Preview Box */}
                <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Yellow Radial Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div>
                    {/* Active Icon */}
                    {(() => {
                      const activeItem = megaMenuData[activeDropdown].items[activeItemIndex];
                      const ActiveIcon = activeItem.icon;
                      return (
                        <div className="w-9 h-9 rounded-xl bg-[#D4E012]/20 border border-[#D4E012]/40 flex items-center justify-center mb-3 text-[#D4E012] shadow-sm">
                          <ActiveIcon className="w-4.5 h-4.5" />
                        </div>
                      );
                    })()}

                    {/* Active Title */}
                    <h3 className="text-lg sm:text-xl font-serif-display font-bold text-white mb-2 tracking-tight">
                      {megaMenuData[activeDropdown].items[activeItemIndex].headline}
                    </h3>

                    {/* Active Description */}
                    <p className="text-xs text-slate-300 font-normal leading-relaxed mb-4">
                      {megaMenuData[activeDropdown].items[activeItemIndex].description}
                    </p>

                    {/* Spec Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {megaMenuData[activeDropdown].items[activeItemIndex].specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 text-[10px] font-mono rounded-full"
                        >
                          ✓ {spec}
                        </span>
                      ))}
                    </div>

                    {/* Dedicated Interactive Subhead Cards when Initiatives is active */}
                    {megaMenuData[activeDropdown].items[activeItemIndex].id === "initiatives" && (
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        <Link
                          href="/about/initiatives/net-zero"
                          onClick={handleDropdownClose}
                          className="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center transition-all group shadow-sm"
                        >
                          <Leaf className="w-4 h-4 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                          <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Net Zero</div>
                        </Link>
                        <Link
                          href="/about/initiatives/agrovoltaics"
                          onClick={handleDropdownClose}
                          className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-center transition-all group shadow-sm"
                        >
                          <Sprout className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                          <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">AgroVoltaics</div>
                        </Link>
                        <Link
                          href="/about/initiatives/field-exchange"
                          onClick={handleDropdownClose}
                          className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-center transition-all group shadow-sm"
                        >
                          <GraduationCap className="w-4 h-4 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                          <div className="text-[10px] font-mono font-bold text-blue-400 uppercase">Field Exchange</div>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Explore Link */}
                  <Link
                    href={megaMenuData[activeDropdown].items[activeItemIndex].href}
                    onClick={handleDropdownClose}
                    className="inline-flex items-center gap-1.5 text-[#D4E012] hover:text-[#5EE72D] font-mono font-bold text-[11px] uppercase tracking-wider transition-colors pt-3 border-t border-slate-800/80 group"
                  >
                    <span>EXPLORE THIS SECTION</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4E012] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom Bar Inside Mega Menu */}
              <div className="border-t border-slate-800/90 pt-3 mt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400 font-normal">
                  {megaMenuData[activeDropdown].bottomText}
                </p>

                <button
                  onClick={() => {
                    handleDropdownClose();
                    onOpenQuote();
                  }}
                  className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-[11px] uppercase tracking-wider px-4 py-2 rounded-full transition-all shadow-md shadow-[#D4E012]/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>{megaMenuData[activeDropdown].bottomCtaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 px-6 py-8 max-h-[85vh] overflow-y-auto overscroll-contain custom-scrollbar"
            data-lenis-prevent="true"
            data-lenis-prevent-scroll="true"
          >
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="text-[10px] tracking-widest text-[#D4E012] uppercase font-bold flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D4E012] animate-ping"></span>
                SARHAT EPC NAVIGATION
              </div>

              {/* Mobile Solutions Accordion */}
              <div className="border-b border-zinc-900 py-2">
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#D4E012] transition-colors flex justify-between items-center"
                >
                  <span>SOLUTIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      mobileSolutionsOpen ? "rotate-180 text-[#D4E012]" : ""
                    }`}
                  />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-4 pt-3 flex flex-col gap-2.5">
                    {megaMenuData.solutions.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#D4E012] flex items-center gap-2"
                      >
                        <Sun className="w-4 h-4 text-[#D4E012]" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Projects Accordion */}
              <div className="border-b border-zinc-900 py-2">
                <button
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className="w-full text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#D4E012] transition-colors flex justify-between items-center"
                >
                  <span>PROJECTS</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      mobileProjectsOpen ? "rotate-180 text-[#D4E012]" : ""
                    }`}
                  />
                </button>
                {mobileProjectsOpen && (
                  <div className="pl-4 pt-3 flex flex-col gap-2.5">
                    {megaMenuData.projects.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#D4E012] flex items-center gap-2"
                      >
                        <FolderKanban className="w-4 h-4 text-[#D4E012]" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Partners Accordion */}
              <div className="border-b border-zinc-900 py-2">
                <button
                  onClick={() => setMobilePartnersOpen(!mobilePartnersOpen)}
                  className="w-full text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#D4E012] transition-colors flex justify-between items-center"
                >
                  <span>PARTNERS</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      mobilePartnersOpen ? "rotate-180 text-[#D4E012]" : ""
                    }`}
                  />
                </button>
                {mobilePartnersOpen && (
                  <div className="pl-4 pt-3 flex flex-col gap-2.5">
                    {megaMenuData.partners.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#D4E012] flex items-center gap-2"
                      >
                        <Handshake className="w-4 h-4 text-[#D4E012]" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Insights */}
              <Link
                href="/insights"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#D4E012] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
              >
                <span>INSIGHTS</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </Link>

              {/* Mobile About Accordion */}
              <div className="border-b border-zinc-900 py-2">
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="w-full text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#D4E012] transition-colors flex justify-between items-center"
                >
                  <span>ABOUT</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      mobileAboutOpen ? "rotate-180 text-[#D4E012]" : ""
                    }`}
                  />
                </button>
                {mobileAboutOpen && (
                  <div className="pl-4 pt-3 flex flex-col gap-2.5">
                    {megaMenuData.about.items.map((item) => (
                      <div key={item.id} className="flex flex-col gap-1.5">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#D4E012] flex items-center gap-2"
                        >
                          <Target className="w-4 h-4 text-[#D4E012]" />
                          <span>{item.title}</span>
                        </Link>

                        {/* Indented Subpages for Initiatives in Mobile Menu */}
                        {item.id === "initiatives" && (
                          <div className="pl-6 flex flex-col gap-1.5 border-l border-zinc-800 ml-2 my-1">
                            <Link
                              href="/about/initiatives/net-zero"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[11px] font-mono text-emerald-400 hover:text-white transition-colors"
                            >
                              • Net Zero
                            </Link>
                            <Link
                              href="/about/initiatives/agrovoltaics"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[11px] font-mono text-amber-400 hover:text-white transition-colors"
                            >
                              • AgroVoltaics
                            </Link>
                            <Link
                              href="/about/initiatives/field-exchange"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[11px] font-mono text-blue-400 hover:text-white transition-colors"
                            >
                              • Field Exchange
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full bg-[#D4E012] text-black font-extrabold py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#D4E012]/30"
                >
                  DISCUSS A PROJECT
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
