export interface NavItemLink {
  id: string;
  title: string;
  /** Internal path, or an absolute URL (opens in a new tab). */
  href: string;
  /** Sub-items, shown as a flyout on desktop and an indented list on mobile. */
  children?: NavItemLink[];
}

export interface SocialLink {
  id: "linkedin" | "instagram" | "x";
  label: string;
  href: string;
}

export interface MegaNavEntry {
  key: string;
  label: string;
  /** Section landing page, used for the active state. */
  href: string;
  /** Extra path prefixes that mark this section as the current page. */
  match?: string[];
  /** Small heading at the top of the dropdown. */
  tag: string;
  items: NavItemLink[];
  /** Shows the "Connect with us" social icon row at the bottom of the dropdown. */
  social?: boolean;
  /** Plain link to `href` with no dropdown (desktop) or accordion (mobile). */
  linkOnly?: boolean;
}

export const socialLinks: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/sarhat" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/sarhatenergy" },
  { id: "x", label: "X", href: "https://x.com/sarhatenergy" },
];

/** Edit this array to change the desktop dropdowns and the mobile menu together. */
export const navigationConfig: MegaNavEntry[] = [
  {
    key: "products",
    label: "Products",
    href: "/products",
    tag: "Products",
    items: [
      {
        id: "solar-energy",
        title: "Solar Energy",
        href: "/solutions#renewable-energy",
        children: [
          {
            id: "ground-mounted-pv",
            title: "Ground-Mounted PV",
            href: "/solutions#renewable-energy",
            children: [
              { id: "kusum", title: "KUSUM", href: "/solutions#renewable-energy" },
              { id: "open-access", title: "Open Access", href: "/solutions#renewable-energy" },
            ],
          },
          {
            id: "floating-pv",
            title: "Floating PV",
            href: "/solutions#renewable-energy",
            children: [
              { id: "surya-sarovar", title: "Surya Sarovar", href: "/solutions#renewable-energy" },
              { id: "canal-top", title: "Canal Top", href: "/solutions#renewable-energy" },
            ],
          },
          { id: "agri-pv", title: "Agri-PV", href: "/about/initiatives/agrovoltaics" },
          {
            id: "rooftop",
            title: "Rooftop",
            href: "/solutions#renewable-energy",
            children: [
              { id: "residential", title: "Residential", href: "/solutions#renewable-energy" },
              { id: "industrial-commercial", title: "Industrial / Commercial", href: "/solutions#renewable-energy" },
              { id: "institutional", title: "Institutional", href: "/solutions#renewable-energy" },
            ],
          },
        ],
      },
      {
        id: "bess-hybrid",
        title: "BESS & Hybrid",
        href: "/solutions#bess-storage",
        children: [
          { id: "standalone-bess", title: "Standalone BESS", href: "/solutions#bess-storage" },
          { id: "bess-pv-wind", title: "BESS meets PV / Wind", href: "/solutions#bess-storage" },
        ],
      },
      {
        id: "infrastructure",
        title: "Infrastructure",
        href: "/solutions#energy-infrastructure",
        children: [
          { id: "substations", title: "Substations / Switchyards", href: "/solutions#energy-infrastructure" },
          { id: "transmission", title: "Transmission Lines", href: "/solutions#energy-infrastructure" },
          { id: "piling", title: "Piling & Foundations", href: "/solutions#civil-infrastructure" },
          { id: "telecom", title: "Telecommunication Towers", href: "/solutions#energy-infrastructure" },
          { id: "industrial-buildings", title: "Industrial Buildings", href: "/solutions#civil-infrastructure" },
          { id: "commercial-buildings", title: "Commercial Buildings", href: "/solutions#civil-infrastructure" },
          { id: "roads-drainage", title: "Roads & Drainage", href: "/solutions#civil-infrastructure" },
        ],
      },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    href: "/solutions",
    tag: "Solutions",
    items: [
      {
        id: "engineering",
        title: "Engineering",
        href: "/solutions#engineering",
        children: [
          { id: "innovation", title: "Innovation", href: "/solutions#engineering" },
          { id: "system-design", title: "System Design", href: "/solutions#engineering" },
        ],
      },
      { id: "supply-chain", title: "Supply Chain Management", href: "/solutions#procurement" },
      { id: "construction", title: "Construction", href: "/solutions#construction" },
      { id: "oandm", title: "Operation & Maintenance", href: "/solutions#oandm" },
      { id: "health-check", title: "Solar Plant Health Check-up", href: "/solutions#oandm" },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    href: "/projects",
    tag: "Projects",
    items: [
      { id: "overview", title: "Overview", href: "/projects#overview" },
      { id: "highlights", title: "Project Highlights", href: "/projects#highlights" },
      { id: "explore", title: "Explore Projects", href: "/projects#explore" },
      { id: "footprints", title: "Footprints", href: "/projects#footprint" },
    ],
  },
  {
    key: "join",
    label: "Join Us",
    href: "/partners",
    match: ["/supply-partners", "/execution-contractors", "/careers"],
    tag: "Join Us",
    items: [
      { id: "solar-partner", title: "Solar Partner", href: "/partners" },
      { id: "vendor", title: "Vendor", href: "/supply-partners" },
      { id: "investor", title: "Investor", href: "/contact" },
      { id: "careers", title: "Careers", href: "/careers" },
    ],
  },
  {
    key: "insights",
    label: "Insights",
    href: "/insights",
    tag: "Insights",
    items: [
      { id: "industry-insights", title: "Industry Insights", href: "/insights" },
      { id: "news", title: "News & Updates", href: "/insights" },
      { id: "case-studies", title: "Case Studies", href: "/insights" },
      { id: "articles", title: "Articles", href: "/insights" },
    ],
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    tag: "About Sarhat",
    social: true,
    items: [
      { id: "story", title: "Story", href: "/about/our-story" },
      { id: "approach", title: "Approach", href: "/about/our-approach" },
      {
        id: "initiatives",
        title: "Initiatives",
        href: "/about/initiatives",
        children: [
          { id: "net-zero", title: "Net Zero", href: "/about/initiatives/net-zero" },
          { id: "agri-pv-initiative", title: "Agri-PV", href: "/about/initiatives/agrovoltaics" },
          { id: "field-exchange", title: "Field Exchange", href: "/about/initiatives/field-exchange" },
        ],
      },
      { id: "culture", title: "Culture & People", href: "/about/culture-people" },
      { id: "leadership", title: "Leadership", href: "/about/leadership" },
      { id: "contact", title: "Contact Us", href: "/contact" },
    ],
  },
];

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const isEntryActive = (entry: MegaNavEntry, pathname: string) =>
  [entry.href, ...(entry.match ?? [])].some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
