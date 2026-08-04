/**
 * Business facts, verified against the public Fresha profile and Google listing
 * in August 2026. PRODUCT.md is the authority; reconfirm before publishing,
 * because prices and staff change.
 */

export const site = {
  name: "Head & Co.",
  locality: "Jeddah",
  slogan: "Head, Body & Soul",
  instagram: "https://www.instagram.com/headandco.sa/",
  instagramHandle: "@headandco.sa",
  address: {
    street: "King Abdulaziz Road",
    district: "Al Mohammadiyyah",
    city: "Jeddah",
    postalCode: "23617",
    country: "SA",
    region: "Makkah Province",
  },
  geo: { lat: 21.645069, lng: 39.1120863 },
  hours: { opens: "14:00", closes: "23:00", label: "Every day · 2:00 – 11:00 PM" },
  rating: { value: "4.9", count: 2231 },
  priceRange: "SAR 35–690",
};

export const mapsUrl =
  "https://maps.google.com/?daddr=Head%20%26%20Co%2C%20King%20Abdul%20Aziz%20Road%2C%20Jeddah%2C%2023617%2C%20Makkah%20Province";

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`;

const FRESHA_BASE =
  "https://www.fresha.com/a/head-co-jeddah-head-co-king-abdul-aziz-road-mr5d118y";

/**
 * Every hand-off to Fresha is tagged, because an untagged booking click cannot
 * be attributed and the site's fourth job is proving how many it sent.
 */
export function freshaUrl(campaign, content) {
  const params = new URLSearchParams({
    utm_source: "headandco-site",
    utm_medium: "website",
    utm_campaign: campaign,
  });
  if (content) params.set("utm_content", content);
  return `${FRESHA_BASE}?${params.toString()}`;
}

/** Jeddah is UTC+3, open 14:00–23:00 daily. */
export function isOpenNow(now = new Date()) {
  const h = (now.getUTCHours() + 3) % 24;
  return h >= 14 && h < 23;
}
