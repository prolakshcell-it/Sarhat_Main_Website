import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SARHAT EPC | Solar & Renewable Energy Infrastructure",
  description:
    "Pan-India Renewable Energy, Battery Storage (BESS), Substations, and Infrastructure EPC. One project. One connected execution mindset.",
  keywords: [
    "Solar EPC",
    "BESS",
    "Agrivoltaics",
    "Substations",
    "Infrastructure EPC",
    "Renewable Energy India",
    "SARHAT EPC",
  ],
   icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${inter.variable} dark scroll-smooth antialiased`}
    >
      <body className="bg-black text-white font-sans-ui selection:bg-[#6DAD45] selection:text-black min-h-screen overflow-x-clip">
        {children}
        <Toaster position="top-right" richColors />
        <CookieConsent />
      </body>
    </html>
  );
}
