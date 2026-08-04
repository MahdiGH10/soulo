repo: MahdiGH10/head-body-soul-space
branch: main

## Last sync

date: 2026-08-04T00:14:52Z

### Updated in this project

- Built a five-page shippable site: `Home`, `Ritual`, `Menu`, `Specialists`, `Visit` (all `.dc.html`), sharing `site-motion.js`.
- Applied the audit fixes: verified Fresha data throughout, hygge as the single origin story, contrast raised on small text, skip links, full LocalBusiness JSON-LD on Home, per-service and per-specialist UTM-tagged Fresha deep links.
- Audit of the current repo written up in `Head & Co - Website Audit.dc.html`.
- Copied the 10 image assets from `src/assets/`; all still placeholder pending a photo shoot.

## Screen map

| Screen | Built from |
| --- | --- |
| Home (`Home.dc.html`) | `src/styles.css`, `src/config/site.ts`, `src/routes/index.tsx`, `src/components/sections/Hero.tsx`, `src/components/brand/Primitives.tsx`, `src/components/layout/Header.tsx`, `src/data/content.ts`, `src/assets/*` |
| The Ritual (`Ritual.dc.html`) | `src/styles.css`, `src/data/rituals.ts`, `src/data/content.ts`, `src/assets/ritual-*.jpg` |
| Menu & Prices (`Menu.dc.html`) | `src/styles.css`, `src/data/content.ts`, `src/config/site.ts`, `src/assets/collection-nails.jpg` |
| Specialists (`Specialists.dc.html`) | `src/styles.css`, `src/data/content.ts`, `src/assets/ritual-hands.jpg` |
| Visit (`Visit.dc.html`) | `src/styles.css`, `src/routes/visit.tsx`, `src/config/site.ts`, `src/assets/space-*.jpg` |
| Audit (`Head & Co - Website Audit.dc.html`) | `src/styles.css`, `src/config/site.ts`, `src/data/content.ts`, `src/data/rituals.ts`, `src/lib/i18n.tsx`, `src/locales/*.json`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileBar.tsx`, `src/routes/__root.tsx`, `src/routes/visit.tsx`, `src/server.ts`, `package.json`, `public/robots.txt` |

## Sync history

- 2026-08-03T22:48:35Z — audited the repo against the live Fresha profile and Google listing.
- 2026-08-03T22:27:26Z — initial import: read design system, copied assets, built the home page design.
