import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { makers } from "@/data/makers";
import {
  absoluteUrl,
  circleId,
  geo,
  location,
  mapsUrl,
  openingHours,
  postalAddress,
  siteDescription,
  siteName,
  siteUrl,
  stallAddress,
} from "@/lib/seo";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const shareDescription = "Meet 18 Zimbabwean makers inside Mashonaland Turf Club, Borrowdale Race Course, Harare.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ipi Tombe Circle | Zimbabwean Art & Craft at Borrowdale Race Course, Harare",
    template: "%s | Ipi Tombe Circle, Borrowdale",
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  keywords: [
    "Ipi Tombe Circle",
    "Mashonaland Turf Club",
    "Borrowdale Race Course",
    "Borrowdale shops",
    "things to do in Borrowdale",
    "Harare craft market",
    "Zimbabwean artists",
    "handmade Zimbabwe",
    "Zimbabwean gifts Harare",
  ],
  openGraph: {
    title: "Ipi Tombe Circle — Made here. Found in Borrowdale.",
    description: shareDescription,
    type: "website",
    locale: "en_ZW",
    url: "/",
    siteName,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zimbabwean art and craft at Ipi Tombe Circle, Borrowdale Race Course" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ipi Tombe Circle — Made here. Found in Borrowdale.",
    description: shareDescription,
    images: ["/twitter-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "arts and crafts",
  other: {
    "geo.region": "ZW-HA",
    "geo.placename": `${location.suburb}, ${location.city}`,
    "geo.position": `${location.latitude};${location.longitude}`,
    ICBM: `${location.latitude}, ${location.longitude}`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      alternateName: ["Ipi Tombe", "Ipi Tombe Circle – MTC Mashonaland Turf Club"],
      description: siteDescription,
      inLanguage: "en-ZW",
      publisher: { "@id": circleId },
    },
    {
      "@type": "Place",
      "@id": `${siteUrl}/#mashonaland-turf-club`,
      name: location.parentName,
      alternateName: location.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${location.venue}, ${location.street}`,
        addressLocality: location.suburb,
        addressRegion: location.city,
        addressCountry: location.countryCode,
      },
      geo,
    },
    {
      "@type": "ShoppingCenter",
      "@id": circleId,
      name: siteName,
      legalName: "Ipi Tombe Circle – MTC Mashonaland Turf Club",
      url: siteUrl,
      logo: absoluteUrl("/icon.svg"),
      image: absoluteUrl("/opengraph-image"),
      description: siteDescription,
      telephone: location.phone,
      openingHoursSpecification: openingHours,
      address: postalAddress,
      geo,
      hasMap: mapsUrl,
      containedInPlace: { "@id": `${siteUrl}/#mashonaland-turf-club` },
      containsPlace: makers.map((maker) => ({
        "@type": "Place",
        name: `${maker.brand}, Stall ${maker.stall}`,
        address: stallAddress(maker.stall),
        url: absoluteUrl(`/makers/${maker.id}`),
      })),
      areaServed: { "@type": "City", name: location.city },
      currenciesAccepted: "USD, ZWG",
      knowsAbout: ["Zimbabwean art", "Handmade crafts", "Homeware", "Fashion", "Natural wellbeing"],
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZW"
      className={`${display.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
