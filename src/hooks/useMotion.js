import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/** The OS preference is the default, and it is watched rather than read once. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Lenis eases the wheel toward the browser's real scroll position rather than
 * replacing it, so the scrollbar, keyboard, Find-in-page and assistive tools all
 * still drive the page, and native scroll events keep firing. Touch is left
 * native — syncTouch fights the platform's own momentum.
 *
 * Never constructed under reduced motion.
 */
export function useSmoothScroll(enabled) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    // 0.12 settles in ~200ms. Slower reads as floaty and fights the reader.
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: false });
    lenisRef.current = lenis;

    let raf = requestAnimationFrame(function frame(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}

/**
 * Adds the reveal class when an element first enters view. Under reduced motion
 * the element is marked revealed immediately — never left stranded at opacity 0.
 */
export function useReveal(reduced) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      el.classList.add("reveal--in");
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return ref;
}
