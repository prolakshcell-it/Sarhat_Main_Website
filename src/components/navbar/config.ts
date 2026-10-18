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
            href: "/products/ground-mounted-pv",
            children: [
              { id: "kusum", title: "KUSUM", href: "/products/ground-mounted-pv" },
              { id: "open-access", title: "Open Access", href: "/products/ground-mounted-pv/open-access" },
            ],
          },
          {
            id: "floating-pv",
            title: "Floating PV",
            href: "/products/floating-pv/surya-sarovar",
            children: [
              { id: "surya-sarovar", title: "Surya Sarovar", href: "/products/floating-pv/surya-sarovar" },
              { id: "canal-top", title: "Canal Top", href: "/products/floating-pv/canal-top" },
            ],
          },
          { id: "agri-pv", title: "Agri-PV", href: "/products/agri-pv" },
          {
            id: "rooftop",
            title: "Rooftop",
            href: "/products/rooftop/residential",
            children: [
              { id: "residential", title: "Residential", href: "/products/rooftop/residential" },
              { id: "industrial-commercial", title: "Industrial / Commercial", href: "/products/rooftop/industrial-commercial" },
              { id: "institutional", title: "Institutional", href: "/products/rooftop/institutional" },
            ],
          },
        ],
      },
      {
        id: "bess-hybrid",
        title: "BESS & Hybrid",
        href: "/products/bess-hybrid/standalone-bess",
        children: [
          { id: "standalone-bess", title: "Standalone BESS", href: "/products/bess-hybrid/standalone-bess" },
          { id: "bess-pv-wind", title: "BESS meets PV / Wind", href: "/products/bess-hybrid/bess-pv-wind" },
        ],
      },
      {
        id: "infrastructure",
        title: "Infrastructure",
        href: "/infrastructure/substations",
        children: [
          { id: "substations", title: "Substations / Switchyards", href: "/infrastructure/substations" },
          { id: "transmission", title: "Transmission Lines", href: "/infrastructure/transmission-lines" },
          { id: "piling", title: "Piling & Foundations", href: "/infrastructure/piling-foundations" },
          { id: "telecom", title: "Telecommunication Towers", href: "/infrastructure/telecom-towers" },
          { id: "industrial-buildings", title: "Industrial Buildings", href: "/infrastructure/industrial-buildings" },
          { id: "commercial-buildings", title: "Commercial Buildings", href: "/infrastructure/commercial-buildings" },
          { id: "roads-drainage", title: "Roads & Drainage", href: "/infrastructure/roads-drainage" },
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
        href: "/solutions/engineering",
        children: [
          { id: "innovation", title: "Innovation", href: "/solutions/engineering/innovation" },
          { id: "system-design", title: "System Design", href: "/solutions/engineering/system-design" },
        ],
      },
      { id: "supply-chain", title: "Supply Chain Management", href: "/solutions/supply-chain-management" },
      { id: "construction", title: "Construction", href: "/solutions/construction" },
      { id: "oandm", title: "Operation & Maintenance", href: "/solutions/operation-and-maintenance" },
      { id: "health-check", title: "Solar Plant Health Check-up", href: "/solutions/solar-plant-health-checkup" },
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
