export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ipitombecircle.com"
).replace(/\/$/, "");

export const circleId = `${siteUrl}/#circle`;

export const siteName = "Ipi Tombe Circle";
export const siteDescription =
  "Ipi Tombe Circle is a home for 18 Zimbabwean artists and makers inside Mashonaland Turf Club at Borrowdale Race Course, Harare. Shop local art, craft, fashion, homeware and natural wellbeing.";

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
  phone: "+263 77 483 5701",
  hours: "Mon–Sat 8am–5pm · Closed Sunday",
  latitude: -17.77938,
  longitude: 31.08805,
} as const;

export const shortAddress = `${location.parentName}, ${location.venue}, ${location.city}`;
export const streetAddress = `${siteName}, ${location.parentName}, ${location.venue}, ${location.street}`;

// Points at the Turf Club pin until the Circle's own listing is published on
// Google Maps; then swap the query for the listing's place name.
const mapsQuery = encodeURIComponent(`${location.parentName}, ${location.venue}, ${location.city}`);
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
// Google's keyless embed endpoint, centred on the Turf Club and labelled with
// its name. (The older ?output=embed form redirects with X-Frame-Options set.)
export const mapsEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m12!1m8!1m3!1d1900!2d${location.longitude}!3d${location.latitude}!3m2!1i1024!2i768!4f13.1!2m1!1s${mapsQuery}!6i17`;

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress,
  addressLocality: location.suburb,
  addressRegion: location.city,
  addressCountry: location.countryCode,
} as const;

export const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "08:00",
  closes: "17:00",
} as const;

export const geo = {
  "@type": "GeoCoordinates",
  latitude: location.latitude,
  longitude: location.longitude,
} as const;

// Each maker trades from a numbered stall inside the Circle, so a stall's
// address nests under the Circle's, which nests under the Turf Club's.
export const stallAddress = (stall: number) => ({
  ...postalAddress,
  streetAddress: `Stall ${stall}, ${streetAddress}`,
});

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
