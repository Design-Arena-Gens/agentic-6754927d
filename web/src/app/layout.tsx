import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Optical • Aidant AI Concierge",
  description:
    "Chat with Aidant, the AI assistant for Ahmed Optical. Explore frames, lenses, sunglass collections, and book fittings instantly in Lahore.",
  openGraph: {
    title: "Ahmed Optical • Aidant AI Concierge",
    description:
      "Get personalized eyewear guidance, book appointments, and contact Ahmed Optical directly through Aidant, your AI eyewear concierge.",
    url: "https://agentic-6754927d.vercel.app",
    siteName: "Ahmed Optical",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Optical • Aidant AI Concierge",
    description:
      "Let Aidant recommend frames, lenses, and sunglasses before you visit Ahmed Optical in Lahore.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
