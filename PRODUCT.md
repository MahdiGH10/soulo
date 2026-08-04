# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**The uninitiated visitor.** Someone in Jeddah who has seen Head & Co. on Instagram or in a
Google result and does not know what a head spa is. They cannot evaluate a 490 SAR booking
because they cannot picture the hour it buys. They need the ritual explained before the price
makes sense. This visitor is the reason the site exists — Fresha cannot serve them.

**The decided guest.** Already knows what they want. Needs price, duration, which specialist,
and a booking link that lands on the right service — not the venue page they have to re-navigate.
Arrives with intent and should reach Fresha in one click.

Both audiences are local to Jeddah and split across Arabic and English. Most arrive on a phone,
most from Instagram.

## Product Purpose

A website for a head spa that already converts well on Fresha. Repeating Fresha adds nothing,
so the site's job is the four things Fresha cannot do:

1. Explain what a head spa is to someone who has never had one.
2. Answer price and duration before the click, not after it.
3. Rank for "head spa Jeddah" under the business's own name rather than an aggregator's.
4. Prove, with measurement, how many bookings it sent.

Success is booking clicks attributable to the site, reported monthly.

## Positioning

Head & Co. is built on **hygge** — the Danish idea that ease is something you can design.
Temperature, light, pressure and pace are decided in advance so that nothing during the visit
needs deciding by the guest.

This is the business's own framing and it is the single origin story. Earlier drafts led with
"From Korea to Jeddah"; that has been retired. Fresha categorises the business under *massage*,
not hair or beauty, which is consistent with the spa-not-salon position. Do not reintroduce a
Korean origin narrative or run two origin stories at once.

## Operating Context

- **Location.** King Abdulaziz Road, Al Mohammadiyyah, Jeddah 23617 (21.645069, 39.1120863).
- **Hours.** Every day, 2:00–11:00 PM. This is verified; it does not need hedging language.
- **Booking runs on Fresha.** Availability, specialist choice and payment are all handled there.
  Instant confirmation, pay in the app, packages sold separately. The site is a front door, not
  a booking engine.
- **Specialists are requestable by name** at booking time — nine bookable specialists including
  a head-and-face specialist, a head-and-nails master, a head massage specialist and a blow-dry
  specialist, rated 4.7–4.9.
- **Discovery is Instagram-led** (@headandco.sa) and mobile-first.

## Capabilities and Constraints

- **No on-site booking.** Every CTA hands off to Fresha. Hand-offs must deep-link per service,
  and per specialist on the team page, carrying UTM tags so the hand-off is measurable.
- **Commercial status: approved client project.** The owner has agreed. The unofficial-concept
  posture — `noindex`, the visible concept notice, the "provisional" hedging — is now obsolete
  and should be removed. The site is heading for indexing on a real domain.
- **Two repositories.** The upstream application lives at `MahdiGH10/head-body-soul-space`
  (React / TanStack Start: `src/routes`, `src/server.ts`, `src/lib/i18n.tsx`). This folder holds
  Design Canvas deliverables — five `.dc.html` pages sharing `site-motion.js`, with `Home` carrying
  its own richer inline copy of that logic. Design decisions made here have to survive the port
  back into the app.
- **Verified service and price truth** (Fresha, 3 Aug 2026 — reconfirm before publishing, since
  prices and staff change):

  | Service | Duration | Price |
  | --- | --- | --- |
  | Hyggee Spa | 1 hr | SAR 490 |
  | Hyggee Spa + Face Massage | 1 hr 30 min | SAR 690 |
  | Classic Manicure & Pedicure | 1 hr 15 min | SAR 280 |
  | Regular Nail Polish | 15 min | SAR 35 |
  | Hyggee Spa + Buccal Massage · HEAD&CO. Signature | — | listed without a public price |

  Forty-one services exist on Fresha. The site curates roughly six; that is deliberate — a wall
  of forty-one is not a menu.

**Open decisions — record, do not invent:**

- Public telephone number. The old build carried a masked `+966 5X XXX XXXX`, which reads as
  unfinished. Get the real number or drop the field.
- Analytics tool. `trackBooking` currently pushes to a `dataLayer` nothing reads. Until one is
  installed, purpose #4 above is unmet.
- Domain, hosting and code ownership after handover.
- Whether packages and gift cards get surfaced on the site. Fresha already sells packages and the
  site has never mentioned them; gifting is the strongest reason a non-guest visits a spa site.

## Brand Commitments

- **Name:** Head & Co. Written `HEAD&CO.` on Fresha for the signature service only.
- **Slogan:** "Head, Body & Soul."
- **Instagram:** @headandco.sa
- **Origin story:** hygge, exclusively. See Positioning.
- **Voice, as established in the current build:** plain, unhurried, declarative. Short sentences.
  Concrete nouns — warm water, wooden lattice, tea poured before the ritual begins. No spa
  superlatives, no "indulge", no exclamation. It describes what happens rather than promising how
  it will feel.

## Evidence on Hand

**Real:**

- 4.9 from 2,231 reviews, in Arabic and English, dated and attributable, credited to Fresha.
- Nine named specialists with real roles and 4.7–4.9 ratings.
- Published prices for four services (above).
- Three venue photos and four portfolio shots on the public Fresha and Google listings.

**Photography.** The site will be built on the business's existing Fresha and Google imagery —
lower resolution and fewer usable slots than a commissioned shoot, but genuinely theirs. The ten
JPEGs currently in `src/assets/` are stock interiors of a building that is not theirs and must be
replaced, not re-cropped. Design work has to fit the real photo count, so layouts that demand ten
distinct hero-grade images are out; treatments that carry brand through typography, material and
layout are in.

**Absent — do not fabricate:**

- No press coverage exists. A "verified coverage" row advertises the absence of coverage.
- No confirmed public phone number.
- No testimonials beyond what is quotable verbatim from Fresha, with initials and dates.

## Product Principles

1. **Explain before you sell.** The visitor who does not know what a head spa is outranks the one
   who does. Price makes sense only after the hour is pictured.
2. **Every fact is verifiable or it is not on the site.** Invented durations, placeholder ratings
   and lettered specialists are what made the first draft read as a template to someone who runs
   the business.
3. **The hand-off is the product.** A booking button that lands on the venue page instead of the
   chosen service loses what the page just earned. Deep-link, tag, and measure.
4. **Curate, don't catalogue.** Six services with prices beat forty-one without.
5. **Verified facts do not need disclaimers.** Hedging language reads as unfinished work.

## Accessibility & Inclusion

- **Bilingual Arabic/English is a requirement, not a toggle.** Full Arabic content on `/ar` paths
  with `hreflang`, direction resolved before first paint rather than after hydration, RTL mirroring
  via logical properties, and Arabic type properly set — not an English page wearing Arabic buttons.
  The previous build's ~30-string Arabic dictionary covering only navigation is the failure mode to
  avoid: in Jeddah, half-Arabic is worse than English-only.
- **`prefers-reduced-motion` must be honoured by default.** The current build defaults its motion
  setting to `full` and consults the OS preference only when a prop is manually changed, so users
  who asked for less motion still get headline splits, clip wipes, reveals and hijacked wheel
  scrolling.
- Small text must clear 4.5:1. The current palette does; keep it that way.
- Visible focus rings, `aria-label` on icon-only controls, and screen-reader text announcing that
  booking opens a new tab are established habits in this build. Preserve them.
