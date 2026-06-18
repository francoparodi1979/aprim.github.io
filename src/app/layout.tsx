import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veritasclinical.org";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Veritas Clinical Research",
    template: "%s · Veritas Clinical Research",
  },
  description:
    "Patient-centered pulmonary clinical research in Michigan. COPD, asthma, and idiopathic pulmonary fibrosis trials led by Dr. Franco Parodi.",
  keywords: [
    "pulmonary clinical trials",
    "COPD research",
    "asthma research",
    "IPF research",
    "Michigan clinical research",
    "Dr. Franco Parodi",
    "Veritas Clinical Research",
  ],
  authors: [{ name: "Veritas Clinical Research" }],
  openGraph: {
    type: "website",
    siteName: "Veritas Clinical Research",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a2e38",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
