# soulo

Website for **Head & Co.** — a head spa on King Abdulaziz Road, Al Mohammadiyyah, Jeddah.

React + Vite, prerendered to static HTML at build time. The site is a front door onto the
business's existing Fresha booking, not a booking system of its own: every call to action
deep-links to the correct service, UTM-tagged so the hand-off can be measured.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, philosophy, the ritual, menu, the space, specialists, reviews, visit |
| `/ritual` | The six-stage Hyggee ritual in full, and what extends it |
| `/menu` | Services and prices as published on Fresha |
| `/specialists` | The nine bookable specialists, each requestable by name |
| `/visit` | Address, hours, first-visit guidance, the space |

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

```bash
npm install && npm run dev
```

`npm run build` does three things in order: builds the client bundle, builds an SSR bundle from
`src/entry-server.jsx`, then runs `scripts/prerender.mjs` to write real static HTML for every
route into `dist/`. `npm run preview` serves the result.

> **Windows note.** If the checkout directory name contains an `&` — as `Head & Co. website design`
> does — `cmd` splits the path and npm scripts fail. Either clone into a path without `&`, or run
> the steps directly: `node ./node_modules/vite/bin/vite.js build`, and so on.

## Architecture

```
src/
  data/        Business facts and content. No copy lives in markup.
  hooks/       Reduced-motion, media queries, Lenis, reveal-on-scroll.
  components/  Header, Footer, ServiceRow, Picture, Reveal, PageHead, Close.
  pages/       One component per route.
  styles/      tokens.css mirrors DESIGN.md; global.css holds the primitives.
  entry-server.jsx   Per-route <title>, description and the home page's JSON-LD.
scripts/prerender.mjs
```

**Why prerender rather than ship a plain SPA.** PRODUCT.md's third purpose is ranking for
"head spa Jeddah" under the business's own name. A client-rendered SPA serves crawlers an empty
`<div id="root">`, which would quietly forfeit that. The build emits real HTML — roughly 830 words
on the home route — and the client bundle hydrates it.

## Notable implementation details

- **Two breakpoints only** — 860px collapses the header nav into a full-screen menu; 720px stacks
  the service rows so prices can never be pushed off a phone screen. Everything else is `clamp()`
  and `auto-fit`.
- **Type is fully tokenised.** Every `font-size` resolves to a `--t-*` role.
- **Motion respects the OS.** `prefers-reduced-motion` is honoured by default; under it Lenis is
  never constructed and reveals resolve immediately rather than stranding content at opacity 0.
- **Smooth scroll** is Lenis at `lerp: 0.12`, with touch left native.
- **The menu overlay is a real modal** — focus moves in, is trapped, and returns to the opener.
- **Images** ship as `<picture>` with WebP `srcset` built from `src/data/images.js`, a manifest of
  what actually exists on disk, so a `srcset` candidate can never 404.
- **`legacy/`** holds the original Design Canvas `.dc.html` build and the August 2026 audit, kept
  for reference. Nothing in it is served.

## Before this goes live

- Replace the placeholder images in `public/assets/` with the venue and portfolio photography from
  the business's own Fresha and Google listings. They are currently stock interiors of a building
  that is not theirs, and they are the site's biggest tell. Regenerate `src/data/images.js`
  afterwards so `srcset` matches the new derivatives.
- Install analytics. Booking clicks are UTM-tagged but nothing records them yet, so the site cannot
  prove what it earned.
- Decide the Arabic question. Full bilingual AR/EN on `/ar` paths with `hreflang` is recorded in
  PRODUCT.md as a requirement and is not built yet.
- Confirm the public phone number, and the parking and cancellation terms marked in the pages as
  awaiting owner confirmation.

Prices, hours, ratings and specialist names were verified against the public Fresha profile and
Google listing in August 2026. Reconfirm before publishing — they change.
