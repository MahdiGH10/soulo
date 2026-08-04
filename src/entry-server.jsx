import { renderToString } from "react-dom/server";
// v7 exports StaticRouter from react-router itself; the v6 react-router-dom/server
// subpath no longer exists.
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import { site, mapsUrl } from "./data/site.js";
import { services } from "./data/content.js";

const META = {
  "/": {
    title: "Head & Co. — Head Spa in Jeddah",
    description:
      "A head spa built on hygge in Al Mohammadiyyah, Jeddah. Scalp and hair rituals, facial massage and nail care. Open every day, 2–11 PM.",
  },
  "/ritual": {
    title: "The Hyggee Spa — Head & Co. Jeddah",
    description:
      "One hour of scalp and hair care in six stages: arrive, consult, cleanse, release, restore, finish. What a head spa is, and how to extend it.",
  },
  "/menu": {
    title: "Menu & Prices — Head & Co. Jeddah",
    description:
      "Head spa and nail services with prices as published on Fresha. Hyggee Spa from SAR 490, manicure and pedicure from SAR 280.",
  },
  "/specialists": {
    title: "Specialists — Head & Co. Jeddah",
    description:
      "Nine specialists you can book by name at Head & Co. in Jeddah, rated 4.7–4.9 by guests on Fresha.",
  },
  "/visit": {
    title: "Visit — Head & Co. Jeddah",
    description:
      "Head & Co. on King Abdulaziz Road, Al Mohammadiyyah, Jeddah. Open every day 2–11 PM. What to expect on a first visit.",
  },
};

/** Only the home page carries the business record, so it is not duplicated. */
function localBusinessJsonLd() {
  const offers = services
    .filter((s) => s.price)
    .map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
      price: s.price.replace("SAR ", ""),
      priceCurrency: "SAR",
    }));

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: site.name,
    description: META["/"].description,
    slogan: "Head, Body & Soul.",
    image: "/assets/hero.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
        ],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    priceRange: site.priceRange,
    currenciesAccepted: "SAR",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: String(site.rating.count),
      bestRating: "5",
    },
    makesOffer: offers,
    sameAs: [
      site.instagram,
      "https://www.fresha.com/a/head-co-jeddah-head-co-king-abdul-aziz-road-mr5d118y",
    ],
  };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

  const meta = META[url] ?? META["/"];
  const head = [
    `<meta name="robots" content="index, follow" />`,
    url === "/"
      ? `<script type="application/ld+json">${JSON.stringify(localBusinessJsonLd())}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return { html, head, title: esc(meta.title), description: esc(meta.description) };
}

export const routes = Object.keys(META);
