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
 * Counts a figure up the first time it enters view. A number that is simply
 * printed reads as decoration; one that climbs and settles reads as a
 * measurement, which is the claim 2,231 reviews is actually making.
 *
 * The real value is rendered in JSX, so the prerendered HTML and every crawler
 * always see the true figure. This only mutates after mount, and only once the
 * element is on screen, so nothing is ever seen resetting to zero.
 */
export function useCountUp(target, { reduced = false, decimals = 0, duration = 1600 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const format = (n) =>
      decimals > 0
        ? n.toFixed(decimals)
        : Math.round(n).toLocaleString("en-US");

    let raf = 0;
    let startedAt = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const step = (t) => {
          if (!startedAt) startedAt = t;
          const p = Math.min((t - startedAt) / duration, 1);
          // easeOutCubic: quick off the mark, then settling, the way a reading lands.
          el.textContent = format(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, reduced, decimals, duration]);

  return ref;
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
      {
        // The top margin is deliberately enormous. A deep link to #menu, a
        // scrollbar drag or the End key moves an element from below the
        // viewport to above it without ever crossing the threshold, and since
        // both states are ratio 0 the observer reports no change at all: the
        // element stays at opacity 0 for the rest of the session, including on
        // the way back up. Extending the root upward makes "already scrolled
        // past" count as intersecting, which costs nothing and needs no scroll
        // listener. The bottom margin still gates what is genuinely below.
        rootMargin: "200000px 0px -6% 0px",
        threshold: 0.04,
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return ref;
}
