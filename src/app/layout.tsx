import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

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
  weight: ["300", "400", "500", "600", "700", "800"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} dark scroll-smooth antialiased`}
    >
      <body className="bg-black text-white font-sans-ui selection:bg-[#6DAD45] selection:text-black min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
