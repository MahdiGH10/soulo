import { Link, useLocation } from "react-router-dom";
import { site, freshaUrl } from "../data/site.js";
import "./Footer.css";

/**
 * On /ar the footer nav points into the Arabic page's own sections rather than
 * at the English routes, for the same reason the header's does: a translated
 * label that lands you back in English is worse than an untranslated one.
 */
const NAV = {
  en: [
    ["/ritual", "The Ritual"],
    ["/menu", "Menu & Prices"],
    ["/specialists", "Specialists"],
    ["/visit", "Visit"],
  ],
  ar: [
    ["/ar#about", "ما هو"],
    ["/ar#prices", "الأسعار"],
    ["/ar#team", "الأخصائيات"],
    ["/ar#visit", "الزيارة"],
  ],
};

const COPY = {
  en: {
    nav: "Footer",
    book: "Book on Fresha",
    legal: "Bookings handled by Fresha. Ratings and reviews shown as published there.",
  },
  ar: {
    nav: "تذييل",
    book: "احجز على Fresha",
    legal: "الحجز يتم عبر Fresha. التقييمات والمراجعات معروضة كما هي منشورة هناك.",
  },
};

export default function Footer({ campaign = "footer" }) {
  const onArabic = useLocation().pathname.replace(/\/+$/, "") === "/ar";
  const lang = onArabic ? "ar" : "en";
  const t = COPY[lang];

  return (
    <footer className="ftr" lang={onArabic ? "ar" : undefined} dir={onArabic ? "rtl" : undefined}>
      <div className="shell ftr__grid">
        <div>
          <p className="ftr__mark" dir="ltr">{site.name}</p>
          <p className="ftr__slogan">{site.slogan}</p>
        </div>

        <nav className="ftr__nav" aria-label={t.nav}>
          {NAV[lang].map(([to, label]) => (
            <Link key={to} className="link" to={to}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="ftr__col">
          <p style={{ margin: 0 }}>
            {site.address.street}
            <br />
            {site.address.district}, {site.address.city}
          </p>
          <p style={{ margin: "12px 0 0" }}>{site.hours.label}</p>
          <p style={{ margin: "2px 0 0" }}>{site.hours.saturdayLabel}</p>
          <p style={{ margin: "12px 0 0" }}>
            <a className="link" href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>

        <div className="ftr__nav">
          <a className="link" href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
          <a className="link" href={site.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok ↗
          </a>
          <a className="link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp ↗
          </a>
          <a className="link" href={site.press.url} target="_blank" rel="noopener noreferrer">
            Arab News ↗
          </a>
          <a
            className="link"
            href={freshaUrl(campaign)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.book} ↗
          </a>
        </div>
      </div>

      <div className="shell ftr__legal">
        <p style={{ margin: 0 }}>{t.legal}</p>
        <p style={{ margin: 0 }}>© 2026 {site.name}, {site.locality}</p>
      </div>
    </footer>
  );
}
