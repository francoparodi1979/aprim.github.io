import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aprim.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "APRIM — Advanced Pulmonary Research Institute of Michigan",
    template: "%s · APRIM",
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
    "APRIM",
  ],
  authors: [{ name: "Advanced Pulmonary Research Institute of Michigan" }],
  openGraph: {
    type: "website",
    siteName: "APRIM",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f3d4a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
