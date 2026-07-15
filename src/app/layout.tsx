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
    default: "Veritas Clinical Research · Pulmonary Clinical Trials in Madison Heights, MI",
    template: "%s · Veritas Clinical Research",
  },
  description:
    "Patient-centered pulmonary clinical trials in Madison Heights, Michigan (Metro Detroit). COPD, asthma, IPF, and bronchiectasis studies led by pulmonologist Dr. Franco Parodi. Now enrolling.",
  keywords: [
    "clinical trials Madison Heights MI",
    "COPD clinical trial Michigan",
    "asthma clinical trial Michigan",
    "pulmonary clinical research Metro Detroit",
    "paid clinical studies Michigan",
    "IPF research study",
    "Dr. Franco Parodi pulmonologist",
    "Veritas Clinical Research",
  ],
  authors: [{ name: "Veritas Clinical Research" }],
  openGraph: {
    type: "website",
    siteName: "Veritas Clinical Research",
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Veritas Clinical Research" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

/**
 * Site-wide structured data: tells search engines this is a medical research
 * organization at a specific street address — the strongest on-site signal
 * for local queries like "clinical trials near Madison Heights".
 */
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Veritas Clinical Research",
  url: SITE_URL,
  logo: `${SITE_URL}/veritas-logo.png`,
  image: `${SITE_URL}/building.jpg`,
  telephone: "+1-586-210-0330",
  faxNumber: "+1-586-210-0380",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27483 Dequindre Rd, Suite 304",
    addressLocality: "Madison Heights",
    addressRegion: "MI",
    postalCode: "48071",
    addressCountry: "US",
  },
  medicalSpecialty: "Pulmonary",
  foundingDate: "2022",
  founder: {
    "@type": "Physician",
    name: "Dr. Franco Parodi",
    medicalSpecialty: "Pulmonary",
  },
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
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        {children}
      </body>
    </html>
  );
}
