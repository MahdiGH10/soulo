import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site, freshaUrl } from "../data/site.js";
import { useMediaQuery } from "../hooks/useMotion.js";
import "./Header.css";

const NAV = [
  { to: "/ritual", label: "The Ritual" },
  { to: "/menu", label: "Menu" },
  { to: "/#space", label: "The Space" },
  { to: "/specialists", label: "Specialists" },
  { to: "/visit", label: "Visit" },
];

const OVERLAY_NAV = [{ to: "/", label: "Home" }, ...NAV.slice(0, 2), ...NAV.slice(3)];

/**
 * The Arabic surface is one page, so its nav is anchors into that page rather
 * than links to the English routes. Translating the labels but pointing them at
 * /ritual and /menu would hand an Arabic reader a menu that drops them back into
 * English, which is worse than leaving the labels in English.
 */
const NAV_AR = [
  { to: "/ar#about", label: "ما هو" },
  { to: "/ar#prices", label: "الأسعار" },
  { to: "/ar#team", label: "الأخصائيات" },
  { to: "/ar#visit", label: "الزيارة" },
];

const COPY = {
  en: { book: "Book on Fresha", bookShort: "Book", home: "Home", menu: "Menu", close: "Close menu", open: "Open menu" },
  ar: { book: "احجز على Fresha", bookShort: "احجز", home: "الرئيسية", menu: "القائمة", close: "إغلاق القائمة", open: "فتح القائمة" },
};

/**
 * One 76px row at every width. Below 860px the inline nav gives way to the menu
 * button and a full-screen overlay, so the header never wraps to three rows.
 *
 * `transparent` is Home only: the header sits over the hero and warms to a
 * blurred ricepaper once the reader has scrolled past it.
 */
export default function Header({ transparent = false, campaign = "header", lenisRef }) {
  // Same trailing-slash normalisation as App: a static host serves "/ar/".
  const onArabic = useLocation().pathname.replace(/\/+$/, "") === "/ar";
  const t = onArabic ? COPY.ar : COPY.en;
  const nav = onArabic ? NAV_AR : NAV;
  const overlayNav = onArabic
    ? [{ to: "/ar", label: t.home }, ...NAV_AR]
    : OVERLAY_NAV;

  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!transparent);
  const narrow = useMediaQuery("(max-width: 860px)");
  const openBtn = useRef(null);
  const overlay = useRef(null);

  useEffect(() => {
    if (!transparent) return undefined;
    const apply = () => setSolid(window.scrollY > 60);
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    return () => window.removeEventListener("scroll", apply);
  }, [transparent]);

  // A resize back past the breakpoint would otherwise strand the overlay open.
  useEffect(() => {
    if (!narrow) setOpen(false);
  }, [narrow]);

  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = "hidden";
    lenisRef?.current?.stop();

    const focusable = () =>
      Array.from(overlay.current?.querySelectorAll("a[href], button") ?? []).filter(
        (el) => el.offsetParent !== null,
      );

    focusable()[0]?.focus();

    const onKeydown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
      lenisRef?.current?.start();
      // A display:none button cannot take focus, which would strand it on body.
      if (openBtn.current?.offsetParent !== null) openBtn.current?.focus();
    };
  }, [open, lenisRef]);

  const wordmark = (
    <>
      {/* dir="ltr" or the bidi algorithm moves the trailing period of "Head & Co."
          to the front inside the RTL page, rendering the brand as ".Head & Co". */}
      <span className="wordmark__name" dir="ltr">{site.name}</span>
      <span className="wordmark__locality">{site.locality}</span>
    </>
  );

  return (
    <>
      <header
        className={`hdr ${transparent ? "hdr--over" : "hdr--solid"} ${solid ? "is-solid" : ""}`}
      >
        <div className="hdr__inner shell">
          {/* Home means the Arabic home when you are reading Arabic. Sending the
              wordmark to "/" would drop the reader back into English. */}
          <Link to={onArabic ? "/ar" : "/"} className="wordmark">
            {wordmark}
          </Link>

          <nav className="hdr__nav" aria-label="Primary" lang={onArabic ? "ar" : undefined}>
            {nav.map((item) =>
              item.to.includes("#") ? (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? "is-current" : "")}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hdr__actions">
            {/* Each label is written in the language it switches TO, not in the
                language you are reading. Someone scanning for their own language
                finds the word they read, not a label about it. */}
            {onArabic ? (
              <Link className="hdr__lang" to="/" lang="en" hrefLang="en">
                English
              </Link>
            ) : (
              <Link className="hdr__lang" to="/ar" lang="ar" hrefLang="ar">
                عربي
              </Link>
            )}
            <a
              className={`btn ${transparent ? "btn--outline" : "btn--primary"}`}
              href={freshaUrl(campaign)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hdr__book-full">{t.book}</span>
              <span className="hdr__book-short">{t.bookShort}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              ref={openBtn}
              type="button"
              className="hdr__burger"
              aria-label={t.open}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={overlay}
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
          lang={onArabic ? "ar" : undefined}
          dir={onArabic ? "rtl" : undefined}
        >
          <div className="overlay__top shell">
            <span className="wordmark__name" dir="ltr">{site.name}</span>
            <button
              type="button"
              className="overlay__close"
              aria-label={t.close}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="overlay__nav shell" aria-label={t.menu}>
            {overlayNav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            {onArabic ? (
              <Link to="/" lang="en" hrefLang="en" onClick={() => setOpen(false)}>
                English
              </Link>
            ) : (
              <Link to="/ar" lang="ar" hrefLang="ar" onClick={() => setOpen(false)}>
                عربي
              </Link>
            )}
            <a
              className="btn btn--invert overlay__cta"
              href={freshaUrl(`menu-overlay-${campaign}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.book} <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
