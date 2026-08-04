import { images } from "../data/images.js";

/**
 * Every image ships as WebP with a jpg fallback. The srcset is built from the
 * manifest rather than assumed, so it never points at a derivative that was
 * not generated — a missing srcset candidate is a silent 404.
 */
export default function Picture({
  base,
  alt,
  className,
  style,
  sizes = "100vw",
  eager = false,
}) {
  const meta = images[base];
  if (!meta) {
    throw new Error(`Picture: no image manifest entry for "${base}"`);
  }

  // `fetchpriority` lowercase: React 18 does not recognise the camelCase form
  // and silently drops the attribute, which would cost the hero its priority hint.
  const loadAttrs = eager
    ? { fetchpriority: "high", decoding: "async" }
    : { loading: "lazy", decoding: "async" };

  const srcSet = [
    ...meta.widths.map((w) => `/assets/${base}-${w}.webp ${w}w`),
    meta.full ? `/assets/${base}.webp ${meta.fullWidth}w` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={`/assets/${base}.jpg`}
        alt={alt}
        width={meta.w}
        height={meta.h}
        className={className}
        style={style}
        {...loadAttrs}
      />
    </picture>
  );
}
