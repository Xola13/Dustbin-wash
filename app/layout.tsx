import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/ui/SiteChrome";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} by ${BRAND.parent} | Premium Bin Washing Cape Town`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Cape Town's premium wheelie bin washing and sanitizing service by Safe Solution. Weekly, bi-weekly, and monthly plans. Eco-certified products. No more wincing when you lift the lid.",
  keywords: [
    "BinSpa",
    "bin washing Cape Town",
    "wheelie bin cleaning",
    "bin sanitizing",
    "bin deodorizing",
    "Cape Town cleaning service",
    "Safe Solution",
    "eco-friendly bin cleaning",
  ],
  authors: [{ name: BRAND.fullName }],
  creator: BRAND.parent,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: BRAND.name,
    title: `${BRAND.name} | Premium Bin Washing Cape Town`,
    description:
      "Cape Town's premium wheelie bin washing and sanitizing service. Eco-certified. Fully insured. No mess.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Premium Bin Washing`,
    description: "Cape Town's premium bin washing service. No more wincing when you lift the lid.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
