export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ipitombecircle.com"
).replace(/\/$/, "");

export const siteName = "Ipi Tombe Circle";
export const siteDescription =
  "Discover 18 Zimbabwean artists and makers at Ipi Tombe Circle, Mashonaland Turf Club, Borrowdale Race Course, Harare. Shop local art, craft, fashion, homeware and natural wellbeing.";

// One source of truth for name, address and pin. Google Maps, Business Profile
// and every page must match this exactly. The registered name on plan and with
// council is "Ipi Tombe Circle – MTC Mashonaland Turf Club"; the Circle sits in
// the Turf Club's commercial section at Borrowdale Race Course.
export const location = {
  parentName: "Mashonaland Turf Club",
  venue: "Borrowdale Race Course",
  street: "Borrowdale Road",
  suburb: "Borrowdale",
  city: "Harare",
  country: "Zimbabwe",
  countryCode: "ZW",
  plusCode: "63CQ+66R Harare",
  latitude: -17.77938,
  longitude: 31.08805,
} as const;

export const shortAddress = `${location.parentName}, ${location.venue}, ${location.city}`;
export const streetAddress = `${siteName}, ${location.parentName}, ${location.venue}, ${location.street}`;

// Points at the Turf Club pin until the Circle's own listing is published on
// Google Maps; then swap the query for the listing's place name.
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${location.parentName}, ${location.venue}, ${location.city}`,
)}`;

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress,
  addressLocality: location.suburb,
  addressRegion: location.city,
  addressCountry: location.countryCode,
} as const;

export const geo = {
  "@type": "GeoCoordinates",
  latitude: location.latitude,
  longitude: location.longitude,
} as const;

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
