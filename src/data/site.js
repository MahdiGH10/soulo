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
  tiktok: "https://www.tiktok.com/@headandco.sa",
  phone: "+966 50 300 5097",
  phoneHref: "tel:+966503005097",
  whatsapp: "https://wa.me/966503005097",
  press: {
    name: "Arab News",
    url: "https://www.arabnews.com/node/2624074/lifestyle",
  },
  address: {
    street: "King Abdulaziz Road",
    district: "Al Mohammadiyyah",
    city: "Jeddah",
    postalCode: "23617",
    country: "SA",
    region: "Makkah Province",
  },
  geo: { lat: 21.645069, lng: 39.1120863 },
  /**
   * Saturday is not the same as the rest of the week. Their own Instagram bio
   * reads "Sunday To Friday: 2:00 PM- 11:00 PM / Saturday: 11:00 PM - 8:00 PM".
   * The Saturday opening is written as PM there, which cannot be right against
   * an 8 PM close, so it is recorded as 11 AM. Confirm with the owner.
   */
  hours: {
    weekday: { opens: "14:00", closes: "23:00" },
    saturday: { opens: "11:00", closes: "20:00" },
    label: "Sun to Fri, 2 to 11 PM",
    saturdayLabel: "Sat, 11 AM to 8 PM",
  },
  rating: { value: "4.9", count: 2231 },
  /** From their Instagram profile. Their largest audience, and their own line. */
  social: { followersLabel: "22.7K", tagline: "From Korea to Jeddah" },
  established: 2024,
  priceRange: "SAR 35-690",
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

/**
 * Jeddah is UTC+3 all year. Shift the instant rather than the hour so the day
 * rolls over correctly, otherwise late-evening UTC reads the wrong weekday and
 * Saturday's different hours get applied on the wrong day.
 */
export function isOpenNow(now = new Date()) {
  const local = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const isSaturday = local.getUTCDay() === 6;
  const h = local.getUTCHours();
  return isSaturday ? h >= 11 && h < 20 : h >= 14 && h < 23;
}
