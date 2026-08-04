# soulo

Website design for **Head & Co.** — a head spa on King Abdulaziz Road, Al Mohammadiyyah, Jeddah.

Five Design Canvas pages (`.dc.html`), a shared motion module, and the design system that governs
them. The site is a front door onto the business's existing Fresha booking, not a booking system of
its own: every call to action deep-links to the correct service, UTM-tagged so the hand-off can be
measured.

## Pages

| File | What it is |
| --- | --- |
| `Home.dc.html` | Hero, philosophy, the ritual, menu, the space, specialists, reviews, visit |
| `Ritual.dc.html` | The six-stage Hyggee ritual in full, and what extends it |
| `Menu.dc.html` | Services and prices as published on Fresha |
| `Specialists.dc.html` | The nine bookable specialists, each requestable by name |
| `Visit.dc.html` | Address, hours, first-visit guidance, the space |
| `Head & Co - Website Audit.dc.html` | The August 2026 audit this build answers. Historical — not a live page |

## Reading order

Start with these two. They are the authority for anything built next.

- **[PRODUCT.md](PRODUCT.md)** — product truth. Users, positioning, verified prices and hours,
  brand commitments, and the decisions still open. Nothing on the site should contradict it.
- **[DESIGN.md](DESIGN.md)** — the visual system, in the
  [DESIGN.md spec](https://github.com/google-labs-code/design.md) format: machine-readable tokens in
  frontmatter, then colour, typography, layout, depth, shape and component guidance. Its Named Rules
  are the short version. `.impeccable/design.json` carries the extensions the spec's schema cannot
  hold — tonal ramps, motion tokens, breakpoints, and renderable component snippets.

## Running it

Any static server works, since these are plain HTML files:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173/Home.dc.html`.

## Deploying

The repo is a plain static site with no build step. `vercel.json` rewrites `/` to `Home.dc.html`,
because Vercel serves the root by looking for an `index.html` that this project deliberately does
not have — the Design Canvas naming convention owns the filenames. It also aliases `/ritual`,
`/menu`, `/specialists` and `/visit` so the pages have readable links to share.

Internal links deliberately stay as relative `.dc.html` paths rather than the clean aliases, so the
site behaves identically from a bare local file server and from Vercel. When a real domain is
chosen, decide the canonical URL set then and add `rel="canonical"` accordingly.

## Notable implementation details

- **Two breakpoints only** — 860px collapses the header nav into a full-screen menu; 720px stacks
  the service rows so prices can never be pushed off a phone screen. Everything else is `clamp()`
  and `auto-fit`.
- **Type is fully tokenised.** Every `font-size` resolves to a `--t-*` role.
- **Motion respects the OS.** `prefers-reduced-motion` is honoured by default; under it the smooth
  scroll is never constructed and ambient movement stops, while every hover and state cue survives.
- **Smooth scroll** is Lenis (vendored in `vendor/`, no CDN dependency) at `lerp: 0.12`, with touch
  left native.
- **Images** ship as `<picture>` with WebP `srcset`.

## Before this goes live

- Replace the ten placeholder images in `src/assets/` with the venue and portfolio photography from
  the business's own Fresha and Google listings. They are currently stock interiors of a building
  that is not theirs, and they are the site's biggest tell.
- Install analytics. `trackBooking` currently pushes to a `dataLayer` nothing reads, so booking
  clicks cannot yet be attributed.
- Decide the Arabic question. Full bilingual AR/EN on `/ar` paths with `hreflang` is recorded in
  PRODUCT.md as a requirement and is not built yet.
- Confirm the public phone number, and the parking and cancellation terms marked in the pages as
  awaiting owner confirmation.

Prices, hours, ratings and specialist names were verified against the public Fresha profile and
Google listing in August 2026. Reconfirm before publishing — they change.
