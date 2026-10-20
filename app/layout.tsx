import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Maheen Akhtar Khan - Software Engineer",
  description:
    "Software Engineer with 2 years of experience building production-grade backend systems, AI integrations, and full-stack products. UAE Golden Visa Holder.",
  keywords: ["Software Engineer", "Backend", "Node.js", "TypeScript", "AWS", "AI"],
  openGraph: {
    title: "Maheen Akhtar Khan - Software Engineer",
    description: "Backend-focused software engineer building systems that scale.",
    type: "website",
    url: "https://maheenakhtarkhan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className={`${sans.className} antialiased bg-paper text-ink`}>{children}</body>
    </html>
  );
}
