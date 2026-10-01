import {
  Wallet,
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Scale,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const BENEFITS: Benefit[] = [
  {
    id: "salary",
    title: "Competitive Salary",
    description: "Market-aligned compensation with performance incentives.",
    icon: Wallet,
  },
  {
    id: "learning",
    title: "Learning & Development",
    description: "In-house technical training, certifications and site exposure.",
    icon: GraduationCap,
  },
  {
    id: "health",
    title: "Health & Wellness",
    description: "Benefits designed to support your health and wellbeing.",
    icon: HeartPulse,
  },
  {
    id: "growth",
    title: "Career Growth",
    description: "Clear opportunities to take ownership and grow with the company.",
    icon: TrendingUp,
  },
  {
    id: "balance",
    title: "Work-Life Balance",
    description: "A workplace that values productivity, flexibility and people.",
    icon: Scale,
  },
  {
    id: "mission",
    title: "Green Mission",
    description: "Be part of India's clean-energy transformation.",
    icon: Leaf,
  },
];

/** The five chapters of the journey, and which chapter each benefit belongs to. */
export const STAGES = [
  { label: "Join", line: "Start strong." },
  { label: "Learn", line: "Build real expertise." },
  { label: "Grow", line: "Own your path." },
  { label: "Lead", line: "Guide the next team." },
  { label: "Impact", line: "Power India's future." },
];

export const STAGE_OF_STEP = [0, 1, 1, 2, 3, 4];
