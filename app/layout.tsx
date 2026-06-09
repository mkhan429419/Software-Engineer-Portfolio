import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Maheen Akhtar Khan — Software Engineer",
  description:
    "Software Engineer with 1.9 years of experience building production-grade backend systems, AI integrations, and full-stack products. UAE Golden Visa Holder.",
  keywords: ["Software Engineer", "Backend", "Node.js", "TypeScript", "AWS", "AI"],
  openGraph: {
    title: "Maheen Akhtar Khan — Software Engineer",
    description: "Backend-focused software engineer building systems that scale.",
    type: "website",
    url: "https://maheenakhtarkhan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
