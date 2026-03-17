import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asy-conseil.fr"),
  title: "ASY Conseil | Alice Savry - Diagnostic Trésorerie & Rentabilité PME",
  description: "Alice Savry, consultante experte en diagnostic d'entreprise avec 20 ans d'expérience. Diagnostic trésorerie, rentabilité PME, gestion des risques et optimisation des processus administratifs. Première consultation gratuite.",
  keywords: [
    "diagnostic trésorerie",
    "rentabilité PME",
    "gestion des risques",
    "processus administratifs",
    "Alice Savry",
    "ASY Conseil",
    "consultant entreprise",
    "diagnostic entreprise",
    "optimisation trésorerie",
    "accompagnement TPE",
    "conseil PME",
    "gestion financière",
    "audit processus",
    "fidélisation personnel",
    "turn-over"
  ],
  authors: [{ name: "Alice Savry - ASY Conseil" }],
  creator: "Alice Savry",
  publisher: "ASY Conseil",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ASY Conseil - Le médecin de votre entreprise",
    description: "Diagnostic trésorerie, rentabilité PME et gestion des risques. Alice Savry, 20 ans d'expérience au service des TPE/PME. Premier diagnostic offert.",
    url: "https://asy-conseil.fr",
    siteName: "ASY Conseil",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/asy-logo.svg",
        width: 200,
        height: 200,
        alt: "ASY Conseil - Alice Savry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASY Conseil - Diagnostic Trésorerie & Rentabilité PME",
    description: "Alice Savry, consultante experte. Diagnostic trésorerie, rentabilité et gestion des risques pour TPE/PME.",
    images: ["/asy-logo.svg"],
  },
  alternates: {
    canonical: "https://asy-conseil.fr",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <link rel="icon" href="/asy-logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
