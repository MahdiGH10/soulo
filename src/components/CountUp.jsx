import { usePrefersReducedMotion, useCountUp } from "../hooks/useMotion.js";

/**
 * A figure that climbs to its value the first time it is seen.
 *
 * The true value is what gets rendered, so the prerendered HTML, crawlers and
 * anyone without JavaScript always read the real number. The animation only
 * touches the DOM node after mount.
 */
export default function CountUp({ value, decimals = 0, className, children }) {
  const reduced = usePrefersReducedMotion();
  const ref = useCountUp(value, { reduced, decimals });

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
