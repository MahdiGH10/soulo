import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Ritual from "./pages/Ritual.jsx";
import Menu from "./pages/Menu.jsx";
import Specialists from "./pages/Specialists.jsx";
import Visit from "./pages/Visit.jsx";
import NotFound from "./pages/NotFound.jsx";
import { usePrefersReducedMotion, useSmoothScroll } from "./hooks/useMotion.js";
import { site } from "./data/site.js";

const TITLES = {
  "/": "Head & Co. — Head Spa in Jeddah",
  "/ritual": "The Hyggee Spa — Head & Co. Jeddah",
  "/menu": "Menu & Prices — Head & Co. Jeddah",
  "/specialists": "Specialists — Head & Co. Jeddah",
  "/visit": "Visit — Head & Co. Jeddah",
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

  useEffect(() => {
    const title = TITLES[pathname];
    if (title) document.title = title;
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <a
        className="whatsapp-float"
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Head & Co. on WhatsApp"
      >
        WhatsApp
      </a>
      <Footer campaign={pathname === "/" ? "footer" : `footer-${pathname.slice(1)}`} />
    </>
  );
}
