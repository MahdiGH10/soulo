import { createElement } from "react";
import { useReveal, usePrefersReducedMotion } from "../hooks/useMotion.js";

/**
 * Wraps children in an element that fades up once, when it is first reached.
 * `delay` staggers siblings; it is inert under reduced motion.
 */
export default function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const reduced = usePrefersReducedMotion();
  const ref = useReveal(reduced);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`.trim(),
      style: reduced ? undefined : { transitionDelay: `${delay}ms` },
      ...rest,
    },
    children,
  );
}
