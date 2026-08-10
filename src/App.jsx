import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Ritual from "./pages/Ritual.jsx";
import Menu from "./pages/Menu.jsx";
import Specialists from "./pages/Specialists.jsx";
import Visit from "./pages/Visit.jsx";
import Arabic from "./pages/Arabic.jsx";
import NotFound from "./pages/NotFound.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import { usePrefersReducedMotion, useSmoothScroll } from "./hooks/useMotion.js";
import { site } from "./data/site.js";

const TITLES = {
  "/": "Head & Co. - Head Spa in Jeddah",
  "/ritual": "The Hyggee Spa - Head & Co. Jeddah",
  "/menu": "Menu & Prices - Head & Co. Jeddah",
  "/specialists": "Specialists - Head & Co. Jeddah",
  "/visit": "Visit - Head & Co. Jeddah",
  "/ar": "هيد آند كو. - سبا الرأس في جدة",
};

const CAMPAIGNS = {
  "/": "header",
  "/ritual": "header-ritual",
  "/menu": "header-menu",
  "/specialists": "header-specialists",
  "/visit": "header-visit",
};

/** A router without this leaves the reader mid-page on the next route. */
function ScrollToTop({ lenisRef }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const lenis = lenisRef.current;
        if (lenis) lenis.scrollTo(el, { offset: -76 });
        else el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, lenisRef]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();
  const lenisRef = useSmoothScroll(!reduced);

  // Trailing slash matters: a static host serves this route as "/ar/", so an
  // exact match against "/ar" silently failed and the document stayed LTR while
  // its content was RTL.
  const onArabic = pathname.replace(/\/+$/, "") === "/ar";

  useEffect(() => {
    const title = TITLES[pathname];
    if (title) document.title = title;

    // The prerendered Arabic page ships with lang and dir already on <html>, but
    // a client-side move between /ar and an English route has to carry them
    // across too, or the document keeps announcing the wrong language and
    // scrollbars and text selection stay the wrong way round.
    document.documentElement.lang = onArabic ? "ar" : "en";
    document.documentElement.dir = onArabic ? "rtl" : "ltr";
  }, [pathname, onArabic]);

  return (
    <>
      <a className="skip" href="#content" lang={onArabic ? "ar" : undefined}>
        {onArabic ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>
      <ScrollToTop lenisRef={lenisRef} />
      <Header
        transparent={pathname === "/"}
        campaign={CAMPAIGNS[pathname] ?? "header"}
        lenisRef={lenisRef}
      />
      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ritual" element={<Ritual />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/ar" element={<Arabic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Collapses to an icon-only circle below 720px. As a text pill it covered
          body copy on a 390px screen, which is where most of this traffic lands.
          The mark is WhatsApp's own (Simple Icons path), drawn in the site's
          neutrals rather than brand green to hold the one-accent rule. */}
      <a
        className="whatsapp-float"
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Head & Co. on WhatsApp"
      >
        <svg className="whatsapp-float__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488"
          />
        </svg>
        <span className="whatsapp-float__label">WhatsApp</span>
      </a>
      <Footer campaign={pathname === "/" ? "footer" : `footer-${pathname.slice(1)}`} />
      <ChatWidget />
    </>
  );
}
