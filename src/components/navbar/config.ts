import {
  Sun,
  Battery,
  Zap,
  Building2,
  Factory,
  Handshake,
  Package,
  HardHat,
  Wrench,
  Users,
  Newspaper,
  BookOpen,
  FileText,
  Lightbulb,
  Target,
  Award,
  Sparkles,
  Mail,
  LayoutDashboard,
  Grid,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface NavItemLink {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  /** Sub-pages shown indented under this item (editorial layout only). */
  children?: { id: string; title: string; href: string }[];
  /** Editorial layout: copy shown on the left while this item is hovered/focused. */
  context?: { description: string; cta: string; social?: boolean };
}

/** Two-column layout: contextual copy on the left, plain link list on the right. */
export interface EditorialContent {
  eyebrow: string;
  heading: string;
}

export interface SocialLink {
  id: "linkedin" | "instagram" | "x";
  label: string;
  href: string;
}

export interface FeaturedContent {
  eyebrow: string;
  title: string;
  lead: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface MegaNavEntry {
  key: string;
  label: string;
  type: "mega";
  /** Landing page for the section; also used for "view all" and active state. */
  href: string;
  /** Extra path prefixes that mark this section as the current page. */
  match?: string[];
  tag: string;
  /** Panel width on large desktops (px). */
  width: number;
  /** Columns the link list uses inside the panel. */
  columns: 1 | 2;
  items: NavItemLink[];
  featured?: FeaturedContent;
  /** Replaces the icon grid + featured card with the editorial layout. */
  editorial?: EditorialContent;
  viewAllLabel?: string;
  /** Plain link to `href` with no dropdown (desktop) or accordion (mobile). */
  linkOnly?: boolean;
}

/** Edit this array to change the desktop mega menus and the mobile accordion together. */
export const navigationConfig: MegaNavEntry[] = [
  {
    key: "solutions",
    label: "Solutions",
    type: "mega",
    href: "/solutions",
    tag: "Solutions",
    width: 1180,
    columns: 1,
    viewAllLabel: "View all solutions",
    items: [
      {
        id: "renewable-energy",
        title: "Renewable Energy",
        description: "Utility-scale solar, wind & clean energy solutions.",
        icon: Sun,
        href: "/solutions#renewable-energy",
      },
      {
        id: "bess-storage",
        title: "BESS & Storage",
        description: "Advanced battery and energy storage systems.",
        icon: Battery,
        href: "/solutions#bess-storage",
      },
      {
        id: "energy-infrastructure",
        title: "Energy Infrastructure",
        description: "Reliable infrastructure for modern energy systems.",
        icon: Zap,
        href: "/solutions#energy-infrastructure",
      },
      {
        id: "civil-infrastructure",
        title: "Civil Infrastructure",
        description: "Engineering and infrastructure for large-scale projects.",
        icon: Building2,
        href: "/solutions#civil-infrastructure",
      },
    ],
    featured: {
      eyebrow: "Featured solution",
      title: "Renewable Energy",
      lead: "Powering the transition to cleaner energy.",
      text: "Turnkey EPC for utility-scale solar, rooftop and wind, from design to long-term O&M.",
      cta: "Explore solutions",
      href: "/solutions",
      image: "/images/hero-solar.jpg",
      imageAlt: "Utility-scale solar farm",
    },
  },
  {
    key: "projects",
    label: "Projects",
    type: "mega",
    href: "/projects",
    tag: "Projects",
    width: 1180,
    columns: 1,
    viewAllLabel: "View all projects",
    items: [
      {
        id: "overview",
        title: "Overview",
        description: "Verified portfolio figures with commissioned & ongoing capacity shown separately.",
        icon: LayoutDashboard,
        href: "/projects#overview",
      },
      {
        id: "project-highlights",
        title: "Project Highlights",
        description: "3–4 featured sites with large photos & execution stories.",
        icon: Sparkles,
        href: "/projects#highlights",
      },
      {
        id: "explore-projects",
        title: "Explore Projects",
        description: "Filterable project cards across states and solar schemes.",
        icon: Grid,
        href: "/projects#explore",
      },
      {
        id: "across-india",
        title: "Across India",
        description: "Interactive map with regional footprint & state records.",
        icon: MapPin,
        href: "/projects#footprint",
      },
      {
        id: "execution-impact",
        title: "Execution & Impact",
        description: "Sarhat Scope, turnkey execution work, and environmental outcomes.",
        icon: ShieldCheck,
        href: "/projects#execution-impact",
      },
    ],
    featured: {
      eyebrow: "Sarhat Projects",
      title: "Pan-India EPC Portfolio",
      lead: "From PM-KUSUM feeder solarization to EHV grid substations.",
      text: "Explore verified commissioned capacity and active sites across operating states.",
      cta: "Explore all projects",
      href: "/projects",
      image: "/images/hero-solar.jpg",
      imageAlt: "Sarhat Utility Solar Plant",
    },
  },
  {
    key: "partners",
    label: "Partners",
    type: "mega",
    href: "/partners",
    match: ["/supply-partners", "/execution-contractors"],
    tag: "Partners",
    width: 940,
    columns: 1,
    viewAllLabel: "View all partner programs",
    items: [
      {
        id: "supply-partners",
        title: "Supply Partners",
        description: "Register as a Vendor",
        icon: Package,
        href: "/supply-partners",
      },
      {
        id: "execution-partners",
        title: "Execution Partners",
        description: "Register as a Contractor",
        icon: HardHat,
        href: "/execution-contractors",
      },
      {
        id: "project-partnerships",
        title: "Project Partnerships",
        description: "Discuss a Partnership",
        icon: Handshake,
        href: "/partners",
      },
    ],
    featured: {
      eyebrow: "Partner with us",
      title: "Building stronger energy ecosystems",
      lead: "Grow alongside India's solar market.",
      text: "Programs for suppliers, contractors and project partners.",
      cta: "Partner with Sarhat",
      href: "/partners",
      image: "/images/partner-hero-bg.jpg",
      imageAlt: "Partners at a solar project site",
    },
  },
  {
    key: "insights",
    label: "Insights",
    type: "mega",
    href: "/insights",
    tag: "Insights",
    width: 940,
    columns: 1,
    viewAllLabel: "View all insights",
    items: [
      {
        id: "industry-insights",
        title: "Industry Insights",
        description: "Perspectives on India's energy transition.",
        icon: Lightbulb,
        href: "/insights",
      },
      {
        id: "news",
        title: "News & Updates",
        description: "Company announcements and milestones.",
        icon: Newspaper,
        href: "/insights",
      },
      {
        id: "case-studies",
        title: "Case Studies",
        description: "How we delivered on real projects.",
        icon: FileText,
        href: "/insights",
      },
      {
        id: "articles",
        title: "Articles",
        description: "Technical know-how from our engineers.",
        icon: BookOpen,
        href: "/insights",
      },
    ],
    featured: {
      eyebrow: "Latest insight",
      title: "Building the next generation of clean energy infrastructure.",
      lead: "",
      text: "",
      cta: "Read insight",
      href: "/insights",
      image: "/images/agrivoltaics-project.jpg",
      imageAlt: "Agrivoltaics project",
    },
  },
  {
    key: "about",
    label: "About",
    type: "mega",
    href: "/about",
    tag: "About Sarhat",
    width: 940,
    columns: 1,
    viewAllLabel: "About Sarhat",
    editorial: {
      eyebrow: "About Sarhat",
      heading: "Get to know us",
    },
    items: [
      {
        id: "our-story",
        title: "Our Story",
        description: "From foundation to 250+ MW delivered.",
        icon: Target,
        href: "/about/our-story",
        context: {
          description:
            "Sarhat is an execution-led energy and infrastructure company rooted in India, with the ambition to earn trust globally. Engineering discipline, hands-on delivery and continuous learning shape our work. Safety, unity and ownership guide every project.",
          cta: "Explore our story",
        },
      },
      {
        id: "our-approach",
        title: "Our Approach",
        description: "Discipline, delivery and learning.",
        icon: Wrench,
        href: "/about/our-approach",
        context: {
          description:
            "From engineering to execution, we bring discipline to every stage of delivery. We learn from the field, solve practically and build with accountability.",
          cta: "Explore our approach",
        },
      },
      {
        id: "initiatives",
        title: "Initiatives",
        description: "Net Zero, AgroVoltaics, Field Exchange.",
        icon: Sparkles,
        href: "/about/initiatives",
        context: {
          description:
            "We turn what we learn on the ground into initiatives that explore cleaner, smarter and more resilient ways of building.",
          cta: "Explore initiatives",
        },
        children: [
          {
            id: "net-zero",
            title: "Net Zero",
            href: "/about/initiatives/net-zero",
          },
          {
            id: "agrovoltaics",
            title: "AgroVoltaics",
            href: "/about/initiatives/agrovoltaics",
          },
          {
            id: "field-exchange",
            title: "Field Exchange",
            href: "/about/initiatives/field-exchange",
          },
        ],
      },
      {
        id: "culture",
        title: "Culture & People",
        description: "Safety, unity and ownership.",
        icon: Users,
        href: "/about/culture-people",
        context: {
          description:
            "People are at the centre of how we work, united by safety, ownership and the belief that strong teams build stronger outcomes.",
          cta: "Meet our people",
        },
      },
      {
        id: "leadership",
        title: "Leadership",
        description: "The team steering Sarhat.",
        icon: Award,
        href: "/about/leadership",
        context: {
          description:
            "Leadership at Sarhat is grounded in responsibility, field experience and a hands-on commitment to delivering what we promise.",
          cta: "Meet the leadership",
        },
      },
      {
        id: "connect",
        title: "Connect With Us",
        description: "Reach the Sarhat team.",
        icon: Mail,
        href: "/about/connect",
        context: {
          description:
            "Follow Sarhat as we share our work, ideas and progress across India’s energy and infrastructure landscape.",
          cta: "Get in touch",
          social: true,
        },
      },
    ],
  },
];

/** Shown under "Connect With Us" in the About menu. */
export const socialLinks: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/sarhat" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/sarhatenergy" },
  { id: "x", label: "X", href: "https://x.com/sarhatenergy" },
];

export const utilityLinks = [
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const isEntryActive = (entry: MegaNavEntry, pathname: string) =>
  [entry.href, ...(entry.match ?? [])].some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
